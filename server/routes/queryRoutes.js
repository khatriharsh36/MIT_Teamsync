const express = require('express');
const router = express.Router();
const Query = require('../models/Query');
const { authMiddleware, checkAdmin } = require('../middleware/auth');

// Create query (student) - emits socket event
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { subject, message, category, priority } = req.body;
    const query = new Query({
      studentId: req.user.userId,
      subject,
      message,
      category,
      priority
    });
    await query.save();
    await query.populate('studentId', 'name email studentId');
    
    // Emit real-time event to all admins
    req.app.get('io').to('admin-room').emit('newQuery', query);
    
    res.status(201).json(query);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get student's own queries
router.get('/my-queries', authMiddleware, async (req, res) => {
  try {
    const queries = await Query.find({ studentId: req.user.userId })
      .populate('respondedBy', 'name email')
      .sort({ createdAt: -1 });
    res.json(queries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all queries (admin only)
router.get('/', authMiddleware, checkAdmin, async (req, res) => {
  try {
    const { status, category, priority } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (category) filter.category = category;
    if (priority) filter.priority = priority;
    
    const queries = await Query.find(filter)
      .populate('studentId', 'name email studentId')
      .populate('respondedBy', 'name email')
      .sort({ createdAt: -1 });
    res.json(queries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update query status/response (admin only) - emits socket event
router.patch('/:id', authMiddleware, checkAdmin, async (req, res) => {
  try {
    const { status, adminResponse } = req.body;
    const query = await Query.findByIdAndUpdate(
      req.params.id,
      { 
        status, 
        adminResponse, 
        respondedBy: req.user.userId, 
        respondedAt: new Date() 
      },
      { new: true }
    ).populate('studentId respondedBy', 'name email');
    
    if (!query) return res.status(404).json({ message: 'Query not found' });
    
    // Emit real-time event to student
    req.app.get('io').to(query.studentId._id.toString()).emit('queryUpdated', query);
    
    res.json(query);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete query (admin only)
router.delete('/:id', authMiddleware, checkAdmin, async (req, res) => {
  try {
    const query = await Query.findByIdAndDelete(req.params.id);
    if (!query) return res.status(404).json({ message: 'Query not found' });
    res.json({ message: 'Query deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
