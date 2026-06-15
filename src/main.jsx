import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { StrictMode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@ui/ErrorFallback.jsx';
import Spinner from '@ui/Spinner.jsx';

createRoot(document.getElementById('root')).render(
  //TODO: CREATE BOOKING AND EDIT BOOKING
  <StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      fallback={Spinner}
      onReset={() => window.location.replace('/')}
    >
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
