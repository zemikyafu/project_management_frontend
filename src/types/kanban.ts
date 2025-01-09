export interface User {
    id: string;
    name: string;
  }
  
  export interface Project {
    id: string;
    name: string;
  }
  
  export interface Task {
    id: string;
    content: string;
    assignedTo?: string; // User ID
    projectId: string;
  }
  
  export interface Column {
    id: string;
    title: string;
    tasks: Task[];
  }
  
  export interface KanbanData {
    columns: {
      [key: string]: Column;
    };
    columnOrder: string[];
    users: User[];
    projects: Project[];
    currentProject: string;
  }
  
  