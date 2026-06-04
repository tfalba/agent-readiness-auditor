import { z } from "zod";

export const ProductAttributesSchema = z.record(z.string(), z.union([z.string(), z.number(), z.boolean()]));

export const ProductInputSchema = z.object({
  title: z.string().optional(),
  brand: z.string().optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  category: z.string().optional(),
  sku: z.string().optional(),
  images: z.array(z.string()).optional(),
  attributes: ProductAttributesSchema.optional(),
  url: z.string().url().optional(),
});

export type ProductInput = z.infer<typeof ProductInputSchema>;

export interface ScoreDimension {
  label: string;
  score: number;
  max: number;
  rationale: string;
  issues: string[];
}

export interface AgentSimulation {
  agent: "ChatGPT" | "Gemini" | "Copilot" | "Perplexity";
  wouldRecommend: boolean;
  confidence: number;
  reasoning: string;
  blockers: string[];
}

export interface AgentInterpretation {
  productType: string;
  targetCustomer: string;
  bestUseCases: string[];
  likelyComparisonSet: string[];
  missingDecisionData: string[];
}

export interface EnrichmentSuggestion {
  betterTitle: string;
  improvedBullets: string[];
  missingAttributes: string[];
  structuredDataRecommendations: string[];
}

export interface AuditResult {
  totalScore: number;
  dimensions: ScoreDimension[];
  interpretation: AgentInterpretation;
  enrichment: EnrichmentSuggestion;
  agentSimulations: AgentSimulation[];
  auditedAt: string;
}
