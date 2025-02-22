export interface UserType {
    id: string;
    name: string;
    role: string;
    token: string; // ✅ Agregamos token
  }
  
  export interface AuthContextType {
    user: UserType | null;
    login: (userData: UserType) => void;
    logout: () => void;
  }
  