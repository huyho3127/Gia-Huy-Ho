
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative h-[85vh] w-full shrink-0 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 transform scale-105 hover:scale-110"
        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAk-pMeXGbtmq362t_2JduhVmC2oQglCG_VquuItMs5GiHdNhQpM8XxriJISQvl__bUO6GVZq-VebnPt7x8KFs9H2aI9Bgs-3a-HA4eKS7WCcW1JVTPHJ8vj7synnKWM02-vKB466zfqOWbYqa5KQ3iwosQvyhPlP8gF3R90bspppW6Gx0FR6EqzJIRkG_Nur8WWB7HFGdvbslQ2kqRbqoHkx30TuSNRdNzakzFzC5mMQod-eEJSDusTz6lBI80jkCf_0H0eXyupw")' }}
      ></div>
      
      {/* Dark Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent opacity-90"></div>
      
      {/* Content */}
      <div className="absolute bottom-0 w-full flex flex-col items-center justify-end px-6 pb-12 pt-20 text-center">
        {/* Tagline */}
        <p className="mb-3 text-primary text-xs font-bold tracking-[0.2em] uppercase animate-fade-in">
          New Arrival
        </p>
        
        {/* HeadlineText */}
        <h2 className="text-white tracking-wide text-[32px] md:text-[40px] font-bold leading-[1.1] mb-2 drop-shadow-sm animate-fade-in-up [animation-delay:300ms]">
          THE HERITAGE<br/>COLLECTION
        </h2>
        
        {/* BodyText */}
        <p className="text-white/80 text-base font-medium leading-relaxed max-w-xs mx-auto mb-8 animate-fade-in-up [animation-delay:500ms]">
          Handcrafted Italian leather designed for the modern muse. Timeless elegance redefined.
        </p>
        
        {/* SingleButton */}
        <button 
          onClick={() => navigate('/shop')}
          className="group flex min-w-[160px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-8 bg-primary hover:bg-primary/90 active:scale-95 transition-all shadow-lg shadow-primary/20 animate-fade-in-up [animation-delay:700ms]"
        >
          <span className="text-background-dark text-sm font-bold tracking-widest uppercase mr-2">Explore Collection</span>
          <span className="material-symbols-outlined text-background-dark text-[20px] transition-transform group-hover:translate-x-1">arrow_forward</span>
        </button>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white/30 animate-bounce-subtle">
          <span className="material-symbols-outlined text-[24px]">keyboard_arrow_down</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
