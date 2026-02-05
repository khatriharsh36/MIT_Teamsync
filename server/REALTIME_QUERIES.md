# Real-time Query System Documentation

## Overview
Students can post queries that admins see in real-time using Socket.IO. Admins can respond, and students get instant notifications.

## Features
- ✅ Real-time query notifications for admins
- ✅ Real-time response notifications for students
- ✅ Query categorization and priority levels
- ✅ Status tracking (pending, in-progress, resolved, closed)
- ✅ Default student account for testing

## Default Accounts

### Admin Account
- **Email**: `admin@mitaoe.ac.in`
- **Password**: `Admin@123`
- **Role**: admin

### Student Account
- **Email**: `student@mitaoe.ac.in`
- **Password**: `Student@123`
- **Role**: student

## Setup

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Create Default Accounts
```bash
# Create admin account
npm run seed:admin

# Create student account
npm run seed:student
```

### 3. Start Server
```bash
npm run dev
```

## API Endpoints

### Query Management

#### Create Query (Student)
```http
POST /api/queries
Authorization: Bearer <student_token>

Body:
{
  "subject": "Cannot access team matching feature",
  "message": "I'm getting an error when trying to access the team matching page",
  "category": "technical",
  "priority": "high"
}
```

**Categories**: technical, event, account, team, other  
**Priority**: low, medium, high

#### Get My Queries (Student)
```http
GET /api/queries/my-queries
Authorization: Bearer <student_token>
```

#### Get All Queries (Admin)
```http
GET /api/queries?status=pending&category=technical
Authorization: Bearer <admin_token>
```

**Query Params**:
- `status`: pending, in-progress, resolved, closed
- `category`: technical, event, account, team, other
- `priority`: low, medium, high

#### Update Query (Admin)
```http
PATCH /api/queries/:id
Authorization: Bearer <admin_token>

Body:
{
  "status": "resolved",
  "adminResponse": "The issue has been fixed. Please try again."
}
```

#### Delete Query (Admin)
```http
DELETE /api/queries/:id
Authorization: Bearer <admin_token>
```

## Socket.IO Events

### Client-Side Setup

```javascript
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

// Student joins their room
socket.emit('join', userId);

// Admin joins admin room
socket.emit('joinAdmin');
```

### Events

#### For Admin (Listen for new queries)
```javascript
socket.on('newQuery', (query) => {
  console.log('New query received:', query);
  // Show notification
  // Update query list
});
```

#### For Student (Listen for query updates)
```javascript
socket.on('queryUpdated', (query) => {
  console.log('Query updated:', query);
  // Show notification
  // Update query status
});
```

## Frontend Integration Example

### Student - Submit Query
```javascript
const submitQuery = async () => {
  const response = await fetch('http://localhost:5000/api/queries', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      subject: 'Need help with profile',
      message: 'How do I update my skills?',
      category: 'account',
      priority: 'medium'
    })
  });
  const data = await response.json();
  console.log('Query submitted:', data);
};
```

### Admin - Real-time Notifications
```javascript
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const AdminDashboard = () => {
  const [queries, setQueries] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    // Join admin room
    newSocket.emit('joinAdmin');

    // Listen for new queries
    newSocket.on('newQuery', (query) => {
      setQueries(prev => [query, ...prev]);
      // Show toast notification
      showNotification(`New query from ${query.studentId.name}`);
    });

    return () => newSocket.close();
  }, []);

  return (
    <div>
      <h2>Student Queries ({queries.length})</h2>
      {queries.map(query => (
        <QueryCard key={query._id} query={query} />
      ))}
    </div>
  );
};
```

### Student - Real-time Updates
```javascript
useEffect(() => {
  const newSocket = io('http://localhost:5000');
  
  // Join personal room
  newSocket.emit('join', userId);

  // Listen for query updates
  newSocket.on('queryUpdated', (query) => {
    // Update query in list
    setQueries(prev => 
      prev.map(q => q._id === query._id ? query : q)
    );
    // Show notification
    showNotification('Admin responded to your query!');
  });

  return () => newSocket.close();
}, [userId]);
```

## Testing Workflow

### 1. Login as Student
```bash
POST /api/auth/login
Body: {
  "email": "student@mitaoe.ac.in",
  "password": "Student@123"
}
```

### 2. Student Submits Query
```bash
POST /api/queries
Headers: Authorization: Bearer <student_token>
Body: {
  "subject": "Test Query",
  "message": "This is a test query",
  "category": "technical",
  "priority": "high"
}
```

### 3. Admin Sees Query in Real-time
- Admin dashboard automatically shows new query
- No page refresh needed
- Notification appears instantly

### 4. Admin Responds
```bash
PATCH /api/queries/:id
Headers: Authorization: Bearer <admin_token>
Body: {
  "status": "resolved",
  "adminResponse": "Issue resolved!"
}
```

### 5. Student Gets Notification
- Student sees update in real-time
- Status changes automatically
- Admin response appears instantly

## Database Schema

```javascript
{
  studentId: ObjectId (ref: User),
  subject: String,
  message: String,
  category: String (enum),
  status: String (enum),
  priority: String (enum),
  adminResponse: String,
  respondedBy: ObjectId (ref: User),
  respondedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Benefits

1. **Instant Communication**: No polling or page refresh needed
2. **Better UX**: Students get immediate feedback
3. **Admin Efficiency**: See all queries in real-time dashboard
4. **Status Tracking**: Track query lifecycle from pending to resolved
5. **Priority Management**: Handle urgent queries first
6. **Category Filtering**: Organize queries by type

## Next Steps

1. Install socket.io-client in frontend: `npm install socket.io-client`
2. Create QueryForm component for students
3. Create QueryDashboard component for admins
4. Add toast notifications for real-time updates
5. Implement query filtering and search
6. Add email notifications for offline users

## Troubleshooting

### Socket not connecting?
- Check CORS settings in server.js
- Verify frontend URL matches CORS origin
- Ensure server is running on correct port

### Events not firing?
- Check socket.emit() calls
- Verify room joining (join/joinAdmin)
- Check browser console for errors

### Queries not appearing?
- Verify authentication token
- Check user role (student/admin)
- Ensure MongoDB is running
