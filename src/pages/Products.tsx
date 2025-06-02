
import React, { useState, useMemo } from 'react';
import { mockProducts, categories } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Search } from 'lucide-react';

const Products: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.brand.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      
      const matchesPrice = priceRange === 'all' || 
                          (priceRange === 'low' && product.price < 20) ||
                          (priceRange === 'medium' && product.price >= 20 && product.price < 40) ||
                          (priceRange === 'high' && product.price >= 40);
      
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchTerm, selectedCategory, priceRange]);

  const handleViewDetails = (product: any) => {
    console.log('Ver detalles del producto:', product);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-pharma-blue">Catálogo de Productos</h1>
        <p className="text-gray-600">{filteredProducts.length} productos encontrados</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtros de Búsqueda</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
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
              <SelectTrigger>
                <SelectValue placeholder="Rango de precio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los precios</SelectItem>
                <SelectItem value="low">Hasta $20</SelectItem>
                <SelectItem value="medium">$20 - $40</SelectItem>
                <SelectItem value="high">Más de $40</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {filteredProducts.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500 text-lg">No se encontraron productos que coincidan con tu búsqueda.</p>
            <p className="text-gray-400 mt-2">Intenta ajustar los filtros o términos de búsqueda.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
