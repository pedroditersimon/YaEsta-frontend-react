import React from 'react';
import ReactDOM from 'react-dom/client';

import { AccessDocumentTrigger } from './components/AccessDocuments/AccessDocumentTrigger.mjs';
import './index.css';
import App from './pages/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <App /> {/* The various pages will be displayed by the `Main` component. */}
  </React.StrictMode>
);

// Register the service worker
if ('serviceWorker' in navigator) {
  console.log("Service worker registration code is running");
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
}