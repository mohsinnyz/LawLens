// D:\LawLens\frontend\src\components\Disclaimer.tsx

import React from 'react';

interface DisclaimerProps {
  show: boolean;
  message?: string;
  className?: string;
}

const Disclaimer: React.FC<DisclaimerProps> = ({ show, message, className }) => {
  if (!show) {
    return null;
  }

  const defaultMessage = (
    <>
      <p className="mb-2">
        **LawLens AI provides AI-generated legal information and guidance for informational purposes only, and does not constitute legal advice.**
      </p>
      <p className="mb-2">
        The information provided should not be considered a substitute for professional legal counsel. Always consult with a qualified attorney for advice tailored to your specific situation.
      </p>
      <p>
        Use of this tool does not create an attorney-client relationship.
      </p>
    </>
  );

  return (
    <div className={`bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 shadow-xl text-center animate-fade-in-up ${className || ''}`}>
      <h2 className="text-xl font-bold text-primary-300 mb-4">⚠️ Legal Disclaimer</h2>
      <div className="text-gray-300 leading-relaxed text-sm">
        {message ? <p>{message}</p> : defaultMessage}
      </div>
    </div>
  );
};

export default Disclaimer;