import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { 
  ShoppingCart, 
  User, 
  LogOut, 
  Package, 
  Star, 
  UserCircle, 
  ShoppingBag, 
  Percent, 
  MessageCircle,
  Home
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getHeaderContent = () => {
    switch (user?.role) {
      case 'cliente':
        return (
          <div className="flex items-center space-x-3">
            {/* Cart with badge */}
            <Link 
              to="/cart" 
              className="relative p-2 text-white hover:text-pharma-green transition-colors rounded-lg hover:bg-white/10"
            >
              <ShoppingCart size={24} />
              {getTotalItems() > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-pharma-green text-white text-xs h-6 w-6 flex items-center justify-center p-0 border-2 border-white">
                  {getTotalItems()}
                </Badge>
              )}
            </Link>
            
            {/* User Profile */}
            <Link 
              to="/profile" 
              className="flex items-center space-x-2 text-white hover:text-pharma-green transition-colors p-2 rounded-lg hover:bg-white/10"
            >
              <div className="w-8 h-8 bg-pharma-green rounded-full flex items-center justify-center">
                <User size={18} />
              </div>
              <div className="hidden xl:block">
                <div className="text-sm font-medium">{user.name}</div>
                <div className="text-xs opacity-75">Cliente</div>
              </div>
            </Link>
            
            {/* Logout */}
            <Button 
              onClick={handleLogout}
              size="sm"
              className="bg-red-500 hover:bg-red-600 text-white border-0 shadow-md"
            >
              <LogOut size={16} className="mr-1" />
              <span className="hidden lg:inline">Salir</span>
            </Button>
          </div>
        );
      case 'cajero':
      case 'administrador':
        return (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-white">
              <div className="w-8 h-8 bg-pharma-green rounded-full flex items-center justify-center">
                <User size={18} />
              </div>
              <div className="hidden md:block">
                <div className="text-sm font-medium">{user.name}</div>
                <div className="text-xs opacity-75 capitalize">{user.role}</div>
              </div>
            </div>
            
            <Button 
              onClick={handleLogout}
              size="sm"
              className="bg-red-500 hover:bg-red-600 text-white border-0 shadow-md"
            >
              <LogOut size={16} className="mr-2" />
              <span className="hidden md:inline">Salir</span>
            </Button>
          </div>
        );
      default:
        return (
          <div className="flex items-center space-x-3">
            <Link to="/login">
              <Button 
                className="bg-white text-pharma-blue hover:bg-gray-100 font-medium shadow-md hover:shadow-lg transition-all"
              >
                <UserCircle size={16} className="mr-2" />
                Iniciar Sesión
              </Button>
            </Link>
            <Link to="/register">
              <Button 
                className="bg-pharma-green hover:bg-pharma-green-dark text-white font-semibold px-6 rounded-full shadow-lg transform hover:scale-105 transition-all"
              >
                Registrarse Gratis
              </Button>
            </Link>
          </div>
        );
    }
  };

  return (
    <header className="bg-gradient-to-r from-pharma-blue to-pharma-blue-dark shadow-xl border-b border-pharma-blue-light/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-white to-gray-100 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all transform group-hover:scale-105">
                <div className="flex items-center justify-center">
                  <span className="text-pharma-blue font-black text-xl">L</span>
                  <div className="w-2 h-2 bg-pharma-green rounded-full ml-0.5"></div>
                </div>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-pharma-green rounded-full flex items-center justify-center">
                <Star size={10} className="text-white fill-current" />
              </div>
            </div>
            
            <div>
              <h1 className="text-2xl font-black text-white group-hover:text-pharma-green transition-colors">
                Farmacia LUZ
              </h1>
              <p className="text-xs text-white/80 font-medium">Tu salud, nuestra prioridad</p>
            </div>
          </Link>
          
          {/* Navigation for larger screens */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-white hover:text-pharma-green transition-colors font-medium"
            >
              Inicio
            </Link>
            {!user && (
              <>
                <Link 
                  to="/products" 
                  className="text-white hover:text-pharma-green transition-colors font-medium"
                >
                  Productos
                </Link>
                <Link 
                  to="/offers" 
                  className="text-white hover:text-pharma-green transition-colors font-medium"
                >
                  Ofertas
                </Link>
                <Link 
                  to="/contact" 
                  className="text-white hover:text-pharma-green transition-colors font-medium"
                >
                  Contacto
                </Link>
              </>
            )}
            {user?.role === 'cliente' && (
              <>
                <Link 
                  to="/products" 
                  className="text-white hover:text-pharma-green transition-colors font-medium"
                >
                  Catálogo
                </Link>
                <Link 
                  to="/offers" 
                  className="text-white hover:text-pharma-green transition-colors font-medium"
                >
                  Ofertas
                </Link>
                <Link 
                  to="/orders" 
                  className="text-white hover:text-pharma-green transition-colors font-medium"
                >
                  Mis Pedidos
                </Link>
                <Link 
                  to="/contact" 
                  className="text-white hover:text-pharma-green transition-colors font-medium"
                >
                  Contacto
                </Link>
              </>
            )}
          </nav>
          
          {getHeaderContent()}
        </div>
      </div>
      
      {/* Mobile Navigation - Consolidated */}
      <div className="lg:hidden border-t border-white/10">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center justify-around">
            <Link 
              to="/" 
              className="flex flex-col items-center text-white/80 hover:text-white transition-colors text-xs font-medium"
            >
              <Home size={20} />
              <span className="mt-1">Inicio</span>
            </Link>
            <Link 
              to="/products" 
              className="flex flex-col items-center text-white/80 hover:text-white transition-colors text-xs font-medium"
            >
              <Package size={20} />
              <span className="mt-1">Productos</span>
            </Link>
            <Link 
              to="/offers" 
              className="flex flex-col items-center text-white/80 hover:text-white transition-colors text-xs font-medium"
            >
              <Percent size={20} />
              <span className="mt-1">Ofertas</span>
            </Link>
            {user?.role === 'cliente' && (
              <>
                <Link 
                  to="/orders" 
                  className="flex flex-col items-center text-white/80 hover:text-white transition-colors text-xs font-medium"
                >
                  <ShoppingBag size={20} />
                  <span className="mt-1">Pedidos</span>
                </Link>
                <Link 
                  to="/cart" 
                  className="flex flex-col items-center text-white/80 hover:text-white transition-colors text-xs font-medium relative"
                >
                  <ShoppingCart size={20} />
                  {getTotalItems() > 0 && (
                    <Badge className="absolute -top-1 -right-1 bg-pharma-green text-white text-xs h-5 w-5 flex items-center justify-center p-0 border border-white">
                      {getTotalItems()}
                    </Badge>
                  )}
                  <span className="mt-1">Carrito</span>
                </Link>
              </>
            )}
            <Link 
              to="/contact" 
              className="flex flex-col items-center text-white/80 hover:text-white transition-colors text-xs font-medium"
            >
              <MessageCircle size={20} />
              <span className="mt-1">Contacto</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
