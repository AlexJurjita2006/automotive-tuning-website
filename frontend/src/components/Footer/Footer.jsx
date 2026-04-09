import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <p>AJ Performance Tuning – ECU Remapping Specialist</p>
        </div>
        <div className="footer-links">
          <Link to="/recenzii" className="footer-link">Recenzii</Link>
          <Link to="/politica" className="footer-link">Politică Confidențialitate</Link>
          <Link to="/login" className="footer-link">Login</Link>
          <Link to="/blog" className="footer-link">Blog</Link>
        </div>
        <div className="footer-social">
          <a href="https://www.instagram.com/alexandru.j1/" target="_blank" rel="noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.linkedin.com/in/alexandru-daniel-jurji%C8%9Ba-a255863b2" target="_blank" rel="noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 AJ Performance Tuning. Toate drepturile rezervate.</p>
      </div>
    </footer>
  );
};

export default Footer;