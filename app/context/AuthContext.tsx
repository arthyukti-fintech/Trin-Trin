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

  const [sentOtp, setSentOtp] = useState<string>("");

  const login = async (phone: string): Promise<void> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));

    return new Promise((resolve) => {
      setTimeout(() => {
        const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
        console.log("OTP sent to:", phone, "OTP:", generatedOtp);
        setSentOtp(generatedOtp); // save OTP for verification
        setAuthState(prev => ({ ...prev, isLoading: false }));
        resolve();
      }, 1000);
    });
  };

  const verifyOtp = async (otp: string): Promise<void> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (otp === sentOtp) { // check against the generated OTP
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
          resolve();
        } else {
          setAuthState(prev => ({ ...prev, isLoading: false }));
          reject(new Error("Invalid OTP"));
        }
      }, 1000);
    });
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