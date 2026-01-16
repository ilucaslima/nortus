# 🚀 Nortus - Sistema de Gestão e Dashboard

Uma aplicação web moderna desenvolvida em **Next.js 16** e **TypeScript** para gerenciamento de tickets, dashboard analítico e simulação de seguros.

## ✨ Principais Funcionalidades

### 🔐 **Sistema de Autenticação**

- Login seguro com validação de formulários
- Gerenciamento de tokens JWT com cookies
- Páginas de registro de novos usuários

### 📊 **Dashboard Analítico**

- **KPIs em tempo real**: ARPU, Churn Rate, LTV e outras métricas importantes
- **Gráficos interativos** com ApexCharts
- **Segmentação de dados** por diferentes critérios
- **Mapa de clientes** integrado com OpenLayers
- Interface responsiva e moderna

### 🎫 **Gestão de Tickets**

- Sistema completo de gerenciamento de tickets
- Filtros avançados e paginação
- Estados personalizáveis (aberto, em progresso, resolvido)
- Formulário de criação de novos tickets
- Tabelas otimizadas para grandes volumes de dados

### 🤖 **Chat Assistente**

- Interface de chat intuitiva
- Integração com sistema de mensagens
- Suporte a envio de mensagens em tempo real
- Design moderno com componentes personalizados

### 🧮 **Simulador de Seguros**

- Simulação interativa de planos de seguro
- Sliders para ajuste de valor do veículo e idade
- Coberturas adicionais personalizáveis
- Sistema de recomendação inteligente
- Cálculo dinâmico de preços

## 🛠️ **Stack Tecnológica**

### **Frontend**

- **Next.js 16** - Framework React com SSR
- **React 19** - Biblioteca para interfaces
- **TypeScript** - Tipagem estática
- **Tailwind CSS v4** - Framework CSS utilitário

### **Bibliotecas & Ferramentas**

- **React Hook Form** + **Zod** - Validação de formulários
- **ApexCharts** - Gráficos e visualizações
- **OpenLayers** - Mapas interativos
- **Axios** - Cliente HTTP
- **React Toastify** - Notificações
- **js-cookie** - Gerenciamento de cookies

### **Desenvolvimento**

- **ESLint** - Linting de código
- **PostCSS** - Processamento de CSS
- **Yarn** - Gerenciador de pacotes

## 📁 **Estrutura do Projeto**

```
src/
├── app/                    # App Router (Next.js 16)
│   ├── dashboard/         # Área principal do sistema
│   │   ├── chat-assistente/
│   │   ├── gestao-tickets/
│   │   └── simulador/
│   └── registro/          # Sistema de cadastro
├── components/            # Componentes reutilizáveis
│   └── ui/               # Componentes base da UI
├── hooks/                # Custom hooks React
├── services/             # Serviços e API calls
├── types/                # Definições TypeScript
├── schemas/              # Schemas de validação (Zod)
├── utils/                # Funções utilitárias
└── data/                 # Dados mock para desenvolvimento
```

## 🚀 **Como Executar**

### **Pré-requisitos**

- Node.js 18+
- Yarn ou npm

### **Instalação**

```bash
# Clone o repositório
git clone https://github.com/ilucaslima/nortus.git
cd nortus/web

# Instale as dependências
yarn install

# Execute em modo de desenvolvimento
yarn dev
```

### **Scripts Disponíveis**

```bash
yarn dev      # Servidor de desenvolvimento
yarn build    # Build de produção
yarn start    # Servidor de produção
yarn lint     # Verificação de código
```

## 🎨 **Características da UI**

### **Design System**

- **Tema escuro** moderno e profissional
- **Tipografia** customizada (Space Grotesk, Inter, Montserrat)
- **Componentes** padronizados e reutilizáveis
- **Ícones** personalizados e otimizados

### **Responsividade**

- Layout adaptável para desktop, tablet e mobile
- Grid system flexível
- Componentes otimizados para diferentes telas

## 🔧 **Recursos Técnicos**

### **State Management**

- Hooks personalizados para lógica de negócio
- Context API para estados globais
- Gerenciamento local com useState/useEffect

### **Performance**

- **Lazy loading** de componentes
- **Memoização** de cálculos pesados
- **Otimizações** do Next.js (SSR, Image Optimization)

### **Validação & Segurança**

- Validação client-side com **Zod**
- Sanitização de dados de entrada
- Autenticação via **JWT tokens**

## 📱 **Funcionalidades por Página**

| Página                       | Funcionalidade                    |
| ---------------------------- | --------------------------------- |
| `/`                          | Login e autenticação              |
| `/registro`                  | Cadastro de novos usuários        |
| `/dashboard`                 | Visão geral com KPIs e métricas   |
| `/dashboard/gestao-tickets`  | Gerenciamento completo de tickets |
| `/dashboard/chat-assistente` | Interface de chat com assistente  |
| `/dashboard/simulador`       | Simulação de planos de seguro     |

## 🤝 **Contribuição**

Este projeto segue boas práticas de desenvolvimento:

- **TypeScript** para tipagem segura
- **ESLint** para qualidade de código
- **Componentes** modulares e reutilizáveis
- **Hooks personalizados** para lógica compartilhada
- **Padrões** de nomenclatura consistentes

---
