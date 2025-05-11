import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import TaskForm from './TaskForm';
import CommitForm from './CommitForm';
import PipelineForm from './PipelineForm';
import MetricsChart from './MetricsChart';
import ReportDownloader from './ReportDownloader';
import SummaryCards from './SummaryCards';

export default function Dashboard() {
  const token = localStorage.getItem('token');
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [username, setUsername] = useState('Developer');

  useEffect(() => {
    const body = document.body;
    if (darkMode) {
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    try {
      const { username } = JSON.parse(atob(token.split('.')[1]));
      setUsername(username);
    } catch {
      setUsername('Developer');
    }
  }, [token]);

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <>
            <SummaryCards token={token} />
            <MetricsChart />
          </>
        );
      case 'tasks':
        return <TaskForm token={token} />;
      case 'commits':
        return <CommitForm token={token} />;
      case 'pipelines':
        return <PipelineForm token={token} />;
      case 'report':
        return <ReportDownloader token={token} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar
        username={username}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        setActiveSection={setActiveSection}
      />
      <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white overflow-y-auto">
        {renderSection()}
      </main>
    </div>
  );
}
