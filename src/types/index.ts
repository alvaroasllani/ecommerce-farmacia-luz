
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'cliente' | 'cajero' | 'administrador';
  phone?: string;
  address?: string;
  createdAt: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  requiresPrescription: boolean;
  brand: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  clientId: string;
  clientName: string;
  items: CartItem[];
  total: number;
  status: 'pendiente' | 'pagado' | 'entregado' | 'cancelado';
  paymentMethod: string;
  deliveryAddress: string;
  createdAt: Date;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Partial<User>) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}
