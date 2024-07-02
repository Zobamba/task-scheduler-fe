import { Task } from '../models/Task';
import { scheduleTaskExecution } from './TaskScheduler';

export const scheduleAllTasks = (tasks: Task[], onExecution: (task: Task) => void) => {
  tasks.forEach((task) => {
    scheduleTaskExecution(task, onExecution);
  });
};
