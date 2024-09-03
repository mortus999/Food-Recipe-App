// src/components/Navbar/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "./Header.scss";
import logo from '../../assets/images/recipe-z logo with text.png';
import userIcon from '../../assets/images/Group.png';
import SignInModal from '../SignInModal/SignInModal';
import { useAuth } from '../../context/AuthContext'; // Import useAuth from AuthContext

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth(); // Use AuthContext to get auth state and logout function

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 60) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <nav className={`navbar bg-orange flex align-center ${scrolled ? 'scrolled' : ""}`}>
        <div className='container w-100'>
          <div className='navbar-content text-white'>
            <div className='brand-and-toggler flex align-center justify-between'>
              <Link to="/" className='navbar-brand fw-3 fs-22 flex align-center'>
                <img src={logo} alt="Recipe-Z Logo" className='navbar-logo' />
              </Link>
              <div className='navbar-btns flex align-center'>
                {isAuthenticated ? (
                  // If user is authenticated, show logout button
                  <>
                    <Link to="/profile" className='auth-btn text-white'>
                      <img src={userIcon} alt="user-icon" className='user-icon' />
                      Profile
                    </Link>
                    <button className='auth-btn text-white' onClick={logout}>
                      Logout
                    </button>
                  </>
                ) : (
                  // If user is not authenticated, show Sign In button
                  <button className='auth-btn text-white' onClick={openModal}>
                    <img src={userIcon} alt="user-icon" className='user-icon' />
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* SignInModal Component */}
      <SignInModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}

export default Navbar;
