# PRD COMPLETO + FLOWCHART - App de Gestão de Prompts

## 📋 PRODUCT REQUIREMENTS DOCUMENT

### 🎯 Visão Geral
Sistema completo de gerenciamento de prompts com autenticação, CRUD e funcionalidade de cópia rápida. Desenvolvido no Lovable com migração para Xano 2.0.

### ✨ Funcionalidades Principais

#### 1. 🔐 Sistema de Autenticação
- Cadastro com email, senha e nome
- Login/Logout com sessão segura
- Rotas protegidas por autenticação
- Gestão básica de perfil

#### 2. 📝 Gestão Completa de Prompts (CRUD)
- **Criar**: Interface intuitiva para novos prompts
- **Ler**: Visualização com busca e filtros
- **Atualizar**: Edição completa de prompts
- **Excluir**: Remoção segura com confirmação

#### 3. 📋 Copiar com Um Clique
- Botão de copiar visível em todos os prompts
- Feedback visual imediato (toast)
- Formatação preservada na clipboard

#### 4. 🏷️ Organização e Busca
- Sistema de categorias
- Tags múltiplas por prompt
- Busca em tempo real
- Filtros por categoria/tags

## 🔄 FLOWCHART UX COMPLETO

```mermaid
graph TD
    A[🎯 Acesso ao App] --> B{🔄 Usuário Autenticado?}
    
    B -->|❌ Não| C[📱 Tela Login/Cadastro]
    B -->|✅ Sim| D[🏠 Dashboard Principal]
    
    C --> E{Novo Usuário?}
    E -->|✅ Sim| F[📝 Formulário Cadastro]
    E -->|❌ Não| G[🔐 Formulário Login]
    
    F --> H[⚡ Validação Cadastro]
    G --> I[⚡ Validação Login]
    
    H -->|✅ Sucesso| D
    I -->|✅ Sucesso| D
    H -->|❌ Erro| F
    I -->|❌ Erro| G
    
    D --> J{📊 Menu Navegação}
    
    J --> K[👀 Ver Todos Prompts]
    J --> L[🆕 Criar Novo Prompt]
    J --> M[🔍 Buscar Prompts]
    J --> N[👤 Meu Perfil]
    J --> O[🚪 Sair]
    
    %% FLUXO DE PROMPTS
    K --> P[📋 Lista de Prompts]
    L --> Q[✏️ Editor de Prompt]
    M --> R[🎯 Tela de Busca]
    
    P --> S{Selecionar Prompt}
    S --> T[📄 Tela de Detalhes]
    
    R --> U[🔎 Digitar Termo Busca]
    U --> V[📊 Resultados Filtrados]
    V --> S
    
    %% AÇÕES DO PROMPT
    T --> W{🛠️ Ações do Prompt}
    W --> X[📋 Copiar Prompt]
    W --> Y[✏️ Editar Prompt]
    W --> Z[🗑️ Excluir Prompt]
    W --> AA[↩️ Voltar para Lista]
    
    X --> BB[✅ Feedback Cópia]
    BB --> T
    
    Y --> Q
    Q --> CC{💾 Salvar Alterações?}
    CC -->|✅ Sim| DD[⚡ Atualizar Prompt]
    CC -->|❌ Não| T
    DD --> T
    
    Z --> EE[⚠️ Confirmação Exclusão]
    EE -->|✅ Confirmar| FF[🗑️ Excluir Prompt]
    EE -->|❌ Cancelar| T
    FF --> P
    
    %% CRIAÇÃO NOVO PROMPT
    Q --> GG{💾 Salvar Novo?}
    GG -->|✅ Sim| HH[🆕 Criar Prompt]
    GG -->|❌ Não| D
    HH --> P
    
    %% PERFIL E LOGOUT
    N --> II[👤 Perfil do Usuário]
    II --> JJ{✏️ Editar Perfil?}
    JJ -->|✅ Sim| KK[📝 Formulário Edição]
    JJ -->|❌ Não| D
    KK --> LL[⚡ Atualizar Perfil]
    LL --> D
    
    O --> MM[⚠️ Confirmar Logout]
    MM -->|✅ Sim| A
    MM -->|❌ Não| D
    
    %% ESTILOS VISUAIS
    style A fill:#e1f5fe
    style D fill:#c8e6c9
    style T fill:#fff3e0
    style Q fill:#fce4ec
    style X fill:#4caf50,color:white
    style FF fill:#f44336,color:white
    style HH fill:#2196f3,color:white
```

## 🗃️ ESTRUTURA DE DADOS

### Tabela: usuarios
```json
{
  "id": "UUID",
  "criado_em": "DateTime",
  "nome": "Texto",
  "email": "Email",
  "senha": "Senha (hash)",
  "ultimo_login": "DateTime"
}
```

### Tabela: prompts
```json
{
  "id": "UUID",
  "usuario_id": "UUID (FK)",
  "titulo": "Texto",
  "descricao": "Texto",
  "conteudo": "Texto",
  "categoria": "Texto",
  "tags": "Array[Texto]",
  "template": "Boolean",
  "publico": "Boolean",
  "criado_em": "DateTime",
  "atualizado_em": "DateTime"
}
```

## 🚀 FLUXOS DETALHADOS

### 🔐 Fluxo de Autenticação
```
Acesso → Verifica Sessão → Se Não Logado: Login/Cadastro → Validação → Dashboard
Se Logado: Dashboard Direto
```

### 📝 Fluxo de Criação
```
Dashboard → Criar Novo → Editor → Preencher → Salvar → Lista
```

### 🔍 Fluxo de Busca e Cópia
```
Dashboard → Buscar → Digitar → Resultados → Selecionar → Copiar → ✅
```

### ✏️ Fluxo de Edição
```
Lista → Selecionar → Detalhes → Editar → Editor → Salvar → Detalhes Atualizados
```

### 🗑️ Fluxo de Exclusão
```
Detalhes → Excluir → ⚠️ Confirmação → ✅ Confirmar → Excluir → Volta Lista
```

## 🎨 ESTADOS DA INTERFACE

### 🟢 Estados de Sucesso
- ✅ Login válido
- ✅ Cadastro concluído
- ✅ Prompt criado/editado
- ✅ Cópia realizada
- ✅ Perfil atualizado

### 🔴 Estados de Erro
- ❌ Login inválido
- ❌ Email já cadastrado
- ❌ Campos obrigatórios vazios
- ❌ Erro de conexão

### ⚠️ Estados de Confirmação
- ⚠️ Exclusão de prompt
- ⚠️ Logout
- ⚠️ Descartar alterações

### 🔄 Estados de Carregamento
- 🔄 Autenticação
- 🔄 Salvamento
- 🔄 Busca
- 🔄 Cópia para clipboard

## 🔧 PRÓXIMOS PASSOS

### Fase 1 - Configuração Xano
- 🗃️ Criar tabelas usuarios e prompts
- 🔗 Configurar relação 1:N
- 🚀 Desenvolver APIs RESTful

### Fase 2 - Integração
- 🔌 Conectar Lovable às APIs Xano
- 🧪 Testar fluxo completo
- 🎯 Migrar dados mock

### Fase 3 - Polimento
- 🐛 Correção de bugs
- ⚡ Otimização performance
- 📱 Responsividade final
