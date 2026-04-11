import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <Link to="/" className="footer-brand-logo" aria-label="AJ Tuning Home">
            <div className="footer-logo-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <circle cx="7" cy="17" r="2" stroke="currentColor" strokeWidth="2" />
                <circle cx="17" cy="7" r="2" stroke="currentColor" strokeWidth="2" />
                <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="footer-brand-copy">
              <span className="footer-brand-kicker">Performance Garage</span>
              <strong className="footer-brand-name">
                AJ <span>Tuning</span>
              </strong>
              <p className="footer-brand-tagline">ECU Remapping, Dyno Insight, Mechanical Precision</p>
            </div>
          </Link>
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