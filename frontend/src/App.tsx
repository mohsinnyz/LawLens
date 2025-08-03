// D:\LawLens\frontend\src\App.tsx

import React from 'react';
import ReportPage from './components/ReportPage';
import './app.css';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 p-6 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-3">
            <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              ⚖️ LawLens
            </span>
          </div>
          <div className="text-center md:text-right">
            <p className="text-lg md:text-xl text-gray-300 font-medium">
              Pakistani Penal Code AI Interpreter
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Powered by AI & Legal Expertise
            </p>
          </div>
        </div>
      </header>
      
      <main className="flex-1 p-4 md:p-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <ReportPage />
        </div>
      </main>
      
      <footer className="bg-gray-800/50 backdrop-blur-sm border-t border-gray-700 p-6 shadow-inner">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} LawLens. For educational and public good use only.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Not a substitute for professional legal advice
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;