require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing backend env variables. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// ========== RUTE PENTRU MAȘINI ==========
app.get('/api/brands', async (req, res) => {
  const { data, error } = await supabase.from('masini').select('brand').order('brand');
  if (error) return res.status(500).json({ error: error.message });
  const brands = [...new Set(data.map(item => item.brand))];
  res.json(brands);
});

app.get('/api/models', async (req, res) => {
  const { brand } = req.query;
  if (!brand) return res.status(400).json({ error: 'Brand required' });
  const { data, error } = await supabase.from('masini').select('model').eq('brand', brand).order('model');
  if (error) return res.status(500).json({ error: error.message });
  const models = [...new Set(data.map(item => item.model))];
  res.json(models);
});

app.get('/api/generations', async (req, res) => {
  const { brand, model } = req.query;
  if (!brand || !model) return res.status(400).json({ error: 'Brand and model required' });
  const { data, error } = await supabase.from('masini').select('generatie').eq('brand', brand).eq('model', model).order('generatie');
  if (error) return res.status(500).json({ error: error.message });
  const gens = [...new Set(data.map(item => item.generatie))];
  res.json(gens);
});

app.get('/api/engines', async (req, res) => {
  const { brand, model, generation } = req.query;
  if (!brand || !model || !generation) return res.status(400).json({ error: 'Missing params' });
  const { data, error } = await supabase.from('masini').select('id, motorizare').eq('brand', brand).eq('model', model).eq('generatie', generation).order('motorizare');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// ========== RUTA PENTRU CALCUL TUNING ==========
app.post('/api/tuning', async (req, res) => {
  const { engineId } = req.body;
  if (!engineId) return res.status(400).json({ error: 'engineId required' });

  const { data: car, error } = await supabase.from('masini').select('*').eq('id', engineId).single();
  if (error) return res.status(500).json({ error: error.message });
  if (!car) return res.status(404).json({ error: 'Car not found' });

  const stockHP = Number(car.cp_stock) || 0;
  const stockNM = Number(car.cuplu_stock) || 0;
  const tipMotor = (car.tip_motor || '').toLowerCase();

  const isTurbo = /turbo|biturbo|twin turbo|compresor/.test(tipMotor);
  const isDiesel = /diesel|tdi|dci|hdi|jtd|cdti|cdi|multijet/.test(tipMotor);

  let hpGain, nmGain;
  if (!isTurbo) { hpGain = 0.06; nmGain = 0.08; }
  else if (isDiesel) { hpGain = 0.22; nmGain = 0.25; }
  else if (stockHP <= 140) { hpGain = 0.17; nmGain = 0.15; }
  else { hpGain = 0.20; nmGain = 0.18; }

  const tunedHP = Math.round(stockHP * (1 + hpGain));
  const tunedNM = Math.round(stockNM * (1 + nmGain));

  res.json({
    car: { brand: car.brand, model: car.model, generatie: car.generatie, motorizare: car.motorizare },
    stock: { hp: stockHP, nm: stockNM },
    tuned: { hp: tunedHP, nm: tunedNM },
    gainPercent: { hp: Math.round(hpGain * 100), nm: Math.round(nmGain * 100) },
    warnings: [`Tip motor: ${car.tip_motor || 'Nespecificat'}`, 'Valori estimate, necesită validare pe dyno.']
  });
});

// ========== RUTE PENTRU REVIEW-URI ==========
app.get('/api/reviews', async (req, res) => {
  const { data, error } = await supabase.from('reviews').select('*').order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.post('/api/reviews', async (req, res) => {
  const { name, rating, text } = req.body;
  if (!name || !rating) return res.status(400).json({ error: 'Name and rating required' });
  const { data, error } = await supabase.from('reviews').insert([{ name, rating, text, created_at: new Date() }]).select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));