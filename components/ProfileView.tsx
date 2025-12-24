
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

type SubSection = 'main' | 'orders' | 'shipping' | 'payment' | 'rewards' | 'catalog' | 'settings';

const ProfileView: React.FC = () => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<SubSection>('main');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const checkAuth = () => {
    const loggedIn = localStorage.getItem('vp_is_logged_in') === 'true';
    setIsLoggedIn(loggedIn);
    const savedAvatar = localStorage.getItem('vp_user_avatar');
    if (savedAvatar) {
      setAvatarUrl(savedAvatar);
    } else {
      setAvatarUrl(null);
    }
  };

  useEffect(() => {
    checkAuth();
    window.addEventListener('vp_auth_changed', checkAuth);
    return () => window.removeEventListener('vp_auth_changed', checkAuth);
  }, []);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setAvatarUrl(base64String);
        localStorage.setItem('vp_user_avatar', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('vp_is_logged_in');
    localStorage.removeItem('vp_user_avatar');
    localStorage.removeItem('vp_user_name');
    setIsLoggedIn(false);
    setAvatarUrl(null);
    setActiveSection('main');
    window.dispatchEvent(new Event('vp_auth_changed'));
    // We stay on the profile page but it will now render the "Logged Out" state
  };

  const menuItems = [
    { label: 'Order History', icon: 'history', id: 'orders' as SubSection },
    { label: 'Shipping Address', icon: 'location_on', id: 'shipping' as SubSection },
    { label: 'Payment Methods', icon: 'credit_card', id: 'payment' as SubSection },
    { label: 'VietPrime Rewards', icon: 'military_tech', id: 'rewards' as SubSection },
    { label: 'Private Catalog', icon: 'auto_stories', id: 'catalog' as SubSection },
    { label: 'Account Settings', icon: 'settings', id: 'settings' as SubSection },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'orders':
        return (
          <div className="space-y-6 animate-fade-in-up">
            <h3 className="text-white text-lg font-bold uppercase tracking-widest mb-6">Recent Acquisitions</h3>
            {[1, 2].map((order) => (
              <div key={order} className="p-5 rounded-2xl bg-white/5 border border-white/10 flex justify-between items-center">
                <div>
                  <p className="text-primary text-[10px] font-bold uppercase tracking-widest">Order #VP-902{order}</p>
                  <p className="text-white text-sm font-semibold mt-1">Heritage Duffel - Obsidian</p>
                  <p className="text-white/40 text-[10px] uppercase mt-1">Delivered Oct 12, 2023</p>
                </div>
                <span className="material-symbols-outlined text-primary">verified</span>
              </div>
            ))}
          </div>
        );
      case 'shipping':
        return (
          <div className="space-y-6 animate-fade-in-up">
            <h3 className="text-white text-lg font-bold uppercase tracking-widest mb-6">Dispatch Details</h3>
            <div className="p-6 rounded-2xl bg-white/5 border border-primary/20">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-primary/20 text-primary text-[8px] font-black px-2 py-1 rounded uppercase">Primary</span>
                <span className="material-symbols-outlined text-white/20 text-sm">edit</span>
              </div>
              <p className="text-white text-sm font-bold">Collector Residency</p>
              <p className="text-white/60 text-xs leading-relaxed mt-2">128 Via Montenapoleone<br/>Milan, Italy 20121</p>
            </div>
            <button className="w-full py-4 border border-dashed border-white/10 rounded-2xl text-white/40 text-[10px] font-bold uppercase tracking-widest hover:bg-white/5">Add New Destination</button>
          </div>
        );
      case 'payment':
        return (
          <div className="space-y-6 animate-fade-in-up">
            <h3 className="text-white text-lg font-bold uppercase tracking-widest mb-6">Private Wallet</h3>
            <div className="relative aspect-[1.6/1] w-full bg-gradient-to-br from-neutral-800 to-black rounded-2xl p-6 border border-white/10 overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-10">
                  <span className="material-symbols-outlined text-[100px]">diamond</span>
               </div>
               <div className="flex justify-between items-start">
                  <span className="text-primary font-bold tracking-[0.2em] text-xs">VIETPRIME BLACK</span>
                  <span className="material-symbols-outlined text-white">contactless</span>
               </div>
               <div className="mt-12">
                  <p className="text-white tracking-[0.3em] text-sm">••••  ••••  ••••  8829</p>
                  <p className="text-white/40 text-[10px] uppercase mt-4 tracking-widest">Collector Name</p>
               </div>
            </div>
          </div>
        );
      case 'rewards':
        return (
          <div className="space-y-6 animate-fade-in-up text-center py-4">
            <span className="material-symbols-outlined text-6xl text-primary animate-pulse">military_tech</span>
            <h3 className="text-white text-xl font-bold uppercase tracking-[0.2em]">Private Tier</h3>
            <div className="w-full bg-white/5 rounded-full h-1 overflow-hidden mt-4">
               <div className="bg-primary w-3/4 h-full"></div>
            </div>
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-white/40">
               <span>8,400 pts</span>
               <span>Elite Tier at 10k</span>
            </div>
            <p className="text-white/60 text-xs italic leading-relaxed pt-4 px-4">
              "Your loyalty is the fabric of our heritage. You have unlocked complimentary global express shipping."
            </p>
          </div>
        );
      case 'catalog':
        return (
          <div className="space-y-6 animate-fade-in-up">
            <h3 className="text-white text-lg font-bold uppercase tracking-widest mb-6">The Vault</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="relative aspect-video rounded-2xl overflow-hidden group">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXu Ak-pMeXGbtmq362t_2JduhVmC2oQglCG_VquuItMs5GiHdNhQpM8XxriJISQvl__bUO6GVZq-VebnPt7x8KFs9H2aI9Bgs-3a-HA4eKS7WCcW1JVTPHJ8vj7synnKWM02-vKB466zfqOWbYqa5KQ3iwosQvyhPlP8gF3R90bspppW6Gx0FR6EqzJIRkG_Nur8WWB7HFGdvbslQ2kqRbqoHkx30TuSNRdNzakzFzC5mMQod-eEJSDusTz6lBI80jkCf_0H0eXyupw" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-6 text-center">
                  <p className="text-primary text-[10px] font-bold uppercase tracking-widest mb-2">Exclusive Drop</p>
                  <h4 className="text-white text-sm font-bold uppercase tracking-widest">The Alligator Series</h4>
                  <button className="mt-4 text-[9px] font-black uppercase text-white/40 hover:text-white transition-colors">Request Private Link</button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-4 animate-fade-in-up">
            <h3 className="text-white text-lg font-bold uppercase tracking-widest mb-6">Collector Settings</h3>
            {[
              { label: 'Biometric Security', state: true },
              { label: 'Private Notifications', state: false },
              { label: 'Atelier Newsletters', state: true },
            ].map((item) => (
              <div key={item.label} className="p-5 rounded-2xl bg-white/5 border border-white/10 flex justify-between items-center">
                <span className="text-white text-sm font-semibold uppercase tracking-widest">{item.label}</span>
                <div className={`w-10 h-5 rounded-full p-1 transition-colors ${item.state ? 'bg-primary' : 'bg-white/10'}`}>
                   <div className={`w-3 h-3 rounded-full bg-white transition-transform ${item.state ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </div>
              </div>
            ))}
          </div>
        );
      default:
        return (
          <div className="w-full max-w-md space-y-3 pb-32">
            {menuItems.map((item) => (
              <button 
                key={item.label} 
                onClick={() => setActiveSection(item.id)}
                className="w-full p-5 flex items-center justify-between rounded-2xl bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-neutral-800 dark:text-white/80 hover:bg-white/10 hover:border-primary/20 transition-all group active:scale-[0.98] animate-fade-in-up"
              >
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-neutral-400 group-hover:text-primary transition-colors">{item.icon}</span>
                  <span className="text-sm font-bold uppercase tracking-wider">{item.label}</span>
                </div>
                <span className="material-symbols-outlined text-sm text-neutral-300 dark:text-white/10 group-hover:text-primary transition-colors">chevron_right</span>
              </button>
            ))}
            
            <button 
              onClick={handleSignOut}
              className="w-full p-5 flex items-center justify-center gap-2 rounded-2xl bg-red-500/5 border border-red-500/10 text-red-500 hover:bg-red-500/10 transition-colors mt-8 active:scale-95"
            >
              <span className="material-symbols-outlined text-sm">logout</span>
              <span className="text-sm font-bold uppercase tracking-widest">Sign Out</span>
            </button>
          </div>
        );
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen pt-40 px-6 flex flex-col items-center animate-fade-in text-center bg-background-light dark:bg-background-dark">
        <span className="material-symbols-outlined text-6xl text-white/5 mb-8">lock</span>
        <h2 className="text-neutral-900 dark:text-white text-2xl font-bold uppercase tracking-[0.3em] mb-4">Private Membership</h2>
        <p className="text-neutral-500 dark:text-white/40 text-sm max-w-xs mx-auto leading-relaxed mb-10 italic">
          "The profile suite is reserved for our private collectors. Please sign in to access your acquisitions and rewards."
        </p>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="px-10 py-4 bg-primary text-background-dark font-bold uppercase text-[11px] tracking-[0.2em] rounded-full shadow-xl shadow-primary/20 active:scale-95 transition-all"
        >
          Use Login in Header
        </button>
        <p className="mt-12 text-white/10 text-[10px] font-black uppercase tracking-[0.4em]">VietPrime Heritage Atelier</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-6 flex flex-col items-center animate-fade-in bg-background-light dark:bg-background-dark">
      {/* Dynamic Header */}
      {activeSection !== 'main' ? (
        <div className="w-full max-w-md flex items-center mb-10 animate-fade-in">
          <button 
            onClick={() => setActiveSection('main')}
            className="size-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="flex-1 text-center pr-10">
             <p className="text-primary text-[10px] font-bold uppercase tracking-[0.3em]">Membership Suite</p>
          </div>
        </div>
      ) : (
        <>
          {/* Avatar Section */}
          <div className="relative group mb-6">
            <div 
              onClick={handleAvatarClick}
              className="w-28 h-28 rounded-full bg-neutral-100 dark:bg-white/5 border-2 border-primary/30 flex items-center justify-center overflow-hidden cursor-pointer transition-all duration-500 hover:border-primary group-active:scale-95 shadow-2xl"
            >
              {avatarUrl ? (
                <img src={avatarUrl} alt="User Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="material-symbols-outlined text-5xl text-neutral-300 dark:text-white/20">person</span>
              )}
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
                <span className="material-symbols-outlined text-white text-2xl">photo_camera</span>
                <span className="text-[8px] text-white font-bold uppercase tracking-widest mt-1">Edit</span>
              </div>
            </div>
            
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
            />
            
            <div className="absolute -bottom-1 -right-1 size-8 bg-primary rounded-full border-4 border-background-light dark:border-background-dark flex items-center justify-center">
              <span className="material-symbols-outlined text-background-dark text-[16px] font-black">verified</span>
            </div>
          </div>

          <div className="text-center mb-10">
            <h2 className="text-neutral-900 dark:text-white text-xl font-bold uppercase tracking-[0.2em] mb-1">Guest Collector</h2>
            <div className="flex items-center justify-center gap-2">
               <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
               <p className="text-primary text-[10px] font-bold uppercase tracking-[0.3em]">Private Tier Access</p>
            </div>
          </div>

          <button className="mb-10 px-8 py-3 rounded-full border border-neutral-200 dark:border-white/10 text-neutral-500 dark:text-white/40 text-[10px] font-bold uppercase tracking-widest hover:bg-white/5 transition-all">
            Edit Profile Information
          </button>
        </>
      )}
      
      <div className="w-full max-w-md">
        {renderContent()}
      </div>
    </div>
  );
};

export default ProfileView;
