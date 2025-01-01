export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  size: string[];
  stock: number;
}

export interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  size: string;
  product: Product;
}

export interface Order {
  id: string;
  user_id: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total_amount: number;
  created_at: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  size: string;
  price_at_time: number;
  product?: Product;
}