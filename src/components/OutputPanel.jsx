import { useEffect } from 'react';

function OutputPanel({ message, onClear }) {
  // Auto-clear message after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClear();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message, onClear]);

  if (!message) return null;

  const isError = message.type === 'error';
  const bgColor = isError ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200';
  const textColor = isError ? 'text-red-800' : 'text-green-800';
  const iconColor = isError ? 'text-red-600' : 'text-green-600';

  return (
    <div className={`rounded-lg border-2 ${bgColor} p-4 mb-6 animate-fadeIn`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {isError ? (
            <svg className={`h-5 w-5 ${iconColor}`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className={`h-5 w-5 ${iconColor}`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        <div className="ml-3 flex-1">
          <p className={`text-sm font-medium ${textColor}`}>
            {message.text}
          </p>
        </div>
        <button
          onClick={onClear}
          className={`ml-3 flex-shrink-0 ${textColor} hover:opacity-70`}
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default OutputPanel;