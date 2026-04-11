import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import "./Rezultate.css";

const Rezultate = () => {
  const { id } = useParams();
  const location = useLocation();
  const tuningDataFromState = location.state?.tuningData;
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tuned, setTuned] = useState({ cp: 0, torque: 0 });
  const [gainData, setGainData] = useState({ powerPercent: 0, torquePercent: 0 });
  const [showBrandLogo, setShowBrandLogo] = useState(true);

  const getSafeLogoUrl = (rawUrl) => {
    if (!rawUrl) return "";
    const normalized = String(rawUrl).trim();
    if (!normalized) return "";
    if (normalized.startsWith("http://") || normalized.startsWith("https://")) return normalized;
    if (normalized.startsWith("//")) return `https:${normalized}`;
    return normalized;
  };

  const safeLogoUrl = getSafeLogoUrl(car?.logo_url);

  useEffect(() => {
    setShowBrandLogo(true);
  }, [car?.logo_url]);

  useEffect(() => {
    if (tuningDataFromState) {
      setCar(tuningDataFromState);
      calculateTune(tuningDataFromState);
      setLoading(false);
      return;
    }

    const fetchCar = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("masini")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setCar(data);
        calculateTune(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCar();
    } else {
      setLoading(false);
      setError("Nu s-au primit date pentru rezultat. Revino la selector și apasă din nou pe Estimează.");
    }
  }, [id, tuningDataFromState]);

  const calculateTune = (carData) => {
    // Extrage capacitatea motorului (ex: "1998 cmc")
    const displacementMatch = carData.motorizare?.match(/(\d+)/);
    const displacement = displacementMatch ? parseInt(displacementMatch[0]) : 2000;

    // Factori de capacitate
    let capacityFactor;
    if (displacement < 1600) capacityFactor = 0.18;
    else if (displacement < 2000) capacityFactor = 0.16;
    else if (displacement < 2500) capacityFactor = 0.14;
    else if (displacement < 3000) capacityFactor = 0.12;
    else capacityFactor = 0.10;

    // Factor motor după tip
    const tipMotor = carData.tip_motor?.toLowerCase() || "";
    let engineFactor;
    if (tipMotor.includes("benzina") && tipMotor.includes("turbo")) engineFactor = 1.2;
    else if (tipMotor.includes("benzina")) engineFactor = 0.9;
    else if (tipMotor.includes("diesel")) engineFactor = 1.1;
    else engineFactor = 1.0;

    const powerGain = capacityFactor * engineFactor;
    const cpTuned = Math.round(carData.cp_stock * (1 + powerGain));
    const torqueTuned = Math.round(carData.cuplu_stock * (1 + powerGain * 1.1));

    const powerPercent = ((cpTuned - carData.cp_stock) / carData.cp_stock * 100).toFixed(1);
    const torquePercent = ((torqueTuned - carData.cuplu_stock) / carData.cuplu_stock * 100).toFixed(1);

    setTuned({ cp: cpTuned, torque: torqueTuned });
    setGainData({ powerPercent, torquePercent });
  };

  if (loading) {
    return (
      <div className="rezultate-loader">
        <div className="spinner"></div>
        <p>Se calculează potențialul de tuning...</p>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="rezultate-error">
        <h2>⚠️ Eroare la încărcarea datelor</h2>
        <p>{error || "Mașina nu a fost găsită în baza de date."}</p>
        <Link to="/" className="btn-back">Înapoi la catalog</Link>
      </div>
    );
  }

  const stockPower = car.cp_stock;
  const stockTorque = car.cuplu_stock;
  const gainPower = tuned.cp - stockPower;
  const gainTorque = tuned.torque - stockTorque;

  // Calcul procent pentru bara de progres
  const powerIncreasePercent = ((gainPower / stockPower) * 100).toFixed(1);
  const torqueIncreasePercent = ((gainTorque / stockTorque) * 100).toFixed(1);

  const rpmLabels = [1500, 2500, 3500, 4500, 6000];
  const stockShape = [0.45, 0.68, 0.86, 1, 0.9];
  const tunedShape = [0.5, 0.74, 0.92, 1, 0.93];

  const stockCurve = stockShape.map((factor) => Math.round(stockPower * factor));
  const tunedCurve = tunedShape.map((factor) => Math.round(tuned.cp * factor));

  const rawChartMax = Math.max(...tunedCurve, ...stockCurve);
  const chartMax = Math.ceil((rawChartMax * 1.1) / 10) * 10;
  const chartTicks = [
    chartMax,
    Math.round(chartMax * 0.75),
    Math.round(chartMax * 0.5),
    Math.round(chartMax * 0.25),
    0,
  ];

  const toY = (value) => ((chartMax - value) / chartMax) * 100;
  const toX = (index) => (index / (rpmLabels.length - 1)) * 100;

  const stockPoints = stockCurve.map((value, index) => `${toX(index)},${toY(value)}`).join(" ");
  const tunedPoints = tunedCurve.map((value, index) => `${toX(index)},${toY(value)}`).join(" ");

  return (
    <div className="stage1-container">
      {/* Header cu efect de gradient */}
      <div className="stage1-header">
        <div className="stage1-header-main">
          {safeLogoUrl && showBrandLogo && (
            <div className="brand-logo-wrapper">
              <img
                src={safeLogoUrl}
                alt={`Logo ${car.brand}`}
                className="brand-logo"
                onError={(event) => {
                  console.error("Logo failed to load:", {
                    brand: car.brand,
                    logo_url: car.logo_url,
                    resolved_url: safeLogoUrl,
                    native_error: event?.nativeEvent?.message || "unknown"
                  });
                  setShowBrandLogo(false);
                }}
              />
            </div>
          )}

          <div className="header-content">
            <h1>
              <span className="stage-badge">Stage 1</span>
              {car.brand} {car.model} {car.generatie}
            </h1>
            <div className="car-specs">
              <span className="spec">{car.motorizare}</span>
              <span className="spec-separator">•</span>
              <span className="spec">{car.tip_motor}</span>
              <span className="spec-separator">•</span>
              <span className="spec">ECU Remap</span>
            </div>
          </div>
        </div>
        <div className="header-pattern"></div>
      </div>

      {/* Comparație Before / After */}
      <div className="comparison-grid">
        {/* Before */}
        <div className="comparison-card stock-card">
          <div className="card-label">Stock (din fabrică)</div>
          <div className="power-main">
            <span className="power-number">{stockPower}</span>
            <span className="power-unit">CP</span>
          </div>
          <div className="torque-secondary">
            <span className="torque-value">{stockTorque}</span>
            <span className="torque-unit">Nm</span>
          </div>
          <div className="card-footer">Specificații OEM</div>
        </div>

        {/* After */}
        <div className="comparison-card tuned-card">
          <div className="card-label">Optimizat Stage 1</div>
          <div className="power-main">
            <span className="power-number highlight">{tuned.cp}</span>
            <span className="power-unit">CP</span>
          </div>
          <div className="torque-secondary">
            <span className="torque-value highlight">{tuned.torque}</span>
            <span className="torque-unit">Nm</span>
          </div>
          <div className="card-footer">
            <span className="gain-badge">+{gainPower} CP</span>
            <span className="gain-badge">+{gainTorque} Nm</span>
          </div>
        </div>
      </div>

      {/* Grafic de creștere (simulat cu CSS) */}
      <div className="performance-chart">
        <h3>Curba de putere estimată (Stage 1)</h3>
        <div className="chart-container">
          <div className="chart-y-axis">
            <span>CP</span>
            {chartTicks.map((tickValue, index) => (
              <span key={`tick-${index}`}>{tickValue}</span>
            ))}
          </div>
          <div className="chart-area">
            <div className="chart-grid-lines">
              {chartTicks.slice(0, -1).map((tickValue) => (
                <span key={`grid-${tickValue}`} style={{ top: `${toY(tickValue)}%` }}></span>
              ))}
            </div>
            <svg className="power-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-label="Grafic putere stock și Stage 1">
              <polyline points={stockPoints} className="curve-stock" />
              <polyline points={tunedPoints} className="curve-tuned" />

              {stockCurve.map((value, index) => (
                <circle key={`stock-point-${index}`} className="curve-point stock-point" cx={toX(index)} cy={toY(value)} r="1.4" />
              ))}
              {tunedCurve.map((value, index) => (
                <circle key={`tuned-point-${index}`} className="curve-point tuned-point" cx={toX(index)} cy={toY(value)} r="1.6" />
              ))}
            </svg>

            <div className="chart-legend">
              <span><i className="legend-dot stock-dot"></i> Stock</span>
              <span><i className="legend-dot tuned-dot"></i> Stage 1</span>
            </div>

            <div className="chart-x-axis">
              {rpmLabels.map((rpmValue) => (
                <span key={`rpm-${rpmValue}`}>{rpmValue}</span>
              ))}
              <span>RPM</span>
            </div>
          </div>
        </div>
        <p className="chart-note">
          *Estimare bazată pe caracteristicile motorului și resoftare neagresivă.
        </p>
      </div>

      {/* Statistici detaliate */}
      <div className="stats-container">
        <div className="stat-item">
          <div className="stat-header">
            <span>⚡ Putere maximă</span>
            <span className="stat-value">{tuned.cp} CP</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${100}%` }}></div>
          </div>
          <div className="stat-delta">+{gainPower} CP (+{powerIncreasePercent}%)</div>
        </div>
        <div className="stat-item">
          <div className="stat-header">
            <span>🔧 Cuplu maxim</span>
            <span className="stat-value">{tuned.torque} Nm</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill torque-fill" style={{ width: `${100}%` }}></div>
          </div>
          <div className="stat-delta">+{gainTorque} Nm (+{torqueIncreasePercent}%)</div>
        </div>
      </div>

      {/* Notă tehnică și recomandări */}
      <div className="tech-note">
        <div className="note-icon">📋</div>
        <div className="note-content">
          <h4>Optimizare responsabilă</h4>
          <p>
            Această estimare presupune o resoftare ECU în parametri de siguranță, 
            fără modificări hardware. Se menține fiabilitatea motorului și a 
            componentelor auxiliare. Valorile reale pot varia în funcție de 
            combustibil și condițiile de testare.
          </p>
          <p className="note-recommendation">
            ✅ Recomandăm verificarea pe stand dyno pentru confirmare.
          </p>
        </div>
      </div>

      {/* Butoane de acțiune */}
      <div className="action-buttons">
        <Link to="/" className="btn-primary">← Înapoi la catalog</Link>
        <button className="btn-outline" onClick={() => window.print()}>
          🖨️ Salvează raport (PDF)
        </button>
      </div>
    </div>
  );
};

export default Rezultate;