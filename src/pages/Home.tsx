import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { mockProducts } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { Product } from '../types';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ShoppingCart, Package, Users, BarChart, Shield, Clock, MapPin, Phone } from 'lucide-react';

const Home: React.FC = () => {
  const { user } = useAuth();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const featuredProducts = mockProducts.slice(0, 4);

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  if (!user) {
    return (
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-pharma-blue via-pharma-blue-dark to-blue-900 text-white">
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-8">
                <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Farmacia LUZ
                </h1>
                <div className="w-24 h-1 bg-pharma-green mx-auto mb-6"></div>
                <p className="text-xl mb-8 opacity-90 leading-relaxed">
                  Tu farmacia de confianza con más de 15 años de experiencia y 
                  <span className="font-semibold text-pharma-green"> más de 10,000 productos farmacéuticos</span>
                </p>
              </div>
              
              <div className="flex justify-center space-x-6 mb-12">
                <Link to="/login">
                  <Button className="bg-white text-pharma-blue hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full transform hover:scale-105 transition-all shadow-lg">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-pharma-blue px-8 py-4 text-lg font-semibold rounded-full transform hover:scale-105 transition-all">
                    Registrarse Gratis
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-pharma-green">15+</div>
                  <div className="text-sm opacity-80">Años de experiencia</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pharma-green">10K+</div>
                  <div className="text-sm opacity-80">Productos disponibles</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pharma-green">24/7</div>
                  <div className="text-sm opacity-80">Atención online</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pharma-green">5000+</div>
                  <div className="text-sm opacity-80">Clientes satisfechos</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-pharma-blue mb-4">¿Por qué elegir Farmacia LUZ?</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Nos comprometemos a brindarte la mejor atención farmacéutica con productos de calidad y servicio excepcional
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-pharma-blue rounded-full flex items-center justify-center mx-auto mb-6">
                    <Package className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-pharma-blue">Amplio Catálogo</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Más de 10,000 productos farmacéuticos, medicamentos genéricos, vitaminas y productos de cuidado personal
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-pharma-green rounded-full flex items-center justify-center mx-auto mb-6">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-pharma-blue">Productos Certificados</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Todos nuestros medicamentos cuentan con registro sanitario y garantía de calidad farmacéutica
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-pharma-green rounded-full flex items-center justify-center mx-auto mb-6">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-pharma-blue">Atención 24/7</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Servicio de consultas online las 24 horas y entregas rápidas en toda la ciudad
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="flex items-center justify-center space-x-3">
                  <MapPin className="w-6 h-6 text-pharma-blue" />
                  <div>
                    <p className="font-semibold text-pharma-blue">Ubicación</p>
                    <p className="text-gray-600">Av. Principal, Centro de la Ciudad</p>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <Phone className="w-6 h-6 text-pharma-blue" />
                  <div>
                    <p className="font-semibold text-pharma-blue">Teléfono</p>
                    <p className="text-gray-600">+58 414-123-4567</p>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <Clock className="w-6 h-6 text-pharma-blue" />
                  <div>
                    <p className="font-semibold text-pharma-blue">Horarios</p>
                    <p className="text-gray-600">Lun - Dom: 6:00 AM - 10:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Products */}
        <div className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-pharma-blue mb-4">Productos Destacados</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Descubre algunos de nuestros medicamentos más solicitados y productos de mayor calidad
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {featuredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
            
            <div className="text-center">
              <Link to="/register">
                <Button className="bg-pharma-blue hover:bg-pharma-blue-dark px-8 py-4 text-lg font-semibold rounded-full">
                  Ver Todos los Productos
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-pharma-green to-green-600 py-16">
          <div className="container mx-auto px-4 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">¡Únete a nuestra familia de clientes!</h2>
            <p className="text-xl mb-8 opacity-90">
              Regístrate hoy y obtén descuentos exclusivos en tu primera compra
            </p>
            <Link to="/register">
              <Button className="bg-white text-pharma-green hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full transform hover:scale-105 transition-all">
                Registrarse Ahora
              </Button>
            </Link>
          </div>
        </div>

        {/* Product Modal */}
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    );
  }

  if (user.role === 'administrador') {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-pharma-blue">Dashboard Administrativo</h1>
          <p className="text-gray-600">Bienvenido, {user.name}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ventas del Mes</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,450</div>
              <p className="text-xs text-muted-foreground">+20.1% desde el mes pasado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Productos</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockProducts.length}</div>
              <p className="text-xs text-muted-foreground">+2 productos nuevos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Usuarios Activos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">+5% desde la semana pasada</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pedidos Pendientes</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">-12% desde ayer</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link to="/admin/products">
                <Button className="w-full justify-start" variant="outline">
                  <Package className="mr-2 h-4 w-4" />
                  Gestionar Productos
                </Button>
              </Link>
              <Link to="/admin/orders">
                <Button className="w-full justify-start" variant="outline">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Ver Pedidos
                </Button>
              </Link>
              <Link to="/admin/users">
                <Button className="w-full justify-start" variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Gestionar Usuarios
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Productos con Poco Stock</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockProducts.filter(p => p.stock < 60).map(product => (
                  <div key={product.id} className="flex justify-between items-center">
                    <span className="text-sm">{product.name}</span>
                    <span className="text-sm text-amber-600 font-medium">
                      Stock: {product.stock}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (user.role === 'cajero') {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-pharma-blue">Panel de Cajero</h1>
          <p className="text-gray-600">Bienvenido/a, {user.name}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Ventas de Hoy</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-3xl font-bold text-pharma-green">$1,245</div>
              <p className="text-sm text-gray-600">15 transacciones</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-center">Pedidos Pendientes</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-3xl font-bold text-amber-600">8</div>
              <p className="text-sm text-gray-600">Por procesar</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-center">Productos Vendidos</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-3xl font-bold text-pharma-blue">42</div>
              <p className="text-sm text-gray-600">Unidades hoy</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link to="/cashier">
                <Button className="w-full justify-start bg-pharma-green hover:bg-pharma-green-dark">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Nueva Venta
                </Button>
              </Link>
              <Link to="/cashier/orders">
                <Button className="w-full justify-start" variant="outline">
                  <Package className="mr-2 h-4 w-4" />
                  Ver Pedidos
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Últimas Ventas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span>Paracetamol 500mg x2</span>
                  <span className="font-medium">$25.00</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Vitamina C x1</span>
                  <span className="font-medium">$25.90</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Ibuprofeno 400mg x1</span>
                  <span className="font-medium">$18.75</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Cliente
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-pharma-blue to-pharma-blue-dark text-white rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-4">¡Hola, {user.name}!</h1>
        <p className="text-xl opacity-90">
          Descubre nuestros productos farmacéuticos y ofertas especiales
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <Package className="w-12 h-12 text-pharma-blue mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Catálogo Completo</h3>
            <p className="text-gray-600 mb-4">Explora más de 10,000 productos</p>
            <Link to="/products">
              <Button className="bg-pharma-blue hover:bg-pharma-blue-dark">
                Ver Productos
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <ShoppingCart className="w-12 h-12 text-pharma-green mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Ofertas Especiales</h3>
            <p className="text-gray-600 mb-4">Descuentos hasta 30% en productos seleccionados</p>
            <Link to="/offers">
              <Button className="bg-pharma-green hover:bg-pharma-green-dark">
                Ver Ofertas
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <Users className="w-12 h-12 text-pharma-blue mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Consulta Farmacéutica</h3>
            <p className="text-gray-600 mb-4">Recibe asesoría profesional</p>
            <Link to="/contact">
              <Button variant="outline" className="border-pharma-blue text-pharma-blue hover:bg-pharma-blue hover:text-white">
                Contactar
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6 text-pharma-blue">Productos Destacados</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Home;
