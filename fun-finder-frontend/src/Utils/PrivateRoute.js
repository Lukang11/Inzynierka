import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { isUserAuthenticated } from './Auth';

const PrivateRoute = ({ children, ...props }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const isAuthenticated = await isUserAuthenticated();
      setAuthenticated(isAuthenticated);
      setLoading(false);
    };

    checkAuthentication();
  }, []);

  if (loading) {
    return null;
  }

  return authenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;