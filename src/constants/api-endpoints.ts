// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  
  // Products
  PRODUCTS: {
    BASE: '/products',
    SEARCH: '/products/search',
    FEATURED: '/products/featured',
    BY_CATEGORY: '/products/category',
    CHECK_AVAILABILITY: '/products/check-availability',
    REVIEWS: '/products/:id/reviews',
  },
  
  // Orders
  ORDERS: {
    BASE: '/orders',
    USER_ORDERS: '/orders/user',
    STATUS: '/orders/:id/status',
    CANCEL: '/orders/:id/cancel',
    PAYMENT: '/orders/:id/payment',
  },
  
  // Users
  USERS: {
    BASE: '/users',
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile',
    CHANGE_PASSWORD: '/users/change-password',
  },
  
  // Categories
  CATEGORIES: {
    BASE: '/categories',
  },
  
  // Reports (Admin only)
  REPORTS: {
    SALES: '/reports/sales',
    INVENTORY: '/reports/inventory',
    USERS: '/reports/users',
    EXPORT: '/reports/export',
  },
  
  // Settings (Admin only)
  SETTINGS: {
    BASE: '/settings',
    UPDATE: '/settings',
  },
} as const;

// Helper function to build endpoint with parameters
export const buildEndpoint = (endpoint: string, params: Record<string, string | number>): string => {
  let builtEndpoint = endpoint;
  
  Object.entries(params).forEach(([key, value]) => {
    builtEndpoint = builtEndpoint.replace(`:${key}`, String(value));
  });
  
  return builtEndpoint;
};

// Example usage:
// buildEndpoint(API_ENDPOINTS.PRODUCTS.REVIEWS, { id: '123' })
// Returns: '/products/123/reviews' 