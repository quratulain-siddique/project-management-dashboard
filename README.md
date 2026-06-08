# Task Manager Dashboard

A modern Project & Task Management Dashboard built with Next.js, TypeScript, Tailwind CSS, Axios, Recharts, and JSON Server.

The application enables teams to manage projects, tasks, and users through a clean and responsive interface featuring analytics, Kanban boards, role management, filtering, and task tracking.

---

## Features

### Authentication

* User Registration
* User Login
* Forgot Password
* Form Validation
* Error Handling
* Local Storage Session Management
* Protected Routes

---

## Dashboard

* Welcome Dashboard
* Total Projects Counter
* Total Tasks Counter
* Completed Tasks Counter
* Pending Tasks Counter
* Analytics Charts using Recharts
* Recent Projects Section
* Recent Tasks Section
* Clickable Project & Task Records

---

## Project Management

### Supported Actions

* Create Project
* Edit Project
* Delete Project
* View Project Details

### Project Information

* Name
* Description
* Status
* Created Date

### Project Details

* Kanban Task Board
* Drag & Drop Task Management
* Task Statistics
* Linked Task Navigation

---

## Task Management

### Supported Actions

* Create Task
* Edit Task
* Delete Task
* View Task Details
* Assign Task to Users
* Drag & Drop Between Status Columns

### Task Information

* Title
* Description
* Priority
* Due Date
* Assigned User
* Status
* Related Project

### Task Status Workflow

Backlog → In Development → In Review → Shipped

### Task Filters

* Filter by Assigned User
* Filter by Due Date
* Sort Alphabetically (A-Z)
* Reset Filters

### Overdue Task Detection

Tasks with expired due dates are automatically highlighted:

* Red Border
* Visual Warning Indicator

---

## User Management

### Supported Actions

* View Users
* View User Details
* Edit Users
* Create Users (Admin Only)

### User Information

* Name
* Email
* Role

### Available Roles

* Admin
* Manager
* Developer
* QA
* Viewer
* Not Assigned

### Role Permissions

#### Admin

* Create Users
* Edit Users
* View Users
* Manage Projects
* Manage Tasks

#### Other Roles

* View and manage assigned resources according to application rules

---

## UI & UX Features

* Fully Responsive Layout
* Modern Dashboard Design
* Collapsible Sidebar
* Sticky Navigation
* Toast Notifications
* Color-Coded Status Badges
* Priority Indicators
* Hover Effects
* Interactive Tables
* Custom Cursor Effects
* Clean Modal Forms

---

## Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### State Management

* React Hooks
* Local Storage

### API Communication

* Axios

### Charts

* Recharts

### Forms & Validation

* React Hook Form
* Zod
* Hook Form Resolvers

### Notifications

* React Toastify

### Drag & Drop

* @hello-pangea/dnd

### Mock Backend

* JSON Server

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Install dependencies:

```bash
npm install
```

---

## Environment Configuration

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Update your Axios instance:

```ts
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
```

---

## Running Locally

### Start JSON Server

```bash
npm run api
```

### Start Next.js

```bash
npm run dev
```

Frontend:

```text
http://localhost:3000
```

Backend:

```text
http://localhost:5000
```

---

## Deployment

### Frontend

Deploy using:

* Render
* Netlify
* Vercel

### Backend

Deploy JSON Server separately on:

* Render Web Service
* Railway
* Cyclic

Example Environment Variable for Production:

```env
NEXT_PUBLIC_API_URL=https://your-api-url.onrender.com
```

---

## Authentication Flow

1. User registers.
2. User information is stored in JSON Server.
3. Session information is stored in Local Storage.
4. Protected routes verify authentication.
5. Logout clears session data.

---

## Additional Features

### Automatic Project Cleanup

Deleting a project automatically removes all associated tasks.

### User Assignment

Tasks can be assigned directly through dropdown user selection.

### Task Navigation

Tasks and Projects are interconnected through clickable navigation links.

### User Task Tracking

User detail pages display all assigned tasks.

---

## Future Improvements

* JWT Authentication
* Role-Based Route Protection
* Dark Mode
* Redux Toolkit
* Unit Testing
* Docker Support
* PostgreSQL / MongoDB Backend
* File Attachments
* Team Collaboration Features
* Activity Logs
* Notifications System
* Advanced Reporting

---

## Author

Developed as a Project Management Dashboard assessment project using Next.js, TypeScript, Tailwind CSS, Axios, Recharts, and JSON Server.
