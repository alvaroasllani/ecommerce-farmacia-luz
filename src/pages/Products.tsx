import React, { useState, useMemo } from 'react';
import { mockProducts, categories } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { Product } from '../types';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Search, Filter, Grid3X3, List, SlidersHorizontal, Star } from 'lucide-react';

const Products: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showPrescriptionOnly, setShowPrescriptionOnly] = useState(false);
  
  // Modal state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let filtered = mockProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.brand.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      
      const matchesPrice = priceRange === 'all' || 
                          (priceRange === 'low' && product.price < 20) ||
                          (priceRange === 'medium' && product.price >= 20 && product.price < 40) ||
                          (priceRange === 'high' && product.price >= 40);
      
      const matchesPrescription = !showPrescriptionOnly || product.requiresPrescription;
      
      return matchesSearch && matchesCategory && matchesPrice && matchesPrescription;
    });

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'category':
          return a.category.localeCompare(b.category);
        case 'stock':
          return b.stock - a.stock;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, priceRange, sortBy, showPrescriptionOnly]);

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setPriceRange('all');
    setSortBy('name');
    setShowPrescriptionOnly(false);
  };

  const activeFiltersCount = [
    searchTerm,
    selectedCategory !== 'all',
    priceRange !== 'all',
    showPrescriptionOnly
  ].filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-pharma-blue to-pharma-blue-dark text-white rounded-2xl p-8">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold mb-4">Catálogo de Productos</h1>
          <p className="text-xl opacity-90 mb-6">
            Encuentra los medicamentos y productos farmacéuticos que necesitas
          </p>
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-pharma-green rounded-full mr-2"></div>
              <span>Productos certificados</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-pharma-green rounded-full mr-2"></div>
              <span>Entrega rápida</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-pharma-green rounded-full mr-2"></div>
              <span>Precios competitivos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <Card className="shadow-lg border-0">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              Filtros de Búsqueda
            </CardTitle>
            <div className="flex items-center space-x-3">
              {activeFiltersCount > 0 && (
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">
                    {activeFiltersCount} filtro{activeFiltersCount > 1 ? 's' : ''} activo{activeFiltersCount > 1 ? 's' : ''}
                  </Badge>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={clearAllFilters}
                    className="text-xs"
                  >
                    Limpiar filtros
                  </Button>
                </div>
              )}
              <div className="flex items-center space-x-1 border rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="p-2"
                >
                  <Grid3X3 size={16} />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="p-2"
                >
                  <List size={16} />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar medicamentos, marcas o descripciones..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Precio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los precios</SelectItem>
                <SelectItem value="low">Hasta $20</SelectItem>
                <SelectItem value="medium">$20 - $40</SelectItem>
                <SelectItem value="high">Más de $40</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Nombre A-Z</SelectItem>
                <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
                <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
                <SelectItem value="category">Categoría</SelectItem>
                <SelectItem value="stock">Stock disponible</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="mt-4 flex items-center space-x-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showPrescriptionOnly}
                onChange={(e) => setShowPrescriptionOnly(e.target.checked)}
                className="rounded border-gray-300"
              />
              <span className="text-sm">Solo productos con receta médica</span>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-pharma-blue">
            Resultados de búsqueda
          </h2>
          <p className="text-gray-600">
            {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span className="text-sm text-gray-600">Todos nuestros productos tienen excelente calificación</span>
        </div>
      </div>

      {/* Products Grid/List */}
      {filteredProducts.length === 0 ? (
        <Card className="shadow-lg">
          <CardContent className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No se encontraron productos
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              No hay productos que coincidan con tu búsqueda. Intenta ajustar los filtros o términos de búsqueda.
            </p>
            <Button onClick={clearAllFilters} className="bg-pharma-blue hover:bg-pharma-blue-dark">
              Limpiar todos los filtros
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className={`${
          viewMode === 'grid' 
            ? 'grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
            : 'space-y-4'
        }`}>
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      )}
      
      {/* Load More Button (simulación de paginación) */}
      {filteredProducts.length > 0 && filteredProducts.length >= 8 && (
        <div className="text-center pt-8">
          <Button variant="outline" className="px-8 py-3">
            Cargar más productos
          </Button>
        </div>
      )}
      
      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Products;
