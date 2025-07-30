import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { BUSINESS_TYPES } from '../config/business-types';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { ArrowRight, ExternalLink } from 'lucide-react';

const BusinessDemo: React.FC = () => {
  const businessTypes = Object.values(BUSINESS_TYPES);

  const getBusinessIcon = (iconName: string) => {
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
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🛒 Universal E-commerce Template
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Una plantilla que se adapta a cualquier tipo de negocio
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" asChild>
            <Link to={ROUTES.SETUP}>
              Crear Mi Tienda
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a 
              href="https://github.com/tu-usuario/universal-ecommerce-template" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Ver en GitHub
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      </div>

      {/* Features Overview */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-center mb-8">¿Por qué elegir esta plantilla?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="text-center">
              <div className="text-3xl mb-2">⚡</div>
              <CardTitle className="text-lg">Configuración Rápida</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 text-center">
                5 minutos para tener tu tienda funcionando con productos de ejemplo
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <div className="text-3xl mb-2">🎨</div>
              <CardTitle className="text-lg">Totalmente Personalizable</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 text-center">
                Colores, categorías, terminología y características específicas por industria
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <div className="text-3xl mb-2">🚀</div>
              <CardTitle className="text-lg">Listo para Producción</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 text-center">
                TypeScript, hooks personalizados, sistema de permisos y componentes modulares
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Business Types */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-center mb-8">Tipos de Negocio Disponibles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businessTypes.map((businessType) => (
            <Card 
              key={businessType.id} 
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => {
                // Demo: cambiar tipo de negocio temporalmente
                console.log(`Demo: Cambiando a ${businessType.name}`);
              }}
            >
              <CardHeader className="text-center">
                <div 
                  className="text-4xl mb-3"
                  style={{ color: businessType.color.primary }}
                >
                  {getBusinessIcon(businessType.icon)}
                </div>
                <CardTitle className="text-xl">
                  {businessType.name}
                </CardTitle>
                <CardDescription>
                  {businessType.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Color Palette */}
                <div>
                  <p className="text-sm font-medium mb-2">Paleta de colores:</p>
                  <div className="flex gap-2">
                    <div 
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: businessType.color.primary }}
                      title="Primario"
                    />
                    <div 
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: businessType.color.secondary }}
                      title="Secundario"
                    />
                    <div 
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: businessType.color.accent }}
                      title="Acento"
                    />
                  </div>
                </div>

                {/* Key Features */}
                <div>
                  <p className="text-sm font-medium mb-2">Características principales:</p>
                  <div className="flex flex-wrap gap-1">
                    {businessType.features
                      .filter(f => f.enabled || f.required)
                      .slice(0, 3)
                      .map((feature) => (
                        <Badge
                          key={feature.id}
                          variant={feature.required ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {feature.name}
                          {feature.required && " *"}
                        </Badge>
                      ))}
                  </div>
                </div>

                {/* Sample Categories */}
                <div>
                  <p className="text-sm font-medium mb-2">Categorías incluidas:</p>
                  <p className="text-xs text-gray-600">
                    {businessType.categories.slice(0, 4).join(' • ')}
                    {businessType.categories.length > 4 && '...'}
                  </p>
                </div>

                {/* Currency */}
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium">Moneda:</span>
                  <span className="text-gray-600">
                    {businessType.currency.symbol} {businessType.currency.code}
                  </span>
                </div>

                {/* Requirements */}
                {(businessType.requirements.licenseRequired || businessType.requirements.certificationRequired) && (
                  <div>
                    <p className="text-xs text-amber-600">
                      ⚠️ Requiere licencias/certificaciones especiales
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Technical Features */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-center mb-8">Características Técnicas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🏗️</span>
                Arquitectura Escalable
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline">TypeScript</Badge>
                <span className="text-sm text-gray-600">Tipado fuerte</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">React Hooks</Badge>
                <span className="text-sm text-gray-600">Lógica de negocio encapsulada</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">Tailwind CSS</Badge>
                <span className="text-sm text-gray-600">Diseño moderno y responsive</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">Shadcn/UI</Badge>
                <span className="text-sm text-gray-600">Componentes accesibles</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🔧</span>
                Funcionalidades Incluidas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm">✅ Sistema de autenticación con roles</div>
              <div className="text-sm">✅ Carrito de compras inteligente</div>
              <div className="text-sm">✅ Gestión de inventario</div>
              <div className="text-sm">✅ Procesamiento de órdenes</div>
              <div className="text-sm">✅ Validaciones específicas por industria</div>
              <div className="text-sm">✅ Formateo localizado (fechas, moneda)</div>
              <div className="text-sm">✅ Notificaciones y feedback visual</div>
              <div className="text-sm">✅ Responsive design</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
        <h2 className="text-3xl font-bold mb-4">¿Listo para crear tu tienda?</h2>
        <p className="text-lg text-gray-600 mb-6">
          En menos de 5 minutos tendrás un e-commerce completamente funcional
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link to={ROUTES.SETUP}>
              Empezar Ahora
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          <Button variant="outline" size="lg">
            Ver Documentación
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-12 pt-8 border-t border-gray-200">
        <p className="text-gray-600">
          Construido con ❤️ usando React, TypeScript y Tailwind CSS
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Código abierto y listo para personalizar según tus necesidades
        </p>
      </div>
    </div>
  );
};

export default BusinessDemo; 