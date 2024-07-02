import React from 'react';
import { Task } from '../models/Task';
import './ExecutionLog.scss';

interface ExecutionLogProps {
  executedTasks: Task[];
}

const ExecutionLog: React.FC<ExecutionLogProps> = ({ executedTasks }) => {
  return (
    <div className="execution-log">
      <h2>Execution Log</h2>
      <ul>
        {executedTasks.map((task) => (
          <li key={task.id} className="executed-task">
            <strong>{task.name}</strong> - Executed at: {task.executedAt?.toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExecutionLog;
