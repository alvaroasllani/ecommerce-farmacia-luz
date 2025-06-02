import React, { useState } from 'react';
import { mockProducts } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { Product } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  Percent, 
  Timer, 
  Star, 
  Gift,
  Zap,
  Crown,
  Clock,
  Flame
} from 'lucide-react';

const Offers: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Simular productos en oferta
  const offerProducts = mockProducts.map(product => ({
    ...product,
    originalPrice: product.price * 1.3,
    discountPercentage: Math.floor(Math.random() * 30) + 10,
    isFlashSale: Math.random() > 0.7,
    timeLeft: Math.floor(Math.random() * 24) + 1 // Horas restantes
  }));

  const flashSaleProducts = offerProducts.filter(p => p.isFlashSale);
  const regularOffers = offerProducts.filter(p => !p.isFlashSale);

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const formatTimeLeft = (hours: number) => {
    return `${hours}h restantes`;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 via-pink-500 to-red-600 text-white rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Percent className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Ofertas Especiales</h1>
              <p className="text-xl opacity-90">
                ¡Hasta 50% de descuento en productos seleccionados!
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">50%</div>
              <div className="text-sm opacity-80">Descuento máximo</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{offerProducts.length}</div>
              <div className="text-sm opacity-80">Productos en oferta</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{flashSaleProducts.length}</div>
              <div className="text-sm opacity-80">Ofertas relámpago</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">24h</div>
              <div className="text-sm opacity-80">Tiempo limitado</div>
            </div>
          </div>
        </div>
      </div>

      {/* Flash Sales */}
      {flashSaleProducts.length > 0 && (
        <div className="space-y-6">
          <Card className="shadow-xl border-0 bg-gradient-to-r from-orange-50 to-red-50">
            <CardHeader>
              <CardTitle className="flex items-center text-red-600">
                <Zap className="w-6 h-6 mr-2" />
                Ofertas Relámpago
                <Badge className="ml-auto bg-red-500 text-white animate-pulse">
                  <Timer className="w-3 h-3 mr-1" />
                  ¡Tiempo limitado!
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {flashSaleProducts.map(product => (
                  <div key={product.id} className="relative">
                    <div className="absolute top-2 right-2 z-10">
                      <Badge className="bg-red-500 text-white animate-pulse">
                        <Flame className="w-3 h-3 mr-1" />
                        {formatTimeLeft(product.timeLeft)}
                      </Badge>
                    </div>
                    <ProductCard 
                      product={product} 
                      onViewDetails={handleViewDetails}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Categories of Offers */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-pharma-blue">Productos Nuevos</h3>
            <p className="text-gray-600 mb-4">20% de descuento en productos recién llegados</p>
            <Badge className="bg-blue-100 text-blue-600">
              Hasta 20% OFF
            </Badge>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-pharma-blue">Más Vendidos</h3>
            <p className="text-gray-600 mb-4">Productos populares con precios especiales</p>
            <Badge className="bg-green-100 text-green-600">
              Hasta 30% OFF
            </Badge>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-pharma-blue">Clientes Premium</h3>
            <p className="text-gray-600 mb-4">Descuentos exclusivos para miembros premium</p>
            <Badge className="bg-purple-100 text-purple-600">
              Hasta 40% OFF
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Regular Offers */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-pharma-blue mb-2">
              Todas las Ofertas
            </h2>
            <p className="text-gray-600">
              {regularOffers.length} productos con descuentos especiales
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-orange-500" />
            <span className="text-sm text-gray-600">
              Ofertas válidas hasta agotar existencias
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {regularOffers.map(product => (
            <div key={product.id} className="relative">
              <div className="absolute top-2 left-2 z-10">
                <Badge className="bg-pharma-green text-white">
                  <Percent className="w-3 h-3 mr-1" />
                  {product.discountPercentage}% OFF
                </Badge>
              </div>
              <ProductCard 
                product={product} 
                onViewDetails={handleViewDetails}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Special Promotion Banner */}
      <Card className="shadow-xl border-0 bg-gradient-to-r from-pharma-blue to-pharma-blue-dark text-white">
        <CardContent className="p-8 text-center">
          <Gift className="w-16 h-16 mx-auto mb-4 text-pharma-green" />
          <h3 className="text-2xl font-bold mb-4">
            ¡Promoción Especial Farmacia LUZ!
          </h3>
          <p className="text-xl mb-6 opacity-90">
            Compra 3 productos y llévate el de menor valor ¡GRATIS!
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-pharma-green rounded-full mr-2"></div>
              <span>Válido en productos seleccionados</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-pharma-green rounded-full mr-2"></div>
              <span>No acumulable con otras ofertas</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Newsletter Signup */}
      <Card className="shadow-xl border-0">
        <CardContent className="p-8 text-center">
          <Star className="w-12 h-12 text-pharma-blue mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4 text-pharma-blue">
            ¡No te pierdas nuestras ofertas!
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Suscríbete a nuestro boletín y recibe notificaciones de ofertas exclusivas
          </p>
          <Button className="bg-pharma-green hover:bg-pharma-green-dark px-8 py-3 text-lg rounded-full">
            Suscribirse al Boletín
          </Button>
        </CardContent>
      </Card>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Offers; 