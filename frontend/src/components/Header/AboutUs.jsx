import React, { useEffect, useRef } from 'react';
import './AboutUs.css';
// Import corect al imaginii tale din src/assets/
import myPhoto from '../../assets/alexandru.png'; // ajustează calea dacă e nevoie

const AboutUs = () => {
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.3 }
    );

    const elements = document.querySelectorAll('.stat-number, .about-image, .about-content');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="about-section">
      <div className="container about-container">
        {/* Stânga – poza ta cu efect de glow */}
        <div className="about-image" style={{ width: 'fit-content', marginLeft: 0, marginRight: 'auto' }}>
  <img 
    src={myPhoto} 
    alt="Alexandru Jurjița - fondator AJ Performance" 
    style={{ width: '280px', borderRadius: '20px' }}
  />
  <div className="image-glow"></div>
</div>

        {/* Dreapta – conținut extins */}
        <div className="about-content">
          <span className="about-tag">Povestea noastră</span>
          <h1 className="about-title">Despre <span>mine</span></h1>
          
          <div className="about-text">
            <p>
              Sunt <strong>Alexandru Jurjița</strong>, pasionat de mașini și tuning încă din copilărie. 
              Am fondat <strong>AJ Performance</strong> pentru a oferi soluții personalizate de creștere a puterii 
              și fiabilității, folosind echipamente profesioniste și softuri premium.
            </p>
            <p>
              Fiecare mașină este tratată individual – de la stage 1 până la pachete complete cu turbo, 
              evacuare și suspensii. Rezultatele sunt măsurate pe banc dinamometric, iar clienții mei 
              beneficiază de suport permanent.
            </p>
          </div>

          {/* Statistici personale */}
          <div className="personal-stats">
            <div className="stat-item">
              <span className="stat-number" data-target="150">0</span>
              <span className="stat-label">+ mașini tunate</span>
            </div>
            <div className="stat-item">
              <span className="stat-number" data-target="12">0</span>
              <span className="stat-label">ani experiență</span>
            </div>
            <div className="stat-item">
              <span className="stat-number" data-target="98">0</span>
              <span className="stat-label">% clienți mulțumiți</span>
            </div>
          </div>

          {/* Link-uri sociale cu logo-uri (stilizate) */}
          <div className="social-links">
            <a href="https://www.instagram.com/alexandru.j1/" target="_blank" rel="noopener noreferrer" className="social-link insta">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
              <span>Instagram</span>
            </a>
            <a href="https://www.linkedin.com/in/alexandru-daniel-jurjița-a255863b2" target="_blank" rel="noopener noreferrer" className="social-link linkedin">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.204 0 22.225 0z"/>
              </svg>
              <span>LinkedIn</span>
            </a>
          </div>

          {/* Program și hartă într-un grid */}
          <div className="info-grid">
            <div className="schedule">
              <h3>📅 Program AJ Performance</h3>
              <ul>
                <li><span>Luni – Vineri:</span> 09:00 – 19:00</li>
                <li><span>Sâmbătă:</span> 10:00 – 15:00</li>
                <li><span>Duminică:</span> Închis</li>
              </ul>
            </div>

            <div className="about-map">
              <h3>📍 Unde ne găsești</h3>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2848.123456789!2d26.1025!3d44.4268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDTCsDI1JzM2LjUiTiAyNsKwMDYnMTUuMCJF!5e0!3m2!1sro!2sro!4v1234567890"
                width="100%"
                height="200"
                style={{ border: 0, borderRadius: '16px' }}
                allowFullScreen=""
                loading="lazy"
                title="Locație AJ Performance"
              ></iframe>
              <p className="map-address">Str. Dunării nr. 1, Ineu, Arad</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;