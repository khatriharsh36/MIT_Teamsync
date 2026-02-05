const express = require('express');
const router = express.Router();
const PermissionRequest = require('../models/PermissionRequest');
const { authMiddleware, checkAdmin } = require('../middleware/auth');

// Create permission request (authenticated users)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { requestType, reason, metadata } = req.body;
    const request = new PermissionRequest({
      requesterId: req.user.userId,
      requestType,
      reason,
      metadata
    });
    await request.save();
    res.status(201).json(request);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get user's own requests
router.get('/my-requests', authMiddleware, async (req, res) => {
  try {
    const requests = await PermissionRequest.find({ requesterId: req.user.userId })
      .populate('reviewedBy', 'name email')
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all requests (admin only)
router.get('/', authMiddleware, checkAdmin, async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const requests = await PermissionRequest.find(filter)
      .populate('requesterId', 'name email studentId')
      .populate('reviewedBy', 'name email')
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Approve/Reject request (admin only)
router.patch('/:id', authMiddleware, checkAdmin, async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    const request = await PermissionRequest.findByIdAndUpdate(
      req.params.id,
      { 
        status, 
        adminNotes, 
        reviewedBy: req.user.userId, 
        reviewedAt: new Date() 
      },
      { new: true }
    ).populate('requesterId reviewedBy', 'name email');
    if (!request) return res.status(404).json({ message: 'Request not found' });
    res.json(request);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete request (admin only)
router.delete('/:id', authMiddleware, checkAdmin, async (req, res) => {
  try {
    const request = await PermissionRequest.findByIdAndDelete(req.params.id);
    if (!request) return res.status(404).json({ message: 'Request not found' });
    res.json({ message: 'Request deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
