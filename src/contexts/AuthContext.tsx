
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, AuthContextType } from '../types';
import { mockUsers } from '../data/mockData';
import { authService } from '../services/auth.service';
import { validateEmail, validatePassword } from '../utils/validators';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '../constants/app';
import { useToast } from '../components/ui/use-toast';

// Enhanced AuthContext type with better error handling
interface EnhancedAuthContextType extends AuthContextType {
  errors: Record<string, string>;
  clearErrors: () => void;
  isAuthenticating: boolean;
}

const AuthContext = createContext<EnhancedAuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  // Clear errors helper
  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const savedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        
        if (savedUser && token) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error);
        // Clear corrupted data
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsAuthenticating(true);
    clearErrors();
    
    // Client-side validation
    const validationErrors: Record<string, string> = {};
    
    if (!validateEmail(email)) {
      validationErrors.email = 'Formato de email inválido';
    }
    
    if (!password.trim()) {
      validationErrors.password = 'La contraseña es requerida';
    }
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsAuthenticating(false);
      return false;
    }

    try {
      // For now, use mock authentication
      // TODO: Replace with real API call when backend is ready
      // const response = await authService.login({ email, password });
      
      // Mock authentication logic
      const foundUser = mockUsers.find(u => u.email === email);
      
      if (foundUser && password === '123456') {
        setUser(foundUser);
        localStorage.setItem('user', JSON.stringify(foundUser));
        localStorage.setItem('token', 'mock-token-' + Date.now());
        
        toast({
          title: "Éxito",
          description: SUCCESS_MESSAGES.LOGIN_SUCCESS,
        });
        
        return true;
      } else {
        setErrors({ 
          general: 'Credenciales inválidas. Use password: 123456' 
        });
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ 
        general: ERROR_MESSAGES.NETWORK_ERROR 
      });
      return false;
    } finally {
      setIsAuthenticating(false);
    }
  };

  const register = async (userData: Partial<User>): Promise<boolean> => {
    setIsAuthenticating(true);
    clearErrors();
    
    // Client-side validation
    const validationErrors: Record<string, string> = {};
    
    if (!userData.name?.trim()) {
      validationErrors.name = 'El nombre es requerido';
    }
    
    if (!validateEmail(userData.email || '')) {
      validationErrors.email = 'Formato de email inválido';
    }
    
    if (userData.password) {
      const passwordValidation = validatePassword(userData.password);
      if (!passwordValidation.isValid) {
        validationErrors.password = passwordValidation.errors[0];
      }
    }
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsAuthenticating(false);
      return false;
    }

    try {
      // For now, use mock registration
      // TODO: Replace with real API call when backend is ready
      // const response = await authService.register(userData);
      
      // Mock registration logic
      const newUser: User = {
        id: `user_${Date.now()}`,
        email: userData.email || '',
        name: userData.name || '',
        role: 'cliente',
        phone: userData.phone,
        address: userData.address,
        createdAt: new Date(),
      };

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('token', 'mock-token-' + Date.now());
      
      toast({
        title: "Éxito",
        description: SUCCESS_MESSAGES.REGISTER_SUCCESS,
      });
      
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ 
        general: ERROR_MESSAGES.NETWORK_ERROR 
      });
      return false;
    } finally {
      setIsAuthenticating(false);
    }
  };

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    clearErrors();
    
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión exitosamente",
    });
  }, [toast]);

  const updateProfile = useCallback(async (userData: Partial<User>): Promise<boolean> => {
    if (!user) return false;

    try {
      setIsAuthenticating(true);
      clearErrors();

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));

      toast({
        title: "Perfil actualizado",
        description: "Tu información ha sido actualizada exitosamente",
      });

      return true;
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        general: 'Error al actualizar el perfil'
      }));
      
      toast({
        title: "Error al actualizar perfil",
        description: "No se pudo actualizar tu información",
        variant: "destructive",
      });
      
      return false;
    } finally {
      setIsAuthenticating(false);
    }
  }, [user, toast, clearErrors]);

  const value: EnhancedAuthContextType = {
    user,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticating,
    errors,
    clearErrors,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
