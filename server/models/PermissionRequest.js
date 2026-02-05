const mongoose = require('mongoose');

const permissionRequestSchema = new mongoose.Schema({
  requesterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  requestType: { 
    type: String, 
    enum: ['event-creation', 'role-upgrade', 'feature-access', 'data-export'], 
    required: true 
  },
  reason: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reviewedAt: Date,
  adminNotes: String,
  metadata: mongoose.Schema.Types.Mixed
}, { timestamps: true });

module.exports = mongoose.model('PermissionRequest', permissionRequestSchema);
