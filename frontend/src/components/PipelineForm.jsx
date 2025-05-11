import React, { useState, useEffect } from 'react';
import { getPipelines, createPipeline } from '../api';

export default function PipelineForm({ token }) {
  const [pipelines, setPipelines] = useState([]);
  const [pipelineName, setPipelineName] = useState('');
  const [status, setStatus] = useState('pending');
  const [duration, setDuration] = useState('');

  useEffect(() => {
    getPipelines(token).then(setPipelines);
  }, [token]);

  const handleCreatePipeline = async (e) => {
    e.preventDefault();
    const newPipeline = await createPipeline(token, {
      name: pipelineName,
      status,
      duration_seconds: parseInt(duration),
    });
    if (newPipeline?.id) {
      setPipelines([...pipelines, newPipeline]);
      setPipelineName('');
      setStatus('pending');
      setDuration('');
    }
  };

  return (
    <section className="max-w-3xl mx-auto">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-6">
        <h2 className="text-2xl font-bold mb-4">Create Pipeline</h2>
        <form onSubmit={handleCreatePipeline} className="space-y-4">
          <div>
            <label htmlFor="pipelineName" className="block text-sm font-medium mb-1">
              Pipeline Name
            </label>
            <input
              id="pipelineName"
              type="text"
              value={pipelineName}
              onChange={(e) => setPipelineName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900"
              required
            />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium mb-1">
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900"
            >
              <option value="pending">Pending</option>
              <option value="running">Running</option>
              <option value="success">Success</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          <div>
            <label htmlFor="duration" className="block text-sm font-medium mb-1">
              Duration (seconds)
            </label>
            <input
              id="duration"
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Create Pipeline
          </button>
        </form>
      </div>

      <div className="space-y-4">
        {pipelines.length === 0 ? (
          <p className="text-center text-gray-500">No pipelines created yet.</p>
        ) : (
          pipelines.map((p) => (
            <div
              key={p.id}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Status: <span className="font-medium">{p.status}</span> | Duration: {p.duration_seconds}s
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
