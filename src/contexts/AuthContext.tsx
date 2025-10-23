import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, AuthContextType } from "@/types";
import { mockUsers } from "@/data/mockData";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, senha: string): Promise<boolean> => {
    const foundUser = mockUsers.find((u) => u.email === email);
    if (foundUser && senha) {
      const updatedUser = { ...foundUser, ultimo_login: new Date().toISOString() };
      setUser(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      return true;
    }
    return false;
  };

  const register = async (email: string, senha: string, nome: string): Promise<boolean> => {
    if (!email || !senha || !nome) return false;
    
    const newUser: User = {
      id: String(mockUsers.length + 1),
      email,
      nome,
      data_criacao: new Date().toISOString(),
      ultimo_login: new Date().toISOString(),
    };
    
    mockUsers.push(newUser);
    setUser(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  const updateProfile = (nome: string) => {
    if (user) {
      const updatedUser = { ...user, nome };
      setUser(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
