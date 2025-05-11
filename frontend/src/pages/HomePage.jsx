import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-xl text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">DevOps Metrics Tracker</h1>
        <p className="text-gray-700 mb-6">
          Track tasks, commits, pipelines, and metrics — all in one place.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/login">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
