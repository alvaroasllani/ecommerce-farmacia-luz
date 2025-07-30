import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Check, ArrowRight } from 'lucide-react';
import { BusinessType, getAvailableBusinessTypes } from '../../config/business-config';

interface BusinessTypeSelectorProps {
  selectedType: BusinessType | null;
  onSelect: (businessType: BusinessType) => void;
  onNext: () => void;
}

const BusinessTypeSelector: React.FC<BusinessTypeSelectorProps> = ({
  selectedType,
  onSelect,
  onNext,
}) => {
  const [hoveredType, setHoveredType] = useState<string | null>(null);
  const availableTypes = getAvailableBusinessTypes();

  const getBusinessIcon = (iconName: string) => {
    // You can extend this with actual icon components
    const iconMap: Record<string, string> = {
      pharmacy: '💊',
      'shopping-cart': '🛒',
      shirt: '👕',
      smartphone: '📱',
      utensils: '🍽️',
    };
    return iconMap[iconName] || '🏢';
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Configura tu E-commerce
        </h1>
        <p className="text-lg text-gray-600">
          Selecciona el tipo de negocio para personalizar tu tienda
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {availableTypes.map((businessType) => {
          const isSelected = selectedType?.id === businessType.id;
          const isHovered = hoveredType === businessType.id;

          return (
            <Card
              key={businessType.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                isSelected 
                  ? 'ring-2 ring-blue-500 bg-blue-50' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => onSelect(businessType)}
              onMouseEnter={() => setHoveredType(businessType.id)}
              onMouseLeave={() => setHoveredType(null)}
            >
              <CardHeader className="text-center pb-4">
                <div 
                  className="text-4xl mb-3"
                  style={{ color: businessType.color.primary }}
                >
                  {getBusinessIcon(businessType.icon)}
                </div>
                <CardTitle className="text-xl font-semibold flex items-center justify-center gap-2">
                  {businessType.name}
                  {isSelected && (
                    <Check className="w-5 h-5 text-green-600" />
                  )}
                </CardTitle>
                <CardDescription className="text-sm">
                  {businessType.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {/* Color Preview */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Colores:</span>
                    <div className="flex gap-1">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: businessType.color.primary }}
                      />
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: businessType.color.secondary }}
                      />
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: businessType.color.accent }}
                      />
                    </div>
                  </div>

                  {/* Key Features */}
                  <div>
                    <span className="text-sm font-medium">Características:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {businessType.features
                        .filter(f => f.enabled || f.required)
                        .slice(0, 2)
                        .map((feature) => (
                          <Badge
                            key={feature.id}
                            variant="secondary"
                            className="text-xs"
                          >
                            {feature.name}
                          </Badge>
                        ))}
                      {businessType.features.filter(f => f.enabled || f.required).length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{businessType.features.filter(f => f.enabled || f.required).length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Sample Categories */}
                  <div>
                    <span className="text-sm font-medium">Categorías:</span>
                    <div className="text-xs text-gray-600 mt-1">
                      {businessType.categories.slice(0, 3).join(', ')}
                      {businessType.categories.length > 3 && '...'}
                    </div>
                  </div>

                  {/* Currency */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Moneda:</span>
                    <span className="text-gray-600">
                      {businessType.currency.symbol} {businessType.currency.code}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Next Button */}
      <div className="flex justify-center">
        <Button
          onClick={onNext}
          disabled={!selectedType}
          size="lg"
          className="px-8"
        >
          Continuar
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Selected Type Summary */}
      {selectedType && (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">
            Tipo seleccionado: {selectedType.name}
          </h3>
          <p className="text-gray-600 mb-4">
            {selectedType.description}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Características incluidas:</strong>
              <ul className="list-disc list-inside mt-1 text-gray-600">
                {selectedType.features
                  .filter(f => f.enabled || f.required)
                  .map((feature) => (
                    <li key={feature.id}>
                      {feature.name} {feature.required && '(Requerido)'}
                    </li>
                  ))}
              </ul>
            </div>
            
            <div>
              <strong>Categorías de productos:</strong>
              <div className="mt-1 text-gray-600">
                {selectedType.categories.slice(0, 6).join(', ')}
                {selectedType.categories.length > 6 && ` y ${selectedType.categories.length - 6} más...`}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessTypeSelector; 