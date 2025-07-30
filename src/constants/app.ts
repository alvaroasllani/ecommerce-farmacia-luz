import { getBusinessConfig, getBusinessTerminology } from '../config/business-config';

// Dynamic application constants based on business configuration
export const getAppConfig = () => {
  const businessConfig = getBusinessConfig();
  
  return {
    NAME: businessConfig.businessInfo.name,
    VERSION: '1.0.0',
    DESCRIPTION: businessConfig.businessInfo.description,
    AUTHOR: businessConfig.businessInfo.name,
    BUSINESS_TYPE: businessConfig.businessType.id,
    
    // Pagination
    DEFAULT_PAGE_SIZE: 10,
    MAX_PAGE_SIZE: 100,
    
    // File uploads
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
    
    // Cart
    MAX_CART_ITEMS: 50,
    MAX_QUANTITY_PER_ITEM: 99,
    
    // Search
    MIN_SEARCH_LENGTH: 2,
    SEARCH_DEBOUNCE_MS: 300,
    
    // Session
    SESSION_TIMEOUT_MS: 60 * 60 * 1000, // 1 hour
    
    // API
    REQUEST_TIMEOUT_MS: 30 * 1000, // 30 seconds
    MAX_RETRY_ATTEMPTS: 3,
    
    // Business specific
    CURRENCY: businessConfig.locale.currency,
    LOCALE: `${businessConfig.locale.language}-${businessConfig.locale.country}`,
  };
};

// Static fallback for when business config is not available
export const APP_CONFIG = {
  NAME: 'E-commerce Template',
  VERSION: '1.0.0',
  DESCRIPTION: 'Multi-business E-commerce Template',
  AUTHOR: 'Template',
  BUSINESS_TYPE: 'generic',
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  MAX_FILE_SIZE: 5 * 1024 * 1024,
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  MAX_CART_ITEMS: 50,
  MAX_QUANTITY_PER_ITEM: 99,
  MIN_SEARCH_LENGTH: 2,
  SEARCH_DEBOUNCE_MS: 300,
  SESSION_TIMEOUT_MS: 60 * 60 * 1000,
  REQUEST_TIMEOUT_MS: 30 * 1000,
  MAX_RETRY_ATTEMPTS: 3,
  CURRENCY: 'USD',
  LOCALE: 'en-US',
} as const;

// Dynamic product categories based on business type
export const getProductCategories = () => {
  const businessConfig = getBusinessConfig();
  return businessConfig.customCategories || businessConfig.businessType.categories;
};

// Static fallback categories
export const PRODUCT_CATEGORIES = [
  'General',
  'Popular',
  'Ofertas',
  'Nuevos',
] as const;

// Order statuses
export const ORDER_STATUS = {
  PENDIENTE: 'pendiente',
  PAGADO: 'pagado',
  ENTREGADO: 'entregado',
  CANCELADO: 'cancelado',
} as const;

// Dynamic payment methods based on business configuration
export const getPaymentMethods = () => {
  const businessConfig = getBusinessConfig();
  return businessConfig.paymentMethods;
};

// Static fallback payment methods
export const PAYMENT_METHODS = [
  'Efectivo',
  'Tarjeta de débito', 
  'Tarjeta de crédito',
  'Transferencia bancaria',
] as const;

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Error de conexión. Verifique su internet.',
  UNAUTHORIZED: 'No autorizado. Inicie sesión nuevamente.',
  FORBIDDEN: 'No tiene permisos para realizar esta acción.',
  NOT_FOUND: 'Recurso no encontrado.',
  VALIDATION_ERROR: 'Error de validación en los datos enviados.',
  SERVER_ERROR: 'Error interno del servidor.',
  TIMEOUT_ERROR: 'La solicitud ha tardado demasiado.',
  UNKNOWN_ERROR: 'Ha ocurrido un error inesperado.',
} as const;

// Dynamic success messages based on business terminology
export const getSuccessMessages = () => {
  const terminology = getBusinessTerminology();
  
  return {
    LOGIN_SUCCESS: 'Inicio de sesión exitoso',
    REGISTER_SUCCESS: 'Registro exitoso',
    PRODUCT_ADDED: `${terminology.product} agregado al ${terminology.cart.toLowerCase()}`,
    ORDER_CREATED: `${terminology.order} creado exitosamente`,
    ORDER_CANCELLED: `${terminology.order} cancelado exitosamente`,
    PROFILE_UPDATED: 'Perfil actualizado exitosamente',
    PASSWORD_CHANGED: 'Contraseña cambiada exitosamente',
  };
};

// Static fallback success messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Inicio de sesión exitoso',
  REGISTER_SUCCESS: 'Registro exitoso',
  PRODUCT_ADDED: 'Producto agregado al carrito',
  ORDER_CREATED: 'Pedido creado exitosamente',
  ORDER_CANCELLED: 'Pedido cancelado exitosamente',
  PROFILE_UPDATED: 'Perfil actualizado exitosamente',
  PASSWORD_CHANGED: 'Contraseña cambiada exitosamente',
} as const; 