const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['technical', 'event', 'account', 'team', 'other'], 
    default: 'other' 
  },
  status: { 
    type: String, 
    enum: ['pending', 'in-progress', 'resolved', 'closed'], 
    default: 'pending' 
  },
  priority: { 
    type: String, 
    enum: ['low', 'medium', 'high'], 
    default: 'medium' 
  },
  adminResponse: String,
  respondedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  respondedAt: Date
}, { timestamps: true });

module.exports = mongoose.model('Query', querySchema);
