import React from 'react';
import { Link } from 'react-router-dom';

export default function RegisterSuccessPage() {
  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-green-600 mb-4">🎉 Success!</h2>
        <p className="text-gray-700 mb-6">
          Your account has been created successfully.
        </p>
        <Link to="/login">
          <button className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
            Go to Login
          </button>
        </Link>
      </div>
    </div>
  );
}
