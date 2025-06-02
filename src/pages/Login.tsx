
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from '../hooks/use-toast';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
          title: "¡Bienvenido!",
          description: "Has iniciado sesión correctamente.",
        });
        navigate('/');
      } else {
        toast({
          title: "Error de autenticación",
          description: "Email o contraseña incorrectos.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Ha ocurrido un error inesperado.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pharma-blue to-pharma-blue-dark p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-pharma-blue rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">+</span>
          </div>
          <CardTitle className="text-2xl font-bold text-pharma-blue">FarmaPlus</CardTitle>
          <p className="text-gray-600">Inicia sesión en tu cuenta</p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Tu contraseña"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-pharma-blue hover:bg-pharma-blue-dark"
              disabled={loading}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿No tienes una cuenta?{' '}
              <Link to="/register" className="text-pharma-blue hover:underline">
                Regístrate aquí
              </Link>
            </p>
          </div>
          
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <p className="text-sm font-medium text-gray-700 mb-2">Cuentas de prueba:</p>
            <div className="text-xs text-gray-600 space-y-1">
              <p><strong>Cliente:</strong> cliente@farmacia.com</p>
              <p><strong>Cajero:</strong> cajero@farmacia.com</p>
              <p><strong>Admin:</strong> admin@farmacia.com</p>
              <p><strong>Contraseña:</strong> 123456</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
