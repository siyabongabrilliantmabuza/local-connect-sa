export interface User {
  id: number;
  email: string;
  full_name: string;
  role: 'customer' | 'seller' | 'admin';
  avatar_url?: string;
  created_at: string;
}

export interface Seller {
  id: number;
  user_id: number;
  business_name: string;
  category: string;
  description: string;
  rating: number;
  total_reviews: number;
  verified: boolean;
  created_at: string;
}

export interface Product {
  id: number;
  seller_id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  image_url: string;
  stock: number;
  rating: number;
  total_reviews: number;
  badge?: string;
  created_at: string;
}

export interface CartItem {
  id: number;
  user_id: number;
  product_id: number;
  quantity: number;
  product?: Product;
}

export interface Order {
  id: number;
  user_id: number;
  total_amount: number;
  status: 'pending' | 'completed' | 'cancelled';
  created_at: string;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
}
