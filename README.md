# Lab Equipment Booking System

A web-based Lab Equipment Booking System developed for Sona College of Technology to simplify laboratory equipment management and booking.

## Project Overview

The Lab Equipment Booking System enables students to view available laboratory equipment, place booking requests, and manage their bookings. Administrators can manage equipment inventory, approve or reject booking requests, handle equipment returns, and monitor equipment availability through a centralized dashboard.

## Features

### Student Module

- Student Registration
- Student Login
- Forgot Password
- Dashboard
- Equipment Browsing
- Equipment Search and Filter
- Equipment Details
- Equipment Booking
- Current Booking Status
- Booking History
- Student Profile Management

### Admin Module

- Admin Login
- Dashboard with Statistics
- Add Equipment
- Edit Equipment
- Delete Equipment
- Manage Equipment
- Booking Request Management
- Approve / Reject Booking Requests
- Equipment Return Management
- Low Stock Alerts
- Success Notifications
- Delete Confirmation Dialogs

## Technologies Used

### Frontend

- SvelteKit
- Tailwind CSS
- JavaScript

### Backend

- Node.js
- Express.js

### Database

- Firebase Authentication
- Cloud Firestore

## Project Structure

```
src/
 ├── lib/
 │    ├── components/
 │    ├── services/
 │    ├── firebase/
 │    └── utils/
 │
 ├── routes/
 │    ├── (admin)/
 │    ├── (student)/
 │    └── (auth)/
 │
 └── app.html

backend/
```

## Installation

Clone the repository

```bash
git clone https://github.com/NareshVetrivel/Lab-Equipment-Booking-System.git
```

Move into the project directory

```bash
cd Lab-Equipment-Booking-System
```

Install dependencies

```bash
npm install
```

Run the frontend

```bash
npm run dev
```

Run the backend

```bash
cd backend
npm install
npm start
```

## Firebase Configuration

Create a Firebase project and enable:

- Firebase Authentication
- Cloud Firestore

Update the Firebase configuration inside:

```
src/lib/firebase/firebase.js
```

Also configure Firebase Admin SDK inside:

```
backend/firebase-admin.js
```

## Deployment

- GitHub
- Vercel

## Project Status

Completed

## Author

**Naresh Vetrivel**

Master of Computer Applications (MCA)

Sona College of Technology
