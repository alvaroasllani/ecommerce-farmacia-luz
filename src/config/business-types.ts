// Business Type Definitions
export interface BusinessType {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: {
    primary: string;
    secondary: string;
    accent: string;
  };
  categories: string[];
  features: BusinessFeature[];
  validations: BusinessValidations;
  currency: {
    code: string;
    symbol: string;
    locale: string;
  };
  terminology: BusinessTerminology;
  requirements: BusinessRequirements;
}

export interface BusinessFeature {
  id: string;
  name: string;
  enabled: boolean;
  required?: boolean;
}

export interface BusinessValidations {
  requiresPrescription?: boolean;
  ageRestriction?: boolean;
  customValidations?: string[];
}

export interface BusinessTerminology {
  product: string;
  products: string;
  category: string;
  categories: string;
  order: string;
  orders: string;
  cart: string;
  checkout: string;
  inventory: string;
  stock: string;
}

export interface BusinessRequirements {
  licenseRequired?: boolean;
  certificationRequired?: boolean;
  specialPermissions?: string[];
}

// Predefined Business Types
export const BUSINESS_TYPES: Record<string, BusinessType> = {
  PHARMACY: {
    id: 'pharmacy',
    name: 'Farmacia',
    description: 'Farmacia y productos médicos',
    icon: 'pharmacy',
    color: {
      primary: '#2563eb', // blue
      secondary: '#1e40af',
      accent: '#10b981', // green
    },
    categories: [
      'Analgésicos',
      'Antiinflamatorios',
      'Antibióticos',
      'Vitaminas',
      'Gastroenterología',
      'Antihistamínicos',
      'Dermatología',
      'Cardiovascular',
      'Respiratorio',
      'Neurología',
      'Endocrinología',
      'Oftalmología',
    ],
    features: [
      { id: 'prescription_required', name: 'Medicamentos con receta', enabled: true, required: true },
      { id: 'age_verification', name: 'Verificación de edad', enabled: true },
      { id: 'medical_consultation', name: 'Consulta médica', enabled: false },
      { id: 'insurance_claims', name: 'Reclamos de seguro', enabled: false },
    ],
    validations: {
      requiresPrescription: true,
      ageRestriction: true,
      customValidations: ['dosage', 'drug_interactions'],
    },
    currency: {
      code: 'VES',
      symbol: 'Bs.',
      locale: 'es-VE',
    },
    terminology: {
      product: 'Medicamento',
      products: 'Medicamentos',
      category: 'Categoría Médica',
      categories: 'Categorías Médicas',
      order: 'Pedido',
      orders: 'Pedidos',
      cart: 'Carrito',
      checkout: 'Checkout',
      inventory: 'Inventario',
      stock: 'Stock',
    },
    requirements: {
      licenseRequired: true,
      certificationRequired: true,
      specialPermissions: ['controlled_substances'],
    },
  },

  SUPERMARKET: {
    id: 'supermarket',
    name: 'Supermercado',
    description: 'Supermercado y alimentos',
    icon: 'shopping-cart',
    color: {
      primary: '#dc2626', // red
      secondary: '#b91c1c',
      accent: '#f59e0b', // yellow
    },
    categories: [
      'Frutas y Verduras',
      'Carnes y Pescados',
      'Lácteos',
      'Panadería',
      'Bebidas',
      'Congelados',
      'Limpieza',
      'Cuidado Personal',
      'Mascotas',
      'Bebé',
    ],
    features: [
      { id: 'perishable_tracking', name: 'Seguimiento de perecederos', enabled: true },
      { id: 'bulk_pricing', name: 'Precios por volumen', enabled: true },
      { id: 'loyalty_program', name: 'Programa de lealtad', enabled: false },
      { id: 'weekly_offers', name: 'Ofertas semanales', enabled: true },
    ],
    validations: {
      requiresPrescription: false,
      ageRestriction: false,
      customValidations: ['expiration_date', 'weight_verification'],
    },
    currency: {
      code: 'USD',
      symbol: '$',
      locale: 'en-US',
    },
    terminology: {
      product: 'Producto',
      products: 'Productos',
      category: 'Categoría',
      categories: 'Categorías',
      order: 'Pedido',
      orders: 'Pedidos',
      cart: 'Carrito',
      checkout: 'Pagar',
      inventory: 'Inventario',
      stock: 'Disponibilidad',
    },
    requirements: {
      licenseRequired: false,
      certificationRequired: false,
    },
  },

  CLOTHING: {
    id: 'clothing',
    name: 'Tienda de Ropa',
    description: 'Ropa y accesorios',
    icon: 'shirt',
    color: {
      primary: '#7c3aed', // purple
      secondary: '#6d28d9',
      accent: '#ec4899', // pink
    },
    categories: [
      'Camisas',
      'Pantalones',
      'Vestidos',
      'Zapatos',
      'Accesorios',
      'Ropa Interior',
      'Deportiva',
      'Formal',
      'Casual',
      'Niños',
    ],
    features: [
      { id: 'size_guide', name: 'Guía de tallas', enabled: true, required: true },
      { id: 'color_variants', name: 'Variantes de color', enabled: true },
      { id: 'wishlist', name: 'Lista de deseos', enabled: true },
      { id: 'virtual_fitting', name: 'Probador virtual', enabled: false },
    ],
    validations: {
      requiresPrescription: false,
      ageRestriction: false,
      customValidations: ['size_availability', 'color_matching'],
    },
    currency: {
      code: 'USD',
      symbol: '$',
      locale: 'en-US',
    },
    terminology: {
      product: 'Prenda',
      products: 'Prendas',
      category: 'Categoría',
      categories: 'Categorías',
      order: 'Pedido',
      orders: 'Pedidos',
      cart: 'Bolsa',
      checkout: 'Finalizar Compra',
      inventory: 'Inventario',
      stock: 'Disponible',
    },
    requirements: {
      licenseRequired: false,
      certificationRequired: false,
    },
  },

  ELECTRONICS: {
    id: 'electronics',
    name: 'Electrónicos',
    description: 'Tecnología y electrónicos',
    icon: 'smartphone',
    color: {
      primary: '#1f2937', // gray-800
      secondary: '#111827',
      accent: '#3b82f6', // blue
    },
    categories: [
      'Smartphones',
      'Laptops',
      'Audio',
      'Gaming',
      'Cámaras',
      'Accesorios',
      'Hogar Inteligente',
      'Componentes PC',
      'Tablets',
      'Wearables',
    ],
    features: [
      { id: 'warranty_tracking', name: 'Seguimiento de garantía', enabled: true, required: true },
      { id: 'technical_specs', name: 'Especificaciones técnicas', enabled: true },
      { id: 'compatibility_check', name: 'Verificación de compatibilidad', enabled: true },
      { id: 'installation_service', name: 'Servicio de instalación', enabled: false },
    ],
    validations: {
      requiresPrescription: false,
      ageRestriction: false,
      customValidations: ['warranty_validation', 'compatibility_check'],
    },
    currency: {
      code: 'USD',
      symbol: '$',
      locale: 'en-US',
    },
    terminology: {
      product: 'Producto',
      products: 'Productos',
      category: 'Categoría',
      categories: 'Categorías',
      order: 'Pedido',
      orders: 'Pedidos',
      cart: 'Carrito',
      checkout: 'Comprar',
      inventory: 'Inventario',
      stock: 'En Stock',
    },
    requirements: {
      licenseRequired: false,
      certificationRequired: false,
    },
  },

  RESTAURANT: {
    id: 'restaurant',
    name: 'Restaurante',
    description: 'Comida y bebidas',
    icon: 'utensils',
    color: {
      primary: '#ea580c', // orange
      secondary: '#c2410c',
      accent: '#65a30d', // lime
    },
    categories: [
      'Entradas',
      'Platos Principales',
      'Postres',
      'Bebidas',
      'Bebidas Alcohólicas',
      'Vegetariano',
      'Vegano',
      'Sin Gluten',
      'Infantil',
      'Especiales del Día',
    ],
    features: [
      { id: 'dietary_restrictions', name: 'Restricciones dietéticas', enabled: true, required: true },
      { id: 'delivery_time', name: 'Tiempo de entrega', enabled: true },
      { id: 'table_reservation', name: 'Reserva de mesa', enabled: false },
      { id: 'nutrition_info', name: 'Información nutricional', enabled: true },
    ],
    validations: {
      requiresPrescription: false,
      ageRestriction: true, // for alcohol
      customValidations: ['allergen_warnings', 'preparation_time'],
    },
    currency: {
      code: 'USD',
      symbol: '$',
      locale: 'en-US',
    },
    terminology: {
      product: 'Plato',
      products: 'Menú',
      category: 'Sección',
      categories: 'Secciones',
      order: 'Pedido',
      orders: 'Pedidos',
      cart: 'Mi Pedido',
      checkout: 'Confirmar Pedido',
      inventory: 'Disponibilidad',
      stock: 'Disponible',
    },
    requirements: {
      licenseRequired: true, // for alcohol
      certificationRequired: true, // health permits
      specialPermissions: ['alcohol_license', 'food_handler'],
    },
  },
};

// Default business type
export const DEFAULT_BUSINESS_TYPE = BUSINESS_TYPES.PHARMACY; 