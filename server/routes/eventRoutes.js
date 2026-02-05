const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const { authMiddleware, checkAdmin } = require('../middleware/auth');

// Get all events (public)
router.get('/', async (req, res) => {
  try {
    const { type, status } = req.query;
    const filter = {};
    if (type) filter.type = type;
    if (status) filter.status = status;
    const events = await Event.find(filter).populate('organizer', 'name email').sort({ startDate: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single event
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('organizer registeredUsers', 'name email');
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create event (admin only)
router.post('/', authMiddleware, checkAdmin, async (req, res) => {
  try {
    const event = new Event({ ...req.body, organizer: req.user.userId });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update event (admin only)
router.put('/:id', authMiddleware, checkAdmin, async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Register for event (authenticated users)
router.post('/:id/register', authMiddleware, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    if (event.registeredUsers.includes(req.user.userId)) {
      return res.status(400).json({ message: 'Already registered' });
    }
    if (event.registeredUsers.length >= event.maxParticipants) {
      return res.status(400).json({ message: 'Event is full' });
    }
    event.registeredUsers.push(req.user.userId);
    await event.save();
    res.json({ message: 'Registered successfully', event });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Unregister from event (authenticated users)
router.delete('/:id/register', authMiddleware, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    event.registeredUsers = event.registeredUsers.filter(id => id.toString() !== req.user.userId);
    await event.save();
    res.json({ message: 'Unregistered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
