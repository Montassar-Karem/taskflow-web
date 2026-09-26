export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Task {
  id: number;
  title: string;
  priority: Priority;
  description?: string;
  done: boolean;
}