import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import './index.css'
import App from './App.tsx'

const IS_DEV = import.meta.env.DEV;

function FallbackErrorRender({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-50 p-4">
      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-2xl text-center">
        <div className="w-16 h-16 bg-red-500/15 rounded-full flex items-center justify-center mx-auto mb-5 border border-red-500/20">
          <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
        <h1 className="text-xl font-bold mb-2 text-zinc-100">Something went wrong</h1>
        <p className="text-zinc-400 text-sm mb-6">
          An unexpected error occurred. Please try again or reload the page.
        </p>

        {IS_DEV && (
          <div className="bg-zinc-950 p-3 rounded text-left overflow-auto mb-6 max-h-36 border border-zinc-800">
            <code className="text-red-400 break-words font-mono text-xs whitespace-pre-wrap">
              {error.message}
            </code>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <button
            onClick={resetErrorBoundary}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-lg font-medium transition-colors w-full"
          >
            Try Again
          </button>
          <button
            onClick={() => { window.location.href = '/'; }}
            className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-6 py-2.5 rounded-lg font-medium transition-colors w-full"
          >
            Go to Homepage
          </button>
        </div>
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
