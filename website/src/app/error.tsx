'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Root error boundary caught:', error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-md w-full space-y-8 text-center">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-foreground">
                Something went wrong!
              </h1>
              <p className="text-foreground/70">
                We apologize for the inconvenience. An unexpected error has
                occurred.
              </p>
              {error.digest && (
                <p className="text-sm text-foreground/50">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
            <button
              onClick={reset}
              className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
