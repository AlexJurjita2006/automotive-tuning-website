import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Efect de scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="container header-container">
        {/* Logo stânga – rămâine stilul tuning */}
        <Link to="/" className="logo" onClick={closeMenu}>
          <span className="logo-icon-shell">
            <span className="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M11.9998 8.2C9.90099 8.2 8.1998 9.90119 8.1998 12C8.1998 14.0989 9.90099 15.8 11.9998 15.8C14.0986 15.8 15.7998 14.0989 15.7998 12C15.7998 9.90119 14.0986 8.2 11.9998 8.2Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M20 13.1V10.9L17.98 10.52C17.82 9.97 17.6 9.45 17.31 8.97L18.48 7.27L16.73 5.52L15.03 6.69C14.55 6.4 14.03 6.18 13.48 6.02L13.1 4H10.9L10.52 6.02C9.97 6.18 9.45 6.4 8.97 6.69L7.27 5.52L5.52 7.27L6.69 8.97C6.4 9.45 6.18 9.97 6.02 10.52L4 10.9V13.1L6.02 13.48C6.18 14.03 6.4 14.55 6.69 15.03L5.52 16.73L7.27 18.48L8.97 17.31C9.45 17.6 9.97 17.82 10.52 17.98L10.9 20H13.1L13.48 17.98C14.03 17.82 14.55 17.6 15.03 17.31L16.73 18.48L18.48 16.73L17.31 15.03C17.6 14.55 17.82 14.03 17.98 13.48L20 13.1Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </span>
          <span className="logo-text">
            <span className="logo-main">AJ <span>Tuning</span></span>
            <span className="logo-sub">Performance Garage</span>
          </span>
        </Link>

        {/* Navigație desktop – doar butoanele cerute */}
        <nav className="nav-links">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Home
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            About Us
          </NavLink>
          <NavLink to="/services" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Services
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Contact
          </NavLink>
        </nav>

        {/* Zona din dreapta – doar butonul de mobile menu (pe desktop e gol) */}
        <div className="header-actions">
          <button 
            className={`mobile-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>

      {/* Meniu mobil – aceleași 4 butoane */}
      <div className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-container">
          <nav className="mobile-nav-links">
            <NavLink to="/" onClick={closeMenu}>Home</NavLink>
            <NavLink to="/about" onClick={closeMenu}>About Us</NavLink>
            <NavLink to="/services" onClick={closeMenu}>Services</NavLink>
            <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;