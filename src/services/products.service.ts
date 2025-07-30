import { api } from './api';
import { Product } from '../types';

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}

export interface ProductFilters {
  category?: string;
  search?: string;
  requiresPrescription?: boolean;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
}

export interface ProductsQuery extends ProductFilters {
  page?: number;
  limit?: number;
  sortBy?: 'name' | 'price' | 'stock' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

export const productsService = {
  // Get all products with filters and pagination
  async getProducts(query: ProductsQuery = {}): Promise<ProductsResponse> {
    const params = new URLSearchParams();
    
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        params.append(key, String(value));
      }
    });

    return api.get<ProductsResponse>(`/products?${params.toString()}`);
  },

  // Get single product
  async getProduct(id: string): Promise<Product> {
    return api.get<Product>(`/products/${id}`);
  },

  // Search products
  async searchProducts(searchTerm: string): Promise<Product[]> {
    return api.get<Product[]>(`/products/search?q=${encodeURIComponent(searchTerm)}`);
  },

  // Get products by category
  async getProductsByCategory(category: string): Promise<Product[]> {
    return api.get<Product[]>(`/products/category/${encodeURIComponent(category)}`);
  },

  // Get featured products
  async getFeaturedProducts(): Promise<Product[]> {
    return api.get<Product[]>('/products/featured');
  },

  // Check product availability
  async checkAvailability(productId: string, quantity: number): Promise<boolean> {
    const response = await api.post<{ available: boolean }>('/products/check-availability', {
      productId,
      quantity
    });
    return response.available;
  }
}; 