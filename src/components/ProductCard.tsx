import React from 'react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { ShoppingCart, AlertCircle, Star, Package, CheckCircle, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const { addItem } = useCart();
  const { user } = useAuth();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    onViewDetails(product);
  };

  const getStockStatus = () => {
    if (product.stock === 0) return { color: 'destructive', text: 'Sin stock' };
    if (product.stock < 10) return { color: 'secondary', text: 'Poco stock' };
    return { color: 'default', text: 'Disponible' };
  };

  const stockStatus = getStockStatus();

  return (
    <Card 
      className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-0 shadow-md hover:scale-[1.02] bg-white"
      onClick={handleViewDetails}
    >
      <CardContent className="p-0">
        {/* Image Section */}
        <div className="relative">
          <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-t-lg flex items-center justify-center overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          
          {/* View Details Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-t-lg flex items-center justify-center">
            <Button
              onClick={handleViewDetails}
              className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white text-pharma-blue hover:bg-gray-100 transform scale-90 group-hover:scale-100"
              size="sm"
            >
              <Eye size={16} className="mr-2" />
              Ver detalles
            </Button>
          </div>
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.requiresPrescription && (
              <Badge variant="destructive" className="text-xs font-medium">
                <AlertCircle size={12} className="mr-1" />
                Receta
              </Badge>
            )}
            {product.stock < 10 && product.stock > 0 && (
              <Badge variant="secondary" className="text-xs">
                ¡Últimas unidades!
              </Badge>
            )}
          </div>

          <div className="absolute top-3 right-3">
            <Badge variant={stockStatus.color as any} className="text-xs">
              {stockStatus.text}
            </Badge>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="p-4">
          <div className="mb-2">
            <Badge variant="outline" className="text-xs text-pharma-blue border-pharma-blue">
              {product.category}
            </Badge>
          </div>
          
          <h3 className="font-bold text-lg mb-2 group-hover:text-pharma-blue transition-colors line-clamp-2 min-h-[3.5rem]">
            {product.name}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2 min-h-[2.5rem]">
            {product.description}
          </p>
          
          {/* Brand */}
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <Package size={14} className="mr-1" />
            <span className="font-medium">{product.brand}</span>
          </div>
          
          {/* Price and Stock */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-2xl font-bold text-pharma-blue">
                ${product.price.toFixed(2)}
              </span>
              <div className="text-xs text-gray-500">
                Stock: {product.stock} unidades
              </div>
            </div>
            
            <div className="flex items-center text-yellow-500">
              <Star size={16} className="fill-current" />
              <Star size={16} className="fill-current" />
              <Star size={16} className="fill-current" />
              <Star size={16} className="fill-current" />
              <Star size={16} className="fill-current" />
              <span className="text-xs text-gray-500 ml-1">(4.8)</span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        {user?.role === 'cliente' ? (
          <div className="w-full space-y-2">
            <Button 
              onClick={handleAddToCart}
              className="w-full bg-pharma-green hover:bg-pharma-green-dark text-white font-semibold py-3 rounded-lg transform hover:scale-[1.02] transition-all shadow-md"
              disabled={product.stock === 0}
            >
              <ShoppingCart size={18} className="mr-2" />
              {product.stock > 0 ? 'Agregar al carrito' : 'Sin stock'}
            </Button>
            
            {product.requiresPrescription && (
              <div className="flex items-center justify-center text-amber-600 text-xs">
                <AlertCircle size={14} className="mr-1" />
                <span>Requiere presentar receta médica</span>
              </div>
            )}
            
            {!product.requiresPrescription && (
              <div className="flex items-center justify-center text-pharma-green text-xs">
                <CheckCircle size={14} className="mr-1" />
                <span>Venta libre - Sin receta</span>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full text-center py-3">
            <p className="text-sm text-gray-500">
              Inicia sesión como cliente para comprar
            </p>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
