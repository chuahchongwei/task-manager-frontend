// Banner at the top of the page showing whether the API and database are reachable.
// When something is misconfigured during deployment, this tells you which layer is broken.
import { useEffect, useState } from 'react';
import { API_URL, checkHealth } from '../api.js';

// A page served over HTTPS (like Amplify) is not allowed to call an HTTP API.
const isMixedContent = window.location.protocol === 'https:' && API_URL.startsWith('http:');

export default function ConnectionStatus() {
  const [health, setHealth] = useState(null); // null = still checking

  useEffect(() => {
    checkHealth().then(setHealth);
  }, []);

  if (!health) {
    return <div className="banner banner-checking">Checking connection to {API_URL} …</div>;
  }

  if (health.api && health.database) {
    return (
      <div className="banner banner-ok">
        API ✓ &nbsp; Database ✓ <span className="banner-url">{API_URL}</span>
      </div>
    );
  }

  return (
    <div className="banner banner-error">
      <strong>{health.api ? 'API ✓  Database ✗' : 'API ✗'}</strong> {health.detail}
      {isMixedContent && (
        <div className="banner-hint">
          This page uses HTTPS but VITE_API_URL starts with http://. Browsers block this (“mixed
          content”). Set VITE_API_URL to the https:// address of your API and redeploy.
        </div>
      )}
      {!health.api && !isMixedContent && (
        <div className="banner-hint">
          Check that the backend is running, that VITE_API_URL is correct, and that CORS_ORIGIN on
          the backend matches this site ({window.location.origin}). The browser console (F12) shows
          the exact error.
        </div>
      )}
    </div>
  );
}
