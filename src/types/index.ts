export interface User {
  id: string;
  email: string;
  nome: string;
  data_criacao: string;
  ultimo_login: string;
}

export interface Prompt {
  id: string;
  usuario_id: string;
  titulo: string;
  descricao: string;
  categoria: string;
  tags: string[];
  conteudo: string;
  template: boolean;
  publico: boolean;
  data_criacao: string;
  data_atualizacao: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, senha: string) => Promise<boolean>;
  register: (email: string, senha: string, nome: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (nome: string) => void;
}
