
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { usePermissions } from '../../hooks/usePermissions';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { ShoppingCart, User, LogOut, Settings, Package } from 'lucide-react';
import { ROUTES, ROUTE_LABELS } from '../../constants/routes';
import { PERMISSIONS } from '../../constants/roles';
import { APP_CONFIG } from '../../constants/app';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const { hasPermission, isClient, isAdmin, isCashier } = usePermissions();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME);
  };

  const getUserInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <Link to={ROUTES.HOME} className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-pharma-blue rounded-full flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-pharma-blue">
                {APP_CONFIG.NAME}
              </span>
            </Link>
          </div>

          {/* Navigation and User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Cart Icon (only for clients) */}
                {isClient && hasPermission(PERMISSIONS.VIEW_ORDERS) && (
                  <Link to={ROUTES.CART} className="relative">
                    <Button variant="ghost" size="sm">
                      <ShoppingCart className="w-5 h-5" />
                      {itemCount > 0 && (
                        <Badge 
                          variant="destructive" 
                          className="absolute -top-2 -right-2 px-2 py-1 text-xs"
                        >
                          {itemCount > 99 ? '99+' : itemCount}
                        </Badge>
                      )}
                    </Button>
                  </Link>
                )}

                {/* User Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-pharma-blue text-white text-sm">
                          {getUserInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                        <Badge variant="outline" className="w-fit text-xs mt-1">
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </Badge>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    
                    {/* Client Options */}
                    {isClient && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link to={ROUTES.PRODUCTS} className="cursor-pointer">
                            <Package className="mr-2 h-4 w-4" />
                            {ROUTE_LABELS[ROUTES.PRODUCTS]}
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to={ROUTES.ORDERS} className="cursor-pointer">
                            <Settings className="mr-2 h-4 w-4" />
                            {ROUTE_LABELS[ROUTES.ORDERS]}
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}

                    {/* Admin Options */}
                    {isAdmin && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link to={ROUTES.ADMIN} className="cursor-pointer">
                            <Settings className="mr-2 h-4 w-4" />
                            {ROUTE_LABELS[ROUTES.ADMIN]}
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}

                    {/* Cashier Options */}
                    {isCashier && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link to={ROUTES.CASHIER} className="cursor-pointer">
                            <Settings className="mr-2 h-4 w-4" />
                            {ROUTE_LABELS[ROUTES.CASHIER]}
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}

                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="cursor-pointer text-red-600"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Cerrar sesión
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                {/* Guest Actions */}
                <Button variant="ghost" asChild>
                  <Link to={ROUTES.LOGIN}>
                    {ROUTE_LABELS[ROUTES.LOGIN]}
                  </Link>
                </Button>
                <Button asChild>
                  <Link to={ROUTES.REGISTER}>
                    {ROUTE_LABELS[ROUTES.REGISTER]}
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
