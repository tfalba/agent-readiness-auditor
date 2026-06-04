import type { ProductInput, AuditResult } from "../types/product";
import {
  scoreTitleQuality,
  scoreAttributeCompleteness,
  scoreSchemaCrawlability,
  scoreComparisonReadiness,
  scoreRecommendationConfidence,
} from "./auditor";
import { generateEnrichment } from "./enricher";
import { simulateAgents, interpretProduct } from "./simulator";

export function runAudit(product: ProductInput): AuditResult {
  const dimensions = [
    scoreTitleQuality(product),
    scoreAttributeCompleteness(product),
    scoreSchemaCrawlability(product),
    scoreComparisonReadiness(product),
    scoreRecommendationConfidence(product),
  ];
  const totalScore = dimensions.reduce((sum, d) => sum + d.score, 0);
  return {
    totalScore,
    dimensions,
    interpretation: interpretProduct(product),
    enrichment: generateEnrichment(product),
    agentSimulations: simulateAgents(product, totalScore),
    auditedAt: new Date().toISOString(),
  };
}
