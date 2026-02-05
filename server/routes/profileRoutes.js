const express = require('express');
const router = express.Router();
const StudentProfile = require('../models/StudentProfile');
const { authMiddleware } = require('../middleware/auth');

// Get or create profile for authenticated user
router.get('/me', authMiddleware, async (req, res) => {
  try {
    let profile = await StudentProfile.findOne({ userId: req.user.userId }).populate('userId', 'name email');
    if (!profile) {
      profile = new StudentProfile({ userId: req.user.userId });
      await profile.save();
      await profile.populate('userId', 'name email');
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update own profile
router.put('/me', authMiddleware, async (req, res) => {
  try {
    const profile = await StudentProfile.findOneAndUpdate(
      { userId: req.user.userId },
      req.body,
      { new: true, upsert: true }
    ).populate('userId', 'name email');
    res.json(profile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get profile by user ID
router.get('/:userId', async (req, res) => {
  try {
    const profile = await StudentProfile.findOne({ userId: req.params.userId }).populate('userId', 'name email skills domains');
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search profiles by skills/interests
router.get('/search/filter', async (req, res) => {
  try {
    const { skills, interests, availability } = req.query;
    const filter = {};
    if (availability) filter.availability = availability;
    const profiles = await StudentProfile.find(filter).populate('userId', 'name email skills domains');
    let results = profiles;
    if (skills) {
      const skillArray = skills.split(',');
      results = results.filter(p => p.userId.skills?.some(s => skillArray.includes(s)));
    }
    if (interests) {
      const interestArray = interests.split(',');
      results = results.filter(p => p.interests?.some(i => interestArray.includes(i)));
    }
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
