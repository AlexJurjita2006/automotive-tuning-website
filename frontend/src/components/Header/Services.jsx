import React, { useState, useEffect, useRef } from 'react';
import './Services.css';

const Services = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', carModel: '', message: '' });
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  const categories = [
    { id: 'all', name: 'Toate serviciile' },
    { id: 'engine', name: 'Motor & Tuning' },
    { id: 'exhaust', name: 'Evacuare & DPF' },
    { id: 'gearbox', name: 'Cutie de viteze' },
    { id: 'diagnostic', name: 'Diagnostic & Teste' }
  ];

  const services = [
    {
      id: 1,
      name: 'Stage 1 Remap',
      category: 'engine',
      icon: '⚡',
      shortDesc: 'Optimizare soft motor pentru putere și cuplu sporit.',
      gains: '+25-35 CP | +50-70 Nm',
      duration: '2-3 ore',
      price: '450 €',
      techDetails: 'Remap pe dyno, verificare presiune turbo, limitare turație adaptată.',
      longDesc: 'Stage 1 este cea mai sigură metodă de a crește performanțele fără modificări hardware. Păstrăm marjele de siguranță ale motorului.',
      imagePlaceholder: '🚗'
    },
    {
      id: 2,
      name: 'Stage 2 Remap',
      category: 'engine',
      icon: '🔥',
      shortDesc: 'Remap avansat pentru componente upgrate (dpf off, evacuare sport).',
      gains: '+60-90 CP | +100-130 Nm',
      duration: '4-5 ore',
      price: '650 €',
      techDetails: 'Necesită intercooler îmbunătățit, evacuare liberă, admisie sport.',
      longDesc: 'Pentru pasionații care vor maximum de fiabilitate și putere. Configurare personalizată pe dyno.',
      imagePlaceholder: '🏎️'
    },
    {
      id: 3,
      name: 'DPF / EGR Off',
      category: 'exhaust',
      icon: '🛠️',
      shortDesc: 'Anulare soft DPF, EGR, AdBlue. Elimină regenerările problematice.',
      gains: 'Scădere consum 5-10%',
      duration: '2 ore',
      price: '250 €',
      techDetails: 'Software personalizat, păstrare funcții motor esențiale.',
      longDesc: 'Recomandat pentru mașini cu DPF înfundat frecvent. Fără erori în bord, trece ITP-ul (soft).',
      imagePlaceholder: '💨'
    },
    {
      id: 4,
      name: 'Diagnoză ECU completă',
      category: 'diagnostic',
      icon: '📟',
      shortDesc: 'Verificare totală a unității de comandă, senzori și actuatori.',
      gains: 'Raport detaliat + resetări service',
      duration: '1.5 ore',
      price: '120 €',
      techDetails: 'Citire parametri în timp real, test injectoare, test compresie.',
      longDesc: 'Identificăm erori ascunse, performanța motorului, recomandări de service.',
      imagePlaceholder: '🔍'
    },
    {
      id: 5,
      name: 'DSG / TCM Tuning',
      category: 'gearbox',
      icon: '⚙️',
      shortDesc: 'Optimizare cutie automată (DSG, ZF, DCT).',
      gains: 'Schimbări +30% mai rapide',
      duration: '2.5 ore',
      price: '350 €',
      techDetails: 'Creștere presiune ambreiaj, rev matching, launch control îmbunătățit.',
      longDesc: 'Elimină întârzierile la kickdown, schimbări mai ferme și rapide.',
      imagePlaceholder: '🏁'
    },
    {
      id: 6,
      name: 'Rolling Road Test',
      category: 'diagnostic',
      icon: '📊',
      shortDesc: 'Măsurare putere și cuplu pe banc dinamometric.',
      gains: 'Grafic comparativ înainte/după',
      duration: '1 oră',
      price: '180 €',
      techDetails: 'Putere la roată, pierderi transmisie, raport aer/combustibil.',
      longDesc: 'Certificat oficial de performanță. Ideal pentru a verifica îmbunătățirile reale.',
      imagePlaceholder: '📈'
    },
    {
      id: 7,
      name: 'Sistem evacuare sport',
      category: 'exhaust',
      icon: '🎵',
      shortDesc: 'Montaj evacuare inox, valvă comandabilă, downpipe.',
      gains: '+10-15 CP | sunet profund',
      duration: '3-4 ore',
      price: '400-900 €',
      techDetails: 'Diametre mărite, material T304, flanșe CNC.',
      longDesc: 'Personalizăm sunetul după preferințe – de la sportiv la agresiv.',
      imagePlaceholder: '🔊'
    },
    {
      id: 8,
      name: 'Turbo Upgrade & Software',
      category: 'engine',
      icon: '🔄',
      shortDesc: 'Înlocuire turbo + remap dedicat pentru putere mare.',
      gains: '+120-250 CP',
      duration: '2 zile',
      price: 'de la 1800 €',
      techDetails: 'Garrett, BorgWarner, hibrid, actuator control.',
      longDesc: 'Pentru mașini de cursă sau daily driver cu pretenții. Configurație completă.',
      imagePlaceholder: '💪'
    }
  ];

  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(s => s.category === activeCategory);

  const openModal = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedService(null);
    setFormData({ name: '', email: '', carModel: '', message: '' });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitQuote = (e) => {
    e.preventDefault();
    alert(`Cerere trimisă pentru ${selectedService.name}. Te vom contacta în 24h.`);
    closeModal();
  };

  // Observator pentru statistici la scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="services-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Servicii de Tuning Profesional</h1>
          <p>Peste 10 ani de experiență în performanță auto. Soluții personalizate pentru orice motor.</p>
          <div className="hero-stats">
            <div className="hero-stat"><span>1500+</span> Mașini tunate</div>
            <div className="hero-stat"><span>98%</span> Clienți mulțumiți</div>
            <div className="hero-stat"><span>24/7</span> Suport tehnic</div>
          </div>
        </div>
        <div className="scroll-indicator">▼</div>
      </section>

      {/* Filtre */}
      <div className="filter-bar">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Grid servicii */}
      <div className="services-grid">
        {filteredServices.map(service => (
          <div className="service-card" key={service.id} data-category={service.category}>
            <div className="card-icon">{service.icon}</div>
            <h3>{service.name}</h3>
            <p className="short-desc">{service.shortDesc}</p>
            <div className="tech-specs">
              <span className="gains">📈 {service.gains}</span>
              <span className="duration">⏱️ {service.duration}</span>
            </div>
            <div className="price-tag">{service.price}</div>
            <button className="quote-btn" onClick={() => openModal(service)}>Solicită ofertă</button>
            <div className="card-hover-details">
              <p>{service.longDesc}</p>
              <small>{service.techDetails}</small>
            </div>
          </div>
        ))}
      </div>

      {/* Secțiune statistici animate */}
      <div className="stats-section" ref={statsRef}>
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-number" data-target="1240">0</div>
            <p>Mașini tunate</p>
          </div>
          <div className="stat-item">
            <div className="stat-number" data-target="15">0</div>
            <p>Ani experiență</p>
          </div>
          <div className="stat-item">
            <div className="stat-number" data-target="3800">0</div>
            <p>Remapuri realizate</p>
          </div>
          <div className="stat-item">
            <div className="stat-number" data-target="100">0</div>
            <p>Parteneri service</p>
          </div>
        </div>
      </div>

      {/* CTA final */}
      <div className="cta-banner">
        <h2>Pregătește-ți mașina pentru performanță maximă</h2>
        <p>Consultare gratuită și ofertă personalizată în 24 de ore.</p>
        <button className="cta-button" onClick={() => document.querySelector('.filter-btn')?.scrollIntoView({ behavior: 'smooth' })}>
          Programează-te acum
        </button>
      </div>

      {/* Modal cerere ofertă */}
      {showModal && selectedService && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>✖</button>
            <h3>Cerere ofertă pentru <span>{selectedService.name}</span></h3>
            <form onSubmit={handleSubmitQuote}>
              <input type="text" name="name" placeholder="Nume complet" value={formData.name} onChange={handleInputChange} required />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
              <input type="text" name="carModel" placeholder="Model mașină (ex: BMW E90 330d)" value={formData.carModel} onChange={handleInputChange} required />
              <textarea name="message" placeholder="Detalii suplimentare (opțional)" rows="3" value={formData.message} onChange={handleInputChange}></textarea>
              <button type="submit" className="submit-quote">Trimite cererea</button>
            </form>
          </div>
        </div>
      )}

      {/* Script pentru numărare statistici */}
      <script dangerouslySetInnerHTML={{
        __html: `
          if (window.innerWidth > 768) {
            const animateNumbers = () => {
              const statNumbers = document.querySelectorAll('.stat-number');
              statNumbers.forEach(el => {
                const target = parseInt(el.getAttribute('data-target'));
                let current = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                  current += increment;
                  if (current >= target) {
                    el.innerText = target.toLocaleString();
                    clearInterval(timer);
                  } else {
                    el.innerText = Math.floor(current).toLocaleString();
                  }
                }, 30);
              });
            };
            const observerStats = new IntersectionObserver((entries) => {
              if (entries[0].isIntersecting) {
                animateNumbers();
                observerStats.disconnect();
              }
            }, { threshold: 0.5 });
            const statsSection = document.querySelector('.stats-section');
            if (statsSection) observerStats.observe(statsSection);
          }
        `
      }} />
    </div>
  );
};

export default Services;