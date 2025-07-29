// DD:\LawLens\frontend\src\App.tsx

import React from 'react';
import LawLensForm from './components/LawLensForm';
import './App.css'; // Import the new CSS file

const App: React.FC = () => {
  return (
    <div className="app-container">
      <header className="app-header">
        <span className="app-title">
          <span role="img" aria-label="scales">⚖️</span> LawLens
        </span>
        <span className="app-subtitle">
          Pakistani Penal Code AI Interpreter
        </span>
      </header>
      <main className="app-main">
        <LawLensForm />
      </main>
      <footer className="app-footer">
        &copy; {new Date().getFullYear()} LawLens. For educational use only.
      </footer>
    </div>
  );
}

export default App;