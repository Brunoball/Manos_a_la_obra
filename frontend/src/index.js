import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="650259582181-a9dfqssvkc66martqtcbomqscliih92d.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
