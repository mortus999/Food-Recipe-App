import React, { useState } from 'react';
import './LoginModal.scss';

const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://recipe-z.onrender.com/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',  // Important for session-based auth
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        onClose();
        // Redirect or update state to reflect user login
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Login failed');
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
            <span className="icon">&#9993;</span>
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="icon">&#128274;</span>
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
