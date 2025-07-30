// User roles
export const ROLES = {
  CLIENTE: 'cliente',
  CAJERO: 'cajero',
  ADMINISTRADOR: 'administrador',
} as const;

export type UserRole = typeof ROLES[keyof typeof ROLES];

// Role permissions
export const PERMISSIONS = {
  // Product permissions
  VIEW_PRODUCTS: 'view_products',
  CREATE_PRODUCT: 'create_product',
  UPDATE_PRODUCT: 'update_product',
  DELETE_PRODUCT: 'delete_product',
  MANAGE_INVENTORY: 'manage_inventory',
  
  // Order permissions
  VIEW_ORDERS: 'view_orders',
  CREATE_ORDER: 'create_order',
  UPDATE_ORDER: 'update_order',
  CANCEL_ORDER: 'cancel_order',
  PROCESS_PAYMENT: 'process_payment',
  VIEW_ALL_ORDERS: 'view_all_orders',
  
  // User permissions
  VIEW_USERS: 'view_users',
  CREATE_USER: 'create_user',
  UPDATE_USER: 'update_user',
  DELETE_USER: 'delete_user',
  
  // Report permissions
  VIEW_REPORTS: 'view_reports',
  EXPORT_REPORTS: 'export_reports',
  
  // System permissions
  MANAGE_SETTINGS: 'manage_settings',
  VIEW_LOGS: 'view_logs',
} as const;

// Role-based permissions mapping
export const ROLE_PERMISSIONS = {
  [ROLES.CLIENTE]: [
    PERMISSIONS.VIEW_PRODUCTS,
    PERMISSIONS.CREATE_ORDER,
    PERMISSIONS.VIEW_ORDERS,
    PERMISSIONS.CANCEL_ORDER,
  ],
  [ROLES.CAJERO]: [
    PERMISSIONS.VIEW_PRODUCTS,
    PERMISSIONS.VIEW_ALL_ORDERS,
    PERMISSIONS.UPDATE_ORDER,
    PERMISSIONS.PROCESS_PAYMENT,
    PERMISSIONS.VIEW_USERS,
  ],
  [ROLES.ADMINISTRADOR]: [
    // All permissions
    ...Object.values(PERMISSIONS),
  ],
} as const;

// Helper function to check permissions
export const hasPermission = (userRole: UserRole, permission: string): boolean => {
  return ROLE_PERMISSIONS[userRole]?.includes(permission as any) || false;
};

// Helper function to check multiple permissions
export const hasAnyPermission = (userRole: UserRole, permissions: string[]): boolean => {
  return permissions.some(permission => hasPermission(userRole, permission));
};

// Helper function to check if user has all permissions
export const hasAllPermissions = (userRole: UserRole, permissions: string[]): boolean => {
  return permissions.every(permission => hasPermission(userRole, permission));
}; 