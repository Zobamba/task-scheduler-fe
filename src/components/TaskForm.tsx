import React, { useState } from 'react';
import { Task } from '../models/Task';
import './TaskForm.scss';

interface TaskFormProps {
  onAddTask: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState<'one-time' | 'recurring'>('one-time');
  const [schedule, setSchedule] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: Task = {
      id: Date.now().toString(),
      name,
      type,
      schedule,
    };
    onAddTask(newTask);
    setName('');
    setSchedule('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        className="task-input"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Task Name"
        required
      />
      <select
        className="task-select"
        value={type}
        onChange={(e) => setType(e.target.value as 'one-time' | 'recurring')}
      >
        <option value="one-time">One-time</option>
        <option value="recurring">Recurring</option>
      </select>
      <input
        className="task-input"
        type="text"
        value={schedule}
        onChange={(e) => setSchedule(e.target.value)}
        placeholder={type === 'one-time' ? 'YYYY-MM-DDTHH:mm:ss' : 'Cron Expression'}
        required
      />
      <button className="task-button" type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
