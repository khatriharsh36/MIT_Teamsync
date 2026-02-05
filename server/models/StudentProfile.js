const mongoose = require('mongoose');

const studentProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  achievements: [{ title: String, description: String, date: Date }],
  projects: [{ 
    name: String, 
    description: String, 
    techStack: [String], 
    link: String,
    startDate: Date,
    endDate: Date
  }],
  certifications: [{ name: String, issuer: String, date: Date, credentialUrl: String }],
  interests: [String],
  availability: { type: String, enum: ['available', 'busy', 'not-available'], default: 'available' },
  teamPreferences: {
    preferredTeamSize: { type: Number, min: 2, max: 10 },
    preferredRoles: [String],
    lookingForTeam: { type: Boolean, default: false }
  },
  stats: {
    eventsAttended: { type: Number, default: 0 },
    projectsCompleted: { type: Number, default: 0 },
    teamsJoined: { type: Number, default: 0 }
  }
}, { timestamps: true });

module.exports = mongoose.model('StudentProfile', studentProfileSchema);
