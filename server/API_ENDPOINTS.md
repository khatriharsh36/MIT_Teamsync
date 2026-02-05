# TeamSync API Documentation - Events & Permissions

## Overview
This document covers the new API endpoints for Event Management, Permission Requests, and Student Profiles.

**Base URL**: `http://localhost:5000/api`

---

## 🎯 Event Management API

### 1. Get All Events
**GET** `/events`

**Query Parameters:**
- `type` (optional): Filter by event type (hackathon, competition, workshop, seminar)
- `status` (optional): Filter by status (upcoming, ongoing, completed, cancelled)

**Response:**
```json
[
  {
    "_id": "event_id",
    "title": "Tech Hackathon 2024",
    "description": "48-hour coding challenge",
    "type": "hackathon",
    "startDate": "2024-03-15T09:00:00Z",
    "endDate": "2024-03-17T18:00:00Z",
    "location": "MITAOE Campus",
    "maxParticipants": 100,
    "registeredUsers": ["user_id1", "user_id2"],
    "organizer": { "_id": "admin_id", "name": "Admin", "email": "admin@mitaoe.ac.in" },
    "status": "upcoming",
    "tags": ["coding", "AI", "ML"]
  }
]
```

### 2. Get Single Event
**GET** `/events/:id`

**Response:** Single event object with populated organizer and registered users

### 3. Create Event (Admin Only)
**POST** `/events`

**Headers:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "title": "Tech Hackathon 2024",
  "description": "48-hour coding challenge",
  "type": "hackathon",
  "startDate": "2024-03-15T09:00:00Z",
  "endDate": "2024-03-17T18:00:00Z",
  "location": "MITAOE Campus",
  "maxParticipants": 100,
  "tags": ["coding", "AI"],
  "imageUrl": "https://example.com/image.jpg"
}
```

### 4. Update Event (Admin Only)
**PUT** `/events/:id`

**Headers:** `Authorization: Bearer <token>`

**Body:** Same as create (partial updates allowed)

### 5. Register for Event
**POST** `/events/:id/register`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "message": "Registered successfully",
  "event": { /* event object */ }
}
```

### 6. Unregister from Event
**DELETE** `/events/:id/register`

**Headers:** `Authorization: Bearer <token>`

---

## 🔐 Permission Request API

### 7. Create Permission Request
**POST** `/permissions`

**Headers:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "requestType": "event-creation",
  "reason": "I want to organize a workshop on Web Development",
  "metadata": {
    "eventTitle": "Web Dev Workshop",
    "expectedParticipants": 50
  }
}
```

**Request Types:**
- `event-creation`: Request to create events
- `role-upgrade`: Request admin privileges
- `feature-access`: Request special feature access
- `data-export`: Request data export

### 8. Get My Requests
**GET** `/permissions/my-requests`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
[
  {
    "_id": "request_id",
    "requesterId": "user_id",
    "requestType": "event-creation",
    "reason": "I want to organize a workshop",
    "status": "pending",
    "createdAt": "2024-01-15T10:00:00Z",
    "reviewedBy": null,
    "adminNotes": null
  }
]
```

### 9. Get All Requests (Admin Only)
**GET** `/permissions`

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `status` (optional): Filter by status (pending, approved, rejected)

### 10. Approve/Reject Request (Admin Only)
**PATCH** `/permissions/:id`

**Headers:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "status": "approved",
  "adminNotes": "Approved for organizing workshop"
}
```

### 11. Delete Request (Admin Only)
**DELETE** `/permissions/:id`

**Headers:** `Authorization: Bearer <token>`

---

## 👤 Student Profile API

### 12. Get My Profile
**GET** `/profiles/me`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "_id": "profile_id",
  "userId": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@mitaoe.ac.in"
  },
  "achievements": [
    {
      "title": "Winner - Hackathon 2023",
      "description": "First place in coding competition",
      "date": "2023-12-01T00:00:00Z"
    }
  ],
  "projects": [
    {
      "name": "E-commerce Platform",
      "description": "Full-stack web application",
      "techStack": ["React", "Node.js", "MongoDB"],
      "link": "https://github.com/user/project",
      "startDate": "2023-09-01T00:00:00Z",
      "endDate": "2023-12-01T00:00:00Z"
    }
  ],
  "certifications": [],
  "interests": ["Web Development", "AI", "Cloud Computing"],
  "availability": "available",
  "teamPreferences": {
    "preferredTeamSize": 4,
    "preferredRoles": ["Frontend Developer", "Full Stack"],
    "lookingForTeam": true
  },
  "stats": {
    "eventsAttended": 5,
    "projectsCompleted": 3,
    "teamsJoined": 2
  }
}
```

### 13. Update My Profile
**PUT** `/profiles/me`

**Headers:** `Authorization: Bearer <token>`

**Body:** Same structure as response (partial updates allowed)

### 14. Get Profile by User ID
**GET** `/profiles/:userId`

**Response:** Profile object for specified user

### 15. Search Profiles
**GET** `/profiles/search/filter`

**Query Parameters:**
- `skills` (optional): Comma-separated skills (e.g., "React,Node.js")
- `interests` (optional): Comma-separated interests
- `availability` (optional): available, busy, not-available

**Example:** `/profiles/search/filter?skills=React,Node.js&availability=available`

---

## 📊 Summary

**Total Endpoints Created: 15**

### Events (6 endpoints)
1. GET /events - Get all events
2. GET /events/:id - Get single event
3. POST /events - Create event (admin)
4. PUT /events/:id - Update event (admin)
5. POST /events/:id/register - Register for event
6. DELETE /events/:id/register - Unregister from event

### Permissions (5 endpoints)
7. POST /permissions - Create request
8. GET /permissions/my-requests - Get own requests
9. GET /permissions - Get all requests (admin)
10. PATCH /permissions/:id - Approve/reject (admin)
11. DELETE /permissions/:id - Delete request (admin)

### Profiles (4 endpoints)
12. GET /profiles/me - Get own profile
13. PUT /profiles/me - Update own profile
14. GET /profiles/:userId - Get user profile
15. GET /profiles/search/filter - Search profiles

---

## 🔒 Authentication

All protected endpoints require JWT token in Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

Admin-only endpoints also verify user role is "admin".

## ⚠️ Error Responses

```json
{
  "message": "Error description"
}
```

**Common Status Codes:**
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden (admin only)
- 404: Not Found
- 500: Server Error
