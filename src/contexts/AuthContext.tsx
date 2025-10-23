import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, AuthContextType } from "@/types";
import { supabase } from "@/lib/supabase";
import type { AuthError, User as SupabaseUser } from "@supabase/supabase-js";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Verificar sessão ativa do Supabase
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await loadUserProfile(session.user.id);
      }
    };

    getSession();

    // Escutar mudanças na autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          await loadUserProfile(session.user.id);
        } else {
          setUser(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const loadUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('usuario')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      if (data) {
        setUser(data);
      }
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
    }
  };

  const login = async (email: string, senha: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: senha,
      });

      if (error) throw error;
      
      // Atualizar último login
      if (data.user) {
        await supabase
          .from('usuario')
          .update({ ultimo_login: new Date().toISOString() })
          .eq('id', data.user.id);
      }

      return true;
    } catch (error) {
      console.error('Erro no login:', error);
      return false;
    }
  };

  const register = async (email: string, senha: string, nome: string): Promise<boolean> => {
    try {
      // Criar usuário no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password: senha,
      });

      if (authError) throw authError;

      if (authData.user) {
        // Criar perfil do usuário na tabela usuario
        const { error: profileError } = await supabase
          .from('usuario')
          .insert({
            id: authData.user.id,
            email,
            nome,
            data_criacao: new Date().toISOString(),
            ultimo_login: new Date().toISOString(),
          });

        if (profileError) throw profileError;
      }

      return true;
    } catch (error) {
      console.error('Erro no registro:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  };

  const updateProfile = async (nome: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('usuario')
        .update({ nome })
        .eq('id', user.id);

      if (error) throw error;

      // Atualizar estado local
      const updatedUser = { ...user, nome };
      setUser(updatedUser);
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
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
