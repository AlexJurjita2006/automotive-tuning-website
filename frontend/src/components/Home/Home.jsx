import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
// Importă clientul tău Supabase – ajustează calea
import { supabase } from '../../api/client'; // sau oricum ai configurat

const Home = () => {
  const navigate = useNavigate();
  // Stări pentru selector
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [generations, setGenerations] = useState([]);
  const [engines, setEngines] = useState([]);

  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedGeneration, setSelectedGeneration] = useState('');
  const [selectedEngine, setSelectedEngine] = useState('');

  const [loading, setLoading] = useState(false);

  // 1. Încarcă lista de branduri unice la montare
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const pageSize = 1000;
        let from = 0;
        let allRows = [];

        while (true) {
          const { data, error } = await supabase
            .from('masini')
            .select('brand')
            .not('brand', 'is', null)
            .order('brand', { ascending: true })
            .range(from, from + pageSize - 1);

          if (error) throw error;
          if (!data || data.length === 0) break;

          allRows = allRows.concat(data);
          if (data.length < pageSize) break;
          from += pageSize;
        }

        const uniqueBrands = [...new Set(allRows.map(item => String(item.brand || '').trim()).filter(Boolean))];
        setBrands(uniqueBrands);
      } catch (error) {
        console.error('Eroare la încărcarea brandurilor:', error);
      }
    };
    fetchBrands();
  }, []);

  // 2. Când se schimbă brandul, încarcă modelele distincte pentru acel brand
  useEffect(() => {
    if (!selectedBrand) {
      setModels([]);
      setSelectedModel('');
      return;
    }
    const fetchModels = async () => {
      const { data, error } = await supabase
        .from('masini')
        .select('model')
        .eq('brand', selectedBrand)
        .order('model');
      if (error) console.error(error);
      else {
        const uniqueModels = [...new Map(data.map(item => [item.model, item.model])).values()];
        setModels(uniqueModels);
      }
    };
    fetchModels();
  }, [selectedBrand]);

  // 3. Când se schimbă modelul, încarcă generațiile distincte
  useEffect(() => {
    if (!selectedBrand || !selectedModel) {
      setGenerations([]);
      setSelectedGeneration('');
      return;
    }
    const fetchGenerations = async () => {
      const { data, error } = await supabase
        .from('masini')
        .select('generatie')
        .eq('brand', selectedBrand)
        .eq('model', selectedModel)
        .order('generatie');
      if (error) console.error(error);
      else {
        const uniqueGens = [...new Map(data.map(item => [item.generatie, item.generatie])).values()];
        setGenerations(uniqueGens);
      }
    };
    fetchGenerations();
  }, [selectedBrand, selectedModel]);

  // 4. Când se schimbă generația, încarcă motorizările distincte
  useEffect(() => {
    if (!selectedBrand || !selectedModel || !selectedGeneration) {
      setEngines([]);
      setSelectedEngine('');
      return;
    }
    const fetchEngines = async () => {
      const { data, error } = await supabase
        .from('masini')
        .select('motorizare')
        .eq('brand', selectedBrand)
        .eq('model', selectedModel)
        .eq('generatie', selectedGeneration)
        .order('motorizare');
      if (error) console.error(error);
      else {
        const uniqueEngines = [...new Map(data.map(item => [item.motorizare, item.motorizare])).values()];
        setEngines(uniqueEngines);
      }
    };
    fetchEngines();
  }, [selectedBrand, selectedModel, selectedGeneration]);

  // Funcția de căutare a datelor complete pentru mașina selectată
  const handleEstimate = async (e) => {
    e.preventDefault();
    if (!selectedBrand || !selectedModel || !selectedGeneration || !selectedEngine) {
      alert('Te rog completează toate câmpurile.');
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('masini')
        .select('*')
        .eq('brand', selectedBrand)
        .eq('model', selectedModel)
        .eq('generatie', selectedGeneration)
        .eq('motorizare', selectedEngine)
        .single();
      if (error) throw error;
      // Poți calcula un câștig estimat (exemplu: +30% CP și +25% cuplu)
      const powerGain = Math.round(data.cp_stock * 0.3);
      const torqueGain = Math.round(data.cuplu_stock * 0.25);
      const resultData = {
        ...data,
        power_gain: powerGain,
        torque_gain: torqueGain,
        estimated_price: 2500 // sau poți calcula dinamic
      };
      navigate('/rezultate', { state: { tuningData: resultData } });
    } catch (err) {
      console.error(err);
      alert('Nu am găsit date pentru combinația selectată.');
    } finally {
      setLoading(false);
    }
  };

  // --- Pagina principală cu toate secțiunile (Hero, formular, statistici, carduri, hartă) ---
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="home-hero">
        <div className="home-hero-overlay"></div>
        <div className="container home-hero-container">
          <div className="home-hero-content">
            <span className="home-hero-badge">Since 2015 • Performance Tuning</span>
            <h1 className="home-hero-title">
              AJ <span>Performance</span>
            </h1>
            <p className="home-hero-description">
              Crește puterea, îmbunătățește manevrabilitatea și domină asfaltul.
              <br />Pachete personalizate pentru orice mașină.
            </p>
            <div className="home-hero-buttons">
              <button className="btn-primary" onClick={() => navigate('/services')}>Vezi oferte</button>
              <button className="btn-secondary" onClick={() => navigate('/contact')}>Contact rapid</button>
            </div>
          </div>
        </div>
        <div className="home-scroll-indicator">
          <span></span>
        </div>
      </section>

      {/* ===== FORMULAR SELECTOR MAȘINĂ (CarSelector) ===== */}
      <section className="home-estimate">
        <div className="container">
          <div className="home-estimate-card">
            <h2 className="home-estimate-title">
              Estimează-ți <span>potențialul</span>
            </h2>
            <p className="home-estimate-subtitle">
              Spune-ne ce mașină ai și îți recomandăm cel mai bun pachet de tuning
            </p>
            <form onSubmit={handleEstimate} className="home-estimate-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Marca</label>
                  <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)} required>
                    <option value="">Alege Brand</option>
                    {brands.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Model</label>
                  <select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)} required disabled={!selectedBrand}>
                    <option value="">Alege Model</option>
                    {models.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Generație</label>
                  <select value={selectedGeneration} onChange={(e) => setSelectedGeneration(e.target.value)} required disabled={!selectedModel}>
                    <option value="">Alege Generație</option>
                    {generations.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Motorizare</label>
                  <select value={selectedEngine} onChange={(e) => setSelectedEngine(e.target.value)} required disabled={!selectedGeneration}>
                    <option value="">Alege Motorizare</option>
                    {engines.map(e => <option key={e} value={e}>{e}</option>)}
                  </select>
                </div>
              </div>
              <button type="submit" className="btn-estimate" disabled={loading}>
                {loading ? 'Se procesează...' : 'Estimează 🔥'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ===== STATISTICI ===== */}
      <section className="home-stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item"><h3>500+</h3><p>Mașini tunate</p></div>
            <div className="stat-item"><h3>+35%</h3><p>Putere medie</p></div>
            <div className="stat-item"><h3>24 luni</h3><p>Garanție</p></div>
            <div className="stat-item"><h3>4.9 ★</h3><p>Rating clienți</p></div>
          </div>
        </div>
      </section>

      {/* ===== CARDURI CUNOȘTINȚE ===== */}
      <section className="home-knowledge">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Învață de la profesioniști</span>
            <h2>Tot ce trebuie să știi despre <span>tuning</span></h2>
          </div>
          <div className="knowledge-grid">
            <div className="knowledge-card"><div className="card-icon">⚡</div><h3>ECU Remap</h3><p>Optimizare soft pentru cai putere și cuplu maxim.</p></div>
            <div className="knowledge-card"><div className="card-icon">🔧</div><h3>Performance Parts</h3><p>Turbo, evacuare, admisie, intercooler – componente premium.</p></div>
            <div className="knowledge-card"><div className="card-icon">🏎️</div><h3>Suspensii sport</h3><p>Coilovere, bare stabilizatoare, geometrie performantă.</p></div>
          </div>
        </div>
      </section>

      {/* ===== HARTĂ / Locație ===== */}
      <section className="home-map">
        <div className="container">
          <div className="map-content">
            <h2>Vino să ne cunoști</h2>
            <p>Str. Iuliu Maniu nr.1, Ineu, Arad • Program: Luni – Sâmbătă 09:00 – 19:00</p>
            <button
              className="btn-primary"
              onClick={() => window.open('https://maps.app.goo.gl/34CkJqQWmmEoVGm26', '_blank', 'noopener,noreferrer')}
            >
              Deschide în Google Maps
            </button>
          </div>
          <div className="map-placeholder">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d343.7661889534399!2d21.83318380583969!3d46.4263125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4745f75a99bce933%3A0x43fde3f2cfce879e!2sStr.%20Iuliu%20Maniu%201%2C%20315300%20Ineu!5e0!3m2!1sro!2sro!4v1775729663069!5m2!1sro!2sro"
              width="100%" 
              height="300" 
              style={{ border: 0, borderRadius: '20px' }} 
              allowFullScreen="" 
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Locație AJ Performance"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;