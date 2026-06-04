# Agent Readiness Auditor — Claude Code Context

## Project Purpose
A portfolio demo built to mirror ReFiBuy's Agentic Commerce Optimization platform.
The app audits product data and scores how well AI shopping agents (ChatGPT, Gemini, Copilot, Perplexity) can interpret, compare, and recommend a product.

## Core Concept
Product catalogs are becoming infrastructure for AI shopping engines — not just content for PDPs.
This tool evaluates a product's "AI readiness" and suggests enrichment to improve discoverability inside agentic shopping flows.

## Tech Stack
- **Frontend**: Vite + React + TypeScript + Tailwind CSS v4
- **UI Components**: lucide-react (icons), recharts (radar/score charts)
- **Validation**: Zod
- **Backend (optional)**: Express + OpenAI SDK (for real AI enrichment)
- **Styling**: Tailwind via @tailwindcss/vite plugin

## MVP Audit Pipeline
Input: product URL or raw JSON
Output:
1. AI Readiness Score (0–100) broken into 5 dimensions
2. "What an AI agent understands" — agent interpretation summary
3. Enrichment Suggestions — better title, bullets, attributes
4. Agent Simulation — per-agent recommendation confidence

## Score Dimensions
- Title Quality (0–20): clarity, specificity, keyword signal
- Attribute Completeness (0–20): required fields present, typed values
- Schema/Crawlability (0–20): structured data, canonical signals
- Comparison Readiness (0–20): differentiators vs category competitors
- Recommendation Confidence (0–20): enough context for agent to act

## Key Files
- `src/lib/auditor.ts` — core scoring logic (pure TS, no API needed)
- `src/lib/enricher.ts` — generates enrichment suggestions
- `src/lib/simulator.ts` — per-agent simulation logic
- `src/components/audit/` — AuditDashboard, ScoreCard, AgentPanel, EnrichmentPanel
- `src/types/product.ts` — Zod schemas for ProductInput and AuditResult
- `server/index.ts` — optional Express API wrapping OpenAI for real enrichment

## Sample Product JSON (for demo/testing)
```json
{
  "title": "Blue Running Shoe",
  "brand": "StrideCo",
  "description": "Comfortable running shoe for everyday use.",
  "price": 89,
  "category": "Footwear",
  "attributes": {
    "color": "Blue",
    "gender": "Men",
    "material": "Mesh"
  }
}
```

## Dev Commands
```bash
npm run dev          # Start Vite dev server
npm run build        # Production build
npm run preview      # Preview production build
cd server && npx tsx index.ts  # Start optional Express backend
```

## Environment Variables
```
# .env (frontend)
VITE_API_URL=http://localhost:3001   # optional backend

# server/.env
OPENAI_API_KEY=your_key_here
PORT=3001
```

## Portfolio Context
Built to demonstrate understanding of ReFiBuy's core platform:
ingest → evaluate → enrich → distribute → sync → monitor at the SKU level.
Target role: Agentic Commerce / AI Product tooling companies.
