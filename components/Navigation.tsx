
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  const items = [
    { id: 'home', icon: 'home', label: 'Home', to: '/' },
    { id: 'shop', icon: 'grid_view', label: 'Shop', to: '/shop' },
    { id: 'assistant', icon: 'smart_toy', label: 'AI Stylist', to: '/assistant' },
    { id: 'wishlist', icon: 'favorite', label: 'Wishlist', to: '/wishlist' },
    { id: 'profile', icon: 'person', label: 'Profile', to: '/profile' },
  ];

  const isActive = (itemTo: string) => {
    if (itemTo === '/' && path === '/') return true;
    if (itemTo !== '/' && path.startsWith(itemTo)) return true;
    return false;
  };

  return (
    <nav className="fixed bottom-6 left-6 right-6 h-16 bg-background-dark/80 dark:bg-neutral-900/90 backdrop-blur-xl rounded-2xl flex items-center justify-around px-2 shadow-2xl border border-white/5 z-50">
      {items.map((item) => {
        const active = isActive(item.to);
        return (
          <Link
            key={item.id}
            to={item.to}
            className={`flex flex-col items-center justify-center w-14 h-full transition-all duration-300 ${
              active ? 'text-primary' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <span 
              className={`material-symbols-outlined ${active ? 'fill-current' : ''}`}
              style={active ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              {item.icon}
            </span>
            <span className="text-[9px] font-bold mt-1 tracking-wider uppercase">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation;
