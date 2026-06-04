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
