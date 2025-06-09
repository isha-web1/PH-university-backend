# PH University Backend

PH University Backend is a robust, modular, and scalable RESTful API server designed for managing university operations. It serves as the backend for a university management system, providing features such as user authentication, role-based access, course and faculty management, student enrollment, grading, and more. The project follows a clean architecture with separation of concerns for maintainability and extensibility.

## Requirement Analysis :  https://docs.google.com/document/d/10mkjS8boCQzW4xpsESyzwCCLJcM3hvLghyD_TeXPBx0/edit?tab=t.0


## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Project](#running-the-project)
- [API Overview](#api-overview)
- [Modules Description](#modules-description)
- [Error Handling](#error-handling)
- [Utilities](#utilities)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **User Authentication & Authorization**
  - Secure JWT-based authentication.
  - Role-based access control for Admin, Faculty, and Student.
- **User Management**
  - Admin, Faculty, and Student profile CRUD operations.
- **Course Management**
  - Create, update, delete, and enroll in courses.
- **Faculty & Department Management**
  - Assign faculty to departments and courses.
- **Student Enrollment & Results**
  - Enroll students into courses.
  - Record and manage students' grades.
- **Robust Error Handling**
  - Standardized error responses and logging.
- **Middleware**
  - Request validation, authentication, error handling, and logging.
- **Modular Architecture**
  - Easy to extend with new modules or features.
- **Configuration Management**
  - Centralized configuration for environment variables, DB connections, etc.

---

## Project Structure

```
src/
├── app.ts                 # Main Express app initialization
├── server.ts              # Server bootstrap
└── app/
    ├── DB/                # Database models, connection, and ORM configs
    ├── Modules/           # Feature modules (users, courses, enrollment, etc.)
    ├── builder/           # Factories/builders for complex objects
    ├── config/            # Application and environment configurations
    ├── errors/            # Custom error classes and handlers
    ├── interface/         # TypeScript interfaces and types
    ├── middleware/        # Express middlewares (auth, error, validation, etc.)
    ├── routes/            # Route definitions for all modules
    └── utils/             # Utility functions and helpers
```

---

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/isha-web1/PH-university-backend.git
   cd PH-university-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

---

## Environment Setup

- Copy `.env.example` (if available) to `.env` and set required variables (DB credentials, JWT secret, etc.).
- Default config files are in `src/app/config/`.

---

## Running the Project

- **Development:**
  ```bash
  npm run dev
  ```
- **Production:**
  ```bash
  npm run build
  npm start
  ```

- Server starts on the port specified in your config or `.env` file.

---

## API Overview

The backend exposes a RESTful API. Major endpoints typically include:

- `/api/auth` – login, register, refresh token
- `/api/users` – manage users (admin/faculty/student)
- `/api/courses` – create, read, update, delete courses
- `/api/departments` – department management
- `/api/enrollments` – enroll students, manage enrollments
- `/api/results` – grade and result management

All requests and responses use JSON.

---

## Modules Description

The heart of the backend lies in the **Modules** folder, where each domain feature is separated for maintainability.

### Example Modules (in `src/app/Modules/`):

- **Auth Module:** Handles user registration, login, JWT issuance, and refresh.
- **User Module:** CRUD for users, role management (admin, faculty, student).
- **Course Module:** CRUD for courses, course assignment to faculty and students.
- **Department Module:** CRUD for departments, assigning faculty.
- **Enrollment Module:** Student enrollment logic.
- **Result Module:** Recording and querying student grades and results.
- *(Add more modules as your university expands!)*

---

## Error Handling

- All errors are standardized via custom error classes in `src/app/errors/`.
- Middleware in `src/app/middleware/` ensures proper error response formatting.

---

## Utilities

- Utility functions in `src/app/utils/` support common operations like data formatting, token generation, validation, etc.

---

## Deployment

- Ready for deployment on platforms like **Vercel**, **Heroku**, **AWS**, etc.
- Includes `vercel.json` for easy Vercel deployment.

---

## Contributing

1. Fork the repo and create your branch: `git checkout -b feature/your-feature`
2. Commit your changes: `git commit -am 'Add new feature'`
3. Push to the branch: `git push origin feature/your-feature`
4. Open a Pull Request

---



---

**Happy coding!**
