# Mini Mercado Ideal

Sistema de gerenciamento para Mini Mercado Ideal desenvolvido com Vue.js e Tailwind CSS.

## Requisitos

- Node.js (versão 14 ou superior)
- npm (Node Package Manager)

## Instalação

1. Clone o repositório:
```bash
https://github.com/DSM2SEM2025/TimeGabriel-Front.git
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse o sistema:
- Abra seu navegador
- Acesse `http://localhost:5173`

## Construir para Produção

1. Gere a build de produção:
```bash
npm run build
```

2. Visualize a build:
```bash
npm run preview
```

## Estrutura do Projeto

```
src/
├── main.js                # Arquivo principal
├── App.vue               # Componente raiz
├── assets/              # Arquivos estáticos
│
├── components/          # Componentes reutilizáveis
│   ├── layout/         # Componentes de layout
│   └── ui/            # Componentes de interface
│
├── composables/        # Lógica reutilizável
├── pages/             # Páginas da aplicação
└── router/            # Configuração de rotas
```

## Tecnologias Utilizadas

- Vue.js 3
- Vue Router
- Tailwind CSS
- Heroicons
- Vite
