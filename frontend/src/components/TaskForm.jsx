import React, { useState, useEffect } from 'react';
import { getTasks, createTask } from '../api';

export default function TaskForm({ token }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    getTasks(token).then(setTasks);
  }, [token]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    const newTask = await createTask(token, { title, description });
    if (newTask?.id) {
      setTasks([...tasks, newTask]);
      setTitle('');
      setDescription('');
    }
  };

  return (
    <section className="max-w-3xl mx-auto">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-6">
        <h2 className="text-2xl font-bold mb-4">Create New Task</h2>
        <form onSubmit={handleCreateTask} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900"
              rows="3"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Add Task
          </button>
        </form>
      </div>

      <div className="space-y-4">
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks yet. Add one above!</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{task.description}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
