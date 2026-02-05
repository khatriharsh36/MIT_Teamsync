# MITAOE TeamSync - Professional Collaboration Platform

A modern, dark-themed professional collaboration platform specifically designed for MITAOE students to find teammates for hackathons and events through skill-based matching. Built with React, Vite, Tailwind CSS, and Framer Motion.

## 🎨 Features

- **Modern Dark Theme**: Deep gray (#0D0D0D) with electric blue (#00BFFF), purple (#8A2BE2), and teal (#00E5A0) accents
- **Role-Based Authentication**: Separate admin and student user roles with JWT authentication
- **Admin Dashboard**: Full user management with CRUD operations, analytics, and role assignment
- **Tinder-Style Team Matching**: Swipe-based interface to find teammates with complementary skills
- **Skill-Based Pairing**: Match students based on domains (coding, design, marketing, data science)
- **Event Integration**: Connect teams for hackathons, competitions, and college events
- **MITAOE Exclusive**: Designed specifically for MITAOE students
- **Glassmorphism UI**: Beautiful glass-like components with backdrop blur effects
- **Smooth Animations**: Powered by Framer Motion with micro-interactions
- **Fully Responsive**: Mobile-first design that works on all devices

## 🚀 Pages Included

1. **Landing Page** - Hero section showcasing team collaboration features
2. **Login/Signup Page** - MITAOE student authentication
3. **Team Matching** - Tinder-style swipe interface for finding teammates
4. **User Dashboard** - Event tracking, team stats, and collaboration metrics
5. **Chat Interface** - Team communication with project collaboration tools
6. **Profile Page** - Skill showcase, domain expertise, and project portfolio
7. **Admin Dashboard** - Event management and student analytics

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons

### Backend
- **Node.js + Express** - RESTful API server
- **MongoDB** - NoSQL database for user data
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - The `.env` file is already configured with:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/teamsync
   JWT_SECRET=your_jwt_secret_key_here_change_in_production
   ```
   - Update `MONGODB_URI` if using MongoDB Atlas

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   ```

5. **Create admin user (First time only)**
   ```bash
   npm run seed:admin
   ```
   This creates:
   - Email: `admin@mitaoe.ac.in`
   - Password: `Admin@123`
   - ⚠️ Change password after first login!

6. **Start backend server**
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:5000`

### Frontend Setup

1. **Navigate to root directory**
   ```bash
   cd ..
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Start frontend development server**
   ```bash
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🎯 Available Scripts

### Frontend Scripts
- `npm run dev` - Start frontend development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend Scripts (in `/server` directory)
- `npm run dev` - Start backend server with nodemon
- `npm start` - Start backend server
- `npm run seed:admin` - Create default admin user
- `npm run seed:student` - Create default student user

## 🎨 Design System

### Colors
- **Primary Dark**: #0D0D0D
- **Electric Blue**: #00BFFF
- **Neon Purple**: #8A2BE2
- **Neon Teal**: #00E5A0
- **Dark Gray**: #1A1A1A
- **Medium Gray**: #2A2A2A

### Typography
- **Headlines**: Space Grotesk (Bold)
- **Body Text**: Inter (Light/Regular)
- **UI Elements**: Poppins

### Spacing
- Consistent 8-point spacing system
- Border radius: 16-24px for cards
- Glassmorphism effects with backdrop blur

## 🔗 Navigation

### Public Routes
- **/** - Landing page
- **/login** - Login/Signup page

### Student Routes (Requires Authentication)
- **/dashboard** - Main user dashboard
- **/team-matching** - Tinder-style team matching interface
- **/chat** - Team communication
- **/profile** - User profile and skills
- **/community** - Community discussions
- **/clubs-events** - Events and clubs
- **/peer-evaluation** - Peer review system
- **/projects** - Project management

### Admin Routes (Admin Only)
- **/admin** - Admin dashboard with user management and analytics

## 🎭 Animations

- Smooth page transitions with Framer Motion
- Hover effects on interactive elements
- Loading animations and micro-interactions
- Scroll-triggered animations
- Typing indicators in chat

## 📱 Responsive Design

- **Mobile**: Stacked layout with bottom navigation
- **Tablet**: Optimized grid layouts
- **Desktop**: Full sidebar navigation with multi-column layouts

## 👥 User Roles & Permissions

### Student Role
- ✅ Create account and login
- ✅ Find and match with teammates
- ✅ Join events and hackathons
- ✅ Chat with team members
- ✅ Manage personal profile
- ✅ View community discussions
- ❌ Cannot access admin dashboard
- ❌ Cannot manage other users

### Admin Role
- ✅ All student permissions
- ✅ Access admin dashboard
- ✅ View all users and analytics
- ✅ Delete users
- ✅ Change user roles (student ↔ admin)
- ✅ View platform statistics
- ✅ Monitor user activity

## 🔐 Authentication Flow

1. **Signup**: User creates account with name, email, password, and student ID
2. **Login**: User logs in with email and password
3. **JWT Token**: Server generates JWT token with user ID and role
4. **Storage**: Token and user data stored in localStorage
5. **Protected Routes**: Frontend checks token before accessing protected pages
6. **Role Check**: Admin routes verify user role before granting access
7. **Logout**: Clears token and user data from localStorage

## 📡 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - Login user

### User Management
- `GET /api/profile/me` - Get current user profile (For Dashboard)
- `GET /api/profile/:id` - Get user profile (Protected)
- `GET /api/users` - Get all users
- `PUT /api/profile/:id` - Update user profile

### Admin Only
- `GET /api/admin/users` - Get all users with filters (Admin)
- `GET /api/admin/users/:id` - Get specific user (Admin)
- `DELETE /api/admin/users/:id` - Delete user (Admin)
- `PATCH /api/admin/users/:id/role` - Update user role (Admin)
- `GET /api/admin/analytics` - Get platform analytics (Admin)

### Events (NEW)
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get single event
- `POST /api/events` - Create event (Admin)
- `PUT /api/events/:id` - Update event (Admin)
- `POST /api/events/:id/register` - Register for event
- `DELETE /api/events/:id/register` - Unregister from event

### Permission Requests (NEW)
- `POST /api/permissions` - Create permission request
- `GET /api/permissions/my-requests` - Get own requests
- `GET /api/permissions` - Get all requests (Admin)
- `PATCH /api/permissions/:id` - Approve/reject request (Admin)
- `DELETE /api/permissions/:id` - Delete request (Admin)

### Student Profiles (NEW)
- `GET /api/profiles/me` - Get own profile
- `PUT /api/profiles/me` - Update own profile
- `GET /api/profiles/:userId` - Get user profile
- `GET /api/profiles/search/filter` - Search profiles

### Real-time Queries (NEW)
- `POST /api/queries` - Create query (Student)
- `GET /api/queries/my-queries` - Get own queries (Student)
- `GET /api/queries` - Get all queries (Admin)
- `PATCH /api/queries/:id` - Update query status (Admin)
- `DELETE /api/queries/:id` - Delete query (Admin)

## 🗂️ Project Structure

```
Minorproject(teamsync)/
├── server/                    # Backend
│   ├── models/
│   │   ├── User.js           # User schema with role field
│   │   ├── Event.js          # Event schema (NEW)
│   │   ├── StudentProfile.js # Student profile schema (NEW)
│   │   └── PermissionRequest.js # Permission request schema (NEW)
│   ├── routes/
│   │   ├── authRoutes.js     # Authentication endpoints
│   │   ├── userRoutes.js     # User management endpoints
│   │   ├── adminRoutes.js    # Admin-only endpoints
│   │   ├── eventRoutes.js    # Event management (NEW)
│   │   ├── permissionRoutes.js # Permission requests (NEW)
│   │   └── profileRoutes.js  # Student profiles (NEW)
│   ├── middleware/
│   │   └── auth.js           # JWT auth & admin check middleware
│   ├── .env                  # Environment variables
│   ├── server.js             # Express server setup
│   ├── seedAdmin.js          # Admin user seed script
│   ├── API_DOCS.md           # API documentation
│   ├── API_ENDPOINTS.md      # New endpoints documentation (NEW)
│   └── package.json
├── src/
│   ├── pages/
│   │   ├── LoginPage.jsx     # Login/Signup with API integration
│   │   ├── Dashboard.jsx     # Student dashboard
│   │   ├── AdminDashboard.jsx # Admin dashboard with user management
│   │   ├── TeamMatching.jsx
│   │   ├── ChatInterface.jsx
│   │   ├── ProfilePage.jsx
│   │   └── ...
│   ├── config/
│   │   └── api.js            # API configuration & helpers
│   ├── App.jsx
│   └── main.jsx
├── README.md
└── package.json
```

## 🚀 Quick Start Guide

### For Development

```bash
# Terminal 1 - Backend
cd server
npm install
npm run seed:admin
npm run seed:student
npm run dev

# Terminal 2 - Frontend
npm install
npm run dev
```

### Default Admin Credentials
- **Email**: admin@mitaoe.ac.in
- **Password**: Admin@123
- **Role**: admin

### Default Student Credentials
- **Email**: student@mitaoe.ac.in
- **Password**: Student@123
- **Name**: Harsh Khatri
- **Role**: student

### Testing the Application

1. **Create Student Account**
   - Go to http://localhost:5173/login
   - Click "Sign Up"
   - Fill in details (role defaults to "student")
   - Login and access student dashboard

2. **Login as Admin**
   - Use default admin credentials
   - Access admin dashboard at `/admin`
   - View analytics and manage users

3. **Admin Features**
   - Click "Manage Users" in sidebar
   - View all registered users
   - Click shield icon to toggle user role
   - Click trash icon to delete user
   - View real-time analytics

## 🔧 Configuration

### Backend Configuration (`server/.env`)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/teamsync
JWT_SECRET=your_jwt_secret_key_here_change_in_production
```

### Frontend API Configuration (`src/config/api.js`)
```javascript
export const API_URL = 'http://localhost:5000/api'
```

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check MongoDB URI in `.env` file
- For MongoDB Atlas, use connection string with credentials

### CORS Error
- Backend already configured with CORS
- Ensure backend is running on port 5000
- Check API_URL in `src/config/api.js`

### Authentication Error
- Clear localStorage: `localStorage.clear()`
- Re-login with valid credentials
- Check JWT_SECRET in backend `.env`

### Admin Access Denied
- Ensure user role is "admin"
- Use seed script to create admin: `npm run seed:admin`
- Check token in localStorage contains role

## 📝 Recent Changes

### Backend Changes (v2.1.0)
- ✅ Added `role` field to User model (student/admin)
- ✅ Updated authentication to include role in JWT token
- ✅ Created admin-only routes with role-based middleware
- ✅ Added user management endpoints (CRUD operations)
- ✅ Implemented analytics endpoint for admin dashboard
- ✅ Created seed script for initial admin user
- ✅ **NEW: Event model with full CRUD operations**
- ✅ **NEW: StudentProfile model for extended user data**
- ✅ **NEW: PermissionRequest model for access control**
- ✅ **NEW: Query model for real-time student queries**
- ✅ **NEW: 20 API endpoints for events, profiles, permissions, and queries**
- ✅ **NEW: Socket.IO integration for real-time updates**
- ✅ **NEW: Real-time query system (student → admin)**
- ✅ **NEW: Default student account for testing**
- ✅ **NEW: Event registration and management system**
- ✅ **NEW: Permission request workflow for students**
- ✅ **NEW: Advanced profile search and filtering**

### Frontend Changes
- ✅ Connected LoginPage to backend API
- ✅ Implemented real authentication with JWT
- ✅ Added role-based routing (admin vs student)
- ✅ Updated AdminDashboard with real data from API
- ✅ Added user management table with delete/role toggle
- ✅ Implemented protected routes with auth checks
- ✅ Added logout functionality
- ✅ Created API configuration file

## 🔮 Future Enhancements

- **AI-Powered Matching**: Smart algorithm for optimal team composition
- **Event Calendar Integration**: Sync with MITAOE event schedules
- **Project Portfolio**: Showcase completed team projects
- **Skill Assessment**: Automated skill verification system
- **Real-time Notifications**: Live updates for team matches and events
- **Video Integration**: Team introduction videos and project demos

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For issues or questions:
- Check API documentation: `server/API_DOCS.md`
- Review troubleshooting section above
- Contact development team

---

**Built with ❤️ for MITAOE students by the TeamSync development team**

**Version**: 2.2.0 (With Real-time Query System)

### What's New in v2.2.0
- 🚀 Real-time Query System with Socket.IO
- 💬 Student-to-Admin instant messaging
- 🔔 Real-time notifications for queries and responses
- 👥 Default student account for testing
- ⚡ WebSocket integration for live updates

### What's in v2.1.0
- 🎯 Event Management System (6 endpoints)
- 🔐 Permission Request Workflow (5 endpoints)
- 👤 Enhanced Student Profiles (4 endpoints)
- 📊 20 Total API Endpoints
- 🗄️ 4 Database Models
- 📚 Comprehensive API Documentation

**See:** `server/REALTIME_QUERIES.md` for real-time features