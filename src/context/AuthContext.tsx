import React, { createContext, useContext, useState, useEffect } from "react";
import { UserType, AuthContextType } from "../interfaces/AuthInterfaces";

// Extendemos la interfaz para incluir `isLoading`
interface AuthContextWithLoading extends AuthContextType {
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextWithLoading | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("userName");
      const storedUserId = localStorage.getItem("userId");
      const storedUserRole = localStorage.getItem("role");
      const storedToken = localStorage.getItem("token");

      if (storedUser && storedUserId && storedUserRole && storedToken) {
        setUser({
          id: storedUserId,
          name: storedUser,
          role: storedUserRole,
          token: storedToken,
        });
      }

      setIsLoading(false); // ya terminó de cargar
    }
  }, []);

  const login = (userData: UserType) => {
    localStorage.setItem("userId", userData.id);
    localStorage.setItem("userName", userData.name);
    localStorage.setItem("role", userData.role);
    localStorage.setItem("token", userData.token);

    setUser(userData);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de un AuthProvider");
  return context;
};
