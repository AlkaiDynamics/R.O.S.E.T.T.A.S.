import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { config } from './services/config';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

/**
 * Bootstrapper
 * Loads physical constants from config.yaml before UI initialization.
 */
async function bootstrap() {
  try {
    // Wait for external configuration to load
    await config.load();
  } catch (err) {
    console.error("Config load failed:", err);
  }

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

bootstrap();