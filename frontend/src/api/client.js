import { supabase } from '../supabaseClient';

export { supabase };

const api = {
  // Obține toate mărcile distincte din tabela 'masini'
  getBrands: async () => {
    const { data, error } = await supabase
      .from('masini')
      .select('brand')
      .order('brand');
    if (error) throw error;
    // Elimină duplicatele
    const brands = [...new Set(data.map(item => item.brand))];
    return brands;
  },

  // Obține modelele distincte pentru o marcă dată
  getModels: async (brand) => {
    const { data, error } = await supabase
      .from('masini')
      .select('model')
      .eq('brand', brand)
      .order('model');
    if (error) throw error;
    const models = [...new Set(data.map(item => item.model))];
    return models;
  },

  // Obține generațiile distincte pentru o marcă și model
  getGenerations: async (brand, model) => {
    const { data, error } = await supabase
      .from('masini')
      .select('generatie')
      .eq('brand', brand)
      .eq('model', model)
      .order('generatie');
    if (error) throw error;
    const generations = [...new Set(data.map(item => item.generatie))];
    return generations;
  },

  // Obține motorizările pentru (brand, model, generatie) – returnăm un array de obiecte { id, motorizare, tip_motor, cp_stock, cuplu_stock }
  getEngines: async (brand, model, generation) => {
    const { data, error } = await supabase
      .from('masini')
      .select('id, motorizare, tip_motor, cp_stock, cuplu_stock')
      .eq('brand', brand)
      .eq('model', model)
      .eq('generatie', generation);
    if (error) throw error;
    // Returnăm exact ce așteaptă CarSelector: array cu id și motorizare (textul afișat)
    return data.map(engine => ({
      id: engine.id,
      motorizare: `${engine.motorizare} (${engine.tip_motor}) - ${engine.cp_stock} CP`
    }));
  },

  // Calculează rezultatul tuningului pe baza unui id de motor
  calculateTuning: async (engineId) => {
    // Ia datele motorului din Supabase
    const { data, error } = await supabase
      .from('masini')
      .select('cp_stock, cuplu_stock')
      .eq('id', engineId)
      .single();
    if (error) throw error;

    // Exemplu de creștere cu 40% CP și 30% cuplu (poți ajusta după logica ta)
    const hpBefore = data.cp_stock;
    const torqueBefore = data.cuplu_stock;
    const hpAfter = Math.round(hpBefore * 1.4);
    const torqueAfter = Math.round(torqueBefore * 1.3);
    const price = 599; // preț fix sau poți face o regulă

    return {
      engineId,
      hpBefore,
      hpAfter,
      torqueBefore,
      torqueAfter,
      price
    };
  }
};

export default api;