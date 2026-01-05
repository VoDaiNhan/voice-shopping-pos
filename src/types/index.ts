// Product types
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  sku?: string;
}

// Cart types
export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

// Order types
export interface Order {
  id: string;
  items: CartItem[];
  customer?: Customer;
  status: OrderStatus;
  total: number;
  createdAt: Date;
  note?: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'delivering' | 'completed' | 'cancelled';

// Customer types  
export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  isVip?: boolean;
  totalSpent: number;
}

// Voice Command types
export interface VoiceCommand {
  action: 'add' | 'remove' | 'search' | 'checkout' | 'clear' | 'unknown';
  productName?: string;
  quantity?: number;
  rawTranscript: string;
}

// Category type
export interface Category {
  id: string;
  name: string;
  icon?: string;
}
