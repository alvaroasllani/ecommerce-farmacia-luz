
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CartItem, Product } from '../types';
import { calculateCartTotal, calculateCartItemCount, isInStock } from '../utils/helpers';
import { validateCartQuantity } from '../utils/validators';
import { APP_CONFIG, SUCCESS_MESSAGES, ERROR_MESSAGES } from '../constants/app';
import { useToast } from '../components/ui/use-toast';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => Promise<boolean>;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => Promise<boolean>;
  clearCart: () => void;
  total: number;
  itemCount: number;
  isLoading: boolean;
  errors: Record<string, string>;
  clearErrors: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'farmacia_cart';

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  // Clear errors helper
  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        // Validate cart structure
        if (Array.isArray(parsedCart)) {
          setItems(parsedCart);
        }
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [items]);

  const addItem = async (product: Product, quantity = 1): Promise<boolean> => {
    setIsLoading(true);
    clearErrors();

    try {
      // Validate stock availability
      if (!isInStock(product, quantity)) {
        setErrors({ [product.id]: 'Producto agotado' });
        toast({
          title: "Error",
          description: `${product.name} no tiene stock disponible`,
          variant: "destructive",
        });
        return false;
      }

      // Check if adding would exceed cart limits
      const currentItemCount = calculateCartItemCount(items);
      if (currentItemCount >= APP_CONFIG.MAX_CART_ITEMS) {
        setErrors({ general: `Máximo ${APP_CONFIG.MAX_CART_ITEMS} artículos en el carrito` });
        toast({
          title: "Error",
          description: `No puedes agregar más de ${APP_CONFIG.MAX_CART_ITEMS} artículos al carrito`,
          variant: "destructive",
        });
        return false;
      }

      setItems(prevItems => {
        const existingItem = prevItems.find(item => item.product.id === product.id);
        
        if (existingItem) {
          const newQuantity = existingItem.quantity + quantity;
          const quantityValidation = validateCartQuantity(newQuantity, product.stock);
          
          if (!quantityValidation.isValid) {
            setErrors({ [product.id]: quantityValidation.error! });
            toast({
              title: "Error",
              description: quantityValidation.error,
              variant: "destructive",
            });
            return prevItems;
          }
          
          return prevItems.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: newQuantity }
              : item
          );
        }
        
        // Validate quantity for new item
        const quantityValidation = validateCartQuantity(quantity, product.stock);
        if (!quantityValidation.isValid) {
          setErrors({ [product.id]: quantityValidation.error! });
          toast({
            title: "Error",
            description: quantityValidation.error,
            variant: "destructive",
          });
          return prevItems;
        }
        
        return [...prevItems, { product, quantity }];
      });

      toast({
        title: "Éxito",
        description: SUCCESS_MESSAGES.PRODUCT_ADDED,
      });

      return true;
    } catch (error) {
      console.error('Error adding item to cart:', error);
      setErrors({ general: ERROR_MESSAGES.UNKNOWN_ERROR });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const removeItem = useCallback((productId: string) => {
    setItems(prevItems => prevItems.filter(item => item.product.id !== productId));
    clearErrors();
    
    toast({
      title: "Producto eliminado",
      description: "El producto fue eliminado del carrito",
    });
  }, [toast]);

  const updateQuantity = async (productId: string, quantity: number): Promise<boolean> => {
    setIsLoading(true);
    clearErrors();

    try {
      if (quantity <= 0) {
        removeItem(productId);
        return true;
      }

      const item = items.find(item => item.product.id === productId);
      if (!item) {
        setErrors({ [productId]: 'Producto no encontrado en el carrito' });
        return false;
      }

      const quantityValidation = validateCartQuantity(quantity, item.product.stock);
      if (!quantityValidation.isValid) {
        setErrors({ [productId]: quantityValidation.error! });
        toast({
          title: "Error",
          description: quantityValidation.error,
          variant: "destructive",
        });
        return false;
      }
      
      setItems(prevItems =>
        prevItems.map(item =>
          item.product.id === productId
            ? { ...item, quantity }
            : item
        )
      );

      return true;
    } catch (error) {
      console.error('Error updating quantity:', error);
      setErrors({ general: ERROR_MESSAGES.UNKNOWN_ERROR });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = useCallback(() => {
    setItems([]);
    clearErrors();
    
    toast({
      title: "Carrito vaciado",
      description: "Todos los productos fueron eliminados del carrito",
    });
  }, [toast]);

  // Memoized calculations using utility functions
  const total = calculateCartTotal(items);
  const itemCount = calculateCartItemCount(items);

  const value: CartContextType = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    total,
    itemCount,
    isLoading,
    errors,
    clearErrors,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
