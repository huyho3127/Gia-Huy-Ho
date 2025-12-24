
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { Product } from '../types';

const ComparisonDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [comparisonIds, setComparisonIds] = useState<string[]>([]);

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('vp_comparison_list');
      if (saved) {
        setComparisonIds(JSON.parse(saved));
      } else {
        setComparisonIds([]);
      }
    };

    handleStorageChange();
    window.addEventListener('storage', handleStorageChange);
    // Custom event for same-window updates
    window.addEventListener('vp_comparison_updated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('vp_comparison_updated', handleStorageChange);
    };
  }, []);

  const removeItem = (id: string) => {
    const newList = comparisonIds.filter(itemId => itemId !== id);
    localStorage.setItem('vp_comparison_list', JSON.stringify(newList));
    window.dispatchEvent(new Event('vp_comparison_updated'));
  };

  const comparedProducts = PRODUCTS.filter(p => comparisonIds.includes(p.id));

  if (comparisonIds.length === 0) return null;

  return (
    <>
      {/* Floating Badge */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-6 z-[60] bg-primary text-background-dark p-4 rounded-full shadow-2xl flex items-center gap-2 animate-bounce-subtle group hover:scale-105 transition-transform"
        >
          <span className="material-symbols-outlined">compare_arrows</span>
          <span className="text-xs font-bold uppercase tracking-widest">{comparisonIds.length}</span>
        </button>
      )}

      {/* Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm animate-fade-in" onClick={() => setIsOpen(false)}>
          <div 
            className="absolute bottom-0 left-0 right-0 bg-background-light dark:bg-neutral-900 rounded-t-[32px] p-8 animate-fade-in-up"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-neutral-900 dark:text-white text-lg font-bold uppercase tracking-widest flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">compare_arrows</span>
                Comparison List
              </h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="size-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4">
              {comparedProducts.map(product => (
                <div key={product.id} className="relative flex-shrink-0 w-32 group">
                  <button 
                    onClick={() => removeItem(product.id)}
                    className="absolute -top-2 -right-2 z-10 size-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg transform scale-0 group-hover:scale-100 transition-transform"
                  >
                    <span className="material-symbols-outlined text-xs">close</span>
                  </button>
                  <Link to={`/product/${product.id}`} onClick={() => setIsOpen(false)}>
                    <div className="aspect-square rounded-xl overflow-hidden bg-white/5 mb-3 border border-white/5 group-hover:border-primary/50 transition-colors">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-[10px] font-bold text-neutral-900 dark:text-white uppercase truncate">{product.name}</p>
                  </Link>
                </div>
              ))}
              {comparedProducts.length < 4 && (
                <Link 
                  to="/shop" 
                  onClick={() => setIsOpen(false)}
                  className="flex-shrink-0 w-32 aspect-square rounded-xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-white/20 hover:text-primary hover:border-primary/50 transition-all"
                >
                  <span className="material-symbols-outlined text-3xl mb-1">add</span>
                  <span className="text-[9px] font-bold uppercase tracking-widest">Add Item</span>
                </Link>
              )}
            </div>

            <div className="mt-8 flex gap-4">
              <button 
                className="flex-1 py-4 bg-primary text-background-dark font-bold uppercase tracking-widest rounded-full hover:brightness-110 transition-all active:scale-95"
                onClick={() => alert('Detailed comparison table coming soon to your private catalog.')}
              >
                Compare Now
              </button>
              <button 
                className="flex-1 py-4 bg-white/5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-white/10 transition-all"
                onClick={() => {
                  localStorage.removeItem('vp_comparison_list');
                  window.dispatchEvent(new Event('vp_comparison_updated'));
                  setIsOpen(false);
                }}
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ComparisonDrawer;
