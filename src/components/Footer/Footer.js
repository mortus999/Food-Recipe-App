import React from 'react';
import './Footer.css';
import { CiFacebook, CiLinkedin,  } from "react-icons/ci";
import { FaTwitter } from "react-icons/fa";
import logo from '../../assets/images/recipe-z logo with text.png'



function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
        <img src={logo} alt="Recipe-Z Logo" />
        </div>
        <div className="footer-text">
          <p>© 2024 Recipe-Z. All rights reserved.</p>
        </div>
        <div className="footer-social">
        <CiFacebook />
        <CiLinkedin />
        <FaTwitter />

          <a href="https://www.facebook.com"><i className="fab fa-facebook-f"></i></a>
          <a href="https://www.linkedin.com"><i className="fab fa-linkedin-in"></i></a>
          <a href="https://www.instagram.com"><i className="fab fa-instagram"></i></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
