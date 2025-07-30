import { useState, useEffect, useMemo, useCallback } from 'react';
import { Product } from '../types';
import { mockProducts } from '../data/mockData';
import { filterProductsBySearch, sortProducts, groupProductsByCategory } from '../utils/helpers';
import { debounce } from '../utils/helpers';
import { APP_CONFIG } from '../constants/app';

interface UseProductsOptions {
  initialCategory?: string;
  initialSearch?: string;
  autoSearch?: boolean;
}

interface UseProductsReturn {
  products: Product[];
  filteredProducts: Product[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  selectedCategory: string;
  sortBy: 'name' | 'price' | 'stock' | 'category';
  sortOrder: 'asc' | 'desc';
  categories: string[];
  groupedProducts: Record<string, Product[]>;
  // Actions
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: string) => void;
  setSortBy: (sort: 'name' | 'price' | 'stock' | 'category') => void;
  setSortOrder: (order: 'asc' | 'desc') => void;
  clearFilters: () => void;
  refreshProducts: () => Promise<void>;
}

export const useProducts = (options: UseProductsOptions = {}): UseProductsReturn => {
  const {
    initialCategory = '',
    initialSearch = '',
    autoSearch = true
  } = options;

  // State
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'stock' | 'category'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Load products
  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // TODO: Replace with real API call when backend is ready
      // const response = await productsService.getProducts();
      setProducts(mockProducts);
    } catch (err) {
      setError('Error al cargar productos');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initialize products on mount
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Debounced search function
  const debouncedSearch = useMemo(
    () => debounce((term: string) => {
      // This will trigger the filteredProducts recalculation
    }, APP_CONFIG.SEARCH_DEBOUNCE_MS),
    []
  );

  // Effect for auto search
  useEffect(() => {
    if (autoSearch && searchTerm.length >= APP_CONFIG.MIN_SEARCH_LENGTH) {
      debouncedSearch(searchTerm);
    }
  }, [searchTerm, autoSearch, debouncedSearch]);

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(products.map(p => p.category)));
    return uniqueCategories.sort();
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Apply search filter
    if (searchTerm.trim() && searchTerm.length >= APP_CONFIG.MIN_SEARCH_LENGTH) {
      filtered = filterProductsBySearch(filtered, searchTerm);
    }

    // Apply sorting
    filtered = sortProducts(filtered, sortBy, sortOrder);

    return filtered;
  }, [products, selectedCategory, searchTerm, sortBy, sortOrder]);

  // Group products by category
  const groupedProducts = useMemo(() => {
    return groupProductsByCategory(filteredProducts);
  }, [filteredProducts]);

  // Actions
  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedCategory('');
    setSortBy('name');
    setSortOrder('asc');
  }, []);

  const refreshProducts = useCallback(async () => {
    await loadProducts();
  }, [loadProducts]);

  return {
    products,
    filteredProducts,
    loading,
    error,
    searchTerm,
    selectedCategory,
    sortBy,
    sortOrder,
    categories,
    groupedProducts,
    setSearchTerm,
    setSelectedCategory,
    setSortBy,
    setSortOrder,
    clearFilters,
    refreshProducts,
  };
}; 