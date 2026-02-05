const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

const seedStudent = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

    const existingStudent = await User.findOne({ email: 'student@mitaoe.ac.in' });
    if (existingStudent) {
      console.log('Default student already exists');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash('Student@123', 10);
    const student = new User({
      name: 'Harsh Khatri',
      email: 'student@mitaoe.ac.in',
      password: hashedPassword,
      studentId: 'MITAOE2024001',
      role: 'student',
      skills: ['JavaScript', 'React', 'Node.js', 'Python'],
      domains: ['coding', 'design'],
      year: '3rd',
      branch: 'Computer Engineering',
      bio: 'Passionate about web development and UI/UX design. Looking for team members for upcoming hackathons.'
    });

    await student.save();
    console.log('Default student created successfully');
    console.log('Email: student@mitaoe.ac.in');
    console.log('Password: Student@123');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

seedStudent();
