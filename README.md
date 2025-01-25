# Project Management Platform

A multi-tenant project management frontend application built with **React**.

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Features](#features)
   - [Multi-Tenant Architecture](#multi-tenant-architecture)
   - [Workspace Management](#workspace-management)
   - [Project Management](#project-management)
   - [Task Management](#task-management)
   - [User Management](#user-management)
   - [Role Management](#role-management)
3. [Project Structure](#project-structure)
4. [Getting Started](#getting-started)
5. [Testing](#testing)

## Tech Stack

### Frontend

- **React, Typescript, TailwindCSS, Shadcn**: UI.
- **Axios**: Handles API requests efficiently.
- **TanStack Query**: Fetching, caching, Mutation, and updating server state.
- **Zod**: Validates and ensures data consistency through schema-based validation.

## Features

### Multi-Tenant Architecture

- **Company-Based Structure**: Each company acts as a tenant, hosting its own set of users, workspaces, and data.
- **Role-Based Access Control**: Custom roles and permissions for users in a company.

### Workspace Management

- **Manage Workspaces**: Create and manage workspaces under a company.

### Project Management

- **Create and Manage Projects**: Add new projects and manage existing ones.
- **Task Management**: Each project includes a list of tasks that can be assigned to users.

### Task Management

- **Create and Assign Tasks**: Users can create tasks and assign them to other users.
- **Email Notifications**: Task assignment triggers an email notification to the assigned user.
- **Kanban Board**: Organize tasks using a Kanban board with statuses like `To-Do`, `In Progress`, `Review`, and `Complete`.

### User Management

- **User Dashboard**: View and manage all users in the company.
- **Block/Activate Users**: Admins can block or activate user accounts as needed.
- **Invite Users**: Send email invitations to users with a specific role to join a workspace.
- **Onboarding**: Users can accept invitations and onboard via a guided onboarding page.

### Role Management

- **Custom Roles**: Admins can create roles and assign specific permissions to each role.

---

## Project Structure

The project structure is as follows:

```
├── cypress               # Cypress e2e testing framework
├── src                   # Main source code
│   ├── api               # API-related code
│   ├── components        # Reusable UI components
│   ├── features          # tanstack query hooks
│   ├── lib               # Utility libraries
│   ├── pages             # Application pages
│   ├── schemas           # Zod schemas for validation
│   ├── types             # Typescript types
│   ├── App.tsx           # Main app component
│   ├── index.tsx         # Entry point
│   ├── main.tsx          # Application bootstrap

```

## Getting Started

### Setup

1. Clone the repository:
   ```
   git clone https://github.com/zemikyafu/project-management-frontend.git
   ```
2. Navigate to the project directory:
   ```
   cd project-management-frontend
   ```
3. Install dependencies:
   ```
   yarn install
   ```
4. Start the development server:
   ```
   yarn dev
   ```
5. Open the application in your browser:
   ```
   http://localhost:3000
   ```

## Testing

The application uses **Cypress** for end-to-end testing. Below are some of the test cases:

1. **Login Tests**:
   - Verifies successful login with valid credentials.
   - Validates error messages for incorrect login attempts.
2. **Registration Tests**:
   - Ensures user registration works as expected.
   - Validates error messages for invalid registration .

### Running Cypress Tests

To run Cypress tests, use the following commands:
Open Cypress UI and run all tests

```
yarn cypress open

yarn cypress run
```
