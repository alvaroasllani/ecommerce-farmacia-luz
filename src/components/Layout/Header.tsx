
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { ShoppingCart, User, LogOut } from 'lucide-react';

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
          <div className="flex items-center space-x-4">
            <Link 
              to="/cart" 
              className="relative p-2 text-white hover:text-pharma-blue-light transition-colors"
            >
              <ShoppingCart size={24} />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-pharma-green text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>
            <Link 
              to="/profile" 
              className="p-2 text-white hover:text-pharma-blue-light transition-colors"
            >
              <User size={24} />
            </Link>
            <button 
              onClick={handleLogout}
              className="p-2 text-white hover:text-pharma-blue-light transition-colors"
            >
              <LogOut size={24} />
            </button>
          </div>
        );
      case 'cajero':
      case 'administrador':
        return (
          <div className="flex items-center space-x-4">
            <span className="text-white font-medium">{user.name}</span>
            <button 
              onClick={handleLogout}
              className="p-2 text-white hover:text-pharma-blue-light transition-colors"
            >
              <LogOut size={24} />
            </button>
          </div>
        );
      default:
        return (
          <div className="flex items-center space-x-4">
            <Link 
              to="/login" 
              className="text-white hover:text-pharma-blue-light transition-colors px-4 py-2"
            >
              Iniciar Sesión
            </Link>
            <Link 
              to="/register" 
              className="bg-white text-pharma-blue px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              Registrarse
            </Link>
          </div>
        );
    }
  };

  return (
    <header className="bg-pharma-blue shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-pharma-blue font-bold text-xl">+</span>
            </div>
            <h1 className="text-2xl font-bold text-white">FarmaPlus</h1>
          </Link>
          
          {getHeaderContent()}
        </div>
      </div>
    </header>
  );
};

export default Header;
