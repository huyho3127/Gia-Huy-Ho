
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../constants';

const FeaturedProduct: React.FC = () => {
  const navigate = useNavigate();
  // Show the last product in the array as it's likely the newest
  const product = PRODUCTS[PRODUCTS.length - 1];

  return (
    <section className="px-6 pb-12">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-neutral-900 dark:text-white text-lg font-bold tracking-widest uppercase">This Season's Focus</h3>
        <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full animate-pulse">New Addition</span>
      </div>
      
      <div 
        className="relative w-full aspect-[4/5] rounded-lg overflow-hidden group shadow-xl cursor-pointer"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url("${product.image}")` }}
        ></div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-transparent to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-1">{product.category}</p>
              <h4 className="text-white text-2xl font-bold tracking-tight mb-1">{product.name}</h4>
              <p className="text-white/70 text-sm font-medium">{product.color} / {product.hardware}</p>
            </div>
            <p className="text-primary text-xl font-bold">${product.price.toLocaleString()}</p>
          </div>
          
          <button className="mt-6 w-full py-4 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-bold tracking-wider uppercase hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
            <span>Explore Masterpiece</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;
