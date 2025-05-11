import React from 'react';
import {
  Home,
  ListChecks,
  GitCommit,
  ActivitySquare,
  Download,
  Sun,
  Moon,
  LogOut,
} from 'lucide-react';

export default function Sidebar({ username, darkMode, setDarkMode, setActiveSection }) {
  const navItems = [
    { label: 'Dashboard', icon: Home, id: 'dashboard' },
    { label: 'Tasks', icon: ListChecks, id: 'tasks' },
    { label: 'Commits', icon: GitCommit, id: 'commits' },
    { label: 'Pipelines', icon: ActivitySquare, id: 'pipelines' },
    { label: 'Report', icon: Download, id: 'report' },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-md h-screen p-6 flex flex-col justify-between">
      <div>
        <div className="text-2xl font-bold mb-8">Welcome, {username}</div>
        <nav className="space-y-4">
          {navItems.map(({ label, icon: Icon, id }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className="flex items-center w-full px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Icon className="mr-3" size={20} />
              {label}
            </button>
          ))}
        </nav>
      </div>

      <div className="space-y-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center w-full px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          {darkMode ? <Sun className="mr-3" size={20} /> : <Moon className="mr-3" size={20} />}
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <button
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }}
          className="flex items-center w-full px-3 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
        >
          <LogOut className="mr-3" size={20} /> Logout
        </button>
      </div>
    </aside>
  );
}
