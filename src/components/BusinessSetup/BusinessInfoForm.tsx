import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { ArrowLeft, ArrowRight, Store } from 'lucide-react';
import { BusinessType } from '../../config/business-config';

interface BusinessInfo {
  name: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  website?: string;
}

interface BusinessInfoFormProps {
  businessType: BusinessType;
  businessInfo: BusinessInfo;
  onUpdate: (info: BusinessInfo) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const BusinessInfoForm: React.FC<BusinessInfoFormProps> = ({
  businessType,
  businessInfo,
  onUpdate,
  onNext,
  onPrevious,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof BusinessInfo, value: string) => {
    onUpdate({
      ...businessInfo,
      [field]: value,
    });

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!businessInfo.name.trim()) {
      newErrors.name = 'El nombre del negocio es requerido';
    }

    if (!businessInfo.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    }

    if (!businessInfo.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(businessInfo.email)) {
      newErrors.email = 'Formato de email inválido';
    }

    if (!businessInfo.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    }

    if (!businessInfo.address.trim()) {
      newErrors.address = 'La dirección es requerida';
    }

    if (businessInfo.website && businessInfo.website.trim()) {
      try {
        new URL(businessInfo.website);
      } catch {
        newErrors.website = 'Formato de URL inválido (debe incluir http:// o https://)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <div 
          className="text-4xl mb-4"
          style={{ color: businessType.color.primary }}
        >
          <Store className="w-12 h-12 mx-auto" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Información de tu {businessType.name}
        </h1>
        <p className="text-lg text-gray-600">
          Completa los datos básicos de tu negocio
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Datos del Negocio</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Business Name */}
          <div className="space-y-2">
            <Label htmlFor="name">
              Nombre del {businessType.name} *
            </Label>
            <Input
              id="name"
              value={businessInfo.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder={`Mi ${businessType.name}`}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Descripción *
            </Label>
            <Textarea
              id="description"
              value={businessInfo.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder={`Describe tu ${businessType.name.toLowerCase()}...`}
              rows={3}
              className={errors.description ? 'border-red-500' : ''}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">
                Email de Contacto *
              </Label>
              <Input
                id="email"
                type="email"
                value={businessInfo.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="contacto@negocio.com"
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">
                Teléfono *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={businessInfo.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+1 234-567-8900"
                className={errors.phone ? 'border-red-500' : ''}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address">
              Dirección *
            </Label>
            <Textarea
              id="address"
              value={businessInfo.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder="Dirección completa del negocio"
              rows={2}
              className={errors.address ? 'border-red-500' : ''}
            />
            {errors.address && (
              <p className="text-sm text-red-500">{errors.address}</p>
            )}
          </div>

          {/* Website (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="website">
              Sitio Web (Opcional)
            </Label>
            <Input
              id="website"
              type="url"
              value={businessInfo.website || ''}
              onChange={(e) => handleInputChange('website', e.target.value)}
              placeholder="https://www.minegocio.com"
              className={errors.website ? 'border-red-500' : ''}
            />
            {errors.website && (
              <p className="text-sm text-red-500">{errors.website}</p>
            )}
          </div>

          {/* Preview */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-sm text-gray-700 mb-2">Vista Previa:</h3>
            <div className="text-sm text-gray-600">
              <p className="font-medium">{businessInfo.name || `Mi ${businessType.name}`}</p>
              <p>{businessInfo.description || 'Descripción del negocio'}</p>
              <p>{businessInfo.email || 'email@ejemplo.com'} • {businessInfo.phone || 'teléfono'}</p>
              <p>{businessInfo.address || 'dirección del negocio'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={onPrevious}
          className="px-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Anterior
        </Button>

        <Button
          onClick={handleNext}
          className="px-8"
        >
          Continuar
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default BusinessInfoForm; 