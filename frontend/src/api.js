const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = {
  async getBrands() {
    const res = await fetch(`${API_BASE}/brands`);
    return res.json();
  },
  async getModels(brand) {
    const res = await fetch(`${API_BASE}/models?brand=${encodeURIComponent(brand)}`);
    return res.json();
  },
  async getGenerations(brand, model) {
    const res = await fetch(`${API_BASE}/generations?brand=${encodeURIComponent(brand)}&model=${encodeURIComponent(model)}`);
    return res.json();
  },
  async getEngines(brand, model, generation) {
    const res = await fetch(`${API_BASE}/engines?brand=${encodeURIComponent(brand)}&model=${encodeURIComponent(model)}&generation=${encodeURIComponent(generation)}`);
    return res.json();
  },
  async calculateTuning(engineId) {
    const res = await fetch(`${API_BASE}/tuning`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ engineId })
    });
    return res.json();
  },
  async getReviews() {
    const res = await fetch(`${API_BASE}/reviews`);
    return res.json();
  },
  async addReview(review) {
    const res = await fetch(`${API_BASE}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review)
    });
    return res.json();
  }
};