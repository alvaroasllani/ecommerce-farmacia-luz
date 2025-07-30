
import React, { useState } from 'react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import { usePermissions } from '../hooks/usePermissions';
import { useBusinessConfig } from '../hooks/useBusinessConfig';
import { ShoppingCart, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { useToast } from './ui/use-toast';
import { formatCurrency, formatStockStatus, truncateProductName } from '../utils/formatters';
import { requiresPrescription, generatePrescriptionReminder } from '../utils/helpers';
import { ASSET_PATHS } from '../assets';
import { PERMISSIONS } from '../constants/roles';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact';
  showFullDescription?: boolean;
  onViewDetails?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  variant = 'default',
  showFullDescription = false,
  onViewDetails 
}) => {
  const { addItem, isLoading } = useCart();
  const { hasPermission, isClient } = usePermissions();
  const { checkFeature } = useBusinessConfig();
  const { toast } = useToast();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!hasPermission(PERMISSIONS.CREATE_ORDER)) {
      toast({
        title: "Error",
        description: "No tienes permisos para agregar productos al carrito",
        variant: "destructive",
      });
      return;
    }

    if (requiresPrescription(product)) {
      const reminder = generatePrescriptionReminder(product);
      toast({
        title: "Medicamento con receta",
        description: reminder,
        variant: "default",
      });
    }

    setIsAddingToCart(true);
    const success = await addItem(product, 1);
    setIsAddingToCart(false);

    if (!success) {
      // Error handling is done in the CartContext
      return;
    }
  };

  const handleCardClick = () => {
    if (onViewDetails) {
      onViewDetails(product);
    }
  };

  const stockStatus = formatStockStatus(product.stock);
  const isCompact = variant === 'compact';

  return (
    <Card 
      className={`transition-all hover:shadow-lg ${
        onViewDetails ? 'cursor-pointer' : ''
      } group ${isCompact ? 'max-w-xs' : 'max-w-sm'}`}
      onClick={handleCardClick}
    >
      <CardContent className={isCompact ? 'p-3' : 'p-4'}>
        <div className={`aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden ${
          isCompact ? 'mb-2' : 'mb-4'
        }`}>
          <img 
            src={product.image || ASSET_PATHS.DEFAULT_PRODUCT_IMAGE}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = ASSET_PATHS.DEFAULT_PRODUCT_IMAGE;
            }}
          />
          {checkFeature('prescription_required') && requiresPrescription(product) && (
            <div className="absolute top-2 right-2">
              <Badge variant="destructive" className="text-xs">
                Receta
              </Badge>
            </div>
          )}
        </div>
        
        <h3 className={`font-semibold mb-2 group-hover:text-pharma-blue transition-colors ${
          isCompact ? 'text-sm' : 'text-lg'
        }`}>
          {isCompact || !showFullDescription 
            ? truncateProductName(product.name, isCompact ? 30 : 50)
            : product.name
          }
        </h3>
        
        {!isCompact && (
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
            {showFullDescription ? product.description : truncateProductName(product.description, 80)}
          </p>
        )}
        
        <div className="flex items-center justify-between mb-2">
          <span className={`text-pharma-blue font-bold ${
            isCompact ? 'text-lg' : 'text-xl'
          }`}>
            {formatCurrency(product.price)}
          </span>
          <span className={`text-xs ${stockStatus.color}`}>
            {stockStatus.text}
            {product.stock > 0 && ` (${product.stock})`}
          </span>
        </div>
        
        {checkFeature('prescription_required') && requiresPrescription(product) && (
          <div className="flex items-center text-amber-600 text-sm mb-2">
            <AlertCircle size={16} className="mr-1" />
            Requiere receta médica
          </div>
        )}
        
        <div className={`text-gray-500 mb-3 flex items-center justify-between ${
          isCompact ? 'text-xs' : 'text-sm'
        }`}>
          <span>{product.brand}</span>
          <Badge variant="outline" className={isCompact ? 'text-xs' : ''}>
            {product.category}
          </Badge>
        </div>
      </CardContent>
      
      <CardFooter className={`pt-0 ${isCompact ? 'p-3' : 'p-4'}`}>
        {isClient && (
          <Button 
            onClick={handleAddToCart}
            className={`w-full ${isCompact ? 'text-xs py-2' : ''}`}
            disabled={product.stock === 0 || isAddingToCart || isLoading}
            variant={product.stock === 0 ? 'outline' : 'default'}
          >
            {isAddingToCart ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Agregando...
              </>
            ) : product.stock === 0 ? (
              'Agotado'
            ) : (
              <>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Agregar al carrito
              </>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
