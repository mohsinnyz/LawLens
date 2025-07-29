// D:\LawLens\frontend\public\src\components\LawLensForm.tsx
import React, { useState } from 'react';
import './LawLensForm.css'; // Import the new CSS file
import { marked } from 'marked'; // Import the marked library for Markdown parsing

const LawLensForm: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null); // Clear previous response when a new query is submitted

    try {
      // Initiate the API call to your backend
      const res = await fetch('http://localhost:8000/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      // Check if the HTTP response was successful
      if (!res.ok) {
        // If not successful, throw an error with the status
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      // Parse the JSON response from the backend
      const data = await res.json();
      
      // Parse the 'result' field (which should be Markdown) into HTML
      // and set it as the response
      setResponse(marked.parse(data.result));

    } catch (error) {
      // Log the error for debugging purposes
      console.error("Error fetching legal analysis:", error);
      // Set a user-friendly error message
      setResponse('❌ Error fetching legal analysis. Please try again later.');
    } finally {
      // Ensure loading state is reset regardless of success or failure
      setLoading(false);
    }
  };

  return (
    <div className="lawlens-form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="query" className="lawlens-form-label">
          Enter your legal question or scenario:
        </label>
        <textarea
          id="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          rows={5}
          cols={60}
          placeholder="e.g., What if someone sells fake prize bonds?"
          className="lawlens-textarea"
        />
        <button
          type="submit"
          // Disable button if loading or if the query is empty/only whitespace
          disabled={loading || !query.trim()}
          className="lawlens-submit-button"
        >
          {loading ? 'Analyzing...' : 'Submit'}
        </button>
      </form>

      {/* Conditionally render the response div if a response exists */}
      {response && (
        <div className="lawlens-response-container">
          <strong className="lawlens-response-title">📜 Result:</strong>
          {/* Render the parsed HTML content using dangerouslySetInnerHTML.
            This is used because 'marked' returns a string of HTML.
            Caution: Only use with trusted content sources to prevent XSS attacks.
            In this case, the content comes from your own trusted backend.
          */}
          <div className="lawlens-response-content" dangerouslySetInnerHTML={{ __html: response }} />
        </div>
      )}
    </div>
  );
}

export default LawLensForm;