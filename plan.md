# Plano de Implementação de Backend com Xano 2.0

Este documento descreve o plano passo a passo para configurar um backend no Xano, incluindo a estruturação do banco de dados, autenticação de usuário, segurança da API e diretrizes de integração com o frontend.

---

### 1. Estrutura do Banco de Dados (PostgreSQL no Xano)

O primeiro passo é definir e configurar as tabelas necessárias no banco de dados do Xano.

**Tabelas a Remover:**
- `log_de_eventos`
- `conversa_do_agente`
- `mensagem_do_agente`
- `conta`

**Tabela `usuario` (Adaptar):**
- **id**: UUID (Primary Key)
- **criado_em**: DateTime
- **nome**: Texto
- **email**: Email (Índice único)
- **senha**: Senha (Hash)
- **ultimo_login**: DateTime (Opcional)

**Tabela `prompt` (Criar):**
- **id**: UUID (Primary Key)
- **criado_em**: DateTime
- **usuario_id**: Referência à tabela `usuario` (Chave Estrangeira)
- **titulo**: Texto
- **descricao**: Texto (Opcional)
- **conteudo**: Texto
- **categoria**: Texto (Opcional)
- **tags**: JSON (Array de Textos)
- **template**: Boolean (Default: `false`)
- **publico**: Boolean (Default: `false`)

**Relacionamento:**
- Um `usuario` pode ter múltiplos `prompts` (One-to-Many).

---

### 2. Configuração da Autenticação de Usuário

Após a estruturação do banco de dados, o próximo passo é habilitar o sistema de autenticação nativo do Xano.

1.  **Habilitar Autenticação:**
    - Na tabela `usuario`, acesse `Settings` (...) e ative a opção `Authentication`.
    - Mapeie a autenticação para os campos `email` e `senha`.

2.  **Endpoints Gerados Automaticamente:**
    - O Xano criará automaticamente os seguintes endpoints de API:
      - `POST /auth/signup`: Para registrar novos usuários.
      - `POST /auth/login`: Para autenticar usuários existentes e retornar um `authToken`.
      - `GET /auth/me`: Para retornar as informações do usuário logado (requer autenticação).

---

### 3. Proteção dos Endpoints da API (`prompt`)

Para garantir a segurança e a propriedade dos dados, todos os endpoints da API relacionados a `prompt` devem ser protegidos.

1.  **Exigir Autenticação:**
    - Em todos os endpoints da API `prompt` (`GET`, `POST`, `PUT`, `DELETE`), acesse as `Settings` do endpoint e defina a autenticação como obrigatória, vinculando-a à tabela `usuario`.

2.  **Lógica de Propriedade:**
    - **Criar (`POST /prompt`):** Na lógica do endpoint (Function Stack), o campo `usuario_id` do novo registro deve ser preenchido com o ID do usuário autenticado (`auth.id`).
    - **Listar (`GET /prompt`):** A query que busca os registros (`Query All Records`) deve ser filtrada para retornar apenas os prompts onde `prompt.usuario_id` é igual a `auth.id`.
    - **Detalhe, Atualização e Deleção (`GET`, `PUT`, `DELETE` /prompt/{id}):** A query que busca o registro específico deve ter uma condição dupla: o `id` do prompt deve corresponder ao da URL **E** o `prompt.usuario_id` deve ser igual ao `auth.id`.

---

### 4. Implementação do Lado do Cliente (Frontend)

O frontend deve ser atualizado para se comunicar com o backend Xano e gerenciar o fluxo de autenticação.

1.  **Fluxo de Autenticação:**
    - Chame `POST /auth/signup` ou `POST /auth/login` para registrar/logar o usuário.
    - Na resposta, extraia o `authToken`.

2.  **Gerenciamento do Token:**
    - Armazene o `authToken` de forma segura no cliente (ex: `localStorage`, `sessionStorage` ou armazenamento seguro móvel).

3.  **Requisições Autenticadas:**
    - Para todas as chamadas a endpoints protegidos, inclua o token no cabeçalho da requisição:
      ```
      Authorization: Bearer <seu_token_aqui>
      ```

4.  **Logout:**
    - Implemente a função de logout removendo o `authToken` do armazenamento local do cliente.
