# 📦 System Control & E-Commerce Core API

Uma solução backend robusta, escalável e moderna desenvolvida com o ecossistema **TypeScript & Node.js**. 

> 📌 **Status do Projeto:** Atualmente em desenvolvimento ativo focado no **Módulo de Controle de Estoque**, Gestão de Produtos e Logística Interna. O sistema está sendo arquitetado para evoluir de forma modular até se tornar uma plataforma completa de **E-Commerce**.

---

## 🎯 Objetivos do Projeto

- **Fase 1 (Atual - Controle de Estoque):**
  - Gestão detalhada de inventário e entrada/saída de produtos.
  - Modelagem do banco de dados relacional via **Prisma ORM**.
  - Regras de negócio para alteração de quantidade, categorias e status de estoque.
  - Implementação de testes unitários com **Vitest** para garantir confiabilidade nas movimentações de estoque.

- **Fase 2 (Próxima Etapa - E-Commerce):**
  - Módulo de autenticação e autorização de clientes/administradores (JWT).
  - Carrinho de compras e motor de pedidos (`OrderService`).
  - Integração com gateways de pagamento (Pix, Cartão de Crédito) e cálculo de frete.

---

## 🚀 Tecnologias Utilizadas

### **Back-End**
- **Node.js** (v22+) & **TypeScript** — Ambiente de execução assíncrono e desenvolvimento fortemente tipado.
- **Express.js** — Framework web minimalista para construção da API RESTful.
- **Prisma ORM** — Mapeamento objeto-relacional para modelagem de dados e *queries* eficientes.
- **SQL Server / PostgreSQL** — Banco de dados relacional para persistência segura dos dados.
- **JWT (JSON Web Tokens)** & **Bcrypt** — Autenticação e segurança.

### **Testes & Qualidade de Código**
- **Vitest** — Framework de testes unitários rápidos e criação de mocks.
- **ESLint & Prettier** — Padronização de estilo e boas práticas de código.

---

## 📁 Estrutura do Projeto

```bash
src/
 ├── @types/          # Definições de tipos customizadas do TypeScript
 ├── config/          # Configurações globais (banco de dados, JWT, ambiente)
 ├── controllers/     # Camada de entrada HTTP e respostas da API
 ├── middlewares/     # Validações, tratamento de erros e middlewares de segurança
 ├── services/        # Regras de negócio (StockService, ProductService, OrderService)
 ├── utils/           # Funções auxiliares e helpers gerais
 └── app.ts           # Ponto de entrada e inicialização do servidor Express
```

---

## 🔥 Funcionalidades (Em Desenvolvimento e Planejadas)

- 📦 **Módulo de Estoque (Foco Atual)**
  - Cadastro, edição e remoção de produtos no inventário.
  - Controle de quantidade mínima, alertas de estoque baixo e categorias.
  - Histórico de movimentações de entrada e saída.

- 👤 **Autenticação & Controle de Acesso**
  - Cadastro e login seguro de usuários.
  - Controle de níveis de acesso (Admin vs Operador).

- 🛒 **Módulo E-Commerce (Em breve)**
  - Listagem de catálogo para clientes.
  - Gestão de carrinho de compras e checkout.
  - Processamento de pedidos (*OrderService*).

---
