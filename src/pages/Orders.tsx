import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useBusinessConfig } from '../hooks/useBusinessConfig';
import { useOrders } from '../hooks/useOrders';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Separator } from '../components/ui/separator';
import { 
  Package, 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  CreditCard,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  ShoppingBag,
  Eye,
  RefreshCw
} from 'lucide-react';
import { formatCurrency, formatDate, formatOrderId } from '../utils/formatters';
import { Order } from '../types';
import { ORDER_STATUS } from '../constants/app';

type OrderStatusFilter = 'all' | 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

const Orders: React.FC = () => {
  const { user } = useAuth();
  const { terminology, getPrimaryColor, getCurrency } = useBusinessConfig();
  const { orders, loading, createOrder, cancelOrder } = useOrders();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatusFilter>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Filter orders based on search and status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.some(item => 
                           item.product.name.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" />;
      case 'shipped':
        return <Truck className="w-4 h-4" />;
      case 'delivered':
        return <Package className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    const statusLabels = {
      pending: 'Pendiente',
      confirmed: 'Confirmado',
      shipped: 'Enviado',
      delivered: 'Entregado',
      cancelled: 'Cancelado',
    };
    return statusLabels[status as keyof typeof statusLabels] || status;
  };

  const handleCancelOrder = async (orderId: string) => {
    if (window.confirm('¿Estás seguro de que quieres cancelar este pedido?')) {
      try {
        await cancelOrder(orderId);
      } catch (error) {
        console.error('Error cancelling order:', error);
      }
    }
  };

  const canCancelOrder = (order: Order) => {
    return ['pending', 'confirmed'].includes(order.status);
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Inicia Sesión</h2>
          <p className="text-gray-600">Debes iniciar sesión para ver tus pedidos</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Mis {terminology.orders}
          </h1>
          <p className="text-gray-600">
            Revisa el estado de todos tus {terminology.orders.toLowerCase()}
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder={`Buscar ${terminology.orders.toLowerCase()}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div className="lg:w-48">
                <Select value={statusFilter} onValueChange={(value: OrderStatusFilter) => setStatusFilter(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los estados</SelectItem>
                    <SelectItem value="pending">Pendientes</SelectItem>
                    <SelectItem value="confirmed">Confirmados</SelectItem>
                    <SelectItem value="shipped">Enviados</SelectItem>
                    <SelectItem value="delivered">Entregados</SelectItem>
                    <SelectItem value="cancelled">Cancelados</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Refresh */}
              <Button
                variant="outline"
                size="default"
                onClick={() => window.location.reload()}
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Actualizar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        {loading ? (
          <div className="text-center py-12">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">Cargando {terminology.orders.toLowerCase()}...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {orders.length === 0 
                ? `No tienes ${terminology.orders.toLowerCase()} aún`
                : `No se encontraron ${terminology.orders.toLowerCase()}`
              }
            </h3>
            <p className="text-gray-600 mb-6">
              {orders.length === 0 
                ? `¡Comienza a explorar nuestros ${terminology.products.toLowerCase()} y haz tu primer ${terminology.order.toLowerCase()}!`
                : 'Intenta con otros filtros de búsqueda'
              }
            </p>
            {orders.length === 0 && (
              <Button style={{ backgroundColor: getPrimaryColor() }}>
                Explorar {terminology.products}
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <Card key={order.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Package className="w-5 h-5" />
                        {terminology.order} #{formatOrderId(order.id)}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-4 mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(order.createdAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <CreditCard className="w-4 h-4" />
                          {formatCurrency(order.total, getCurrency())}
                        </span>
                      </CardDescription>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge className={`${getStatusColor(order.status)} flex items-center gap-1`}>
                        {getStatusIcon(order.status)}
                        {getStatusLabel(order.status)}
                      </Badge>
                      
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          {selectedOrder?.id === order.id ? 'Ocultar' : 'Detalles'}
                        </Button>
                        
                        {canCancelOrder(order) && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCancelOrder(order.id)}
                            disabled={loading}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Cancelar
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  {/* Order Items Preview */}
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">
                      {terminology.products} ({order.items.length} {order.items.length === 1 ? 'artículo' : 'artículos'})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {order.items.slice(0, 3).map((item, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {item.quantity}x {item.product.name}
                        </Badge>
                      ))}
                      {order.items.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{order.items.length - 3} más
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Delivery Info */}
                  {order.deliveryAddress && (
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mt-0.5" />
                      <span>Entregar en: {order.deliveryAddress}</span>
                    </div>
                  )}

                  {/* Expanded Details */}
                  {selectedOrder?.id === order.id && (
                    <>
                      <Separator className="my-4" />
                      <div className="space-y-4">
                        <h4 className="font-medium">Detalles del {terminology.order}</h4>
                        
                        {/* Detailed Items */}
                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                              <div className="flex-1">
                                <p className="font-medium">{item.product.name}</p>
                                <p className="text-sm text-gray-600">
                                  {formatCurrency(item.product.price, getCurrency())} × {item.quantity}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">
                                  {formatCurrency(item.product.price * item.quantity, getCurrency())}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Order Summary */}
                        <div className="border-t pt-4">
                          <div className="flex justify-between items-center font-medium">
                            <span>Total del {terminology.order}:</span>
                            <span className="text-lg" style={{ color: getPrimaryColor() }}>
                              {formatCurrency(order.total, getCurrency())}
                            </span>
                          </div>
                        </div>

                        {/* Additional Info */}
                        <div className="text-sm text-gray-600 space-y-1">
                          <p><strong>Método de pago:</strong> {order.paymentMethod}</p>
                          <p><strong>Estado:</strong> {getStatusLabel(order.status)}</p>
                          {order.notes && (
                            <p><strong>Notas:</strong> {order.notes}</p>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders; 