import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "./Header.scss";
import logo from '../../assets/images/recipe-z logo with text.png'
import userIcon from '../../assets/images/Group.png'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 60) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); 
  }, []);

  return (
    <nav className={`navbar bg-orange flex align-center ${scrolled ? 'scrolled' : ""}`}>
      <div className='container w-100'>
        <div className='navbar-content text-white'>
          <div className='brand-and-toggler flex align-center justify-between'>
            <Link to="/" className='navbar-brand fw-3 fs-22 flex align-center'>
            <img src={logo} alt="Recipe-Z Logo" className='navbar-logo' />
            </Link>
            <div className='navbar-btns flex align-center'>
              <Link to="/login" className='auth-btn text-white'>
              <img src={userIcon} alt="user-icon" className='user-icon' />
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
