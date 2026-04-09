import React, { useState, useEffect } from 'react';
import './Reviews.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [formData, setFormData] = useState({ name: '', rating: 5, comment: '' });
  const [hoverRating, setHoverRating] = useState(0);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('aj_tuning_reviews');
    if (stored) {
      setReviews(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('aj_tuning_reviews', JSON.stringify(reviews));
  }, [reviews]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRatingClick = (rating) => {
    setFormData({ ...formData, rating });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.comment.trim()) return;
    const newReview = {
      id: Date.now(),
      name: formData.name,
      rating: parseInt(formData.rating),
      comment: formData.comment,
      date: new Date().toLocaleDateString('ro-RO'),
    };
    setReviews([newReview, ...reviews]);
    setFormData({ name: '', rating: 5, comment: '' });
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
            <button type="submit" className="submit-review-btn">Trimite recenzia</button>
          </form>
        </div>

        {/* Listă recenzii */}
        <div className="reviews-list-section">
          <h2>Ultimele recenzii</h2>
          {reviews.length === 0 ? (
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
                <button onClick={loadMore} className="load-more-btn">Afișează mai multe recenzii</button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;