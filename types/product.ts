export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  category: string;
  image: string;
  images: string[];
  colors: string[];
  sizes?: string[];
  featured: boolean;
  inStock: boolean;
  createdAt: string;
}