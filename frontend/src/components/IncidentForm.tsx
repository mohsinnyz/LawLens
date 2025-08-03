// D:\LawLens\frontend\src\components\IncidentForm.tsx

import React, { useState } from 'react';
// No specific CSS import needed if it relied only on global or inline Tailwind

interface IncidentFormProps {
  onSubmit: (data: { incidentDetails: string }) => void;
  loading: boolean;
  error: string | null;
}

const IncidentForm: React.FC<IncidentFormProps> = ({ onSubmit, loading, error }) => {
  const [incidentDetails, setIncidentDetails] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ incidentDetails });
  };

  return (
    // Apply the new 'card' class for consistent styling
    <div className="card w-full max-w-lg mx-auto mt-8 p-6 sm:p-8"> {/* Added max-w, mx-auto for centering */}
      <h2 className="text-2xl font-semibold text-primary-300 mb-6 text-center">
        Describe Your Incident
      </h2>
      <p className="text-gray-400 mb-6 text-center">
        Provide details about the incident to get tailored legal guidance.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="incidentDetails" className="form-label">
            Incident Details
          </label>
          <textarea
            id="incidentDetails"
            className="form-textarea" // Uses the @apply'd style from index.css
            rows={8}
            value={incidentDetails}
            onChange={(e) => setIncidentDetails(e.target.value)}
            required
            placeholder="e.g., On Tuesday morning, I was involved in a car accident at the intersection of Main Street and Elm Avenue. The other driver ran a red light..."
          ></textarea>
        </div>

        {error && <p className="error-message">{error}</p>} {/* Uses the @apply'd style */}

        <button
          type="submit"
          className="btn-primary w-full mt-6" // Uses the @apply'd style from index.css
          disabled={loading}
        >
          {loading ? (
            <span className="loading-spinner"></span> // Uses the @apply'd style
          ) : (
            'Analyze Incident'
          )}
        </button>
      </form>
    </div>
  );
};

export default IncidentForm;