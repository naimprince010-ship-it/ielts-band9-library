import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import './index.css'
import App from './App.tsx'

function FallbackErrorRender({ error, resetErrorBoundary }: any) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-50 p-4">
      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-xl text-center">
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500 text-2xl">
          ⚠️
        </div>
        <h1 className="text-xl font-bold mb-2">Something went wrong</h1>
        <div className="bg-zinc-950 p-3 rounded text-left overflow-auto mb-6 max-h-48 border border-zinc-800 text-sm">
          <code className="text-red-400 break-words font-mono text-xs whitespace-pre-wrap">
            {error.message || String(error)}
          </code>
        </div>
        <button 
          onClick={resetErrorBoundary}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-lg font-medium transition-colors w-full"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={FallbackErrorRender}>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
