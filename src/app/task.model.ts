export interface Task {
  id: string;
  content: string;
  status: 'todo' | 'in-progress' | 'done';
}