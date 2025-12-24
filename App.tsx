
import React, { useState } from 'react';
import { HashRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryList from './components/CategoryList';
import FeaturedProduct from './components/FeaturedProduct';
import Newsletter from './components/Newsletter';
import Navigation from './components/Navigation';
import ShopView from './components/ShopView';
import AssistantView from './components/AssistantView';
import ProductDetailView from './components/ProductDetailView';
import ComparisonDrawer from './components/ComparisonDrawer';
import ProfileView from './components/ProfileView';

const MainContent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query.trim() !== '' && location.pathname !== '/shop') {
      navigate('/shop');
    }
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark pb-24">
      <Header searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      
      <main className="flex-1">
        <Routes>
          <Route path="/" element={
            <div className="animate-fade-in">
              <Hero />
              <CategoryList onSearchChange={handleSearchChange} />
              <FeaturedProduct />
              <Newsletter />
            </div>
          } />
          <Route path="/shop" element={<ShopView searchQuery={searchQuery} />} />
          <Route path="/product/:id" element={<ProductDetailView />} />
          <Route path="/assistant" element={<AssistantView />} />
          <Route path="/wishlist" element={
            <div className="min-h-screen flex items-center justify-center p-6 text-center pt-24">
              <div>
                <span className="material-symbols-outlined text-6xl text-white/10 mb-4">favorite</span>
                <h2 className="text-white text-xl font-bold uppercase tracking-widest mb-2">Your Wishlist is Empty</h2>
                <p className="text-white/40 text-sm max-w-xs mx-auto">Explore the collections to find pieces you'll love forever.</p>
                <button 
                  onClick={() => navigate('/shop')}
                  className="mt-8 px-8 py-3 bg-primary text-background-dark font-bold uppercase text-xs tracking-widest rounded-full"
                >
                  Go Shopping
                </button>
              </div>
            </div>
          } />
          <Route path="/profile" element={<ProfileView />} />
        </Routes>
      </main>

      <ComparisonDrawer />
      <Navigation />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <MainContent />
    </HashRouter>
  );
};

export default App;
