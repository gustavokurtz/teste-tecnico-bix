# Dashboard Financeiro - Teste Técnico BIX

<<<<<<< HEAD
![Dashboard Preview](/dashboard-preview.png)
=======
![Dashboard Preview](https://raw.githubusercontent.com/gustavokurtz/teste-tecnico-bix/master/public/dashboard-preview.png)

>>>>>>> 13b9427ca7cdbfebe636622cd36770469a4c945d



Este projeto foi desenvolvido como parte do processo seletivo para a vaga de Desenvolvedor Front End Pleno na BIX Tecnologia. Trata-se de um dashboard financeiro interativo que permite aos usuários analisar saldos, receitas, despesas, transações pendentes e histórico de transações.

## 📋 Visão Geral

O Dashboard Financeiro oferece uma interface intuitiva para visualização e análise de dados financeiros, com as seguintes funcionalidades:

- **Sistema de autenticação** com persistência de sessão via cookies
- **Dashboard completo** com cards informativos e gráficos interativos
- **Filtros dinâmicos** que atualizam todos os componentes da página
- **Design responsivo** e interface amigável ao usuário
- **Visualização de dados** através de gráficos de barras e linhas

## 🛠️ Tecnologias Utilizadas

- **Next.js** - Framework React com renderização do lado do servidor
- **TypeScript** - Para tipagem estática e melhor desenvolvimento
- **Styled Components** - Para estilização dos componentes
- **Recharts** - Biblioteca para criação de gráficos
- **js-cookie** - Para gerenciamento de cookies no cliente

## 📁 Estrutura do Projeto

```
src/
├── app/                    # Diretório principal da aplicação Next.js
│   ├── dashboard/          # Página do dashboard protegida
│   │   ├── DashboardLayoutClient.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── SidebarWrapper.tsx
│   ├── login/              # Página de login
│   │   └── page.tsx
│   ├── page.tsx            # Página raiz
│   ├── favicon.ico         # Favicon do site
│   ├── globals.css         # Estilos globais
│   └── layout.tsx          # Layout principal
├── data/                   # Dados e mocks
│   └── transactions.json   # Dados de transações para o dashboard
└── lib/                    # Bibliotecas e utilitários
    ├── auth/               # Funções relacionadas à autenticação
    │   ├── loginAction.ts  # Ações de login/logout
    │   └── mockUser.ts     # Mock de usuário para autenticação
    └── registry.tsx        # Registro do cliente para Styled Components
```

## 🚀 Como executar o projeto

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/gustavokurtz/teste-tecnico-bix.git
```

2. Navegue até o diretório do projeto:
```bash
cd teste-tecnico-bix
```

3. Instale as dependências:
```bash
npm install
# ou
yarn install
```

4. Execute o projeto em desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

5. Acesse a aplicação em seu navegador:
```
http://localhost:3000
```

## 📊 Funcionalidades do Dashboard

### Sistema de Autenticação

O projeto implementa um sistema de autenticação simplificado que:
- Utiliza um mock de usuário para simular o processo de login
- Persiste a sessão do usuário através de cookies
- Protege a rota do dashboard contra acessos não autorizados
- Permite logout com redirecionamento para a página de login

### Dashboard Financeiro

O dashboard apresenta:
- **Cards informativos** com resumo de receitas, despesas, transações pendentes e saldo total
- **Gráfico de barras empilhadas** para visualização das transações por categoria
- **Gráfico de linhas** para análise da evolução das transações ao longo do tempo
- **Tabela de transações** com recursos de paginação e ordenação

### Filtros Globais

Os filtros implementados permitem ao usuário:
- Filtrar por período (data inicial e final)
- Filtrar por tipo de conta
- Filtrar por indústria
- Filtrar por estado
- Todos os componentes da página são atualizados dinamicamente conforme a aplicação dos filtros

## 💡 Decisões Técnicas

### Next.js App Router

O projeto utiliza a nova arquitetura do Next.js com App Router, aproveitando recursos como:
- Componentes do lado do servidor e do cliente
- Otimização automática de imagens
- Roteamento baseado em sistema de arquivos

### Autenticação sem Banco de Dados

Para atender ao requisito de persistência sem banco de dados:
- Foi criado um mock de usuário para simulação de login
- Os dados de autenticação são armazenados em cookies no navegador
- A verificação de autenticação é realizada em cada carregamento da página protegida

### Estilização com Styled Components

Todo o projeto foi estilizado utilizando Styled Components, permitindo:
- Estilos encapsulados por componente
- Tema consistente em toda a aplicação
- Estilização baseada em props e estados

## 🔐 Acessando o Dashboard

Para testar o sistema de login, utilize as seguintes credenciais:

- **E-mail**: admin@email.com
- **Senha**: 123456

Essas credenciais estão configuradas no mock de usuário e permitem acesso completo ao dashboard.

---

Desenvolvido por Gustavo - 2025
