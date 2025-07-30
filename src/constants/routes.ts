// Application routes
export const ROUTES = {
  // Setup routes
  SETUP: '/setup',
  
  // Public routes
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  
  // Protected routes
  PRODUCTS: '/products',
  CART: '/cart',
  CHECKOUT: '/checkout',
  PROFILE: '/profile',
  ORDERS: '/orders',
  
  // Admin routes
  ADMIN: '/admin',
  ADMIN_PRODUCTS: '/admin/products',
  ADMIN_ORDERS: '/admin/orders',
  ADMIN_USERS: '/admin/users',
  ADMIN_REPORTS: '/admin/reports',
  
  // Cashier routes
  CASHIER: '/cashier',
  CASHIER_ORDERS: '/cashier/orders',
  CASHIER_POS: '/cashier/pos',
  
  // Error routes
  NOT_FOUND: '/404',
  UNAUTHORIZED: '/unauthorized',
} as const;

// Route labels for navigation
export const ROUTE_LABELS = {
  [ROUTES.SETUP]: 'Configuración Inicial',
  [ROUTES.HOME]: 'Inicio',
  [ROUTES.LOGIN]: 'Iniciar Sesión',
  [ROUTES.REGISTER]: 'Registrarse',
  [ROUTES.PRODUCTS]: 'Productos',
  [ROUTES.CART]: 'Carrito',
  [ROUTES.CHECKOUT]: 'Checkout',
  [ROUTES.PROFILE]: 'Perfil',
  [ROUTES.ORDERS]: 'Mis Pedidos',
  [ROUTES.ADMIN]: 'Administración',
  [ROUTES.ADMIN_PRODUCTS]: 'Gestión de Productos',
  [ROUTES.ADMIN_ORDERS]: 'Gestión de Pedidos',
  [ROUTES.ADMIN_USERS]: 'Gestión de Usuarios',
  [ROUTES.ADMIN_REPORTS]: 'Reportes',
  [ROUTES.CASHIER]: 'Caja',
  [ROUTES.CASHIER_ORDERS]: 'Pedidos Caja',
  [ROUTES.CASHIER_POS]: 'Punto de Venta',
} as const; 