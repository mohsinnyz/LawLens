//D:\LawLens\frontend\public\src\components\LawLensForm.tsx

// frontend/public/src/components/LawLensForm.tsx
import React, { useState } from 'react'

const LawLensForm: React.FC = () => {
  const [query, setQuery] = useState('')
  const [response, setResponse] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResponse(null)

    try {
      const res = await fetch('http://localhost:8000/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      })

      const data = await res.json()
      setResponse(data.result)
    } catch (error) {
      setResponse('❌ Error fetching legal analysis.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      background: '#232326',
      borderRadius: 18,
      boxShadow: '0 4px 32px 0 #000a',
      padding: '2.5rem 2rem 2rem 2rem',
      margin: '0 auto',
      maxWidth: 600,
      minWidth: 320,
      border: '1px solid #222',
    }}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="query" style={{
          fontSize: '1.1rem',
          color: '#f3f3f3',
          fontWeight: 500,
          marginBottom: 8,
          display: 'block',
        }}>
          Enter your legal question or scenario:
        </label>
        <textarea
          id="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          rows={5}
          cols={60}
          placeholder="e.g., What if someone sells fake prize bonds?"
          style={{
            marginTop: 10,
            padding: 16,
            width: '100%',
            borderRadius: 10,
            border: '1.5px solid #333',
            background: '#18181b',
            color: '#f3f3f3',
            fontSize: '1.05rem',
            fontFamily: 'inherit',
            resize: 'vertical',
            outline: 'none',
            boxShadow: '0 2px 8px 0 #0004',
            transition: 'border 0.2s',
          }}
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          style={{
            marginTop: 18,
            padding: '0.7rem 2.2rem',
            borderRadius: 8,
            border: 'none',
            background: loading ? '#e5393555' : '#e53935',
            color: '#fff',
            fontWeight: 600,
            fontSize: '1.1rem',
            letterSpacing: '0.03em',
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: '0 2px 8px 0 #e5393522',
            transition: 'background 0.2s',
          }}
        >
          {loading ? 'Analyzing...' : 'Submit'}
        </button>
      </form>

      {response && (
        <div style={{
          marginTop: 32,
          padding: '1.5rem 1.2rem',
          borderRadius: 12,
          background: '#18181b',
          border: '1.5px solid #e53935',
          color: '#f3f3f3',
          boxShadow: '0 2px 12px 0 #0006',
          fontSize: '1.08rem',
          lineHeight: 1.7,
          wordBreak: 'break-word',
        }}>
          <strong style={{ color: '#e53935', fontWeight: 700, fontSize: '1.15rem' }}>📜 Result:</strong>
          <div style={{ marginTop: 10 }}>{response}</div>
        </div>
      )}
    </div>
  )
}

export default LawLensForm
