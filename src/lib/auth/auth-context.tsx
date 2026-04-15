"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { apiClient, ApiError } from '../api/client';
import { api } from '../api/endpoints';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'signer';
  avatar?: string;
  createdAt: string;
  lastLoginAt?: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: { name: string; email: string; password: string }) => Promise<void>;
  refreshToken: () => Promise<void>;
  clearError: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

// ─── Context ───────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ─── Auth Provider Component ───────────────────────────────────────────────────

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    error: null,
  });

  // ─── Initialize Auth ─────────────────────────────────────────────────────

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      
      if (!token) {
        setAuthState(prev => ({ ...prev, isLoading: false }));
        return;
      }

      // Validate token and get user info
      const user = await api.auth.getCurrentUser();
      
      setAuthState({
        user,
        isLoading: false,
        isAuthenticated: true,
        error: null,
      });

    } catch (error) {
      console.error('Auth initialization failed:', error);
      
      // Clear invalid tokens
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: null,
      });
    }
  };

  // ─── Auth Methods ─────────────────────────────────────────────────────────

  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await api.auth.login(email, password);
      
      // Store tokens
      localStorage.setItem('auth_token', response.accessToken);
      localStorage.setItem('refresh_token', response.refreshToken);
      
      // Update auth state
      setAuthState({
        user: response.user,
        isLoading: false,
        isAuthenticated: true,
        error: null,
      });

    } catch (error) {
      const errorMessage = error instanceof ApiError ? error.message : 'Login failed';
      
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: errorMessage,
      });
      
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.auth.logout();
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      // Clear tokens and state regardless of API success
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: null,
      });
    }
  };

  const register = async (userData: { name: string; email: string; password: string }) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await api.auth.register(userData);
      
      // Store tokens
      localStorage.setItem('auth_token', response.accessToken);
      localStorage.setItem('refresh_token', response.refreshToken);
      
      // Update auth state
      setAuthState({
        user: response.user,
        isLoading: false,
        isAuthenticated: true,
        error: null,
      });

    } catch (error) {
      const errorMessage = error instanceof ApiError ? error.message : 'Registration failed';
      
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: errorMessage,
      });
      
      throw error;
    }
  };

  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await api.auth.refreshToken(refreshToken);
      
      // Update access token
      localStorage.setItem('auth_token', response.accessToken);
      
    } catch (error) {
      console.error('Token refresh failed:', error);
      
      // Clear tokens and logout
      await logout();
      throw error;
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // This would be implemented in the API
      // const updatedUser = await api.auth.updateProfile(data);
      
      // For now, update local state
      setAuthState(prev => ({
        ...prev,
        user: prev.user ? { ...prev.user, ...data } : null,
        isLoading: false,
      }));

    } catch (error) {
      const errorMessage = error instanceof ApiError ? error.message : 'Profile update failed';
      
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      
      throw error;
    }
  };

  const clearError = () => {
    setAuthState(prev => ({ ...prev, error: null }));
  };

  // ─── Context Value ─────────────────────────────────────────────────────────

  const contextValue: AuthContextType = {
    ...authState,
    login,
    logout,
    register,
    refreshToken,
    clearError,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook for Using Auth Context ─────────────────────────────────────────────

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}

// ─── Auth Guard Component ───────────────────────────────────────────────────

interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
  requireRole?: User['role'];
}

export function AuthGuard({ children, fallback, requireRole }: AuthGuardProps) {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return fallback || (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Authentication Required
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Please log in to access this page.
          </p>
        </div>
      </div>
    );
  }

  if (requireRole && user?.role !== requireRole) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Access Denied
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            You don't have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
