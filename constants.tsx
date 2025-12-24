
import { Category, Product } from './types';

export const CATEGORIES: Category[] = [
  {
    id: 'totes',
    name: 'Totes',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'clutches',
    name: 'Clutches',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'travel',
    name: 'Travel',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=800'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'v-tote',
    name: 'The V-Tote',
    category: 'Totes',
    price: 2450,
    description: 'Handcrafted Italian leather designed for the modern muse.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCX6BtvgNnugD3muSilKH_K0JHir3Q0ODW2l4V9q85Epdm8Ns_1N1O7qF7xpXhsCKKvcKrGPp7h-Cilpg7ztnd4k8tsXPqnU8POPq3XfqXf_L4011ImepP8262z2-8zUn4EKX8RULmuOGo3am11qCcj1fRZR9phsJgOwaNhOd-tm3Em7Fn0sKC8304eSUnuIc3MyPLyDSKGmUmegEsCAACaRAvKFDiXjmvoYojKw04w5U2AM2cKGa2gYJKZRv_2m3R4DElacxtMJQ',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCX6BtvgNnugD3muSilKH_K0JHir3Q0ODW2l4V9q85Epdm8Ns_1N1O7qF7xpXhsCKKvcKrGPp7h-Cilpg7ztnd4k8tsXPqnU8POPq3XfqXf_L4011ImepP8262z2-8zUn4EKX8RULmuOGo3am11qCcj1fRZR9phsJgOwaNhOd-tm3Em7Fn0sKC8304eSUnuIc3MyPLyDSKGmUmegEsCAACaRAvKFDiXjmvoYojKw04w5U2AM2cKGa2gYJKZRv_2m3R4DElacxtMJQ',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAk-pMeXGbtmq362t_2JduhVmC2oQglCG_VquuItMs5GiHdNhQpM8XxriJISQvl__bUO6GVZq-VebnPt7x8KFs9H2aI9Bgs-3a-HA4eKS7WCcW1JVTPHJ8vj7synKWM02-vKB466zfqOWbYqa5KQ3iwosQvyhPlP8gF3R90bspppW6Gx0FR6EqzJIRkG_Nur8WWB7HFGdvbslQ2kqRbqoHkx30TuSNRdNzakzFzC5mMQod-eEJSDusTz6lBI80jkCf_0H0eXyupw'
    ],
    color: 'Cognac',
    hardware: 'Gold Hardware'
  },
  {
    id: 'heritage-clutch',
    name: 'Heritage Clutch',
    category: 'Clutches',
    price: 1200,
    description: 'Minimalist clutch with rich grain texture.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVKh8kNCPag7LeBr9XKQ0lqVuPhbrjbGhrBczQsq5o2514gI4cs9s_gjeNsKHxNOREUVzaRRUqmvByGqkrtoWCeFYldy9_CDO8ZkEJUkxAYEML7aLY0ukOdsCo4m8EnuuhncDdLeB4gYOVwFBHPbgzfTXD9zduOHn-lDK5pbpx1oEijccscmWHbyFTG3JRkt3vdGkJQH4cKN6G-KgX4QkcIJXi0bz9WErXPgRGkGAjPc52jpoZscJ32YyY0guR1VBMWLudsX3mWQ',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCVKh8kNCPag7LeBr9XKQ0lqVuPhbrjbGhrBczQsq5o2514gI4cs9s_gjeNsKHxNOREUVzaRRUqmvByGqkrtoWCeFYldy9_CDO8ZkEJUkxAYEML7aLY0ukOdsCo4m8EnuuhncDdLeB4gYOVwFBHPbgzfTXD9zduOHn-lDK5pbpx1oEijccscmWHbyFTG3JRkt3vdGkJQH4cKN6G-KgX4QkcIJXi0bz9WErXPgRGkGAjPc52jpoZscJ32YyY0guR1VBMWLudsX3mWQ'
    ],
    color: 'Midnight Black',
    hardware: 'Silver Hardware'
  },
  {
    id: 'grand-duffel',
    name: 'Grand Duffel',
    category: 'Travel',
    price: 3800,
    description: 'The ultimate companion for your weekend escapes.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3ShRzohwjMpI6lO3wk1InpqH5fxzgfKPL3QnKF1Ft-v6Cv5qHkjxWQq3XQueihFwxaSunJflgXSp_YV-dV1hwt9nbbg-tUidHgqVeAzt9c3l_j1Nlrpm1TjD5gUdZ_xHBY6nz7SWlnBrOJxRcMHqTUPvXz8kXc5BIPhqSuKsDQDGQepiidVrpSIMXTCFdLDRjoOtpGAd1yDAsiFXU3oVFu9ci6ygpy0iQXhW19siXgfs5bhnlHlbigAWA0xvJbgbCQaIGmIARWg',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB3ShRzohwjMpI6lO3wk1InpqH5fxzgfKPL3QnKF1Ft-v6Cv5qHkjxWQq3XQueihFwxaSunJflgXSp_YV-dV1hwt9nbbg-tUidHgqVeAzt9c3l_j1Nlrpm1TjD5gUdZ_xHBY6nz7SWlnBrOJxRcMHqTUPvXz8kXc5BIPhqSuKsDQDGQepiidVrpSIMXTCFdLDRjoOtpGAd1yDAsiFXU3oVFu9ci6ygpy0iQXhW19siXgfs5bhnlHlbigAWA0xvJbgbCQaIGmIARWg'
    ],
    color: 'Tanned Earth',
    hardware: 'Antique Brass'
  },
  {
    id: 'palazzo-tote',
    name: 'The Palazzo Tote',
    category: 'Totes',
    price: 3200,
    description: 'A structural masterpiece inspired by Italian architecture.',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800'
    ],
    color: 'Bordeaux',
    hardware: 'Gold Hardware'
  },
  {
    id: 'amalfi-weekender',
    name: 'The Amalfi Weekender',
    category: 'Travel',
    price: 4500,
    description: 'Designed for transcontinental voyages and coastal escapes.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1524498250077-390f9e378fc0?auto=format&fit=crop&q=80&w=800'
    ],
    color: 'Navy Peau',
    hardware: 'Gunmetal Hardware'
  },
  {
    id: 'evening-minaudiere',
    name: 'The Evening Minaudière',
    category: 'Clutches',
    price: 1800,
    description: 'A captivating presence at any gala, finished with high-gloss luster.',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1566150905458-1bf1fd113961?auto=format&fit=crop&q=80&w=800'
    ],
    color: 'Emerald',
    hardware: 'Silver Hardware'
  },
  {
    id: 'medici-briefcase',
    name: 'The Medici Briefcase',
    category: 'Travel',
    price: 3800,
    description: 'An executive masterpiece for the modern captain of industry.',
    image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1473187983305-f615310e7daa?auto=format&fit=crop&q=80&w=800'
    ],
    color: 'Chestnut',
    hardware: 'Antique Brass'
  },
  {
    id: 'sienna-crossbody',
    name: 'The Sienna Crossbody',
    category: 'Accessories',
    price: 1450,
    description: 'A versatile silhouette for urban exploration.',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1598533023411-ca95f69693ef?auto=format&fit=crop&q=80&w=800'
    ],
    color: 'Ochre',
    hardware: 'Gold Hardware'
  },
  {
    id: 'riviera-bucket',
    name: 'The Riviera Bucket Bag',
    category: 'Totes',
    price: 2900,
    description: 'Sculptural elegance for seaside soirees.',
    image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1614179664532-610a3075677b?auto=format&fit=crop&q=80&w=800'
    ],
    color: 'Cerulean',
    hardware: 'Silver Hardware'
  }
];
