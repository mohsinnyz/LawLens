// D:\LawLens\frontend\src\components\Glossary.tsx

import React from 'react';
// No specific CSS import needed, relying on Tailwind utilities and global index.css

interface GlossaryTerm {
  term: string;
  definition: string;
}

interface GlossaryProps {
  terms: GlossaryTerm[];
  loading: boolean;
}

const Glossary: React.FC<GlossaryProps> = ({ terms, loading }) => {
  if (loading) {
    return (
      <div className="card text-center text-gray-400 animate-fade-in-up">
        <p>Loading legal glossary terms...</p>
        <div className="loading-spinner mt-4 mx-auto"></div> {/* Re-using global spinner style */}
      </div>
    );
  }

  if (!terms || terms.length === 0) {
    return (
      <div className="card text-center text-gray-400 animate-fade-in-up">
        <p>No specific glossary terms found for the analysis.</p>
        <p className="text-sm mt-2">Legal terms will appear here if relevant to the guidance.</p>
      </div>
    );
  }

  return (
    // Apply the new 'card' class for consistent styling
    <div className="card animate-fade-in-up">
      <h2 className="text-2xl font-semibold text-primary-300 mb-6 text-center">Legal Glossary</h2>
      <dl className="divide-y divide-gray-700">
        {terms.map((item, index) => (
          <div key={index} className="py-4 last:pb-0">
            <dt className="font-semibold text-lg text-secondary-500 mb-1">{item.term}</dt>
            <dd className="text-gray-300 leading-relaxed">{item.definition}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default Glossary;