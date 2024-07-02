import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import ExecutionLog from './components/ExecutionLog';
import EditTaskForm from './components/EditTaskForm';
import { Task } from './models/Task';
import { scheduleAllTasks } from './utils/scheduleAllTasks';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [executedTasks, setExecutedTasks] = useState<Task[]>([]);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const scheduledTasksRef = useRef<Set<string>>(new Set());

  const handleTaskExecution = (executedTask: Task) => {
    setExecutedTasks((prevExecutedTasks) => [...prevExecutedTasks, executedTask]);
  };

  useEffect(() => {
    // Load tasks from localStorage on component mount
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      const parsedTasks = JSON.parse(storedTasks);
      setTasks(parsedTasks);
      parsedTasks.forEach((task: Task) => {
        if (!scheduledTasksRef.current.has(task.id)) {
          scheduleAllTasks([task], handleTaskExecution);
          scheduledTasksRef.current.add(task.id);
        }
      });
    }
  }, []);

  const saveTasksToLocalStorage = (updatedTasks: Task[]) => {
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleAddTask = (newTask: Task) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
    if (!scheduledTasksRef.current.has(newTask.id)) {
      scheduleAllTasks([newTask], handleTaskExecution);
      scheduledTasksRef.current.add(newTask.id);
    }
  };

  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
    scheduledTasksRef.current.delete(updatedTask.id);
    scheduleAllTasks([updatedTask], handleTaskExecution);
    scheduledTasksRef.current.add(updatedTask.id);
    setTaskToEdit(null);
  };

  const handleCancelEdit = () => {
    setTaskToEdit(null);
  };

  const handleDeleteTask = (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
      saveTasksToLocalStorage(updatedTasks);
      scheduledTasksRef.current.delete(id);
    }
  };

  return (
    <div className="App">
      <h1>Task Scheduler</h1>
      {taskToEdit ? (
        <EditTaskForm
          task={taskToEdit}
          onUpdateTask={handleUpdateTask}
          onCancel={handleCancelEdit}
        />
      ) : (
        <TaskForm onAddTask={handleAddTask} />
      )}
      <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} onEditTask={handleEditTask} />
      <ExecutionLog executedTasks={executedTasks} />
    </div>
  );
};

export default App;
