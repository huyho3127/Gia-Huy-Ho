
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../constants';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchChange }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const checkAuth = () => {
    const logged = localStorage.getItem('vp_is_logged_in') === 'true';
    setIsLoggedIn(logged);
    if (logged) {
      setUserName(localStorage.getItem('vp_user_name') || 'Collector');
    }
  };

  useEffect(() => {
    checkAuth();
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('vp_auth_changed', checkAuth);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('vp_auth_changed', checkAuth);
    };
  }, []);

  useEffect(() => {
    if (isSearching && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearching]);

  const toggleSearch = () => {
    if (isSearching) {
      onSearchChange('');
    }
    setIsSearching(!isSearching);
    if (isMenuOpen) setIsMenuOpen(false);
    if (isAuthOpen) setIsAuthOpen(false);
  };

  const handleCategoryClick = (categoryName: string) => {
    onSearchChange(categoryName);
    setIsMenuOpen(false);
    navigate('/shop');
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('vp_is_logged_in', 'true');
    const nameToStore = authMode === 'signup' ? formData.name : (formData.email.split('@')[0] || 'Collector');
    localStorage.setItem('vp_user_name', nameToStore);
    window.dispatchEvent(new Event('vp_auth_changed'));
    setIsAuthOpen(false);
    navigate('/profile');
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-6 py-4 transition-all duration-500 ${
        isScrolled || isMenuOpen || isAuthOpen ? 'bg-background-dark/95 backdrop-blur-lg shadow-lg' : 'bg-gradient-to-b from-black/60 to-transparent'
      }`}>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => isSearching ? setIsSearching(false) : setIsMenuOpen(!isMenuOpen)}
            className="flex size-10 items-center justify-center rounded-full text-white hover:bg-white/10 active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[28px]">
              {isSearching ? 'arrow_back' : (isMenuOpen ? 'close' : 'menu')}
            </span>
          </button>
          
          {!isSearching && !isMenuOpen && (
            <div className="animate-fade-in flex items-center">
              {isLoggedIn ? (
                <div 
                  onClick={() => navigate('/profile')}
                  className="px-4 py-2 cursor-pointer group"
                >
                  <p className="text-primary text-[10px] font-black uppercase tracking-[0.2em] group-hover:brightness-125 transition-all">
                    Welcome, {userName}
                  </p>
                </div>
              ) : (
                <button 
                  onClick={() => setIsAuthOpen(true)}
                  className="px-5 py-2 rounded-full border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/10 transition-all active:scale-95"
                >
                  Login
                </button>
              )}
            </div>
          )}
        </div>

        <div className="flex-1 px-4 flex justify-center">
          {isSearching ? (
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search our heritage..."
              className="w-full max-w-md bg-white/10 border-none rounded-full px-6 py-2 text-white text-sm placeholder:text-white/40 focus:ring-1 focus:ring-primary/50 transition-all animate-fade-in"
            />
          ) : (
            <h1 
              onClick={() => { navigate('/'); setIsMenuOpen(false); setIsAuthOpen(false); }}
              className="text-white text-xl font-bold tracking-[0.15em] drop-shadow-md animate-fade-in cursor-pointer"
            >
              VIETPRIME
            </h1>
          )}
        </div>

        <div className="flex items-center justify-end gap-1">
          <button 
            onClick={toggleSearch}
            className={`flex size-10 items-center justify-center rounded-full transition-all active:scale-95 ${isSearching ? 'text-primary' : 'text-white hover:bg-white/10'}`}
          >
            <span className="material-symbols-outlined text-[24px]">
              {isSearching ? 'close' : 'search'}
            </span>
          </button>
          {!isSearching && (
            <button className="flex size-10 items-center justify-center rounded-full text-white relative hover:bg-white/10 active:scale-95 transition-transform">
              <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
              <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-primary border border-background-dark"></span>
            </button>
          )}
        </div>
      </header>

      {isAuthOpen && (
        <div 
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 backdrop-blur-2xl p-6 animate-fade-in"
          onClick={() => setIsAuthOpen(false)}
        >
          <div 
            className="w-full max-w-sm bg-background-light dark:bg-neutral-900 rounded-[40px] p-10 shadow-2xl animate-pop-in relative"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsAuthOpen(false)}
              className="absolute top-6 right-6 text-neutral-400 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="text-center mb-10">
              <span className="material-symbols-outlined text-primary text-4xl mb-4">account_circle</span>
              <h3 className="text-neutral-900 dark:text-white text-xl font-bold uppercase tracking-[0.2em]">
                {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
              </h3>
            </div>

            <form className="space-y-4" onSubmit={handleAuthSubmit}>
              {authMode === 'signup' && (
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-2xl px-5 py-4 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:ring-1 focus:ring-primary transition-all" 
                />
              )}
              <input 
                type="email" 
                placeholder="Email Address" 
                required
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-2xl px-5 py-4 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:ring-1 focus:ring-primary transition-all" 
              />
              <input 
                type="password" 
                placeholder="Password" 
                required
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
                className="w-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-2xl px-5 py-4 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:ring-1 focus:ring-primary transition-all" 
              />
              <button type="submit" className="w-full py-5 bg-primary text-background-dark font-bold uppercase tracking-widest rounded-full shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all mt-4">
                {authMode === 'login' ? 'Sign In' : 'Join the House'}
              </button>
            </form>

            <div className="mt-8 text-center">
              <button 
                onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                className="text-primary text-xs font-bold uppercase tracking-[0.2em] hover:underline"
              >
                {authMode === 'login' ? 'Create Account' : 'Sign In Now'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
