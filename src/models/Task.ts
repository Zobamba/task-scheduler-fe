export interface Task {
  id: string;
  name: string;
  type: 'one-time' | 'recurring';
  schedule: string;
  executedAt?: Date;
}