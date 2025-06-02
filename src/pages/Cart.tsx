
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';

const Cart: React.FC = () => {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="text-center py-12">
            <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">Tu carrito está vacío</h2>
            <p className="text-gray-500 mb-6">Agrega algunos productos para comenzar tu compra</p>
            <Link to="/products">
              <Button className="bg-pharma-blue hover:bg-pharma-blue-dark">
                Explorar Productos
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-pharma-blue">Carrito de Compras</h1>
        <Button 
          variant="outline" 
          onClick={clearCart}
          className="text-red-600 border-red-600 hover:bg-red-50"
        >
          Vaciar carrito
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <Card key={item.product.id}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.product.name}</h3>
                    <p className="text-gray-600 text-sm">{item.product.brand}</p>
                    <p className="text-pharma-blue font-bold text-xl">
                      ${item.product.price.toFixed(2)}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={16} />
                    </Button>
                    
                    <span className="w-12 text-center font-medium">
                      {item.quantity}
                    </span>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      disabled={item.quantity >= item.product.stock}
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-bold text-lg">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeItem(item.product.id)}
                      className="text-red-600 border-red-600 hover:bg-red-50 mt-2"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Resumen del Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Envío:</span>
                <span>Gratis</span>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-pharma-blue">${getTotalPrice().toFixed(2)}</span>
                </div>
              </div>
              
              <Link to="/checkout" className="block">
                <Button className="w-full bg-pharma-green hover:bg-pharma-green-dark text-lg py-6">
                  Proceder al Pago
                </Button>
              </Link>
              
              <Link to="/products" className="block">
                <Button variant="outline" className="w-full">
                  Continuar Comprando
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;
