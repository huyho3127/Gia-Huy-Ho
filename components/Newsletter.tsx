
import React from 'react';

const Newsletter: React.FC = () => {
  return (
    <section className="px-6 pb-20 text-center">
      <div className="py-12 border-t border-neutral-200 dark:border-white/10">
        <span className="material-symbols-outlined text-4xl text-primary mb-4">diamond</span>
        <h3 className="text-neutral-900 dark:text-white text-xl font-bold tracking-wide uppercase mb-2">VietPrime Exclusive</h3>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-6 max-w-xs mx-auto leading-relaxed">
          Join our private list for early access to limited edition drops.
        </p>
        
        <form className="flex items-center border-b border-neutral-300 dark:border-neutral-700 py-2 max-w-xs mx-auto" onSubmit={(e) => e.preventDefault()}>
          <input 
            className="bg-transparent border-none w-full text-center text-sm focus:ring-0 text-neutral-900 dark:text-white placeholder:text-neutral-400 font-bold tracking-wider uppercase" 
            placeholder="YOUR EMAIL ADDRESS" 
            type="email"
            required
          />
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
