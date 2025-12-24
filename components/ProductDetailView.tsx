
import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { Review, Product, ProductVariant } from '../types';

const ProductDetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = PRODUCTS.find((p) => p.id === id);
  
  // State for selected options if variants exist
  const [selectedColor, setSelectedColor] = useState<string>(product?.color || '');
  const [selectedHardware, setSelectedHardware] = useState<string>(product?.hardware || '');
  const [activeImage, setActiveImage] = useState<string>('');
  const [isAdded, setIsAdded] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [isShareSheetOpen, setIsShareSheetOpen] = useState(false);
  const [isCompared, setIsCompared] = useState(false);
  const [stylistRecommendation, setStylistRecommendation] = useState<string | null>(null);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  
  // Review state
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Derived current variant or fallback to base product
  const currentVariant = useMemo(() => {
    if (!product?.variants) return null;
    return product.variants.find(
      (v) => v.color === selectedColor && v.hardware === selectedHardware
    ) || product.variants[0];
  }, [product, selectedColor, selectedHardware]);

  // Display values
  const displayPrice = currentVariant ? currentVariant.price : product?.price;
  const displayImage = currentVariant ? currentVariant.image : product?.image;
  const displayColor = currentVariant ? currentVariant.color : product?.color;
  const displayHardware = currentVariant ? currentVariant.hardware : product?.hardware;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) {
      setActiveImage(displayImage || '');
      const savedReviews = localStorage.getItem(`vp_reviews_${product.id}`);
      if (savedReviews) {
        setReviews(JSON.parse(savedReviews));
      }
      
      const savedRec = localStorage.getItem('vp_stylist_recommendation');
      setStylistRecommendation(savedRec);

      const savedComparison = localStorage.getItem('vp_comparison_list');
      if (savedComparison) {
        const list = JSON.parse(savedComparison);
        setIsCompared(list.includes(product.id));
      }
    }
  }, [product, id, displayImage]);

  const handleAddToBag = () => {
    if (isAdded) return;
    if ('vibrate' in navigator) navigator.vibrate(50);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2500);
  };

  const handleToggleCompare = () => {
    if (!product) return;
    const saved = localStorage.getItem('vp_comparison_list');
    let list: string[] = saved ? JSON.parse(saved) : [];
    
    if (list.includes(product.id)) {
      list = list.filter(itemId => itemId !== product.id);
      setIsCompared(false);
    } else {
      if (list.length >= 4) {
        alert("Our comparison suite accommodates up to 4 masterpieces at once.");
        return;
      }
      list.push(product.id);
      setIsCompared(true);
    }
    
    localStorage.setItem('vp_comparison_list', JSON.stringify(list));
    window.dispatchEvent(new Event('vp_comparison_updated'));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsShared(true);
    setTimeout(() => setIsShared(false), 2000);
  };

  const shareToSocial = (platform: string) => {
    const url = window.location.href;
    const text = `Check out the ${product?.name} from VietPrime. Handcrafted Italian luxury.`;
    
    let shareUrl = '';
    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || !comment.trim() || !product) return;
    setIsSubmitting(true);
    const newReview: Review = {
      id: Date.now().toString(),
      productId: product.id,
      userName: 'Valued Collector',
      rating,
      comment,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem(`vp_reviews_${product.id}`, JSON.stringify(updatedReviews));
    setRating(0);
    setComment('');
    setIsSubmitting(false);
  };

  const getRecommendedProducts = (): Product[] => {
    if (!product) return [];
    let filtered: Product[] = [];
    if (stylistRecommendation) {
      filtered = PRODUCTS.filter(p => p.category === stylistRecommendation && p.id !== product.id);
    }
    if (filtered.length === 0) {
      filtered = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id);
    }
    if (filtered.length === 0) {
      filtered = PRODUCTS.filter(p => p.id !== product.id).slice(0, 3);
    }
    return filtered;
  };

  const recommendedItems = getRecommendedProducts();

  // Unique colors and hardwares for selectors
  const colors = useMemo(() => {
    if (!product?.variants) return [];
    return Array.from(new Set(product.variants.map(v => v.color))).map(colorName => {
      return product.variants?.find(v => v.color === colorName);
    });
  }, [product]);

  const hardwares = useMemo(() => {
    if (!product?.variants) return [];
    return Array.from(new Set(product.variants.map(v => v.hardware)));
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div>
          <h2 className="text-white text-xl font-bold uppercase tracking-widest mb-4">Product Not Found</h2>
          <button onClick={() => navigate('/shop')} className="px-8 py-3 bg-primary text-background-dark font-bold uppercase text-xs tracking-widest rounded-full">Return to Shop</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark pb-32">
      {/* Share Sheet Overlay */}
      {isShareSheetOpen && (
        <div 
          className="fixed inset-0 z-[110] flex items-end justify-center bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsShareSheetOpen(false)}
        >
          <div 
            className="w-full bg-background-light dark:bg-neutral-900 rounded-t-[40px] p-8 pb-12 animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1 bg-neutral-300 dark:bg-white/10 rounded-full mx-auto mb-8"></div>
            <h3 className="text-center text-neutral-900 dark:text-white text-xs font-bold uppercase tracking-[0.3em] mb-10">Share this Masterpiece</h3>
            
            <div className="grid grid-cols-4 gap-4 mb-10">
              <button 
                onClick={() => shareToSocial('whatsapp')}
                className="flex flex-col items-center gap-3 group"
              >
                <div className="size-14 rounded-2xl bg-[#25D366]/10 flex items-center justify-center transition-transform group-active:scale-90">
                  <svg className="size-7 fill-[#25D366]" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.522-2.961-2.638-.087-.117-.708-.941-.708-1.793s.437-1.27.593-1.419c.156-.149.341-.186.456-.186s.226.002.325.006c.1.004.235-.038.369.286.136.324.468 1.14.508 1.223.041.083.068.18.013.291-.054.111-.081.18-.163.275-.081.095-.171.212-.245.285-.083.084-.171.174-.073.342.099.168.439.723.941 1.17.647.576 1.192.754 1.362.839.171.085.271.071.371-.045.1-.117.427-.496.541-.664.114-.168.228-.141.383-.083.156.058.984.465 1.155.55.171.085.285.127.327.199.042.072.042.417-.102.822z"/></svg>
                </div>
                <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">WhatsApp</span>
              </button>
              
              <button 
                onClick={() => shareToSocial('twitter')}
                className="flex flex-col items-center gap-3 group"
              >
                <div className="size-14 rounded-2xl bg-neutral-900/10 dark:bg-white/10 flex items-center justify-center transition-transform group-active:scale-90">
                  <svg className="size-6 fill-neutral-900 dark:fill-white" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </div>
                <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">Twitter</span>
              </button>
              
              <button 
                onClick={() => shareToSocial('facebook')}
                className="flex flex-col items-center gap-3 group"
              >
                <div className="size-14 rounded-2xl bg-[#1877F2]/10 flex items-center justify-center transition-transform group-active:scale-90">
                  <svg className="size-7 fill-[#1877F2]" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </div>
                <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">Facebook</span>
              </button>
              
              <button 
                onClick={copyToClipboard}
                className="flex flex-col items-center gap-3 group"
              >
                <div className={`size-14 rounded-2xl flex items-center justify-center transition-all group-active:scale-90 ${isShared ? 'bg-primary/20 text-primary' : 'bg-neutral-100 dark:bg-white/5 text-neutral-900 dark:text-white'}`}>
                  <span className={`material-symbols-outlined text-[24px] ${isShared ? 'fill-current animate-pop-in' : ''}`}>content_copy</span>
                </div>
                <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">{isShared ? 'Copied' : 'Copy Link'}</span>
              </button>
            </div>
            
            <button 
              onClick={() => setIsShareSheetOpen(false)}
              className="w-full py-4 text-neutral-400 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {zoomedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl animate-fade-in transition-all overflow-hidden" onClick={() => setZoomedImage(null)}>
          <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors" onClick={() => setZoomedImage(null)}>
            <span className="material-symbols-outlined text-4xl">close</span>
          </button>
          <img src={zoomedImage} alt="Zoomed product view" className="max-w-[95%] max-h-[90%] object-contain shadow-2xl animate-pop-in cursor-zoom-out" />
        </div>
      )}

      <button onClick={() => navigate(-1)} className="fixed top-20 left-6 z-50 flex size-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white shadow-lg active:scale-90 transition-all">
        <span className="material-symbols-outlined">arrow_back</span>
      </button>

      <div className="relative w-full aspect-[4/5] md:aspect-video overflow-hidden cursor-zoom-in group" onClick={() => setZoomedImage(activeImage || displayImage || '')}>
        <img src={activeImage || displayImage} alt={product.name} className="w-full h-full object-cover animate-fade-in transition-all duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-background-light dark:from-background-dark via-transparent to-transparent"></div>
        <div className="absolute bottom-10 right-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20 text-white shadow-xl">
          <span className="material-symbols-outlined">zoom_in</span>
        </div>
      </div>

      <div className="px-6 -mt-20 relative z-10">
        <div className="animate-fade-in-up">
          <div className="flex items-center gap-2 mb-2">
            <p className="text-primary text-[10px] font-bold uppercase tracking-[0.3em]">{product.category}</p>
            {stylistRecommendation === product.category && (
              <span className="flex items-center gap-1 bg-primary/20 text-primary px-2 py-0.5 rounded text-[8px] font-black tracking-widest uppercase animate-pulse">
                <span className="material-symbols-outlined text-[10px]">auto_awesome</span>
                Stylist Pick
              </span>
            )}
          </div>
          <h1 className="text-neutral-900 dark:text-white text-3xl font-bold tracking-tight mb-2 uppercase">{product.name}</h1>
          <p className="text-primary text-2xl font-bold mb-8">${displayPrice?.toLocaleString()}</p>

          <div className="mb-10">
            <h3 className="text-neutral-900 dark:text-white text-xs font-bold uppercase tracking-widest mb-4">The Story</h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-base leading-relaxed font-light italic">
              "{product.description} Crafted meticulously in our Tuscan atelier, this piece embodies the marriage of ancestral leatherworking techniques and contemporary architectural silhouettes."
            </p>
          </div>

          {/* Configuration Selection (Swatches & Hardware) - Moved below description as requested */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Color Selector / Swatches */}
            {colors.length > 0 && (
              <div className="p-5 rounded-2xl bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 transition-all hover:border-primary/20">
                <p className="text-neutral-500 text-[9px] font-bold uppercase tracking-widest mb-4 flex items-center justify-between">
                  Collector's Palette
                  <span className="text-neutral-900 dark:text-white font-black tracking-tight">{displayColor}</span>
                </p>
                <div className="flex gap-4">
                  {colors.map((c) => (
                    <button
                      key={c?.id}
                      onClick={() => setSelectedColor(c?.color || '')}
                      className={`relative size-10 rounded-full border-2 transition-all shadow-md group ${selectedColor === c?.color ? 'border-primary scale-110 shadow-primary/20' : 'border-transparent hover:scale-105'}`}
                      style={{ backgroundColor: c?.colorHex }}
                      title={c?.color}
                    >
                      {selectedColor === c?.color && (
                        <span className="absolute inset-0 flex items-center justify-center text-white/40">
                           <span className="material-symbols-outlined text-[14px] fill-current" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Hardware Selector */}
            {hardwares.length > 0 && (
              <div className="p-5 rounded-2xl bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 transition-all hover:border-primary/20">
                <p className="text-neutral-500 text-[9px] font-bold uppercase tracking-widest mb-4 flex items-center justify-between">
                  Hardware Finish
                  <span className="text-neutral-900 dark:text-white font-black tracking-tight">{displayHardware}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {hardwares.map((hw) => (
                    <button
                      key={hw}
                      onClick={() => setSelectedHardware(hw)}
                      className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all ${selectedHardware === hw ? 'bg-primary border-primary text-background-dark shadow-lg shadow-primary/10' : 'bg-transparent border-neutral-300 dark:border-white/10 text-neutral-500 hover:text-primary'}`}
                    >
                      {hw}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Default Display if no variants */}
            {(!product.variants || product.variants.length === 0) && (
              <>
                <div className="p-5 rounded-2xl bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10">
                  <p className="text-neutral-500 text-[9px] font-bold uppercase tracking-widest mb-1">Colorway</p>
                  <p className="text-neutral-900 dark:text-white text-sm font-semibold">{product.color}</p>
                </div>
                <div className="p-5 rounded-2xl bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10">
                  <p className="text-neutral-500 text-[9px] font-bold uppercase tracking-widest mb-1">Hardware</p>
                  <p className="text-neutral-900 dark:text-white text-sm font-semibold">{product.hardware}</p>
                </div>
              </>
            )}
          </div>

          {/* Availability Section */}
          <div className="mb-10 p-5 rounded-2xl bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10">
            <h3 className="text-neutral-500 text-[9px] font-bold uppercase tracking-widest mb-3">Acquisition Status</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <p className="text-neutral-900 dark:text-white text-sm font-bold tracking-tight">In Stock</p>
              </div>
              <div className="w-[1px] h-4 bg-neutral-300 dark:bg-white/10"></div>
              <p className="text-neutral-500 text-[11px] font-medium italic">Available for immediate dispatch. Estimated delivery: 3-5 business days.</p>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-neutral-900 dark:text-white text-xs font-bold uppercase tracking-widest mb-4">Angles & Details</h3>
            <div className="flex overflow-x-auto gap-4 no-scrollbar pb-2">
              {product.images.map((img, idx) => (
                <div key={idx} onClick={() => setActiveImage(img)} className={`flex-shrink-0 w-32 aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all group/thumb relative ${activeImage === img ? 'border-primary' : 'border-transparent'}`}>
                  <img src={img} alt={`${product.name} detail ${idx}`} className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/thumb:opacity-100 flex items-center justify-center transition-opacity" onClick={(e) => { e.stopPropagation(); setZoomedImage(img); }}>
                    <span className="material-symbols-outlined text-white text-[20px]">zoom_in</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <div className="flex gap-4">
              <button onClick={handleAddToBag} disabled={isAdded} className={`relative flex-1 py-4 font-bold uppercase tracking-widest rounded-full shadow-lg transition-all duration-500 overflow-hidden flex items-center justify-center gap-3 ${isAdded ? 'bg-neutral-900 dark:bg-white text-primary scale-[0.98] shadow-none cursor-default' : 'bg-primary text-background-dark hover:shadow-primary/40 hover:-translate-y-0.5 active:scale-95'}`}>
                <div className="flex items-center justify-center gap-2">
                  {isAdded ? (
                    <><span className="material-symbols-outlined animate-pop-in text-[22px] fill-current" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span><span className="animate-fade-in">Added to Bag</span></>
                  ) : (
                    <><span className="material-symbols-outlined text-[20px]">shopping_bag</span><span>Add to Bag</span></>
                  )}
                </div>
              </button>
              <button className="size-14 flex items-center justify-center rounded-full border border-neutral-300 dark:border-white/10 text-neutral-900 dark:text-white hover:bg-white/5 active:scale-90 transition-all group">
                <span className="material-symbols-outlined group-hover:scale-110 transition-transform">favorite</span>
              </button>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button onClick={handleToggleCompare} className={`flex-[2] py-4 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 rounded-xl border ${isCompared ? 'bg-primary/20 border-primary/40 text-primary' : 'bg-neutral-100 dark:bg-white/5 border-transparent text-neutral-500 dark:text-neutral-400 hover:text-primary'}`}>
                <span className={`material-symbols-outlined text-[18px] ${isCompared ? 'fill-current animate-pop-in' : ''}`}>compare_arrows</span>
                {isCompared ? 'Compared' : 'Add to Compare'}
              </button>
              <button 
                onClick={() => setIsShareSheetOpen(true)} 
                className={`flex-1 py-4 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 rounded-xl bg-neutral-100 dark:bg-white/5 border border-transparent hover:border-primary/20 text-neutral-500 dark:text-neutral-400 hover:text-primary dark:hover:text-primary`}
              >
                <span className="material-symbols-outlined text-[18px]">share</span>
                Share
              </button>
            </div>
          </div>

          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-neutral-900 dark:text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                {stylistRecommendation ? <><span className="material-symbols-outlined text-primary text-sm animate-pulse">auto_awesome</span>Curated for Your Style</> : "You May Also Like"}
              </h3>
            </div>
            <div className="flex overflow-x-auto no-scrollbar gap-5 pb-4">
              {recommendedItems.map((item) => (
                <Link to={`/product/${item.id}`} key={item.id} className="flex-shrink-0 w-44 group transition-transform active:scale-95">
                  <div className="aspect-[3/4] rounded-xl overflow-hidden bg-white/5 mb-3 shadow-sm group-hover:shadow-md transition-shadow">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">{item.category}</p>
                  <p className="text-sm font-bold text-neutral-900 dark:text-white uppercase truncate group-hover:text-primary transition-colors">{item.name}</p>
                  <p className="text-primary text-xs font-bold mt-1">${item.price.toLocaleString()}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="border-t border-neutral-200 dark:border-white/10 pt-12 mb-12">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-neutral-900 dark:text-white text-xs font-bold uppercase tracking-widest">Collector Appraisals</h3>
              <div className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full">
                <span className="text-primary font-bold text-sm">{reviews.length > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) : '5.0'}</span>
                <span className="material-symbols-outlined text-primary text-sm fill-current" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
            </div>

            <form onSubmit={handleSubmitReview} className="mb-12 p-8 rounded-3xl bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 backdrop-blur-sm">
              <p className="text-neutral-500 text-[9px] font-bold uppercase tracking-widest mb-6">Share Your Experience</p>
              <div className="flex gap-3 mb-8">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button key={s} type="button" onClick={() => setRating(s)} className={`material-symbols-outlined text-3xl transition-all duration-300 hover:scale-110 ${rating >= s ? 'text-primary fill-current' : 'text-neutral-400 dark:text-neutral-600'}`} style={rating >= s ? { fontVariationSettings: "'FILL' 1" } : {}}>star</button>
                ))}
              </div>
              <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="The texture of the leather is incomparable..." className="w-full bg-transparent border-b border-neutral-300 dark:border-white/10 focus:border-primary focus:ring-0 text-neutral-900 dark:text-white text-sm placeholder:text-neutral-400 dark:placeholder:text-white/20 resize-none h-24 mb-8 transition-colors" required />
              <button type="submit" disabled={isSubmitting || rating === 0} className="w-full py-4 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-[11px] font-bold uppercase tracking-[0.2em] rounded-full disabled:opacity-30 transition-all hover:shadow-xl active:scale-95">
                {isSubmitting ? 'Recording Appraisal...' : 'Submit Appraisal'}
              </button>
            </form>

            <div className="space-y-10">
              {reviews.length > 0 ? (
                reviews.map((rev) => (
                  <div key={rev.id} className="animate-fade-in group">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <span key={s} className={`material-symbols-outlined text-[16px] ${rev.rating >= s ? 'text-primary fill-current' : 'text-neutral-300 dark:text-neutral-800'}`} style={rev.rating >= s ? { fontVariationSettings: "'FILL' 1" } : {}}>star</span>
                        ))}
                      </div>
                      <span className="text-neutral-400 text-[10px] font-medium uppercase tracking-tighter">{rev.date}</span>
                    </div>
                    <p className="text-neutral-800 dark:text-neutral-200 text-base italic font-light leading-relaxed mb-3 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">"{rev.comment}"</p>
                    <p className="text-neutral-500 text-[9px] font-bold uppercase tracking-widest flex items-center gap-2"><span className="w-4 h-[1px] bg-neutral-300 dark:bg-white/20"></span>{rev.userName}</p>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center border-2 border-dashed border-neutral-200 dark:border-white/5 rounded-3xl">
                  <p className="text-neutral-400 text-xs italic font-light">Be the first to share your appraisal of this masterpiece.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailView;
