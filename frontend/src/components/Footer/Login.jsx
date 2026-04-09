import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import './Login.css';

// Import imagini
import giftIcon from '../../assets/gift-icon.png';
import coupon1Img from '../../assets/coupon-1.png';
import coupon2Img from '../../assets/coupon-2.png';
import coupon3Img from '../../assets/coupon-3.png';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [infoMessage, setInfoMessage] = useState('');
  const navigate = useNavigate();

  // Cele 3 cupoane cu textele cerute
  const coupons = [
    {
      id: 1,
      image: coupon1Img,
      text: "FELICITĂRI! Ai găsit Pistonul de Aur. FĂ UN SCREENSHOT ACUM! 📸 Acest cupon îți oferă 10% reducere la orice lucrare de tuning motor. Arată-ne poza la recepție înainte să expire sesiunea!"
    },
    {
      id: 2,
      image: coupon2Img,
      text: "FLASH SALE! 🔥 Ai prins flacăra! SCREENSHOT REPEDE înainte să se stingă! Ai 200 RON cadou pentru un sistem de evacuare nou sau modificări de sunet. Valabil în service pe baza acestei capturi de ecran!"
    },
    {
      id: 3,
      image: coupon3Img,
      text: "VIGILENȚĂ MAXIMĂ! 🛠️ Ai găsit cheia pierdută de toți mecanicii. FĂ UN SCREENSHOT înainte să dispară din nou! Acest cupon îți aduce o DIAGNOZĂ GRATUITĂ. Arată-ne ecranul telefonului când ajungi la noi!"
    }
  ];

  const getRandomCoupon = () => {
    const randomIndex = Math.floor(Math.random() * coupons.length);
    return coupons[randomIndex];
  };

  const handleGiftClick = () => {
    const coupon = getRandomCoupon();
    setSelectedCoupon(coupon);
    setShowCouponModal(true);
  };

  const closeModal = () => {
    setShowCouponModal(false);
    setSelectedCoupon(null);
  };

  // Verifică sesiunea curentă (persistență)
  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        // NU mai facem navigate - rămânem pe Login
      }
    };
    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    return () => subscription?.unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin + window.location.pathname } // rămâne pe aceeași pagină
      });
      if (error) throw error;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      setLoading(true);
      setError('');
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: { redirectTo: window.location.origin + window.location.pathname }
      });
      if (error) throw error;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Header-ul cu profil (apare doar dacă user există)
  const UserHeader = () => {
    if (!user) return null;
    return (
      <div className="user-header">
        <div className="user-header-left">
          {user.user_metadata?.avatar_url && (
            <img src={user.user_metadata.avatar_url} alt="avatar" className="user-header-avatar" />
          )}
          <div className="user-header-info">
            <span className="user-header-name">{user.user_metadata?.full_name || user.email}</span>
            <span className="user-header-email">{user.email}</span>
          </div>
        </div>
        <button onClick={handleLogout} className="user-header-logout" disabled={loading}>
          {loading ? '...' : 'Deconectare'}
        </button>
      </div>
    );
  };

  return (
    <div className="login-page">
      <div className="iphone-container">
      <div className="iphone-notch"></div>
      <div className="iphone-dynamic-island"></div>
      
      {/* Header dinamic cu profil */}
      <UserHeader />

      {/* Card principal */}
      <div className="login-card">
        <div className="login-header">
          <div className="logo-icon">AJ</div>
          {!user ? (
            <>
              <h1>Autentificare</h1>
              <p>Conectează-te cu contul tău social</p>
            </>
          ) : (
            <>
              <h1>Bine ai revenit!</h1>
              <p>Ești autentificat</p>
            </>
          )}
        </div>

        {error && (
          <div className="error-message">
            <span>⚠️ {error}</span>
          </div>
        )}

        {!user ? (
          <>
            <div className="login-buttons">
              <button onClick={handleGoogleLogin} className="btn-google" disabled={loading}>
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continuă cu Google
              </button>

              <button onClick={handleFacebookLogin} className="btn-facebook" disabled={loading}>
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Continuă cu Facebook
              </button>
            </div>
            <div className="login-footer">
              <p>Prin conectare, ești de acord cu termenii noștri de utilizare.</p>
              <p className="win-prize">🍀 Apasă pe cadou și câștigă un cupon surpriză!</p>
            </div>
          </>
        ) : null}
      </div>

      <div className="iphone-home-bar"></div>

      {/* Popup cupon */}
      {showCouponModal && selectedCoupon && (
        <div className="coupon-modal-overlay" onClick={closeModal}>
          <div className="coupon-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeModal}>✖</button>
            <h3>🎁 CUPONUL TĂU SPECIAL 🎁</h3>
            <div className="coupon-text">{selectedCoupon.text}</div>
            <img src={selectedCoupon.image} alt="Cupon" className="coupon-image" />
            <button className="claim-btn" onClick={closeModal}>Închide</button>
          </div>
        </div>
      )}

      {/* Toast informativ */}
      {infoMessage && <div className="info-toast">{infoMessage}</div>}
      </div>

      {/* Buton cadou în afara telefonului */}
      <div className="gift-icon-large" onClick={handleGiftClick}>
        <img src={giftIcon} alt="Gift" onError={(e) => { e.target.src = 'https://via.placeholder.com/70?text=🎁'; }} />
      </div>
    </div>
  );
};

export default Login;