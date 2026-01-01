import React, { createContext, useState, useContext, useRef } from "react";
import type { ReactNode } from "react";
import type { User } from "../types/user";
import { userService } from "../services/user.service";

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );

  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

 
  const loggedOutRef = useRef(false);

  const login = (jwt: string, loggedUser: User) => {
    loggedOutRef.current = false; 
    setToken(jwt);
    setUser(loggedUser);
    localStorage.setItem("token", jwt);
    localStorage.setItem("user", JSON.stringify(loggedUser));
  };

  const logout = () => {
    loggedOutRef.current = true; 
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const refreshUser = async () => {
    if (!user || loggedOutRef.current) return;

    try {
      const updatedUser = await userService.getById(user.id);

      if (!loggedOutRef.current) {
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error("Error refreshing user", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
