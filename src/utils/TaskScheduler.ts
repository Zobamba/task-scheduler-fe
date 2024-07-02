import { Task } from '../models/Task';
import cronParser from 'cron-parser';

export const scheduleTaskExecution = (task: Task, onExecution: (task: Task) => void) => {
  const now = new Date();

  if (task.type === 'one-time') {
    const scheduledTime = new Date(task.schedule);

    if (scheduledTime > now) {
      const delay = scheduledTime.getTime() - now.getTime();
      const timeoutId = setTimeout(() => {
        onExecution({ ...task, executedAt: new Date() });
        clearTimeout(timeoutId);
      }, delay);
    }
  } else if (task.type === 'recurring') {
    try {
      const interval = cronParser.parseExpression(task.schedule);

      const scheduleNext = () => {
        const nextExecution = interval.next().toDate();
        const checkInterval = 1000;
        const intervalId = setInterval(() => {
          const currentTime = new Date();
          if (currentTime >= nextExecution) {
            onExecution({ ...task, executedAt: new Date() });
            clearInterval(intervalId);
            scheduleNext();
          }
        }, checkInterval);
      };

      scheduleNext();
    } catch (err) {
      console.error('Error parsing Cron expression:', err);
    }
  }
};
