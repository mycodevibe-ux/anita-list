'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  updateUser: (userData: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const checkAuth = async () => {
    setLoading(true);
    if (typeof window === 'undefined') {
      setLoading(false);
      return;
    }
    const token = localStorage.getItem('auth_token');
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      // API call will automatically include the Bearer token via interceptor
      const response = await api.get('/user');
      setUser(response.data);
    } catch (error) {
      console.error("Auth check failed", error);
      localStorage.removeItem('auth_token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = (token: string, userData: User) => {
    localStorage.setItem('auth_token', token);
    setUser(userData);
  };

  const logout = async () => {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error("Logout failed on server, clearing locally", error);
    } finally {
      localStorage.removeItem('auth_token');
      setUser(null);
      router.push('/');
    }
  };

  const updateUser = (userData: User) => {
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, checkAuth, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
