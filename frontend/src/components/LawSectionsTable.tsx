// D:\LawLens\frontend\src\components/LawSectionsTable.tsx

import React from 'react';

interface LawSection {
  title: string;
  description: string;
}

interface LawSectionsTableProps {
  sections: LawSection[];
  loading: boolean;
}

const LawSectionsTable: React.FC<LawSectionsTableProps> = ({ sections, loading }) => {
  if (loading) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 shadow-xl text-center text-gray-400 animate-fade-in-up">
        <p>Loading legal sections...</p>
        <div className="loading-spinner mt-4 mx-auto"></div>
      </div>
    );
  }

  if (!sections || sections.length === 0) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 shadow-xl text-center text-gray-400 animate-fade-in-up">
        <p>No relevant law sections found for the provided incident.</p>
        <p className="text-sm mt-2">Try providing more details in the incident description.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-xl animate-fade-in-up overflow-x-auto">
      <h2 className="text-2xl font-semibold text-primary-300 mb-6 text-center p-6 pb-0">Relevant Law Sections</h2>
      <table className="min-w-full divide-y divide-gray-700">
        <thead>
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider bg-primary-700">
              Title
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider bg-primary-700">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-800/30 divide-y divide-gray-700">
          {sections.map((section, index) => (
            <tr key={index} className="hover:bg-gray-700/50 transition-colors duration-200">
              <td className="px-6 py-4 whitespace-normal text-gray-300 font-medium">
                {section.title}
              </td>
              <td className="px-6 py-4 whitespace-normal text-gray-300">
                {section.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LawSectionsTable;