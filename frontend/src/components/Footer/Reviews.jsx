import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import './Reviews.css';

const Reviews = () => {
  const REVIEWS_TABLE = 'reviews';
  const [reviews, setReviews] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [formData, setFormData] = useState({ name: '', rating: 5, comment: '' });
  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from(REVIEWS_TABLE)
          .select('id, name, rating, comment, created_at')
          .order('created_at', { ascending: false });

        if (error) throw error;

        const normalized = (data || []).map((item) => ({
          id: item.id,
          name: item.name,
          rating: Number(item.rating),
          comment: item.comment,
          date: new Date(item.created_at).toLocaleDateString('ro-RO'),
        }));

        setReviews(normalized);
      } catch (error) {
        console.error('Eroare la încărcarea recenziilor:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRatingClick = (rating) => {
    setFormData({ ...formData, rating });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.comment.trim() || submitting) return;

    try {
      setSubmitting(true);
      const payload = {
        name: formData.name.trim(),
        rating: parseInt(formData.rating, 10),
        comment: formData.comment.trim(),
      };

      const { data, error } = await supabase
        .from(REVIEWS_TABLE)
        .insert(payload)
        .select('id, name, rating, comment, created_at')
        .single();

      if (error) throw error;

      const newReview = {
        id: data.id,
        name: data.name,
        rating: Number(data.rating),
        comment: data.comment,
        date: new Date(data.created_at).toLocaleDateString('ro-RO'),
      };

      setReviews((prev) => [newReview, ...prev]);
      setVisibleCount((prev) => Math.max(prev, 5));
      setFormData({ name: '', rating: 5, comment: '' });
    } catch (error) {
      console.error('Eroare la salvarea recenziei:', error);
      alert('Nu am putut salva recenzia. Verifică dacă tabela reviews și politicile RLS sunt configurate.');
    } finally {
      setSubmitting(false);
    }
  };

  const loadMore = () => {
    setVisibleCount(prev => prev + 5);
  };

  const displayedReviews = reviews.slice(0, visibleCount);

  // Calculează rating mediu
  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="reviews-page">
      <div className="reviews-container">
        <h1 className="reviews-title">Ce spun clienții noștri</h1>

        {/* Statistici rapide */}
        <div className="reviews-stats">
          <div className="stats-card">
            <span className="stats-number">{reviews.length}</span>
            <span>recenzii</span>
          </div>
          <div className="stats-card">
            <span className="stats-number">{avgRating}</span>
            <div className="stars-static">
              {[1,2,3,4,5].map(star => (
                <span key={star} className={star <= Math.round(avgRating) ? 'star-filled' : 'star-empty'}>★</span>
              ))}
            </div>
            <span>rating mediu</span>
          </div>
        </div>

        {/* Formular nou */}
        <div className="review-form-container">
          <h2>Scrie o recenzie</h2>
          <form onSubmit={handleSubmit} className="review-form">
            <input
              type="text"
              name="name"
              placeholder="Numele tău"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <div className="rating-selector">
              <label>Nota ta:</label>
              <div className="stars-input">
                {[1,2,3,4,5].map(star => (
                  <span
                    key={star}
                    className={`star-input ${star <= (hoverRating || formData.rating) ? 'active' : ''}`}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => handleRatingClick(star)}
                  >★</span>
                ))}
              </div>
            </div>
            <textarea
              name="comment"
              placeholder="Povestește-ne experiența ta cu serviciile noastre..."
              value={formData.comment}
              onChange={handleInputChange}
              rows="4"
              required
            />
            <button type="submit" className="submit-review-btn" disabled={submitting}>
              {submitting ? 'Se salvează...' : 'Trimite recenzia'}
            </button>
          </form>
        </div>

        {/* Listă recenzii */}
        <div className="reviews-list-section">
          <h2>Ultimele recenzii</h2>
          {loading ? (
            <p className="no-reviews">Se încarcă recenziile...</p>
          ) : reviews.length === 0 ? (
            <p className="no-reviews">Nicio recenzie încă. Fii primul care scrie!</p>
          ) : (
            <>
              <div className="reviews-list">
                {displayedReviews.map((review, idx) => (
                  <div key={review.id} className="review-card" style={{ animationDelay: `${idx * 0.05}s` }}>
                    <div className="review-header">
                      <div className="reviewer-info">
                        <div className="reviewer-avatar">{review.name.charAt(0).toUpperCase()}</div>
                        <div>
                          <strong>{review.name}</strong>
                          <div className="review-rating">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={i < review.rating ? 'star-filled' : 'star-empty'}>★</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="review-date">{review.date}</span>
                    </div>
                    <p className="review-comment">{review.comment}</p>
                  </div>
                ))}
              </div>
              {visibleCount < reviews.length && (
                <button onClick={loadMore} className="load-more-btn">Vezi mai multe recenzii</button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;