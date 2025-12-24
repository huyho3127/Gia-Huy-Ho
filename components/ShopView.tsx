
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { Product } from '../types';

interface ShopViewProps {
  searchQuery: string;
}

const ShopView: React.FC<ShopViewProps> = ({ searchQuery }) => {
  const navigate = useNavigate();
  const [selectedQuickView, setSelectedQuickView] = useState<Product | null>(null);

  const filteredProducts = PRODUCTS.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.color.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const closeQuickView = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedQuickView(null);
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pt-24 px-6 pb-32">
      {/* Quick View Modal */}
      {selectedQuickView && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-6 animate-fade-in"
          onClick={() => closeQuickView()}
        >
          <div 
            className="relative w-full max-w-lg bg-background-light dark:bg-neutral-900 rounded-[32px] overflow-hidden shadow-2xl animate-pop-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => closeQuickView()}
              className="absolute top-4 right-4 z-10 size-10 flex items-center justify-center rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="flex flex-col">
              <div className="aspect-square w-full overflow-hidden">
                <img 
                  src={selectedQuickView.image} 
                  alt={selectedQuickView.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 text-center">
                <p className="text-primary text-[10px] font-bold uppercase tracking-[0.3em] mb-2">
                  {selectedQuickView.category}
                </p>
                <h3 className="text-neutral-900 dark:text-white text-2xl font-bold uppercase tracking-tight mb-2">
                  {selectedQuickView.name}
                </h3>
                <p className="text-primary text-xl font-bold mb-4">
                  ${selectedQuickView.price.toLocaleString()}
                </p>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm italic font-light leading-relaxed mb-8 px-4">
                  "{selectedQuickView.description}"
                </p>
                
                <div className="flex gap-4">
                  <button 
                    onClick={() => {
                      closeQuickView();
                      navigate(`/product/${selectedQuickView.id}`);
                    }}
                    className="flex-1 py-4 bg-primary text-background-dark font-bold uppercase text-[11px] tracking-widest rounded-full hover:brightness-110 active:scale-95 transition-all"
                  >
                    View Full Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-neutral-900 dark:text-white text-2xl font-bold uppercase tracking-widest">
          {searchQuery ? 'Results' : 'The Shop'}
        </h2>
        <button className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider">
          <span className="material-symbols-outlined text-sm">tune</span>
          Filter
        </button>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-8">
          {filteredProducts.map((product, index) => (
            <div 
              key={product.id} 
              onClick={() => navigate(`/product/${product.id}`)}
              className="group cursor-pointer opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-neutral-100 dark:bg-white/5 mb-3 shadow-sm">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay actions */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                  <button 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      setSelectedQuickView(product);
                    }} 
                    className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-[9px] font-bold uppercase tracking-widest hover:bg-white/20 transition-all active:scale-90"
                  >
                    Quick View
                  </button>
                </div>

                <button 
                  onClick={(e) => { e.stopPropagation(); }} 
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-white hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">favorite</span>
                </button>
              </div>
              <h4 className="text-neutral-900 dark:text-white text-sm font-bold uppercase tracking-tight truncate group-hover:text-primary transition-colors">{product.name}</h4>
              <p className="text-neutral-500 text-[11px] font-medium uppercase tracking-wider mb-1">{product.category}</p>
              <p className="text-primary text-sm font-bold">${product.price.toLocaleString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center animate-fade-in">
          <span className="material-symbols-outlined text-5xl text-neutral-300 dark:text-white/10 mb-4">search_off</span>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm font-medium italic">
            No masterpieces found matching "{searchQuery}"
          </p>
        </div>
      )}
    </div>
  );
};

export default ShopView;
