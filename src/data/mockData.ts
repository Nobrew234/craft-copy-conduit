import { User, Prompt } from "@/types";

export const mockUsers: User[] = [
  {
    id: "1",
    email: "user@example.com",
    nome: "Usuário Demo",
    data_criacao: "2024-01-01T00:00:00Z",
    ultimo_login: new Date().toISOString(),
  },
];

export const mockPrompts: Prompt[] = [
  {
    id: "1",
    usuario_id: "1",
    titulo: "Análise de Dados",
    descricao: "Prompt para análise detalhada de datasets",
    categoria: "Análise",
    tags: ["dados", "analytics", "python"],
    conteudo: "Analise o seguinte dataset e forneça insights sobre:\n- Tendências principais\n- Anomalias\n- Correlações\n- Recomendações",
    template: true,
    publico: false,
    data_criacao: "2024-01-15T10:00:00Z",
    data_atualizacao: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    usuario_id: "1",
    titulo: "Criação de Conteúdo",
    descricao: "Template para criação de posts em redes sociais",
    categoria: "Marketing",
    tags: ["marketing", "social media", "conteúdo"],
    conteudo: "Crie um post engajador sobre [TEMA] que:\n- Capture atenção nos primeiros 3 segundos\n- Inclua call-to-action\n- Use hashtags relevantes\n- Seja otimizado para [PLATAFORMA]",
    template: true,
    publico: true,
    data_criacao: "2024-01-20T14:30:00Z",
    data_atualizacao: "2024-01-20T14:30:00Z",
  },
  {
    id: "3",
    usuario_id: "1",
    titulo: "Code Review",
    descricao: "Prompt para revisão de código",
    categoria: "Desenvolvimento",
    tags: ["code", "review", "qualidade"],
    conteudo: "Revise o código a seguir focando em:\n- Segurança\n- Performance\n- Legibilidade\n- Boas práticas\n- Possíveis bugs\n\nCódigo:\n[COLAR_CÓDIGO]",
    template: false,
    publico: false,
    data_criacao: "2024-02-01T09:15:00Z",
    data_atualizacao: "2024-02-01T09:15:00Z",
  },
];

export const categories = [
  "Análise",
  "Marketing",
  "Desenvolvimento",
  "Educação",
  "Criatividade",
  "Negócios",
  "Outros",
];
