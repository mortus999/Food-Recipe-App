
// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

// Create the context
const AuthContext = createContext();

// Hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap around components that need access to the context
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
