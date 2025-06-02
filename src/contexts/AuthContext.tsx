
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType } from '../types';
import { mockUsers } from '../data/mockData';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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

  useEffect(() => {
    // Simular carga inicial de autenticación
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Simular autenticación
    const foundUser = mockUsers.find(u => u.email === email);
    
    if (foundUser && password === '123456') {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  const register = async (userData: Partial<User>): Promise<boolean> => {
    setLoading(true);
    
    // Simular registro
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email!,
      name: userData.name!,
      role: 'cliente',
      phone: userData.phone,
      address: userData.address,
      createdAt: new Date()
    };
    
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    setLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
