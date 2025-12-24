
import React, { useState } from 'react';
import { getPersonalStylistAdvice } from '../services/geminiService';

const AssistantView: React.FC = () => {
  const [input, setInput] = useState('');
  const [advice, setAdvice] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    const result = await getPersonalStylistAdvice(input);
    setAdvice(result);
    
    // Persist recommendation for other views
    if (result && result.recommendedCategory) {
      localStorage.setItem('vp_stylist_recommendation', result.recommendedCategory);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background-dark pt-24 px-6 pb-32">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-10">
          <span className="material-symbols-outlined text-4xl text-primary mb-2">auto_awesome</span>
          <h2 className="text-white text-2xl font-bold uppercase tracking-widest mb-2">VietPrime AI Stylist</h2>
          <p className="text-white/60 text-sm italic">"Luxury is personal. Allow us to curate your experience."</p>
        </div>

        {!advice && !loading && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <label className="block text-primary text-[10px] font-bold uppercase tracking-widest mb-4">Describe your style or next journey</label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g., I need a timeless piece for a coastal getaway in Amalfi, something that feels both rugged and elegant."
                className="w-full bg-transparent border-none focus:ring-0 text-white text-sm placeholder:text-white/20 resize-none h-32"
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-primary text-background-dark font-bold uppercase tracking-widest rounded-full hover:bg-primary/90 transition-all active:scale-95"
            >
              Get Recommendation
            </button>
          </form>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-20 animate-pulse">
            <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-primary text-xs font-bold uppercase tracking-[0.2em]">Consulting the artisans...</p>
          </div>
        )}

        {advice && !loading && (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur-md">
              <h4 className="text-primary text-[10px] font-bold uppercase tracking-widest mb-4">The Stylist's Note</h4>
              <p className="text-white text-lg font-light leading-relaxed italic mb-6">"{advice.advice}"</p>
              <div className="flex items-center gap-4">
                <span className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">Recommended:</span>
                <span className="text-primary text-sm font-bold uppercase tracking-widest">{advice.recommendedCategory}</span>
              </div>
            </div>
            
            <button 
              onClick={() => { setAdvice(null); setInput(''); }}
              className="w-full py-4 border border-white/10 text-white/60 text-xs font-bold uppercase tracking-widest rounded-full hover:bg-white/5 transition-all"
            >
              Start New Consultation
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssistantView;
