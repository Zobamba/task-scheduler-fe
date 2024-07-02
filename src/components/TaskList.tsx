import React from 'react';
import { Task } from '../models/Task';
import './TaskList.scss';

interface TaskListProps {
  tasks: Task[];
  onDeleteTask: (id: string) => void;
  onEditTask: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDeleteTask, onEditTask }) => {
  return (
    <div className="task-list">
      <h2>Task List</h2>
      <ul>
      <li className="task-header">
            <span className="task-name">Name</span>
            <span className="task-schedule">Schedule</span>
            <span className="task-type">Type</span>
          </li>
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <span className="task-name">{task.name}</span> - 
            <span className="task-schedule">{task.schedule}</span> - 
            <span className="task-type">{task.type}</span>
            <button className="task-button delete" onClick={() => onDeleteTask(task.id)}>Delete</button>
            <button className="task-button edit" onClick={() => onEditTask(task)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
