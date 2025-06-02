
import { Product, Order, User } from '../types';

export const mockProducts: Product[] = [
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
  {
    id: '4',
    name: 'Vitamina C 1000mg',
    description: 'Suplemento vitamínico para fortalecer el sistema inmunológico',
    price: 25.90,
    category: 'Vitaminas',
    image: '/placeholder.svg',
    stock: 120,
    requiresPrescription: false,
    brand: 'Redoxon'
  },
  {
    id: '5',
    name: 'Omeprazol 20mg',
    description: 'Inhibidor de la bomba de protones para problemas gástricos',
    price: 32.00,
    category: 'Gastroenterología',
    image: '/placeholder.svg',
    stock: 60,
    requiresPrescription: false,
    brand: 'Prilosec'
  },
  {
    id: '6',
    name: 'Loratadina 10mg',
    description: 'Antihistamínico para alergias',
    price: 15.50,
    category: 'Antihistamínicos',
    image: '/placeholder.svg',
    stock: 80,
    requiresPrescription: false,
    brand: 'Claritin'
  }
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    clientId: '1',
    clientName: 'Juan Pérez',
    items: [
      { product: mockProducts[0], quantity: 2 },
      { product: mockProducts[1], quantity: 1 }
    ],
    total: 43.75,
    status: 'entregado',
    paymentMethod: 'Tarjeta de crédito',
    deliveryAddress: 'Av. Principal 123, Caracas',
    createdAt: new Date('2024-01-15')
  },
  {
    id: 'ORD-002',
    clientId: '2',
    clientName: 'María González',
    items: [
      { product: mockProducts[3], quantity: 1 },
      { product: mockProducts[4], quantity: 1 }
    ],
    total: 57.90,
    status: 'pendiente',
    paymentMethod: 'Efectivo',
    deliveryAddress: 'Calle 5 con Av. Universidad, Maracay',
    createdAt: new Date('2024-01-20')
  },
  {
    id: 'ORD-003',
    clientId: '3',
    clientName: 'Carlos Rodríguez',
    items: [
      { product: mockProducts[2], quantity: 1 }
    ],
    total: 45.00,
    status: 'pagado',
    paymentMethod: 'Transferencia',
    deliveryAddress: 'Sector Los Pinos, Valencia',
    createdAt: new Date('2024-01-22')
  }
];

export const mockUsers: User[] = [
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
    email: 'cajero@farmacia.com',
    name: 'Ana Martínez',
    role: 'cajero',
    phone: '+58 424-9876543',
    createdAt: new Date('2024-01-05')
  },
  {
    id: '3',
    email: 'admin@farmacia.com',
    name: 'Dr. Luis García',
    role: 'administrador',
    phone: '+58 412-5555555',
    createdAt: new Date('2024-01-01')
  }
];

export const categories = [
  'Analgésicos',
  'Antiinflamatorios',
  'Antibióticos',
  'Vitaminas',
  'Gastroenterología',
  'Antihistamínicos',
  'Dermatología',
  'Cardiovascular',
  'Respiratorio',
  'Neurología'
];
