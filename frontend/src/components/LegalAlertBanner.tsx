// D:\LawLens\frontend\src\components/LegalAlertBanner.tsx

import React from 'react';

interface LegalAlertBannerProps {
  message: string;
}

const LegalAlertBanner: React.FC<LegalAlertBannerProps> = ({ message }) => {
  if (!message) {
    return null;
  }

  return (
    <div className="bg-red-600/90 backdrop-blur-sm text-white p-6 rounded-xl shadow-xl mb-8 max-w-2xl mx-auto animate-fade-in-up border border-red-500/30">
      <div className="flex items-start gap-4">
        <span className="text-3xl flex-shrink-0" role="img" aria-label="Warning">⚠️</span> 
        <div>
          <h3 className="font-bold text-xl mb-2">Important Legal Alert!</h3>
          <p className="text-lg leading-relaxed">
            {message}
          </p>
          <p className="text-sm mt-3 opacity-80">
            Please consult with a qualified legal professional for personalized advice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LegalAlertBanner;