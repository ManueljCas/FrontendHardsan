import React, { createContext, useContext, useState, useEffect } from "react";
import { UserType, AuthContextType } from "../interfaces/AuthInterfaces"; // ✅ Importar interfaces

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    // ✅ Recuperar usuario del localStorage al cargar la app
    const storedUser = localStorage.getItem("userName");
    const storedUserId = localStorage.getItem("userId");
    const storedUserRole = localStorage.getItem("role");
    const storedToken = localStorage.getItem("token"); // ✅ Recuperar token

    if (storedUser && storedUserId && storedUserRole && storedToken) {
      setUser({
        id: storedUserId,
        name: storedUser,
        role: storedUserRole,
        token: storedToken,
      });
    }
  }, []);

  // ✅ Función para iniciar sesión y guardar datos en localStorage
  const login = (userData: UserType) => {
    localStorage.setItem("userId", userData.id);
    localStorage.setItem("userName", userData.name);
    localStorage.setItem("role", userData.role);
    localStorage.setItem("token", userData.token);
    
    setUser(userData);
  };

  // ✅ Función para cerrar sesión y limpiar datos
  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de un AuthProvider");
  return context;
};
