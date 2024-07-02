import React, { useState } from 'react';
import { Task } from '../models/Task';
import './EditTaskForm.scss';

interface EditTaskFormProps {
  task: Task;
  onUpdateTask: (updatedTask: Task) => void;
  onCancel: () => void;
}

const EditTaskForm: React.FC<EditTaskFormProps> = ({ task, onUpdateTask, onCancel }) => {
  const [schedule, setSchedule] = useState(task.schedule);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateTask({ ...task, schedule });
  };

  return (
    <form className="edit-task-form" onSubmit={handleSubmit}>
      <input
        className="task-input"
        type="text"
        value={schedule}
        onChange={(e) => setSchedule(e.target.value)}
        placeholder={task.type === 'one-time' ? 'YYYY-MM-DDTHH:mm:ss' : 'Cron Expression'}
        required
      />
      <div className="button-group">
        <button className="task-button update" type="submit">Update Schedule</button>
        <button className="task-button cancel" type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default EditTaskForm;
