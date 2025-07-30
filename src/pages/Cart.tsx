
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useBusinessConfig } from '../hooks/useBusinessConfig';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';
import { ROUTES } from '../constants/routes';

const Cart: React.FC = () => {
  const { items, updateQuantity, removeItem, total, clearCart, isLoading } = useCart();
  const { terminology, getPrimaryColor, getCurrency } = useBusinessConfig();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Tu {terminology.cart.toLowerCase()} está vacío
          </h2>
          <p className="text-gray-600 mb-8">
            ¡Comienza a agregar {terminology.products.toLowerCase()} para ver tu {terminology.cart.toLowerCase()}!
          </p>
          <Button asChild style={{ backgroundColor: getPrimaryColor() }}>
            <Link to={ROUTES.PRODUCTS} className="flex items-center gap-2">
              Explorar {terminology.products}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-900">
                {terminology.cart}
              </h1>
              <Button 
                variant="outline" 
                onClick={clearCart}
                className="text-red-600 border-red-600 hover:bg-red-50"
                disabled={isLoading}
              >
                Vaciar {terminology.cart.toLowerCase()}
              </Button>
            </div>

            <div className="space-y-4">
              {items.map((item) => (
                <Card key={item.product.id} className="shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {item.product.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {item.product.description}
                        </p>
                        <div className="flex items-center gap-2 mb-2">
                          <p className="font-bold text-lg" style={{ color: getPrimaryColor() }}>
                            {formatCurrency(item.product.price, getCurrency())}
                          </p>
                          {item.product.category && (
                            <Badge variant="secondary" className="text-xs">
                              {item.product.category}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                            disabled={isLoading || item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          
                          <span className="px-4 py-2 border rounded-lg min-w-[60px] text-center font-medium">
                            {item.quantity}
                          </span>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            disabled={isLoading}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="text-right">
                          <p className="font-bold text-lg" style={{ color: getPrimaryColor() }}>
                            {formatCurrency(item.product.price * item.quantity, getCurrency())}
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeItem(item.product.id)}
                            className="text-red-600 border-red-600 hover:bg-red-50 mt-2"
                            disabled={isLoading}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Resumen del {terminology.order.toLowerCase()}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatCurrency(total, getCurrency())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Envío</span>
                    <span className="font-medium text-green-600">Gratis</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-lg font-bold" style={{ color: getPrimaryColor() }}>
                      {formatCurrency(total, getCurrency())}
                    </span>
                  </div>
                </div>
                
                <Button 
                  asChild 
                  className="w-full" 
                  size="lg"
                  style={{ backgroundColor: getPrimaryColor() }}
                  disabled={isLoading}
                >
                  <Link to={ROUTES.CHECKOUT} className="flex items-center justify-center gap-2">
                    Proceder al {terminology.checkout.toLowerCase()}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  asChild 
                  className="w-full"
                >
                  <Link to={ROUTES.PRODUCTS}>
                    Seguir comprando
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
