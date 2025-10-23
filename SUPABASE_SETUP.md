# 🚀 Configuração do Supabase

## 📋 Passos para Configurar o Banco de Dados

### 1. Criar Projeto no Supabase

1. Acesse [https://supabase.com/](https://supabase.com/)
2. Faça login ou crie uma conta
3. Clique em "New Project"
4. Preencha os dados:
   - **Name**: `craft-copy-conduit`
   - **Database Password**: (escolha uma senha forte)
   - **Region**: escolha a mais próxima
5. Aguarde a criação do projeto (pode levar alguns minutos)

### 2. Configurar Variáveis de Ambiente

1. No painel do Supabase, vá em **Settings** > **API**
2. Copie os valores:
   - **Project URL** (ex: `https://xxxxx.supabase.co`)
   - **anon public** key (ex: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

3. Crie um arquivo `.env` na raiz do projeto:
```bash
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon-aqui
```

### 3. Executar Schema SQL

1. No painel do Supabase, vá em **SQL Editor**
2. Copie todo o conteúdo do arquivo `supabase-schema.sql`
3. Cole no editor e clique em **Run**
4. Verifique se as tabelas foram criadas em **Table Editor**

### 4. Configurar Autenticação

1. No painel do Supabase, vá em **Authentication** > **Settings**
2. Em **Site URL**, adicione: `http://localhost:8080`
3. Em **Redirect URLs**, adicione: `http://localhost:8080/**`
4. Salve as configurações

### 5. Executar Migração dos Dados

```bash
npm run migrate
```

Este comando irá:
- Conectar ao Supabase
- Inserir os dados mock nas tabelas
- Verificar se tudo foi migrado corretamente

### 6. Testar a Aplicação

```bash
npm run dev
```

Acesse `http://localhost:8080` e teste:
- ✅ Cadastro de usuário
- ✅ Login
- ✅ Criação de prompts
- ✅ Edição de prompts
- ✅ Exclusão de prompts

## 🔧 Troubleshooting

### Erro de Conexão
- Verifique se as variáveis de ambiente estão corretas
- Confirme se o projeto Supabase está ativo

### Erro de Autenticação
- Verifique as configurações de URL no Supabase
- Confirme se o RLS está habilitado

### Erro de Migração
- Verifique se as tabelas foram criadas
- Confirme se as permissões estão corretas

## 📊 Estrutura das Tabelas

### Tabela `usuario`
- `id` (UUID, PK)
- `email` (VARCHAR, UNIQUE)
- `nome` (VARCHAR)
- `data_criacao` (TIMESTAMP)
- `ultimo_login` (TIMESTAMP)

### Tabela `prompt`
- `id` (UUID, PK)
- `usuario_id` (UUID, FK)
- `titulo` (VARCHAR)
- `descricao` (TEXT)
- `conteudo` (TEXT)
- `categoria` (VARCHAR)
- `tags` (TEXT[])
- `template` (BOOLEAN)
- `publico` (BOOLEAN)
- `data_criacao` (TIMESTAMP)
- `data_atualizacao` (TIMESTAMP)

## 🔒 Segurança (RLS)

O projeto inclui Row Level Security configurado:
- Usuários só podem ver/editar seus próprios dados
- Prompts públicos são visíveis para todos
- Políticas de segurança automáticas
