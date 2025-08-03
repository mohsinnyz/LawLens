// D:\LawLens\frontend\src\components\ConfidenceScore.tsx

import React from 'react';

interface ConfidenceScoreProps {
  score: number | null;
  loading: boolean;
}

const ConfidenceScore: React.FC<ConfidenceScoreProps> = ({ score, loading }) => {
  if (loading) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 shadow-xl text-center text-gray-400 animate-fade-in-up">
        <p>Calculating confidence score...</p>
        <div className="loading-spinner mt-4 mx-auto"></div>
      </div>
    );
  }

  if (score === null) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 shadow-xl text-center text-gray-400 animate-fade-in-up">
        <p>Confidence score will appear here after analysis.</p>
        <p className="text-sm mt-2">The AI's confidence in its legal guidance.</p>
      </div>
    );
  }

  // Determine color based on score
  const getColorClass = (s: number) => {
    if (s >= 75) return 'text-green-500';
    if (s >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getProgressBarColor = (s: number) => {
    if (s >= 75) return 'bg-green-500';
    if (s >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-xl animate-fade-in-up overflow-hidden">
      {/* Header section with primary gradient */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-600 p-6 flex items-center justify-center gap-3">
        <span className="text-3xl" role="img" aria-label="Confidence">✅</span>
        <h2 className="text-2xl font-semibold text-white">AI Confidence Score</h2>
      </div>

      <div className="p-6 text-center">
        <p className="text-gray-300 text-lg mb-4">
          The AI's confidence in the provided legal guidance:
        </p>
        <div className={`text-6xl font-bold ${getColorClass(score)} mb-4`}>
          {score}%
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
          <div
            className={`h-full rounded-full transition-all duration-500 ease-out ${getProgressBarColor(score)}`}
            style={{ width: `${score}%` }}
          ></div>
        </div>
        <p className="text-gray-400 text-sm">
          Higher score indicates higher certainty in the analysis.
        </p>
      </div>
    </div>
  );
};

export default ConfidenceScore;