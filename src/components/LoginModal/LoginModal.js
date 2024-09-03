import React, { useState } from 'react';
import './LoginModal.scss';

const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const getCsrfToken = () => {
    // Ensure the CSRF token is available
    const tokenElement = document.querySelector('[name=csrfmiddlewaretoken]');
    return tokenElement ? tokenElement.value : '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://recipe-z.onrender.com/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCsrfToken(), // Include CSRF token
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',  // Include cookies in the request
      });

      if (response.ok) {
        setMessage('Login successful! Welcome back.');
        setError(null);
        setTimeout(() => {
          onClose(); // Close modal and redirect or update state as needed
        }, 1000);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Login failed');
        setMessage('Login failed');
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('An error occurred. Please try again later.');
    }
  };

  const handleSocialLogin = (provider) => {
    window.location.href = `https://recipe-z.onrender.com/api/${provider}/login/`;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>Welcome back to <span className="highlight">Recipe-Z!</span></h2>
        <p>Sign in to access your saved recipes, explore new culinary ideas, and enjoy a personalized cooking experience.</p>
        {message && <p className="message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="signin-btn">Sign in</button>
          <div className="or-divider">Or</div>
          <button type="button" className="social-btn google" onClick={() => handleSocialLogin('google')}>Sign in with Google</button>
          <button type="button" className="social-btn facebook" onClick={() => handleSocialLogin('facebook')}>Sign in with Facebook</button>
          <button type="button" className="social-btn forgot">Forgot Password</button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;

