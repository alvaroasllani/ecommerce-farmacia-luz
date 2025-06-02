import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Eye, EyeOff, Star, Shield, CheckCircle } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        toast({
          title: "¡Bienvenido a Farmacia LUZ! 🎉",
          description: "Has iniciado sesión correctamente.",
        });
        navigate('/');
      } else {
        toast({
          title: "Error de autenticación",
          description: "Email o contraseña incorrectos. Verifica tus datos.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Ha ocurrido un error inesperado. Intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const quickLogin = (testEmail: string) => {
    setEmail(testEmail);
    setPassword('123456');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pharma-blue via-pharma-blue-dark to-blue-900 p-4">
      <div className="w-full max-w-md">
        {/* Logo and Branding */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="w-20 h-20 bg-gradient-to-br from-white to-gray-100 rounded-2xl flex items-center justify-center shadow-2xl mb-4">
              <div className="flex items-center justify-center">
                <span className="text-pharma-blue font-black text-3xl">L</span>
                <div className="w-3 h-3 bg-pharma-green rounded-full ml-1"></div>
              </div>
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-pharma-green rounded-full flex items-center justify-center">
              <Star size={14} className="text-white fill-current" />
            </div>
          </div>
          <h1 className="text-3xl font-black text-white mb-2">Farmacia LUZ</h1>
          <p className="text-white/80">Tu salud, nuestra prioridad</p>
        </div>

        <Card className="shadow-2xl border-0 backdrop-blur-sm bg-white/95">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-pharma-blue mb-2">
              Iniciar Sesión
            </CardTitle>
            <p className="text-gray-600">
              Accede a tu cuenta para disfrutar de todos nuestros servicios
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                  Correo Electrónico
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="h-12 border-2 border-gray-200 focus:border-pharma-blue rounded-xl"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                  Contraseña
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Tu contraseña"
                    className="h-12 border-2 border-gray-200 focus:border-pharma-blue rounded-xl pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-pharma-blue"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-to-r from-pharma-blue to-pharma-blue-dark hover:from-pharma-blue-dark hover:to-pharma-blue text-white font-bold rounded-xl shadow-lg transform hover:scale-[1.02] transition-all"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Iniciando sesión...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Iniciar Sesión
                  </div>
                )}
              </Button>
            </form>
            
            {/* Quick Login Options */}
            <div className="bg-gradient-to-r from-pharma-green/10 to-pharma-blue/10 rounded-xl p-4">
              <p className="text-sm font-semibold text-pharma-blue mb-3 text-center">
                🚀 Acceso rápido - Cuentas de prueba
              </p>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => quickLogin('cliente@farmacia.com')}
                  className="text-xs border-pharma-blue text-pharma-blue hover:bg-pharma-blue hover:text-white"
                >
                  Cliente
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => quickLogin('cajero@farmacia.com')}
                  className="text-xs border-pharma-green text-pharma-green hover:bg-pharma-green hover:text-white"
                >
                  Cajero
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => quickLogin('admin@farmacia.com')}
                  className="text-xs border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white"
                >
                  Admin
                </Button>
              </div>
              <p className="text-xs text-gray-500 text-center mt-2">
                Contraseña para todas: <strong>123456</strong>
              </p>
            </div>
            
            {/* Security Features */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center text-pharma-green">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Conexión 100% segura y encriptada</span>
              </div>
              <div className="flex items-center text-pharma-green">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Protección de datos personales garantizada</span>
              </div>
            </div>
            
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-3">
                ¿No tienes una cuenta?
              </p>
              <Link to="/register">
                <Button 
                  variant="outline" 
                  className="bg-white border-2 border-pharma-green text-pharma-green hover:bg-pharma-green hover:text-white font-semibold px-8 rounded-full transform hover:scale-105 transition-all"
                >
                  Registrarse Gratis
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        {/* Footer */}
        <div className="text-center mt-6 text-white/80">
          <p className="text-sm">
            © 2024 Farmacia LUZ - Más de 15 años cuidando tu salud
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
