// D:\LawLens\frontend\src\components\UserRights.tsx

import React from 'react';
// No specific CSS import needed, relying on Tailwind utilities and global index.css

interface UserRight {
  title: string;
  description: string;
}

interface UserRightsProps {
  rights: UserRight[];
  loading: boolean;
}

const UserRights: React.FC<UserRightsProps> = ({ rights, loading }) => {
  if (loading) {
    return (
      <div className="card text-center text-gray-400 animate-fade-in-up">
        <p>Loading user rights...</p>
        <div className="loading-spinner mt-4 mx-auto"></div> {/* Re-using global spinner style */}
      </div>
    );
  }

  if (!rights || rights.length === 0) {
    return (
      <div className="card text-center text-gray-400 animate-fade-in-up">
        <p>No specific user rights identified for this incident.</p>
        <p className="text-sm mt-2">This does not mean you have no rights, only that specific ones were not extracted.</p>
      </div>
    );
  }

  return (
    // Apply the new 'card' class for consistent styling
    <div className="card animate-fade-in-up">
      <h2 className="text-2xl font-semibold text-primary-300 mb-6 text-center">Your Rights & Legal Principles</h2>
      <ul className="divide-y divide-gray-700">
        {rights.map((right, index) => (
          <li key={index} className="py-4 last:pb-0">
            <h3 className="font-semibold text-lg text-secondary-500 mb-1">{right.title}</h3>
            <p className="text-gray-300 leading-relaxed">{right.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserRights;