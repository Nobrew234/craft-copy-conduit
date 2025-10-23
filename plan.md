# Plano de Integração de Banco de Dados: Supabase e Replit

## Fase 1: Configuração e Setup

1.  **Criar Projeto no Supabase:**
    *   Acessar o [Supabase](https://supabase.com/) e criar um novo projeto.
    *   Guardar a URL da API e a chave `anon` para uso futuro.

2.  **Configurar Variáveis de Ambiente no Replit:**
    *   No Replit, ir para a seção "Secrets".
    *   Criar duas variáveis: `SUPABASE_URL` e `SUPABASE_KEY`.
    *   Inserir os valores obtidos no passo anterior.

3.  **Instalar a Biblioteca do Supabase:**
    *   Executar o comando `npm install @supabase/supabase-js` no terminal do Replit.

## Fase 2: Esquema do Banco de Dados

1.  **Definir o Esquema:**
    *   Com base nos dados mockados, definir as tabelas `usuario` e `prompt`.
    *   Definir os campos e tipos de dados para cada tabela.

2.  **Criar as Tabelas no Supabase:**
    *   Usar o editor de SQL no Supabase para criar as tabelas.
    *   Estabelecer a relação "um para muitos" entre `usuario` e `prompt`.

## Fase 3: Migração de Dados

1.  **Identificar a Fonte de Dados Mockados:**
    *   Localizar os arquivos no projeto que contêm os dados mockados (ex: `src/data/mocks.ts`).

2.  **Criar um Script de Migração:**
    *   Criar um novo arquivo (ex: `src/scripts/migrate.ts`).
    *   O script irá ler os dados mockados e usar o cliente Supabase para inseri-los nas tabelas recém-criadas.

## Fase 4: Integração com a API

1.  **Substituir o Uso de Dados Mockados:**
    *   Refatorar o código para substituir as chamadas aos dados mockados por chamadas à API do Supabase.
    *   Implementar funções para buscar, criar, atualizar e deletar dados.

2.  **Implementar Segurança:**
    *   Garantir que as políticas de segurança (Row Level Security) do Supabase estejam ativadas.
    *   Assegurar que um usuário só possa acessar e modificar seus próprios dados.

## Fase 5: Testes e Validação

1.  **Testar as Operações CRUD:**
    *   Verificar se todas as operações (criar, ler, atualizar, deletar) estão funcionando como esperado.

2.  **Validar a Integridade dos Dados:**
    *   Confirmar que os dados estão sendo armazenados e recuperados corretamente.

3.  **Verificar a Segurança:**
    *   Testar se as políticas de RLS estão impedindo o acesso não autorizado aos dados de outros usuários.

