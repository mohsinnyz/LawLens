//D:\LawLens\frontend\public\src\App.tsx
// frontend/public/src/App.tsx
import React from 'react'
import LawLensForm from './components/LawLensForm'

const App: React.FC = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #18181b 0%, #232326 100%)',
      color: '#f3f3f3',
      fontFamily: 'Inter, Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '0',
    }}>
      <header style={{
        width: '100%',
        padding: '2.5rem 0 1.5rem 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderBottom: '1px solid #222',
        marginBottom: '2rem',
        background: 'rgba(24,24,27,0.95)',
        boxShadow: '0 2px 8px 0 rgba(0,0,0,0.12)'
      }}>
        <span style={{
          fontSize: '2.5rem',
          color: '#e53935',
          marginBottom: '0.5rem',
          fontWeight: 700,
          letterSpacing: '0.05em',
          textShadow: '0 2px 8px #0008'
        }}>
          <span role="img" aria-label="scales">⚖️</span> LawLens
        </span>
        <span style={{
          fontSize: '1.1rem',
          color: '#aaa',
          fontWeight: 400,
          letterSpacing: '0.01em',
          marginTop: '-0.5rem',
        }}>
          Pakistani Penal Code AI Interpreter
        </span>
      </header>
      <main style={{ width: '100%', maxWidth: 700, flex: 1 }}>
        <LawLensForm />
      </main>
      <footer style={{
        width: '100%',
        textAlign: 'center',
        color: '#666',
        fontSize: '0.95rem',
        padding: '1.5rem 0 0.5rem 0',
        borderTop: '1px solid #222',
        marginTop: '2rem',
        background: 'rgba(24,24,27,0.95)'
      }}>
        &copy; {new Date().getFullYear()} LawLens. For educational use only.
      </footer>
    </div>
  )
}

export default App
