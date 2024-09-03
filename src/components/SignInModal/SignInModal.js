import React, { useState } from 'react';
import './SignInModal.scss';
import LoginModal from '../LoginModal/LoginModal';

const SignInModal = ({ isOpen, onClose }) => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        onClose();  // Close modal on successful signup
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Registration failed.');
      }
    } catch (err) {
      console.error("Sign up failed:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  const handleLoginClick = () => {
    setLoginOpen(true);
    onClose();
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  if (!isOpen && !isLoginOpen) return null;

  return (
    <>
      {isOpen && (
        <div className="modal-overlay" onClick={onClose}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={onClose}>&times;</button>
            <h2>Join <span className="highlight">Recipe-Z</span> Today!</h2>
            <p>Discover, save, and share your favorite recipes with our powerful search and filtering tools. Sign up now and start exploring a world of culinary inspiration!</p>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSignUp}>
              <div className="input-group">
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="input-group">
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="input-group">
                <input 
                  type="password" 
                  name="password" 
                  placeholder="Create password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="input-group">
                <input 
                  type="password" 
                  name="confirmPassword" 
                  placeholder="Confirm password" 
                  value={formData.confirmPassword} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <button type="submit" className="signup-btn">Sign up now!</button>
              <div className="or-divider">Or</div>
              <button type="button" className="social-btn forgot">Forgot Password</button>
              <button type="button" className="social-btn login" onClick={handleLoginClick}>Log In</button>
            </form>
          </div>
        </div>
      )}
      <LoginModal isOpen={isLoginOpen} onClose={handleLoginClose} />
    </>
  );
};

export default SignInModal;
