import { Product, Order, User } from '../types';
import { BUSINESS_TYPES } from '../config/business-types';

// Template interface for business data
export interface BusinessTemplate {
  businessTypeId: string;
  products: Product[];
  sampleOrders: Order[];
  sampleUsers: User[];
  customValidations?: Record<string, (value: any) => boolean>;
}

// Pharmacy template
export const PHARMACY_TEMPLATE: BusinessTemplate = {
  businessTypeId: 'pharmacy',
  products: [
    {
      id: '1',
      name: 'Paracetamol 500mg',
      description: 'Analgésico y antipirético para el alivio del dolor y la fiebre',
      price: 12.50,
      category: 'Analgésicos',
      image: '/placeholder.svg',
      stock: 100,
      requiresPrescription: false,
      brand: 'Genérico'
    },
    {
      id: '2',
      name: 'Ibuprofeno 400mg',
      description: 'Antiinflamatorio no esteroideo para dolor e inflamación',
      price: 18.75,
      category: 'Antiinflamatorios',
      image: '/placeholder.svg',
      stock: 75,
      requiresPrescription: false,
      brand: 'Advil'
    },
    {
      id: '3',
      name: 'Amoxicilina 500mg',
      description: 'Antibiótico de amplio espectro',
      price: 45.00,
      category: 'Antibióticos',
      image: '/placeholder.svg',
      stock: 50,
      requiresPrescription: true,
      brand: 'Amoxil'
    },
  ],
  sampleUsers: [
    {
      id: '1',
      email: 'cliente@farmacia.com',
      name: 'Juan Pérez',
      role: 'cliente',
      phone: '+58 414-1234567',
      address: 'Av. Principal 123, Caracas',
      createdAt: new Date('2024-01-01')
    },
    {
      id: '2',
      email: 'farmaceutico@farmacia.com',
      name: 'Dra. Ana Martínez',
      role: 'cajero',
      phone: '+58 424-9876543',
      createdAt: new Date('2024-01-05')
    }
  ],
  sampleOrders: [],
};

// Supermarket template
export const SUPERMARKET_TEMPLATE: BusinessTemplate = {
  businessTypeId: 'supermarket',
  products: [
    {
      id: '1',
      name: 'Manzanas Rojas',
      description: 'Manzanas frescas rojas de temporada, kg',
      price: 3.50,
      category: 'Frutas y Verduras',
      image: '/placeholder.svg',
      stock: 150,
      requiresPrescription: false,
      brand: 'Fresco'
    },
    {
      id: '2',
      name: 'Leche Entera 1L',
      description: 'Leche fresca entera pasteurizada',
      price: 2.25,
      category: 'Lácteos',
      image: '/placeholder.svg',
      stock: 200,
      requiresPrescription: false,
      brand: 'Lácteos Premium'
    },
    {
      id: '3',
      name: 'Pan Integral',
      description: 'Pan integral artesanal, 500g',
      price: 1.80,
      category: 'Panadería',
      image: '/placeholder.svg',
      stock: 80,
      requiresPrescription: false,
      brand: 'Panadería Casa'
    },
  ],
  sampleUsers: [
    {
      id: '1',
      email: 'cliente@super.com',
      name: 'María González',
      role: 'cliente',
      phone: '+1 555-0123',
      address: '123 Main St, City',
      createdAt: new Date('2024-01-01')
    }
  ],
  sampleOrders: [],
};

// Clothing store template
export const CLOTHING_TEMPLATE: BusinessTemplate = {
  businessTypeId: 'clothing',
  products: [
    {
      id: '1',
      name: 'Camisa de Algodón Blanca',
      description: 'Camisa clásica de algodón 100%, corte regular',
      price: 45.00,
      category: 'Camisas',
      image: '/placeholder.svg',
      stock: 25,
      requiresPrescription: false,
      brand: 'Fashion Co.'
    },
    {
      id: '2',
      name: 'Jeans Azul Clásico',
      description: 'Pantalón denim azul, corte straight',
      price: 65.00,
      category: 'Pantalones',
      image: '/placeholder.svg',
      stock: 40,
      requiresPrescription: false,
      brand: 'Denim Plus'
    },
    {
      id: '3',
      name: 'Vestido Floral',
      description: 'Vestido midi con estampado floral, manga corta',
      price: 55.00,
      category: 'Vestidos',
      image: '/placeholder.svg',
      stock: 15,
      requiresPrescription: false,
      brand: 'Spring Collection'
    },
  ],
  sampleUsers: [
    {
      id: '1',
      email: 'cliente@tienda.com',
      name: 'Sofia Rodríguez',
      role: 'cliente',
      phone: '+1 555-0456',
      address: '456 Fashion Ave, City',
      createdAt: new Date('2024-01-01')
    }
  ],
  sampleOrders: [],
};

// Electronics store template
export const ELECTRONICS_TEMPLATE: BusinessTemplate = {
  businessTypeId: 'electronics',
  products: [
    {
      id: '1',
      name: 'iPhone 15 Pro',
      description: 'Smartphone Apple iPhone 15 Pro, 128GB, Titanio Natural',
      price: 999.00,
      category: 'Smartphones',
      image: '/placeholder.svg',
      stock: 12,
      requiresPrescription: false,
      brand: 'Apple'
    },
    {
      id: '2',
      name: 'MacBook Air M3',
      description: 'Laptop Apple MacBook Air 13", chip M3, 8GB RAM, 256GB SSD',
      price: 1199.00,
      category: 'Laptops',
      image: '/placeholder.svg',
      stock: 8,
      requiresPrescription: false,
      brand: 'Apple'
    },
    {
      id: '3',
      name: 'AirPods Pro 2',
      description: 'Auriculares inalámbricos con cancelación de ruido',
      price: 249.00,
      category: 'Audio',
      image: '/placeholder.svg',
      stock: 30,
      requiresPrescription: false,
      brand: 'Apple'
    },
  ],
  sampleUsers: [
    {
      id: '1',
      email: 'cliente@tech.com',
      name: 'Carlos Mendoza',
      role: 'cliente',
      phone: '+1 555-0789',
      address: '789 Tech Plaza, City',
      createdAt: new Date('2024-01-01')
    }
  ],
  sampleOrders: [],
};

// Restaurant template
export const RESTAURANT_TEMPLATE: BusinessTemplate = {
  businessTypeId: 'restaurant',
  products: [
    {
      id: '1',
      name: 'Hamburguesa Clásica',
      description: 'Carne angus, lechuga, tomate, cebolla, salsa especial',
      price: 15.50,
      category: 'Platos Principales',
      image: '/placeholder.svg',
      stock: 999, // Restaurants typically don't have stock limits like this
      requiresPrescription: false,
      brand: 'Casa'
    },
    {
      id: '2',
      name: 'Ensalada César',
      description: 'Lechuga romana, crutones, parmesano, aderezo césar',
      price: 12.00,
      category: 'Entradas',
      image: '/placeholder.svg',
      stock: 999,
      requiresPrescription: false,
      brand: 'Casa'
    },
    {
      id: '3',
      name: 'Tiramisu',
      description: 'Postre italiano tradicional con mascarpone y café',
      price: 8.50,
      category: 'Postres',
      image: '/placeholder.svg',
      stock: 999,
      requiresPrescription: false,
      brand: 'Casa'
    },
  ],
  sampleUsers: [
    {
      id: '1',
      email: 'cliente@restaurant.com',
      name: 'Isabella Torres',
      role: 'cliente',
      phone: '+1 555-0321',
      address: '321 Food Street, City',
      createdAt: new Date('2024-01-01')
    }
  ],
  sampleOrders: [],
};

// Template registry
export const BUSINESS_TEMPLATES: Record<string, BusinessTemplate> = {
  pharmacy: PHARMACY_TEMPLATE,
  supermarket: SUPERMARKET_TEMPLATE,
  clothing: CLOTHING_TEMPLATE,
  electronics: ELECTRONICS_TEMPLATE,
  restaurant: RESTAURANT_TEMPLATE,
};

// Get template by business type
export const getBusinessTemplate = (businessTypeId: string): BusinessTemplate | null => {
  return BUSINESS_TEMPLATES[businessTypeId] || null;
};

// Generate sample data for a business type
export const generateSampleData = (businessTypeId: string) => {
  const template = getBusinessTemplate(businessTypeId);
  if (!template) {
    throw new Error(`No template found for business type: ${businessTypeId}`);
  }

  const businessType = BUSINESS_TYPES[businessTypeId.toUpperCase()];
  if (!businessType) {
    throw new Error(`Invalid business type: ${businessTypeId}`);
  }

  // Extend products with business type categories if needed
  const extendedProducts = template.products.map(product => ({
    ...product,
    // Ensure category is valid for this business type
    category: businessType.categories.includes(product.category) 
      ? product.category 
      : businessType.categories[0]
  }));

  return {
    products: extendedProducts,
    users: template.sampleUsers,
    orders: template.sampleOrders,
    businessType,
  };
}; 