import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaLinkedin, FaGoogle, FaLock, FaEnvelope, FaUser } from 'react-icons/fa';
import './AuthPage.css';

const AuthPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length === 0) {
      // Aquí iría la lógica de autenticación normal
      console.log('Login submitted:', { email, password, rememberMe });
      // Simulamos un login exitoso
      const user = {
        name: 'Usuario Demo',
        email: email,
      };
      
      if (onLogin) {
        onLogin(user);
      }
      navigate('/');
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!email) {
      errors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'El email no es válido';
    }
    
    if (!password) {
      errors.password = 'La contraseña es requerida';
    } else if (password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    return errors;
  };

  const handleGoogleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log('Usuario logueado con Google:', decoded);

    const user = {
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
    };

    localStorage.setItem('user', JSON.stringify(user));

    if (onLogin) {
      onLogin(user);
    }

    navigate('/');
  };

  const handleGoogleError = () => {
    console.error('Error al iniciar sesión con Google');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Iniciar Sesión</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <div className="input-with-icon">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className={errors.email ? 'error' : ''}
              />
            </div>
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <div className="input-with-icon">
              <FaLock className="input-icon" />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={errors.password ? 'error' : ''}
              />
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          
          <div className="form-group remember-group">
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className="checkmark"></span>
              Recordar mi contraseña
            </label>
            <a href="/forgot-password" className="forgot-password">¿Olvidaste tu contraseña?</a>
          </div>
          
          <button type="submit" className="auth-button">
            Iniciar Sesión
          </button>
        </form>
        
        <div className="social-auth-separator">
          <span>O inicia sesión con</span>
        </div>
        
        <div className="social-auth-buttons">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            render={({ onClick }) => (
              <button className="social-button google" onClick={onClick}>
                <FaGoogle className="social-icon" />
                Google
              </button>
            )}
          />
          
          <button className="social-button facebook">
            <FaFacebook className="social-icon" />
            Facebook
          </button>
          
          <button className="social-button linkedin">
            <FaLinkedin className="social-icon" />
            LinkedIn
          </button>
        </div>
        
        <div className="auth-footer">
          ¿No tienes una cuenta? <button className="toggle-auth" onClick={() => navigate('/register')}>Regístrate</button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;