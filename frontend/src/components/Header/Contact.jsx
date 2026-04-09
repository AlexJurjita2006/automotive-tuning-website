import React, { useState } from 'react';
import './Contact.css';
import iphoneImage from '../../assets/iphone.png'; // ← corect: ../../assets/iphone.png

const Contact = () => {
  const phoneNumber = '0747 802 610';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(phoneNumber.replace(/\s/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber.replace(/\s/g, '')}`;
  };

  return (
    <section className="contact-section">
      <div className="container contact-container">
        {/* Stânga – imagine iPhone */}
        <div className="iphone-image-container">
          <div className="iphone-image-wrapper">
            <img src={iphoneImage} alt="iPhone 17 Pro Max Silver" className="iphone-image" />
            <div 
              className="call-overlay" 
              onClick={handleCall}
              title="Apasă pentru a suna"
            ></div>
          </div>
          <p className="iphone-caption">📱 Apasă pe ecran pentru a ne suna direct</p>
        </div>

        {/* Dreapta – informații contact */}
        <div className="contact-info">
          <h1 className="contact-title">Contactează-ne</h1>
          <p className="contact-text">
            Ai întrebări despre un pachet de tuning? Vrei o programare? Sună-ne sau trimite un mesaj.
          </p>
          <div className="contact-details">
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <div>
                <strong>Telefon</strong>
                <a href={`tel:${phoneNumber.replace(/\s/g, '')}`}>{phoneNumber}</a>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">✉️</span>
              <div>
                <strong>Email</strong>
                <a href="mailto:contact@ajperformance.ro">contact@ajperformance.ro</a>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <div>
                <strong>Locație</strong>
                <span>Str. Dunării nr.1 , Ineu, Arad</span>
              </div>
            </div>
          </div>
          <div className="contact-actions">
            <button className="call-button" onClick={handleCall}>Sună acum</button>
            <button className="copy-button" onClick={handleCopy}>
              {copied ? 'Copiat! ✓' : 'Copiază numărul'}
            </button>
          </div>
          <div className="contact-social">
            <p>Urmărește-ne și pe rețele sociale:</p>
            <div className="social-links">
              <a href="https://www.instagram.com/alexandru.j1/" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://www.linkedin.com/in/alexandru-daniel-jurjița-a255863b2" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;