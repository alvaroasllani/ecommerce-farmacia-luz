
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from '../hooks/use-toast';

const Checkout: React.FC = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    address: user?.address || '',
    phone: user?.phone || '',
    paymentMethod: '',
    notes: ''
  });
  
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simular procesamiento del pedido
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "¡Pedido realizado con éxito!",
      description: "Tu pedido ha sido procesado y recibirás una confirmación por email.",
    });

    clearCart();
    setLoading(false);
    navigate('/orders');
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-pharma-blue">Finalizar Compra</h1>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Información de Entrega</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Dirección de entrega
                </label>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Dirección completa"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono de contacto
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+58 414-1234567"
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Método de Pago</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={formData.paymentMethod} onValueChange={(value) => setFormData({...formData, paymentMethod: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un método de pago" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="efectivo">Efectivo</SelectItem>
                  <SelectItem value="tarjeta">Tarjeta de débito/crédito</SelectItem>
                  <SelectItem value="transferencia">Transferencia bancaria</SelectItem>
                  <SelectItem value="pago_movil">Pago móvil</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notas Adicionales</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Instrucciones especiales para la entrega (opcional)"
                className="w-full h-24 p-3 border border-gray-300 rounded-md resize-none"
              />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Resumen del Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {items.map(item => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span>{item.product.name} x{item.quantity}</span>
                    <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Envío:</span>
                  <span>Gratis</span>
                </div>
                
                <div className="flex justify-between text-lg font-bold text-pharma-blue">
                  <span>Total:</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
              </div>
              
              <form onSubmit={handleSubmit}>
                <Button 
                  type="submit"
                  className="w-full bg-pharma-green hover:bg-pharma-green-dark text-lg py-6"
                  disabled={loading || !formData.paymentMethod}
                >
                  {loading ? 'Procesando...' : 'Confirmar Pedido'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
