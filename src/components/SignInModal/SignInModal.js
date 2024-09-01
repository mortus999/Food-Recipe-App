import React, { useState } from 'react';
import './SignInModal.scss';
import LoginModal from '../LoginModal/LoginModal'; // Import the LoginModal component
import { useAuth } from '../../context/AuthContext'; // Import useAuth for auth context

const SignInModal = ({ isOpen, onClose }) => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const { signUp, error } = useAuth(); // Use AuthContext to handle signup

  // Update form data based on input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle sign up form submission
  const handleSignUp = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;
    
    // Basic validation (e.g., password match)
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Call the signup function from AuthContext
    signUp(name, email, password).then(() => {
      onClose(); // Close modal on successful signup
    }).catch(err => {
      console.error("Sign up failed:", err);
    });
  };

  // Open login modal and close sign up modal
  const handleLoginClick = () => {
    setLoginOpen(true); // Open the login modal
    onClose(); // Close the sign-in modal
  };

  // Close login modal
  const handleLoginClose = () => {
    setLoginOpen(false); // Close the login modal
  };

  // Return null if both modals are closed
  if (!isOpen && !isLoginOpen) return null; 

  return (
    <>
      {isOpen && (
        <div className="modal-overlay" onClick={onClose}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={onClose}>&times;</button>
            <h2>Join <span className="highlight">Recipe-Z</span> Today!</h2>
            <p>Discover, save, and share your favorite recipes with our powerful search and filtering tools. Sign up now and start exploring a world of culinary inspiration!</p>
            {error && <p className="error-message">{error}</p>} {/* Display error message if any */}
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
