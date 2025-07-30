import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useBusinessConfig } from '../hooks/useBusinessConfig';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Edit, 
  Save, 
  X, 
  Shield,
  Calendar,
  Package
} from 'lucide-react';
import { formatDate } from '../utils/formatters';
import { validateEmail, validateVenezuelanPhone } from '../utils/validators';
import { ROLES } from '../constants/roles';

interface UserFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { getPrimaryColor, config } = useBusinessConfig();
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState<UserFormData>({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });

  const handleInputChange = (field: keyof UserFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Formato de email inválido';
    }

    if (formData.phone && !validateVenezuelanPhone(formData.phone)) {
      newErrors.phone = 'Formato de teléfono inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      setIsUpdating(true);
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
    });
    setErrors({});
    setIsEditing(false);
  };

  const getUserInitials = () => {
    if (!user?.name) return 'U';
    return user.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleDisplay = (role: string) => {
    const roleMap = {
      [ROLES.CLIENTE]: { label: 'Cliente', color: 'bg-blue-100 text-blue-800' },
      [ROLES.CAJERO]: { label: 'Cajero', color: 'bg-green-100 text-green-800' },
      [ROLES.ADMINISTRADOR]: { label: 'Administrador', color: 'bg-purple-100 text-purple-800' },
    };
    return roleMap[role] || { label: role, color: 'bg-gray-100 text-gray-800' };
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-600">Debes iniciar sesión para ver tu perfil</p>
        </div>
      </div>
    );
  }

  const roleInfo = getRoleDisplay(user.role);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mi Perfil</h1>
          <p className="text-gray-600">
            Gestiona tu información personal y configuración de cuenta
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarFallback 
                    className="text-2xl font-bold text-white"
                    style={{ backgroundColor: getPrimaryColor() }}
                  >
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
                <Badge className={`w-fit mx-auto ${roleInfo.color}`}>
                  <Shield className="w-3 h-3 mr-1" />
                  {roleInfo.label}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Miembro desde {formatDate(user.createdAt)}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{user.phone}</span>
                  </div>
                )}
                {user.address && (
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{user.address}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Estadísticas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Pedidos realizados</span>
                  <span className="font-semibold">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total gastado</span>
                  <span className="font-semibold">$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Puntos acumulados</span>
                  <span className="font-semibold">0</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Information Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Información Personal
                  </CardTitle>
                  <CardDescription>
                    Actualiza tu información de contacto
                  </CardDescription>
                </div>
                {!isEditing ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCancel}
                      disabled={isUpdating}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancelar
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleSave}
                      disabled={isUpdating}
                      style={{ backgroundColor: getPrimaryColor() }}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {isUpdating ? 'Guardando...' : 'Guardar'}
                    </Button>
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo *</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={errors.name ? 'border-red-500' : ''}
                      />
                    ) : (
                      <p className="p-2 bg-gray-50 rounded-md">{user.name}</p>
                    )}
                    {errors.name && (
                      <p className="text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={errors.email ? 'border-red-500' : ''}
                      />
                    ) : (
                      <p className="p-2 bg-gray-50 rounded-md flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {user.email}
                      </p>
                    )}
                    {errors.email && (
                      <p className="text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+58 414-1234567"
                      className={errors.phone ? 'border-red-500' : ''}
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 rounded-md flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {user.phone || 'No especificado'}
                    </p>
                  )}
                  {errors.phone && (
                    <p className="text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Dirección</Label>
                  {isEditing ? (
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Dirección completa para entregas"
                      rows={3}
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 rounded-md flex items-start gap-2">
                      <MapPin className="w-4 h-4 mt-0.5" />
                      {user.address || 'No especificada'}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Account Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Cuenta</CardTitle>
                <CardDescription>
                  Configuraciones de seguridad y preferencias
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Notificaciones por email</h4>
                    <p className="text-sm text-gray-600">
                      Recibe updates sobre tus pedidos
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Configurar
                  </Button>
                </div>
                
                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Cambiar contraseña</h4>
                    <p className="text-sm text-gray-600">
                      Actualiza tu contraseña de acceso
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Cambiar
                  </Button>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Eliminar cuenta</h4>
                    <p className="text-sm text-gray-600">
                      Eliminar permanentemente tu cuenta
                    </p>
                  </div>
                  <Button variant="destructive" size="sm">
                    Eliminar
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Business Info */}
            <Card>
              <CardHeader>
                <CardTitle>Información del Negocio</CardTitle>
                <CardDescription>
                  Detalles de {config.businessInfo.name}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tipo de negocio</span>
                  <span className="font-medium">{config.businessType.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email de contacto</span>
                  <span className="font-medium">{config.businessInfo.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Teléfono</span>
                  <span className="font-medium">{config.businessInfo.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Moneda</span>
                  <span className="font-medium">
                    {config.businessType.currency.symbol} {config.businessType.currency.code}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 