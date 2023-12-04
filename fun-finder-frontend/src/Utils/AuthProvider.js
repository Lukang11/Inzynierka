import React, { createContext, useContext, useEffect, useState } from 'react';
import { isUserAuthenticated } from './Auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const isAuthenticated = await isUserAuthenticated();
        setIsLoggedIn(isAuthenticated);
      } catch (error) {
        console.error('Błąd weryfikacji tokenu:', error);
        setIsLoggedIn(false);
      }
    };

    checkAuthentication();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
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