import React, { useState, useEffect } from 'react';
import { getCommits, createCommit } from '../api';

export default function CommitForm({ token }) {
  const [commits, setCommits] = useState([]);
  const [repo, setRepo] = useState('');
  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    getCommits(token).then(setCommits);
  }, [token]);

  const handleCreateCommit = async (e) => {
    e.preventDefault();
    const newCommit = await createCommit(token, { repo, author, message });
    if (newCommit?.id) {
      setCommits([...commits, newCommit]);
      setRepo('');
      setAuthor('');
      setMessage('');
    }
  };

  return (
    <section className="max-w-3xl mx-auto">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-6">
        <h2 className="text-2xl font-bold mb-4">Log a Commit</h2>
        <form onSubmit={handleCreateCommit} className="space-y-4">
          <div>
            <label htmlFor="repo" className="block text-sm font-medium mb-1">
              Repository
            </label>
            <input
              id="repo"
              type="text"
              value={repo}
              onChange={(e) => setRepo(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900"
              required
            />
          </div>
          <div>
            <label htmlFor="author" className="block text-sm font-medium mb-1">
              Author
            </label>
            <input
              id="author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Commit Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900"
              rows="3"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Submit Commit
          </button>
        </form>
      </div>

      <div className="space-y-4">
        {commits.length === 0 ? (
          <p className="text-center text-gray-500">No commits yet. Log one above!</p>
        ) : (
          commits.map((commit) => (
            <div
              key={commit.id}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-lg font-semibold">{commit.repo}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                {commit.author} - {commit.message}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
