# Task Manager Dashboard

A modern Project and Task Management Dashboard built with Next.js, TypeScript, Tailwind CSS, Axios, and JSON Server.

The application allows users to manage projects, tasks, and team members through an intuitive dashboard interface. It includes authentication screens, analytics, project tracking, task boards, drag-and-drop functionality, and user management.

---

## Features

### Authentication

* User Registration
* User Login
* Forgot Password
* Form Validation
* Error Handling
* Local Storage Token Management
* Protected Routes

### Dashboard

* Total Projects
* Total Tasks
* Completed Tasks
* Pending Tasks
* Analytics Charts using Recharts
* Recent Projects
* Recent Tasks

### Project Management

* Create Project
* Edit Project
* Delete Project
* View Project Details

Project Fields:

* Project Name
* Description
* Status
* Created Date

### Task Management

* Create Task
* Edit Task
* Delete Task
* Assign Task to User
* Drag & Drop Task Board (Kanban Style)
* Task Status Management

Task Fields:

* Title
* Description
* Priority
* Due Date
* Assigned User
* Status
* Project ID

### User Management

* View All Users
* View User Details
* User Task Assignment

### UI Features

* Responsive Design
* Collapsible Sidebar
* Sticky Navigation Bar
* Modern Dashboard Layout
* Toast Notifications
* Colorful Theme
* Overdue Task Highlighting

---

## Tech Stack

### Frontend

* Next.js 16
* React 19
* TypeScript
* Tailwind CSS

### State Management

* React Hooks
* Local Storage

### API Handling

* Axios

### Charts

* Recharts

### Forms & Validation

* React Hook Form
* Zod
* Hook Form Resolvers

### Notifications

* React Toastify

### Drag and Drop

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

## Running the Application

Start JSON Server:

```bash
npx json-server mock-api/db.json --port 5000
```

Start the Next.js application:

```bash
npm run dev
```

Application URL:

```text
http://localhost:3000
```

Mock API URL:

```text
http://localhost:5000
```

---

## Environment Configuration

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## Authentication Flow

1. User creates an account.
2. User information is stored in JSON Server.
3. Token is stored in Local Storage.
4. Protected routes verify token availability.
5. Logout clears stored session data.

---

## Task Board Workflow

Tasks move through the following stages:

```text
Backlog
    ↓
In Development
    ↓
In Review
    ↓
Shipped
```

Tasks can be dragged and dropped between columns to update their status.

---

## Additional Features

### Automatic Project Cleanup

When a project is deleted:

* Associated tasks are automatically deleted.

### Overdue Task Detection

Tasks with due dates older than the current date:

* Display a red border
* Highlight the due date

### User Assignment

Tasks can be assigned directly from a dropdown containing available users.

---

## Future Improvements

* Redux Toolkit Integration
* Dark Mode
* Role-Based Access Control
* Unit Testing
* Docker Support
* API Authentication
* Real Backend Integration
* Advanced Analytics
* File Attachments
* Team Collaboration Features

---

## Author

Developed as a Project & Task Management Dashboard assessment project using Next.js, TypeScript, Tailwind CSS, Axios, and JSON Server.
