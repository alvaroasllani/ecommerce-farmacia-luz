
import React from 'react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { ShoppingCart, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';

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

  return (
    <Card 
      className="hover:shadow-lg transition-shadow cursor-pointer group"
      onClick={() => onViewDetails(product)}
    >
      <CardContent className="p-4">
        <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        
        <h3 className="font-semibold text-lg mb-2 group-hover:text-pharma-blue transition-colors">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-2">
          <span className="text-pharma-blue font-bold text-xl">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-sm text-gray-500">
            Stock: {product.stock}
          </span>
        </div>
        
        {product.requiresPrescription && (
          <div className="flex items-center text-amber-600 text-sm mb-2">
            <AlertCircle size={16} className="mr-1" />
            Requiere receta médica
          </div>
        )}
        
        <div className="text-sm text-gray-500 mb-3">
          {product.brand} • {product.category}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        {user?.role === 'cliente' && (
          <Button 
            onClick={handleAddToCart}
            className="w-full bg-pharma-green hover:bg-pharma-green-dark"
            disabled={product.stock === 0}
          >
            <ShoppingCart size={16} className="mr-2" />
            {product.stock > 0 ? 'Agregar al carrito' : 'Sin stock'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
