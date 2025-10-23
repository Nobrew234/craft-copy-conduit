-- Criação das tabelas para o app de gestão de prompts

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS usuario (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  nome VARCHAR(255) NOT NULL,
  data_criacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ultimo_login TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de prompts
CREATE TABLE IF NOT EXISTS prompt (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  usuario_id UUID NOT NULL REFERENCES usuario(id) ON DELETE CASCADE,
  titulo VARCHAR(255) NOT NULL,
  descricao TEXT,
  conteudo TEXT NOT NULL,
  categoria VARCHAR(100),
  tags TEXT[] DEFAULT '{}',
  template BOOLEAN DEFAULT false,
  publico BOOLEAN DEFAULT false,
  data_criacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  data_atualizacao TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_prompt_usuario_id ON prompt(usuario_id);
CREATE INDEX IF NOT EXISTS idx_prompt_categoria ON prompt(categoria);
CREATE INDEX IF NOT EXISTS idx_prompt_publico ON prompt(publico);
CREATE INDEX IF NOT EXISTS idx_prompt_data_criacao ON prompt(data_criacao);

-- Row Level Security (RLS)
ALTER TABLE usuario ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompt ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança para usuários
CREATE POLICY "Users can view own profile" ON usuario
  FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update own profile" ON usuario
  FOR UPDATE USING (auth.uid()::text = id::text);

-- Políticas de segurança para prompts
CREATE POLICY "Users can view own prompts" ON prompt
  FOR SELECT USING (auth.uid()::text = usuario_id::text);

CREATE POLICY "Users can view public prompts" ON prompt
  FOR SELECT USING (publico = true);

CREATE POLICY "Users can insert own prompts" ON prompt
  FOR INSERT WITH CHECK (auth.uid()::text = usuario_id::text);

CREATE POLICY "Users can update own prompts" ON prompt
  FOR UPDATE USING (auth.uid()::text = usuario_id::text);

CREATE POLICY "Users can delete own prompts" ON prompt
  FOR DELETE USING (auth.uid()::text = usuario_id::text);

-- Função para atualizar data_atualizacao automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.data_atualizacao = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar data_atualizacao
CREATE TRIGGER update_prompt_updated_at 
  BEFORE UPDATE ON prompt 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
