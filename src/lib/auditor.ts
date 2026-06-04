import type { ProductInput, ScoreDimension } from "../types/product";

export function scoreTitleQuality(product: ProductInput): ScoreDimension {
  const title = product.title ?? "";
  const issues: string[] = [];
  let score = 0;
  if (title.length >= 40 && title.length <= 120) score += 8;
  else if (title.length > 0) {
    score += 3;
    issues.push("Title length not in optimal 40–120 char range");
  } else issues.push("Title is missing");
  if (
    product.brand &&
    title.toLowerCase().includes(product.brand.toLowerCase())
  )
    score += 4;
  else issues.push("Brand name missing from title");
  if (
    product.category &&
    title.toLowerCase().includes(product.category.toLowerCase().split(" ")[0])
  )
    score += 4;
  else issues.push("Product type/category signal missing from title");
  const specifics =
    /\b(for|men|women|kids|indoor|outdoor|waterproof|size|model|series)\b/i.test(
      title
    );
  if (specifics) score += 4;
  else issues.push("No qualifier keywords (gender, use-case, model)");
  return {
    label: "Title Quality",
    score: Math.min(score, 20),
    max: 20,
    rationale:
      "Evaluates clarity, keyword signal, and specificity for AI parsing.",
    issues,
  };
}

export function scoreAttributeCompleteness(
  product: ProductInput
): ScoreDimension {
  const attrs = product.attributes ?? {};
  const issues: string[] = [];
  let score = 0;
  const coreFields = ["title", "brand", "description", "price", "category"];
  const present = coreFields.filter(
    (f) => !!(product as Record<string, unknown>)[f]
  );
  score += Math.round((present.length / coreFields.length) * 10);
  if (present.length < coreFields.length)
    issues.push(
      `Missing core fields: ${coreFields
        .filter((f) => !(product as Record<string, unknown>)[f])
        .join(", ")}`
    );
  const attrCount = Object.keys(attrs).length;
  if (attrCount >= 6) score += 10;
  else if (attrCount >= 3) {
    score += 6;
    issues.push("Fewer than 6 structured attributes");
  } else {
    score += 2;
    issues.push("Very few structured attributes");
  }
  return {
    label: "Attribute Completeness",
    score: Math.min(score, 20),
    max: 20,
    rationale:
      "Checks whether required fields and typed attributes are present.",
    issues,
  };
}

export function scoreSchemaCrawlability(product: ProductInput): ScoreDimension {
  const issues: string[] = [];
  let score = 0;
  if (product.sku) score += 5;
  else issues.push("No SKU — agents can't deduplicate this product");
  if (product.url) score += 5;
  else issues.push("No canonical URL provided");
  if ((product.images ?? []).length > 0) score += 5;
  else issues.push("No image URLs — reduces visual agent confidence");
  if (product.category) score += 5;
  else issues.push("No category — schema.org Product type can't be inferred");
  return {
    label: "Schema / Crawlability",
    score: Math.min(score, 20),
    max: 20,
    rationale:
      "Evaluates structured data signals that help agents identify and deduplicate products.",
    issues,
  };
}

export function scoreComparisonReadiness(
  product: ProductInput
): ScoreDimension {
  const attrs = product.attributes ?? {};
  const issues: string[] = [];
  let score = 0;
  const comparators = [
    "material",
    "weight",
    "size",
    "dimensions",
    "warranty",
    "compatibility",
    "color",
    "fit",
  ];
  const present = comparators.filter((c) =>
    Object.keys(attrs).some((k) => k.toLowerCase().includes(c))
  );
  score += Math.min(present.length * 3, 12);
  if (present.length < 4)
    issues.push(
      `Missing comparison attributes: ${comparators
        .filter((c) => !present.includes(c))
        .slice(0, 3)
        .join(", ")}`
    );
  if (product.description && product.description.length > 100) score += 8;
  else issues.push("Description too short to support agent-driven comparison");
  return {
    label: "Comparison Readiness",
    score: Math.min(score, 20),
    max: 20,
    rationale:
      "Measures whether agents can compare this product against alternatives.",
    issues,
  };
}

export function scoreRecommendationConfidence(
  product: ProductInput
): ScoreDimension {
  const issues: string[] = [];
  let score = 0;
  if (product.price) score += 5;
  else issues.push("Price missing — blocks purchase-intent matching");
  if (product.brand) score += 5;
  else
    issues.push("Brand missing — agents can't assess trust/reputation signals");
  const desc = product.description ?? "";
  if (/\b(for|perfect|ideal|designed|best for|recommended)\b/i.test(desc))
    score += 5;
  else issues.push("No intent language in description");
  if (
    /\b(men|women|beginner|professional|kids|senior|athlete)\b/i.test(
      desc + JSON.stringify(product.attributes ?? {})
    )
  )
    score += 5;
  else issues.push("No target user segment identified");
  return {
    label: "Recommendation Confidence",
    score: Math.min(score, 20),
    max: 20,
    rationale:
      "Evaluates whether an agent has enough context to confidently recommend this product.",
    issues,
  };
}
