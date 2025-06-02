import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { mockOrders } from '../data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  X, 
  Eye,
  Download,
  RotateCcw,
  Filter,
  Calendar
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

const Orders: React.FC = () => {
  const { user } = useAuth();
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Filtrar pedidos del usuario actual
  const userOrders = mockOrders.filter(order => order.clientId === user?.id);
  
  const filteredOrders = statusFilter === 'all' 
    ? userOrders 
    : userOrders.filter(order => order.status === statusFilter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'entregado':
        return 'default';
      case 'pagado':
        return 'secondary';
      case 'pendiente':
        return 'destructive';
      case 'cancelado':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'entregado':
        return CheckCircle;
      case 'pagado':
        return Package;
      case 'pendiente':
        return Clock;
      case 'cancelado':
        return X;
      default:
        return Package;
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (userOrders.length === 0) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-pharma-blue to-pharma-blue-dark text-white rounded-2xl p-8">
          <h1 className="text-4xl font-bold mb-4">Mis Pedidos</h1>
          <p className="text-xl opacity-90">
            Historial y seguimiento de tus compras en Farmacia LUZ
          </p>
        </div>

        <Card className="shadow-xl border-0">
          <CardContent className="text-center py-20">
            <div className="w-32 h-32 bg-gradient-to-br from-pharma-blue to-pharma-blue-dark rounded-full flex items-center justify-center mx-auto mb-8">
              <Package className="w-16 h-16 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-700 mb-4">Sin pedidos aún</h2>
            <p className="text-gray-500 mb-8 text-lg max-w-md mx-auto">
              ¡Haz tu primera compra en Farmacia LUZ y empieza a disfrutar de nuestros productos!
            </p>
            <Button className="bg-pharma-blue hover:bg-pharma-blue-dark px-8 py-4 text-lg rounded-full">
              <Package className="w-5 h-5 mr-2" />
              Explorar Productos
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-pharma-blue to-pharma-blue-dark text-white rounded-2xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Mis Pedidos</h1>
            <p className="text-xl opacity-90">
              {filteredOrders.length} pedido{filteredOrders.length !== 1 ? 's' : ''} encontrado{filteredOrders.length !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">${userOrders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}</div>
            <div className="text-sm opacity-80">Total gastado</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filtrar pedidos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Estado del pedido" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="pendiente">Pendientes</SelectItem>
                <SelectItem value="pagado">Pagados</SelectItem>
                <SelectItem value="entregado">Entregados</SelectItem>
                <SelectItem value="cancelado">Cancelados</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="text-pharma-blue border-pharma-blue">
              <Calendar className="w-4 h-4 mr-2" />
              Filtrar por fecha
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map(order => {
          const StatusIcon = getStatusIcon(order.status);
          
          return (
            <Card key={order.id} className="shadow-lg border-0 hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="grid lg:grid-cols-4 gap-6">
                  {/* Order Info */}
                  <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-lg text-pharma-blue">
                          Pedido #{order.id}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                      <Badge variant={getStatusColor(order.status) as any} className="flex items-center">
                        <StatusIcon size={14} className="mr-1" />
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900">Productos:</h4>
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span className="text-gray-700">
                            {item.product.name} x{item.quantity}
                          </span>
                          <span className="font-medium">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <Truck className="w-4 h-4 mr-2" />
                      <span>{order.deliveryAddress}</span>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Resumen</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span>${(order.total * 0.9).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Envío:</span>
                          <span>Gratis</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-semibold">
                          <span>Total:</span>
                          <span className="text-pharma-blue">${order.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 mb-1">Método de pago:</p>
                      <p className="font-medium">{order.paymentMethod}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full border-pharma-blue text-pharma-blue hover:bg-pharma-blue hover:text-white"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Ver detalles
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Descargar factura
                    </Button>
                    
                    {order.status === 'entregado' && (
                      <Button 
                        variant="outline" 
                        className="w-full border-pharma-green text-pharma-green hover:bg-pharma-green hover:text-white"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reordenar
                      </Button>
                    )}
                    
                    {order.status === 'pendiente' && (
                      <Button 
                        variant="outline" 
                        className="w-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancelar pedido
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Load More */}
      {filteredOrders.length >= 5 && (
        <div className="text-center pt-6">
          <Button variant="outline" className="px-8 py-3">
            Cargar más pedidos
          </Button>
        </div>
      )}
    </div>
  );
};

export default Orders; 