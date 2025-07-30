import { useState, useEffect, useCallback } from 'react';
import { Order, CartItem } from '../types';
import { mockOrders } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import { generateOrderNumber, canCancelOrder, isOrderCompleted } from '../utils/helpers';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '../constants/app';
import { useToast } from '../components/ui/use-toast';

interface UseOrdersOptions {
  autoLoad?: boolean;
}

interface CreateOrderData {
  items: CartItem[];
  paymentMethod: string;
  deliveryAddress: string;
  notes?: string;
}

interface UseOrdersReturn {
  orders: Order[];
  loading: boolean;
  error: string | null;
  isCreating: boolean;
  // Actions
  createOrder: (orderData: CreateOrderData) => Promise<Order | null>;
  cancelOrder: (orderId: string) => Promise<boolean>;
  refreshOrders: () => Promise<void>;
  getOrderById: (orderId: string) => Order | undefined;
  canCancel: (order: Order) => boolean;
  isCompleted: (order: Order) => boolean;
}

export const useOrders = (options: UseOrdersOptions = {}): UseOrdersReturn => {
  const { autoLoad = true } = options;
  const { user } = useAuth();
  const { toast } = useToast();

  // State
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Load user orders
  const loadOrders = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // TODO: Replace with real API call when backend is ready
      // const response = await ordersService.getUserOrders();
      
      // Filter orders by current user
      const userOrders = mockOrders.filter(order => order.clientId === user.id);
      setOrders(userOrders);
    } catch (err) {
      setError('Error al cargar órdenes');
      console.error('Error loading orders:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Load orders on mount or when user changes
  useEffect(() => {
    if (autoLoad && user) {
      loadOrders();
    }
  }, [autoLoad, user, loadOrders]);

  // Create new order
  const createOrder = useCallback(async (orderData: CreateOrderData): Promise<Order | null> => {
    if (!user) {
      toast({
        title: "Error",
        description: "Debe iniciar sesión para crear una orden",
        variant: "destructive",
      });
      return null;
    }

    try {
      setIsCreating(true);
      setError(null);

      // Calculate order total
      const total = orderData.items.reduce(
        (sum, item) => sum + (item.product.price * item.quantity),
        0
      );

      // Create new order
      const newOrder: Order = {
        id: generateOrderNumber(),
        clientId: user.id,
        clientName: user.name,
        items: orderData.items,
        total,
        status: 'pendiente',
        paymentMethod: orderData.paymentMethod,
        deliveryAddress: orderData.deliveryAddress,
        createdAt: new Date(),
      };

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // TODO: Replace with real API call when backend is ready
      // const response = await ordersService.createOrder(orderData);
      
      // Add to local state (mock)
      setOrders(prevOrders => [newOrder, ...prevOrders]);

      toast({
        title: "Éxito",
        description: SUCCESS_MESSAGES.ORDER_CREATED,
      });

      return newOrder;
    } catch (err) {
      setError('Error al crear la orden');
      console.error('Error creating order:', err);
      
      toast({
        title: "Error",
        description: ERROR_MESSAGES.UNKNOWN_ERROR,
        variant: "destructive",
      });
      
      return null;
    } finally {
      setIsCreating(false);
    }
  }, [user, toast]);

  // Cancel order
  const cancelOrder = useCallback(async (orderId: string): Promise<boolean> => {
    try {
      setError(null);
      
      const order = orders.find(o => o.id === orderId);
      if (!order) {
        throw new Error('Orden no encontrada');
      }

      if (!canCancelOrder(order)) {
        toast({
          title: "Error",
          description: "Esta orden no puede ser cancelada",
          variant: "destructive",
        });
        return false;
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // TODO: Replace with real API call when backend is ready
      // await ordersService.cancelOrder(orderId);

      // Update local state (mock)
      setOrders(prevOrders =>
        prevOrders.map(o =>
          o.id === orderId ? { ...o, status: 'cancelado' as const } : o
        )
      );

      toast({
        title: "Éxito",
        description: SUCCESS_MESSAGES.ORDER_CANCELLED,
      });

      return true;
    } catch (err) {
      setError('Error al cancelar la orden');
      console.error('Error cancelling order:', err);
      
      toast({
        title: "Error",
        description: ERROR_MESSAGES.UNKNOWN_ERROR,
        variant: "destructive",
      });
      
      return false;
    }
  }, [orders, toast]);

  // Refresh orders
  const refreshOrders = useCallback(async () => {
    await loadOrders();
  }, [loadOrders]);

  // Get order by ID
  const getOrderById = useCallback((orderId: string): Order | undefined => {
    return orders.find(order => order.id === orderId);
  }, [orders]);

  // Helper functions
  const canCancel = useCallback((order: Order): boolean => {
    return canCancelOrder(order);
  }, []);

  const isCompleted = useCallback((order: Order): boolean => {
    return isOrderCompleted(order);
  }, []);

  return {
    orders,
    loading,
    error,
    isCreating,
    createOrder,
    cancelOrder,
    refreshOrders,
    getOrderById,
    canCancel,
    isCompleted,
  };
}; 