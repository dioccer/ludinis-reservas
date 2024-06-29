// App.js (o cualquier componente principal de tu aplicación)
import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Home from './Home'; // Suponiendo que aquí está tu componente principal

const App = () => {
  return (
    <GoogleOAuthProvider clientId="1068434512211-u2nsrcigpghor5svvs81c4km77h0qtqa.apps.googleusercontent.com">
      <div className="App">
        <Home />
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;
