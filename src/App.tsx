
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import Layout from "./components/Layout/Layout";
import { ROUTES } from "./constants/routes";
import { ROLES } from "./constants/roles";

// Pages
import BusinessSetup from "./pages/BusinessSetup";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode; roles?: string[] }> = ({ 
  children, 
  roles = [] 
}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pharma-blue"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <>{children}</>;
};

// Public Route Component (redirect if logged in)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pharma-blue"></div>
      </div>
    );
  }

  if (user) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Layout>
      <Routes>
        {/* Setup Route */}
        <Route path={ROUTES.SETUP} element={<BusinessSetup />} />
        
        {/* Public Routes */}
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route 
          path={ROUTES.LOGIN} 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        <Route 
          path={ROUTES.REGISTER} 
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } 
        />

        {/* Cliente Routes */}
        <Route 
          path={ROUTES.PRODUCTS} 
          element={
            <ProtectedRoute roles={[ROLES.CLIENTE]}>
              <Products />
            </ProtectedRoute>
          } 
        />
        <Route 
          path={ROUTES.CART} 
          element={
            <ProtectedRoute roles={[ROLES.CLIENTE]}>
              <Cart />
            </ProtectedRoute>
          } 
        />
        <Route 
          path={ROUTES.CHECKOUT} 
          element={
            <ProtectedRoute roles={[ROLES.CLIENTE]}>
              <Checkout />
            </ProtectedRoute>
          } 
        />
        <Route 
          path={ROUTES.PROFILE} 
          element={
            <ProtectedRoute roles={[ROLES.CLIENTE]}>
              <Profile />
            </ProtectedRoute>
          } 
        />
        <Route 
          path={ROUTES.ORDERS} 
          element={
            <ProtectedRoute roles={[ROLES.CLIENTE]}>
              <Orders />
            </ProtectedRoute>
          } 
        />

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <AppRoutes />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
