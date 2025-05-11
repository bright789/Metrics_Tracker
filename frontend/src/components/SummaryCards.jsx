import React, { useEffect, useState } from 'react';
import { getTasks, getCommits, getPipelines } from '../api';

export default function SummaryCards({ token }) {
  const [counts, setCounts] = useState({ tasks: 0, commits: 0, pipelines: 0 });

  useEffect(() => {
    Promise.all([getTasks(token), getCommits(token), getPipelines(token)]).then(
      ([tasks, commits, pipelines]) => {
        setCounts({ tasks: tasks.length, commits: commits.length, pipelines: pipelines.length });
      }
    );
  }, [token]);

  const cardClasses =
    'flex-1 p-6 rounded-lg shadow bg-white dark:bg-gray-800 text-center transition-all';

  const labelClasses = 'text-sm uppercase text-gray-500 dark:text-gray-400';
  const valueClasses = 'text-3xl font-bold mt-2';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div className={`${cardClasses} border-t-4 border-blue-500`}>
        <p className={labelClasses}>Total Tasks</p>
        <p className={valueClasses}>{counts.tasks}</p>
      </div>
      <div className={`${cardClasses} border-t-4 border-purple-500`}>
        <p className={labelClasses}>Total Commits</p>
        <p className={valueClasses}>{counts.commits}</p>
      </div>
      <div className={`${cardClasses} border-t-4 border-green-500`}>
        <p className={labelClasses}>Total Pipelines</p>
        <p className={valueClasses}>{counts.pipelines}</p>
      </div>
    </div>
  );
}
