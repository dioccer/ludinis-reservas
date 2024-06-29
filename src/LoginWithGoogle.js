import React from 'react';
import { GoogleLogin } from 'react-google-login';

const clientId = '1068434512211-u2nsrcigpghor5svvs81c4km77h0qtqa.apps.googleusercontent.com'; // Reemplaza con tu propio Client ID

const LoginWithGoogle = () => {
  const handleSignIn = (response) => {
    console.log('Inicio de sesión exitoso:', response);
    // Aquí puedes manejar la lógica después de que el usuario haya iniciado sesión correctamente
  };

  const handleFailure = (error) => {
    console.error('Inicio de sesión fallido:', error);
    // Aquí puedes manejar los errores de inicio de sesión
  };

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Iniciar sesión con Google"
      onSuccess={handleSignIn}
      onFailure={handleFailure}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default LoginWithGoogle;
