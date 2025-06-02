
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Home, 
  Package, 
  ShoppingCart, 
  User, 
  FileText,
  Settings,
  Users,
  BarChart
} from 'lucide-react';

const Navigation: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const getNavigationItems = () => {
    switch (user.role) {
      case 'cliente':
        return [
          { path: '/', label: 'Inicio', icon: Home },
          { path: '/products', label: 'Productos', icon: Package },
          { path: '/cart', label: 'Carrito', icon: ShoppingCart },
          { path: '/orders', label: 'Mis Pedidos', icon: FileText },
          { path: '/profile', label: 'Mi Perfil', icon: User }
        ];
      case 'cajero':
        return [
          { path: '/cashier', label: 'Panel de Ventas', icon: Home },
          { path: '/cashier/orders', label: 'Pedidos', icon: FileText }
        ];
      case 'administrador':
        return [
          { path: '/admin', label: 'Dashboard', icon: BarChart },
          { path: '/admin/products', label: 'Productos', icon: Package },
          { path: '/admin/orders', label: 'Pedidos', icon: FileText },
          { path: '/admin/users', label: 'Usuarios', icon: Users },
          { path: '/admin/profile', label: 'Mi Perfil', icon: User }
        ];
      default:
        return [];
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex space-x-8 overflow-x-auto">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors ${
                  isActive
                    ? 'border-pharma-blue text-pharma-blue'
                    : 'border-transparent text-gray-600 hover:text-pharma-blue hover:border-pharma-blue-light'
                }`}
              >
                <Icon size={20} />
                <span className="whitespace-nowrap">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
