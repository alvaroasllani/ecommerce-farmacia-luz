import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Trash2, Plus, Minus, ShoppingCart, Package, Truck, Shield, AlertCircle, CheckCircle } from 'lucide-react';

const Cart: React.FC = () => {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCart();

  const subtotal = getTotalPrice();
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;
  const savings = subtotal > 50 ? 5.99 : 0;

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-xl border-0">
          <CardContent className="text-center py-20">
            <div className="w-32 h-32 bg-gradient-to-br from-pharma-blue to-pharma-blue-dark rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingCart className="w-16 h-16 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-700 mb-4">Tu carrito está vacío</h2>
            <p className="text-gray-500 mb-8 text-lg max-w-md mx-auto">
              ¡Es hora de llenarlo! Agrega algunos productos para comenzar tu compra en Farmacia LUZ
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-center text-pharma-green">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span>Envío gratis en compras mayores a $50</span>
              </div>
              <div className="flex items-center justify-center text-pharma-green">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span>Garantía de calidad en todos los productos</span>
              </div>
            </div>
            
            <Link to="/products">
              <Button className="bg-pharma-blue hover:bg-pharma-blue-dark px-8 py-4 text-lg rounded-full transform hover:scale-105 transition-all">
                <Package className="w-5 h-5 mr-2" />
                Explorar Productos
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-pharma-blue to-pharma-blue-dark text-white rounded-2xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Carrito de Compras</h1>
            <p className="text-xl opacity-90">
              {items.length} producto{items.length !== 1 ? 's' : ''} en tu carrito
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={clearCart}
            className="border-white text-white hover:bg-white hover:text-pharma-blue font-semibold"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Vaciar carrito
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Products List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-pharma-blue">Productos seleccionados</h2>
            <Link to="/products">
              <Button variant="outline" className="text-pharma-blue border-pharma-blue">
                <Plus className="w-4 h-4 mr-2" />
                Agregar más productos
              </Button>
            </Link>
          </div>

          {items.map(item => (
            <Card key={item.product.id} className="shadow-lg border-0 hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="flex items-start space-x-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 mb-1">{item.product.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{item.product.brand}</p>
                        <Badge variant="outline" className="text-xs">
                          {item.product.category}
                        </Badge>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeItem(item.product.id)}
                        className="text-red-600 border-red-600 hover:bg-red-50 shrink-0"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                    
                    {item.product.requiresPrescription && (
                      <div className="flex items-center text-amber-600 text-sm mb-3">
                        <AlertCircle size={14} className="mr-1" />
                        <span>Requiere receta médica</span>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-600">Cantidad:</span>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="w-8 h-8 p-0"
                          >
                            <Minus size={14} />
                          </Button>
                          
                          <span className="w-12 text-center font-semibold bg-gray-50 py-1 rounded">
                            {item.quantity}
                          </span>
                          
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            disabled={item.quantity >= item.product.stock}
                            className="w-8 h-8 p-0"
                          >
                            <Plus size={14} />
                          </Button>
                        </div>
                        <span className="text-xs text-gray-500">
                          (Stock: {item.product.stock})
                        </span>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-sm text-gray-500 line-through">
                          ${(item.product.price * item.quantity * 1.1).toFixed(2)}
                        </div>
                        <div className="text-2xl font-bold text-pharma-blue">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6 shadow-xl border-0">
            <CardHeader className="bg-gradient-to-r from-pharma-green to-green-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center">
                <Package className="w-5 h-5 mr-2" />
                Resumen del Pedido
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal ({items.length} productos):</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>Envío:</span>
                  <div className="text-right">
                    {shipping === 0 ? (
                      <div>
                        <span className="text-pharma-green font-semibold">¡GRATIS!</span>
                        <div className="text-xs text-gray-500">Ahorras ${savings.toFixed(2)}</div>
                      </div>
                    ) : (
                      <span>${shipping.toFixed(2)}</span>
                    )}
                  </div>
                </div>
                
                {subtotal < 50 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <div className="flex items-center text-amber-700 text-sm">
                      <Truck className="w-4 h-4 mr-2" />
                      <span>Agrega ${(50 - subtotal).toFixed(2)} más para envío gratis</span>
                    </div>
                  </div>
                )}
              </div>
              
              <Separator />
              
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-pharma-blue text-2xl">${total.toFixed(2)}</span>
              </div>
              
              {savings > 0 && (
                <div className="text-center text-pharma-green text-sm">
                  ¡Ahorras ${savings.toFixed(2)} en envío!
                </div>
              )}
              
              <Separator />
              
              <div className="space-y-3">
                <Link to="/checkout" className="block">
                  <Button className="w-full bg-pharma-green hover:bg-pharma-green-dark text-white font-bold py-4 text-lg rounded-xl transform hover:scale-[1.02] transition-all shadow-lg">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Proceder al Pago
                  </Button>
                </Link>
                
                <Link to="/products" className="block">
                  <Button variant="outline" className="w-full border-pharma-blue text-pharma-blue hover:bg-pharma-blue hover:text-white py-3">
                    Continuar Comprando
                  </Button>
                </Link>
              </div>
              
              <Separator />
              
              {/* Security Badges */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center text-pharma-green">
                  <Shield className="w-4 h-4 mr-2" />
                  <span>Compra 100% segura</span>
                </div>
                <div className="flex items-center text-pharma-green">
                  <Truck className="w-4 h-4 mr-2" />
                  <span>Entrega en 24-48 horas</span>
                </div>
                <div className="flex items-center text-pharma-green">
                  <Package className="w-4 h-4 mr-2" />
                  <span>Productos certificados</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;
