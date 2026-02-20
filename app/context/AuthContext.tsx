import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
} from "react";
import { User, AuthState } from "../types";
import { useLoginMutation } from "@/redux/services/authApi";
import { jwtDecode } from "jwt-decode";

import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextType {
  authState: AuthState;
  login: (phone: string) => Promise<void>;
  verifyOtp: (otp: string) => Promise<void>;
  logout: () => void;
  updateProfile: (user: Partial<User>) => void;
}

type JwtPayload = {
  _id: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
  });

  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const [loginApi] = useLoginMutation();

  // STEP 1: Save phone number
  const login = async (phone: string): Promise<void> => {
    setPhoneNumber(phone);
  };

  // STEP 2: Verify OTP & login
  const verifyOtp = async (otp: string): Promise<void> => {
    console.log("🔐 verifyOtp() CALLED with otp:", otp);

    try {
      setAuthState((prev) => ({ ...prev, isLoading: true }));

      const response = await loginApi({ phoneNumber }).unwrap();

      console.log("✅ LOGIN API RESPONSE:", response);

      const { accessToken } = response.data;

      // 🔐 Save token
      await AsyncStorage.setItem("accessToken", accessToken);

      // 🔓 Decode token to get user id
      const decoded = jwtDecode<JwtPayload>(accessToken);
      console.log("🔓 DECODED TOKEN:", decoded);

      const user: User = {
        id: decoded._id,     // ✅ Mongo user id
        phone: phoneNumber,
        name: "",
        email: "",
        address: "",
      };

      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });

      console.log("✅ AUTH STATE SET — USER LOGGED IN");
    } catch (error) {
      console.log("❌ verifyOtp ERROR:", error);
      setAuthState((prev) => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("accessToken");

    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const updateProfile = (userData: Partial<User>) => {
    if (authState.user) {
      setAuthState((prev) => ({
        ...prev,
        user: { ...prev.user!, ...userData },
      }));
    }
  };

  return (
    <AuthContext.Provider
      value={{ authState, login, verifyOtp, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
