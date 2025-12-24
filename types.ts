
export interface ProductVariant {
  id: string;
  color: string;
  colorHex: string;
  hardware: string;
  price: number;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  images: string[];
  color: string;
  hardware: string;
  variants?: ProductVariant[];
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export type ViewState = 'home' | 'shop' | 'wishlist' | 'profile' | 'assistant';
