# Project Management Platform

A multi-tenant project management platform designed for seamless collaboration and efficient task management. Built with **React**, **TypeScript**, **TailwindCSS**, **Axios**, **TanStack Query** for state management, and **Zod** for schema validation, the platform offers a clean and robust user experience.

## Features

### Multi-Tenant Architecture
- **Company-Based Structure**: Each company acts as a tenant, hosting its own set of users, workspaces, and data.
- **Role-Based Access Control**: Custom roles and permissions for users in a company.

### Workspace Management
- **Invite Users**: Send email invitations to users with a specific role to join a workspace.
- **Onboarding**: Users can accept invitations and onboard via a guided onboarding page.
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

### Role Management
- **Custom Roles**: Admins can create roles and assign specific permissions to each role.

---

## Tech Stack

### Frontend
- **React**: For building a dynamic and interactive user interface.
- **TypeScript**: Ensures type safety and robustness in the codebase.
- **TailwindCSS**: Enables quick and responsive UI development.
- **Axios**: Handles API requests efficiently.
- **TanStack Query**: Manages server state with powerful caching and synchronization features.
- **Zod**: Validates and ensures data consistency through schema-based validation.

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- API backend for the application

