import React from 'react';

export default function ReportDownloader({ token }) {
  const handleDownloadReport = () => {
    fetch('http://localhost:5000/api/report/csv', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'report.csv');
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch(() => alert('Failed to download report.'));
  };

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center">
      <h2 className="text-2xl font-bold mb-4">Download Summary Report</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Get a CSV export of all your tasks, commits, and pipelines.
      </p>
      <button
        onClick={handleDownloadReport}
        className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
      >
        Download CSV
      </button>
    </div>
  );
}
