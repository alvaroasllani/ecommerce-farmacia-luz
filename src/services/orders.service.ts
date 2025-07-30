import { api } from './api';
import { Order, CartItem } from '../types';

export interface CreateOrderRequest {
  items: CartItem[];
  paymentMethod: string;
  deliveryAddress: string;
  notes?: string;
}

export interface OrdersResponse {
  orders: Order[];
  total: number;
  page: number;
  totalPages: number;
}

export interface OrderFilters {
  status?: Order['status'];
  clientId?: string;
  dateFrom?: string;
  dateTo?: string;
}

export const ordersService = {
  // Create new order
  async createOrder(orderData: CreateOrderRequest): Promise<Order> {
    return api.post<Order>('/orders', orderData);
  },

  // Get user orders
  async getUserOrders(page = 1, limit = 10): Promise<OrdersResponse> {
    return api.get<OrdersResponse>(`/orders/user?page=${page}&limit=${limit}`);
  },

  // Get single order
  async getOrder(orderId: string): Promise<Order> {
    return api.get<Order>(`/orders/${orderId}`);
  },

  // Update order status (admin/cashier only)
  async updateOrderStatus(orderId: string, status: Order['status']): Promise<Order> {
    return api.put<Order>(`/orders/${orderId}/status`, { status });
  },

  // Cancel order
  async cancelOrder(orderId: string): Promise<Order> {
    return api.put<Order>(`/orders/${orderId}/cancel`);
  },

  // Get all orders (admin/cashier only)
  async getAllOrders(filters: OrderFilters = {}, page = 1, limit = 10): Promise<OrdersResponse> {
    const params = new URLSearchParams();
    params.append('page', String(page));
    params.append('limit', String(limit));
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        params.append(key, String(value));
      }
    });

    return api.get<OrdersResponse>(`/orders?${params.toString()}`);
  },

  // Process payment
  async processPayment(orderId: string, paymentData: any): Promise<Order> {
    return api.post<Order>(`/orders/${orderId}/payment`, paymentData);
  }
}; 