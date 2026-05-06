export type Priority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  columnId: string;

  assignee?: {
    id: string;
    name: string;
    avatar?: string;
  };

  dueDate?: string;
  createdAt: string;
}

export interface Column {
  id: string;
  title: string;
  color: string;
  taskIds: string[];
}