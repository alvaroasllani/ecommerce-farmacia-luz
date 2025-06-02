import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Edit,
  Save,
  X,
  Shield,
  Award,
  Star,
  Package,
  Truck,
  Heart
} from 'lucide-react';
import { toast } from '../hooks/use-toast';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Aquí normalmente harías una llamada al API
    toast({
      title: "✅ Perfil actualizado",
      description: "Tus datos han sido guardados correctamente.",
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || ''
    });
    setIsEditing(false);
  };

  const membershipTier = 'Premium'; // Simulación de nivel de membresía
  const totalSpent = 1245.67; // Simulación del gasto total
  const totalOrders = 15; // Simulación de total de pedidos

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-pharma-blue to-pharma-blue-dark text-white rounded-2xl p-8">
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <User className="w-12 h-12 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">Mi Perfil</h1>
            <p className="text-xl opacity-90 mb-4">
              ¡Hola {user?.name}! Gestiona tu información personal
            </p>
            <Badge className="bg-pharma-green text-white">
              <Award className="w-4 h-4 mr-1" />
              Cliente {membershipTier}
            </Badge>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">${totalSpent.toFixed(2)}</div>
            <div className="text-sm opacity-80">Total gastado</div>
            <div className="text-sm opacity-80">{totalOrders} pedidos</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Personal Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-xl border-0">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Información Personal
              </CardTitle>
              {!isEditing ? (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="border-pharma-blue text-pharma-blue hover:bg-pharma-blue hover:text-white"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button 
                    size="sm"
                    onClick={handleSave}
                    className="bg-pharma-green hover:bg-pharma-green-dark"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Guardar
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleCancel}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancelar
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Nombre completo
                  </label>
                  {isEditing ? (
                    <Input
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="border-2 border-gray-200 focus:border-pharma-blue"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium p-3 bg-gray-50 rounded-lg">
                      {formData.name}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    Correo electrónico
                  </label>
                  {isEditing ? (
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="border-2 border-gray-200 focus:border-pharma-blue"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium p-3 bg-gray-50 rounded-lg">
                      {formData.email}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    Teléfono
                  </label>
                  {isEditing ? (
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+58 414-123-4567"
                      className="border-2 border-gray-200 focus:border-pharma-blue"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium p-3 bg-gray-50 rounded-lg">
                      {formData.phone || 'No registrado'}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Miembro desde
                  </label>
                  <p className="text-gray-900 font-medium p-3 bg-gray-50 rounded-lg">
                    {user?.createdAt ? new Intl.DateTimeFormat('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }).format(user.createdAt) : 'No disponible'}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Dirección de entrega
                </label>
                {isEditing ? (
                  <Input
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Ingresa tu dirección completa"
                    className="border-2 border-gray-200 focus:border-pharma-blue"
                  />
                ) : (
                  <p className="text-gray-900 font-medium p-3 bg-gray-50 rounded-lg">
                    {formData.address || 'No registrada'}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="shadow-xl border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Configuración de Seguridad
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full justify-start border-pharma-blue text-pharma-blue hover:bg-pharma-blue hover:text-white"
              >
                Cambiar contraseña
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
              >
                Configurar autenticación de dos factores
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
              >
                Eliminar cuenta
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Stats and Quick Actions */}
        <div className="space-y-6">
          {/* Stats */}
          <Card className="shadow-xl border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="w-5 h-5 mr-2" />
                Estadísticas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-pharma-blue/10 rounded-lg">
                  <Package className="w-8 h-8 text-pharma-blue mx-auto mb-2" />
                  <div className="text-2xl font-bold text-pharma-blue">{totalOrders}</div>
                  <div className="text-xs text-gray-600">Pedidos</div>
                </div>
                <div className="text-center p-4 bg-pharma-green/10 rounded-lg">
                  <Star className="w-8 h-8 text-pharma-green mx-auto mb-2" />
                  <div className="text-2xl font-bold text-pharma-green">4.9</div>
                  <div className="text-xs text-gray-600">Calificación</div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Productos comprados:</span>
                  <span className="font-semibold">42</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Productos favoritos:</span>
                  <span className="font-semibold">8</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Devoluciones:</span>
                  <span className="font-semibold">0</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-xl border-0">
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-pharma-blue hover:bg-pharma-blue-dark">
                <Package className="w-4 h-4 mr-2" />
                Ver mis pedidos
              </Button>
              <Button variant="outline" className="w-full justify-start border-pharma-green text-pharma-green hover:bg-pharma-green hover:text-white">
                <Heart className="w-4 h-4 mr-2" />
                Lista de favoritos
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Truck className="w-4 h-4 mr-2" />
                Rastrear pedido
              </Button>
            </CardContent>
          </Card>

          {/* Membership Benefits */}
          <Card className="shadow-xl border-0 bg-gradient-to-br from-pharma-green/5 to-pharma-blue/5">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="w-5 h-5 mr-2 text-pharma-green" />
                Beneficios {membershipTier}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center text-pharma-green">
                <Star className="w-4 h-4 mr-2" />
                <span>Envío gratis en todos los pedidos</span>
              </div>
              <div className="flex items-center text-pharma-green">
                <Star className="w-4 h-4 mr-2" />
                <span>Descuentos exclusivos hasta 20%</span>
              </div>
              <div className="flex items-center text-pharma-green">
                <Star className="w-4 h-4 mr-2" />
                <span>Soporte prioritario 24/7</span>
              </div>
              <div className="flex items-center text-pharma-green">
                <Star className="w-4 h-4 mr-2" />
                <span>Acceso anticipado a nuevos productos</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile; 