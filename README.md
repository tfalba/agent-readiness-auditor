# Agent Readiness Auditor

> See what AI shopping agents understand about your product.

A portfolio demo inspired by [ReFiBuy's](https://refibuy.ai) Agentic Commerce Optimization platform. Audits product catalog data and scores how well AI shopping agents (ChatGPT, Gemini, Copilot, Perplexity) can interpret, compare, and recommend a product.

## What It Does

1. **AI Readiness Score** — 5-dimension scoring (Title, Attributes, Schema, Comparison, Confidence)
2. **Agent Interpretation** — What the AI actually "sees" about your product
3. **Enrichment Suggestions** — Better title, bullets, missing attributes, schema recommendations
4. **Agent Simulation** — Per-agent recommendation confidence with blockers

## Quick Start

```bash
npm install
npm run dev
```

## Optional AI Backend

```bash
cd server
cp ../.env.example .env   # add your OPENAI_API_KEY
npm install
npx tsx index.ts
```

## Sample Input

Paste this JSON into the auditor:

```json
{
  "title": "Blue Running Shoe",
  "brand": "StrideCo",
  "description": "Comfortable running shoe for everyday use.",
  "price": 89,
  "category": "Footwear",
  "attributes": { "color": "Blue", "gender": "Men", "material": "Mesh" }
}
```

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4 (`@tailwindcss/vite`)
- lucide-react, recharts, zod
- Optional: Express + OpenAI (server/)

## Portfolio Context

Built to demonstrate understanding of agentic commerce — product catalogs as infrastructure for AI shopping engines, not just content for PDPs.


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
