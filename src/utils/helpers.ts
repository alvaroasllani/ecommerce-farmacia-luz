import { Product, CartItem, Order } from '../types';

// Calculate cart total
export const calculateCartTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
};

// Calculate cart item count
export const calculateCartItemCount = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.quantity, 0);
};

// Check if product requires prescription
export const requiresPrescription = (product: Product): boolean => {
  return product.requiresPrescription;
};

// Get products that require prescription from cart
export const getPrescriptionRequiredItems = (items: CartItem[]): CartItem[] => {
  return items.filter(item => item.product.requiresPrescription);
};

// Calculate discount amount
export const calculateDiscount = (originalPrice: number, discountPercentage: number): number => {
  return originalPrice * (discountPercentage / 100);
};

// Calculate final price after discount
export const calculateDiscountedPrice = (originalPrice: number, discountPercentage: number): number => {
  return originalPrice - calculateDiscount(originalPrice, discountPercentage);
};

// Generate order number
export const generateOrderNumber = (): string => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `ORD-${timestamp}-${random}`;
};

// Check if order can be cancelled
export const canCancelOrder = (order: Order): boolean => {
  return ['pendiente', 'pagado'].includes(order.status);
};

// Check if order is completed
export const isOrderCompleted = (order: Order): boolean => {
  return order.status === 'entregado';
};

// Group products by category
export const groupProductsByCategory = (products: Product[]): Record<string, Product[]> => {
  return products.reduce((groups, product) => {
    const category = product.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(product);
    return groups;
  }, {} as Record<string, Product[]>);
};

// Filter products by search term
export const filterProductsBySearch = (products: Product[], searchTerm: string): Product[] => {
  const term = searchTerm.toLowerCase().trim();
  if (!term) return products;
  
  return products.filter(product =>
    product.name.toLowerCase().includes(term) ||
    product.description.toLowerCase().includes(term) ||
    product.brand.toLowerCase().includes(term) ||
    product.category.toLowerCase().includes(term)
  );
};

// Sort products by criteria
export const sortProducts = (
  products: Product[], 
  sortBy: 'name' | 'price' | 'stock' | 'category',
  order: 'asc' | 'desc' = 'asc'
): Product[] => {
  return [...products].sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;
    
    switch (sortBy) {
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'price':
        aValue = a.price;
        bValue = b.price;
        break;
      case 'stock':
        aValue = a.stock;
        bValue = b.stock;
        break;
      case 'category':
        aValue = a.category.toLowerCase();
        bValue = b.category.toLowerCase();
        break;
      default:
        return 0;
    }
    
    if (aValue < bValue) return order === 'asc' ? -1 : 1;
    if (aValue > bValue) return order === 'asc' ? 1 : -1;
    return 0;
  });
};

// Check if product is in stock
export const isInStock = (product: Product, requestedQuantity = 1): boolean => {
  return product.stock >= requestedQuantity;
};

// Calculate shipping cost (basic implementation)
export const calculateShippingCost = (total: number, location: 'caracas' | 'interior' | 'nacional'): number => {
  // Free shipping over certain amount
  if (total >= 100) return 0;
  
  const rates = {
    caracas: 5,
    interior: 10,
    nacional: 15,
  };
  
  return rates[location] || rates.nacional;
};

// Format order status for display
export const getOrderStatusDisplay = (status: Order['status']): { text: string; color: string } => {
  const statusMap = {
    pendiente: { text: 'Pendiente', color: 'text-yellow-600 bg-yellow-100' },
    pagado: { text: 'Pagado', color: 'text-blue-600 bg-blue-100' },
    entregado: { text: 'Entregado', color: 'text-green-600 bg-green-100' },
    cancelado: { text: 'Cancelado', color: 'text-red-600 bg-red-100' },
  };
  
  return statusMap[status] || { text: status, color: 'text-gray-600 bg-gray-100' };
};

// Debounce function for search
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Generate prescription reminder
export const generatePrescriptionReminder = (product: Product): string => {
  if (!product.requiresPrescription) return '';
  
  return `⚠️ Este medicamento (${product.name}) requiere receta médica. Asegúrate de tener la prescripción válida antes de completar la compra.`;
};

// Check if user can purchase controlled medication
export const canPurchaseControlledMedication = (userAge?: number): boolean => {
  return (userAge || 0) >= 18;
};

// Calculate taxes (IVA in Venezuela)
export const calculateTax = (subtotal: number, taxRate = 0.16): number => {
  return subtotal * taxRate;
};

// Calculate final total with tax
export const calculateTotalWithTax = (subtotal: number, taxRate = 0.16): number => {
  return subtotal + calculateTax(subtotal, taxRate);
};

// Generate unique ID
export const generateUniqueId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Deep clone object
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
}; 