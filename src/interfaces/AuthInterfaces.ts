export interface UserType {
    id: string;
    name: string;
    role: string;
    token: string; 
  }
  
  export interface AuthContextType {
    user: UserType | null;
    login: (userData: UserType) => void;
    logout: () => void;
  }
  