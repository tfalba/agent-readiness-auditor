import type {
  ProductInput,
  AgentSimulation,
  AgentInterpretation,
} from "../types/product";

const clamp = (n: number) => Math.max(0, Math.min(100, n));

export function simulateAgents(
  _product: ProductInput,
  totalScore: number
): AgentSimulation[] {
  const base = totalScore;
  return [
    {
      agent: "ChatGPT",
      wouldRecommend: base >= 55,
      confidence: clamp(base + 5),
      reasoning:
        base >= 55
          ? "Product has sufficient title clarity and attribute depth for purchase-intent queries."
          : "Title lacks specificity and attribute set is too thin for confident recommendation.",
      blockers:
        base < 55
          ? [
              "Weak title keyword signal",
              "No SKU for deduplication",
              "Missing size/weight attributes",
            ]
          : [],
    },
    {
      agent: "Gemini",
      wouldRecommend: base >= 60,
      confidence: clamp(base - 3),
      reasoning:
        base >= 60
          ? "Google's Shopping Graph can index this product with existing structured data."
          : "Gemini's Shopping Graph requires richer schema.org markup and a canonical product URL.",
      blockers:
        base < 60
          ? [
              "No canonical URL",
              "Missing schema.org Product markup",
              "No GTIN for deduplication",
            ]
          : [],
    },
    {
      agent: "Copilot",
      wouldRecommend: base >= 50,
      confidence: clamp(base + 2),
      reasoning:
        base >= 50
          ? "Bing Product Search can surface this listing; brand signal is present."
          : "Copilot's product retrieval favors Bing-indexed pages with explicit merchant feeds.",
      blockers:
        base < 50
          ? ["Not indexed in Bing merchant feed", "Price missing or ambiguous"]
          : [],
    },
    {
      agent: "Perplexity",
      wouldRecommend: base >= 45,
      confidence: clamp(base - 8),
      reasoning:
        base >= 45
          ? "Perplexity can synthesize available product data into a comparison answer."
          : "Perplexity relies on web-crawled content — thin descriptions won't survive synthesis.",
      blockers:
        base < 45
          ? [
              "Description too short to survive web synthesis",
              "No user reviews or ratings",
            ]
          : [],
    },
  ];
}

function generateComparisonSet(product: ProductInput): string[] {
  const attrs = product.attributes ?? {};
  const category = (product.category ?? "shoe").toLowerCase();
  const price = product.price;
  const brand = product.brand;

  const gender = typeof attrs.gender === "string" ? attrs.gender : null;
  const material = typeof attrs.material === "string" ? attrs.material : null;
  const terrain = typeof attrs.terrain === "string" ? attrs.terrain : null;
  const use = typeof attrs.use === "string" ? attrs.use : null;

  const priceTier =
    !price ? null
    : price < 60  ? "budget"
    : price < 120 ? "mid-range"
    : price < 200 ? "premium"
    : "high-end";

  const comparisons: string[] = [];

  // 1. Audience + use-case match
  const audienceTokens = [gender, use ?? terrain, material ? `${material} upper` : null]
    .filter(Boolean).join(", ");
  comparisons.push(
    audienceTokens
      ? `${audienceTokens} ${category} from competing brands`
      : `${category} alternatives with similar feature set`
  );

  // 2. Price-tier match
  comparisons.push(
    priceTier
      ? `${priceTier} ${category} in the $${Math.round((price ?? 0) * 0.8)}–$${Math.round((price ?? 0) * 1.2)} range`
      : `Comparably priced ${category} from major retailers`
  );

  // 3. Material / construction match
  comparisons.push(
    material
      ? `${material}-construction ${category} with equivalent cushioning`
      : `${category} with comparable midsole and outsole technology`
  );

  // 4. Brand-position match
  comparisons.push(
    brand
      ? `Established brand ${category} competing directly with ${brand}`
      : `Category-leading ${category} against which agents benchmark unknown brands`
  );

  return comparisons;
}

export function interpretProduct(product: ProductInput): AgentInterpretation {
  const attrs = product.attributes ?? {};
  const gender = attrs.gender ? `${attrs.gender}'s ` : "";
  const category = product.category ?? "product";
  const brand = product.brand ?? "an unbranded";
  return {
    productType: `${gender}${category} by ${brand}`,
    targetCustomer: attrs.gender
      ? `${attrs.gender} athletes or casual ${category.toLowerCase()} shoppers`
      : "General consumers; gender and use-case not specified",
    bestUseCases: [
      `Everyday ${category.toLowerCase()} use`,
      "Casual athletic activity",
      "Entry-level sport or fitness",
    ],
    likelyComparisonSet: generateComparisonSet(product),
    missingDecisionData: ((): string[] => {
      const hasAttr = (...keys: string[]) =>
        Object.keys(attrs).some((k) => keys.includes(k.toLowerCase()));
      const missing: string[] = [];
      if (!hasAttr("drop", "heel_drop", "heel_to_toe_drop")) missing.push("Heel-to-toe drop (mm)");
      if (!hasAttr("weight", "shoe_weight")) missing.push("Shoe weight (oz)");
      if (!hasAttr("terrain", "terrain_type", "surface")) missing.push("Terrain type (road/trail)");
      missing.push("Customer ratings / reviews");
      if (!hasAttr("size", "size_range", "sizes")) missing.push("Size availability");
      missing.push("Return policy");
      return missing;
    })(),
  };
}
