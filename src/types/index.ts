export interface Workspace {
  id: string
  name: string
  description: string
  companyId: string
}
export interface Role {
  id: string
  name: string
}
export interface Company {
  id: string
  name: string
  address: string
}
export enum ProjectStatus {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  ON_HOLD = "ON_HOLD"
}

export interface Project {
  id: string
  name: string
  description: string
  status: ProjectStatus
  workspaceId: string
  startDate: string
  endDate: string
}

export enum TaskPriority {
  CRITICAL = "CRITICAL",
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
  OPTIONAL = "OPTIONAL"
}

export enum TaskStatus {
  BACKLOG = "BACKLOG",
  IN_PROGRESS = "IN_PROGRESS",
  IN_REVIEW = "IN_REVIEW",
  COMPLETED = "COMPLETED"
}
const PriorityColors: Record<string, string> = {
  high: "text-red-600",
  medium: "text-yellow-600",
  low: "text-green-600",
  default: "text-gray-600"
}
export interface Task {
  id: string
  title: string
  content: string
  priority: TaskPriority
  status: TaskStatus
  projectId: string
  assigneeId: string
  deadlineAt?: string
}
export interface Assignee {
  id: string
  name: string
}

export interface Column {
  id: string
  title: string
  tasks?: Task[]
}

export interface KanbanData {
  columns: {
    [key: string]: Column
  }
  columnOrder: string[]
  users: Assignee[]
  projects: Project[]
  currentProjectId: string | null
}

export interface User {
  userId: string
  name: string
  email: string
  status: string
}

export interface Invitation {
  id: string
  email: string
  workspaceId: string
  workspaceName: string
  roleId: string
  roleName: string
  accepted: boolean
}
