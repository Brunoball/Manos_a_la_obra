import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';

const AuthPage = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log('Usuario logueado con Google:', decoded);

    const user = {
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
    };

    // Guardar datos del usuario en localStorage
    localStorage.setItem('user', JSON.stringify(user));

    // Llamar a la función onLogin si existe
    if (onLogin) {
      onLogin(user);
    }

    // Redirigir a la página principal
    navigate('/');
  };

  const handleError = () => {
    console.error('Error al iniciar sesión con Google');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Iniciar sesión con Google</h2>
        <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
      </div>
    </div>
  );
};

export default AuthPage;