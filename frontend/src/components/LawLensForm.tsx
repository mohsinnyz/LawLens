// D:\LawLens\frontend\src\components\LawLensForm.tsx

import React, { useState } from 'react';

interface LawLensFormProps {
  onSubmit: (data: { incidentDescription: string; location: string; time: string; }) => void;
  loading: boolean;
  error: string | null;
}

const LawLensForm: React.FC<LawLensFormProps> = ({ onSubmit, loading, error }) => {
  const [incidentDescription, setIncidentDescription] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ incidentDescription, location, time });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 shadow-xl">
      <h2 className="text-2xl font-semibold text-primary-300 mb-6 text-center">Submit Incident Details</h2>
      
      <div className="mb-6">
        <label htmlFor="incidentDescription" className="block text-sm font-medium text-gray-300 mb-2">
          Incident Description
        </label>
        <textarea
          id="incidentDescription"
          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
          value={incidentDescription}
          onChange={(e) => setIncidentDescription(e.target.value)}
          required
          placeholder="e.g., Assault at public park, car accident near school, etc."
          rows={4}
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-2">
          Location
        </label>
        <input
          type="text"
          id="location"
          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          placeholder="e.g., Main Street, City Park, 123 Oak Ave"
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="time" className="block text-sm font-medium text-gray-300 mb-2">
          Time (Optional)
        </label>
        <input
          type="text"
          id="time"
          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder="e.g., Yesterday evening, 3 PM on Monday"
        />
      </div>
      
      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}
      
      <button 
        type="submit" 
        className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-primary-600 hover:to-secondary-600 transform hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="loading-spinner mr-3"></div>
            <span>Analyzing...</span>
          </div>
        ) : (
          'Get Legal Guidance'
        )}
      </button>
    </form>
  );
};

export default LawLensForm;