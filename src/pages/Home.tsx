
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { mockProducts } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ShoppingCart, Package, Users, BarChart } from 'lucide-react';

const Home: React.FC = () => {
  const { user } = useAuth();

  const featuredProducts = mockProducts.slice(0, 4);

  const handleViewDetails = (product: any) => {
    // Navigate to product details - to be implemented
    console.log('Ver detalles del producto:', product);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pharma-blue to-pharma-blue-dark">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center text-white mb-16">
            <h1 className="text-5xl font-bold mb-6">Bienvenido a FarmaPlus</h1>
            <p className="text-xl mb-8 opacity-90">
              Tu farmacia de confianza con más de 10,000 productos farmacéuticos
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/login">
                <Button className="bg-white text-pharma-blue hover:bg-gray-100 px-8 py-3 text-lg">
                  Iniciar Sesión
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-pharma-blue px-8 py-3 text-lg">
                  Registrarse
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center">
              <CardContent className="p-6">
                <Package className="w-12 h-12 text-pharma-blue mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Amplio Catálogo</h3>
                <p className="text-gray-600">Más de 10,000 productos farmacéuticos disponibles</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <ShoppingCart className="w-12 h-12 text-pharma-green mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Compra Fácil</h3>
                <p className="text-gray-600">Sistema de carrito intuitivo y proceso de compra rápido</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Users className="w-12 h-12 text-pharma-blue mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Atención Profesional</h3>
                <p className="text-gray-600">Personal farmacéutico capacitado a tu servicio</p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white rounded-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-pharma-blue">
              Productos Destacados
            </h2>
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
        </div>
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
            <Button className="bg-pharma-green hover:bg-pharma-green-dark">
              Ver Ofertas
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <Users className="w-12 h-12 text-pharma-blue mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Consulta Farmacéutica</h3>
            <p className="text-gray-600 mb-4">Recibe asesoría profesional</p>
            <Button variant="outline" className="border-pharma-blue text-pharma-blue hover:bg-pharma-blue hover:text-white">
              Contactar
            </Button>
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
    </div>
  );
};

export default Home;
