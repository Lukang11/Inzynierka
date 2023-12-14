import React, { createContext, useContext, useEffect, useState } from 'react';
import { isUserAuthenticated } from './Auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({ isLoggedIn: null, user: null });

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const { isAuthenticated, user } = await isUserAuthenticated();
        setAuthData({ isLoggedIn: isAuthenticated, user: user });
      } catch (error) {
        console.error('Błąd weryfikacji tokenu:', error);
        setAuthData({ isLoggedIn: false, user: null });
      }
    };
  
    checkAuthentication();
  }, []);

  const login = (userData) => {
    setAuthData({ isLoggedIn: true, user: userData });
  };

  const logout = () => {
    setAuthData({ isLoggedIn: false, user: null });
  };

  return (
    <AuthContext.Provider value={{ ...authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth musi być używany z AuthProvider');
  }
  return context;
};
