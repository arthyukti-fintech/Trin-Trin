import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, AuthState } from '../types/index';

interface AuthContextType {
  authState: AuthState;
  login: (phone: string) => Promise<void>;
  verifyOtp: (otp: string) => Promise<void>;
  logout: () => void;
  updateProfile: (user: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false
  });

  const login = async (phone: string): Promise<void> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Mock API call
    setTimeout(() => {
      // In real app, send OTP to phone
      console.log('OTP sent to:', phone);
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }, 1000);
  };

  const verifyOtp = async (otp: string): Promise<void> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Mock verification
    setTimeout(() => {
      if (otp === '123456') { // Mock OTP
        const mockUser: User = {
          id: '1',
          phone: '+1234567890',
          name: 'John Doe',
          email: 'john@example.com',
          address: '123 Main St'
        };
        
        setAuthState({
          user: mockUser,
          isAuthenticated: true,
          isLoading: false
        });
      } else {
        setAuthState(prev => ({ ...prev, isLoading: false }));
        throw new Error('Invalid OTP');
      }
    }, 1000);
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
  };

  const updateProfile = (userData: Partial<User>) => {
    if (authState.user) {
      setAuthState(prev => ({
        ...prev,
        user: { ...prev.user!, ...userData }
      }));
    }
  };

  return (
    <AuthContext.Provider value={{ authState, login, verifyOtp, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};