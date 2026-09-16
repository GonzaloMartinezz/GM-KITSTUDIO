import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authAPI } from '../lib/api';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // true mientras chequeamos sesión inicial
  const [authError, setAuthError] = useState('');

  // Auto-login: al montar, intenta recuperar la sesión vía cookie httpOnly
  const loadMe = useCallback(async () => {
    try {
      const { data } = await authAPI.me();
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMe();
  }, [loadMe]);

  const clearError = () => setAuthError('');

  const login = async ({ email, password, rememberMe }) => {
    setAuthError('');
    try {
      const { data } = await authAPI.login({ email, password, rememberMe });
      setUser(data);
      return { ok: true, user: data };
    } catch (err) {
      const message = err.response?.data?.message || 'No se pudo iniciar sesión.';
      setAuthError(message);
      return { ok: false, message };
    }
  };

  const register = async ({ name, email, password, phone, clinicName, address }) => {
    setAuthError('');
    try {
      const { data } = await authAPI.register({ name, email, password, phone, clinicName, address });
      setUser(data);
      return { ok: true, user: data };
    } catch (err) {
      const message = err.response?.data?.message || 'No se pudo crear la cuenta.';
      setAuthError(message);
      return { ok: false, message };
    }
  };

  const googleLogin = async (credential) => {
    setAuthError('');
    try {
      const { data } = await authAPI.google(credential);
      setUser(data);
      return { ok: true, user: data };
    } catch (err) {
      const message = err.response?.data?.message || 'No se pudo iniciar sesión con Google.';
      setAuthError(message);
      return { ok: false, message };
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch {
      // Ignorar: igual limpiamos el estado local
    }
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    loading,
    authError,
    clearError,
    login,
    register,
    googleLogin,
    logout,
    refetchUser: loadMe,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
