import React, { useState } from 'react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import {
  ShoppingCart,
  AlertCircle,
  CheckCircle,
  Star,
  Package,
  Shield,
  Truck,
  Plus,
  Minus,
  X,
  Heart
} from 'lucide-react';
import { toast } from '../hooks/use-toast';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addItem } = useCart();
  const { user } = useAuth();

  if (!product) return null;

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast({
      title: "¡Producto agregado! 🛒",
      description: `${quantity} ${product.name} agregado al carrito`,
    });
    onClose();
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const getStockStatus = () => {
    if (product.stock === 0) return { color: 'destructive', text: 'Sin stock', icon: X };
    if (product.stock < 10) return { color: 'secondary', text: 'Poco stock', icon: AlertCircle };
    return { color: 'default', text: 'Disponible', icon: CheckCircle };
  };

  const stockStatus = getStockStatus();
  const StockIcon = stockStatus.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center overflow-hidden relative group">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg"
              >
                <Heart 
                  size={20} 
                  className={isFavorite ? 'text-red-500 fill-current' : 'text-gray-600'} 
                />
              </button>
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.requiresPrescription && (
                  <Badge variant="destructive" className="text-xs font-medium">
                    <AlertCircle size={12} className="mr-1" />
                    Receta médica
                  </Badge>
                )}
                {product.stock < 10 && product.stock > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    ¡Últimas unidades!
                  </Badge>
                )}
              </div>
            </div>
            
            {/* Thumbnails - simulación */}
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((index) => (
                <div 
                  key={index}
                  className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"
                >
                  <Package size={20} className="text-gray-400" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <DialogHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <Badge variant="outline" className="text-xs text-pharma-blue border-pharma-blue">
                    {product.category}
                  </Badge>
                  <DialogTitle className="text-2xl font-bold text-gray-900 leading-tight">
                    {product.name}
                  </DialogTitle>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Marca:</span>
                    <span className="font-semibold text-pharma-blue">{product.brand}</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <Badge variant={stockStatus.color as any} className="mb-2">
                    <StockIcon size={12} className="mr-1" />
                    {stockStatus.text}
                  </Badge>
                  <div className="text-xs text-gray-500">
                    Stock: {product.stock} unidades
                  </div>
                </div>
              </div>
            </DialogHeader>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-current" />
                ))}
              </div>
              <span className="text-sm text-gray-600">(4.8) • 124 reseñas</span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-end space-x-3">
                <span className="text-3xl font-bold text-pharma-blue">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  ${(product.price * 1.2).toFixed(2)}
                </span>
                <Badge className="bg-pharma-green text-white">
                  20% OFF
                </Badge>
              </div>
              <p className="text-sm text-pharma-green">
                ¡Ahorra ${(product.price * 0.2).toFixed(2)} en este producto!
              </p>
            </div>

            <Separator />

            {/* Description */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Descripción</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
              
              {/* Additional Info */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Presentación:</span>
                  <span className="ml-2 font-medium">Tabletas/Cápsulas</span>
                </div>
                <div>
                  <span className="text-gray-500">Concentración:</span>
                  <span className="ml-2 font-medium">Según etiqueta</span>
                </div>
                <div>
                  <span className="text-gray-500">Laboratorio:</span>
                  <span className="ml-2 font-medium">{product.brand}</span>
                </div>
                <div>
                  <span className="text-gray-500">Registro:</span>
                  <span className="ml-2 font-medium">INVIMA-2024</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Quantity Selector */}
            {user?.role === 'cliente' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="font-medium text-gray-700">Cantidad:</span>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={decreaseQuantity}
                      disabled={quantity <= 1}
                      className="w-10 h-10 p-0"
                    >
                      <Minus size={16} />
                    </Button>
                    
                    <span className="w-16 text-center font-semibold bg-gray-50 py-2 rounded">
                      {quantity}
                    </span>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={increaseQuantity}
                      disabled={quantity >= product.stock}
                      className="w-10 h-10 p-0"
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                  <span className="text-sm text-gray-500">
                    Máximo {product.stock} unidades
                  </span>
                </div>

                <Button 
                  onClick={handleAddToCart}
                  className="w-full bg-pharma-green hover:bg-pharma-green-dark text-white font-bold py-4 text-lg rounded-xl shadow-lg transform hover:scale-[1.02] transition-all"
                  disabled={product.stock === 0}
                >
                  <ShoppingCart size={20} className="mr-2" />
                  {product.stock > 0 ? `Agregar ${quantity} al carrito` : 'Sin stock'}
                </Button>

                {product.requiresPrescription && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-center text-amber-700">
                      <AlertCircle size={20} className="mr-2" />
                      <div>
                        <p className="font-semibold">Requiere receta médica</p>
                        <p className="text-sm">
                          Debes presentar la receta médica al momento de la entrega
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            <Separator />

            {/* Security Features */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Garantías y Seguridad</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-pharma-green">
                  <Shield className="w-4 h-4 mr-2" />
                  <span>Producto 100% original y certificado</span>
                </div>
                <div className="flex items-center text-pharma-green">
                  <Truck className="w-4 h-4 mr-2" />
                  <span>Entrega en 24-48 horas</span>
                </div>
                <div className="flex items-center text-pharma-green">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span>Garantía de calidad farmacéutica</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal; 