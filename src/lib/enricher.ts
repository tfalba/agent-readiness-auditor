import type {
  ProductInput,
  EnrichmentSuggestion,
} from "../types/product";

export function generateEnrichment(
  product: ProductInput
): EnrichmentSuggestion {
  const attrs = product.attributes ?? {};
  const brand = product.brand ?? "Unknown Brand";
  const category = product.category ?? "Product";
  const color = (attrs.color as string) ?? "";
  const material = (attrs.material as string) ?? "";
  const gender = (attrs.gender as string) ?? "";

  const betterTitle = [
    brand,
    color,
    material,
    category,
    gender ? `for ${gender}` : "",
    "– Performance Edition",
  ]
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  const improvedBullets = [
    `${
      material ? material + " construction" : "Premium construction"
    } engineered for all-day comfort and durability`,
    `${color} colorway with reflective details for low-light visibility and style`,
    `Designed for ${
      gender || "everyday"
    } runners seeking responsive cushioning on any surface`,
    "Breathable mesh upper regulates temperature during extended training sessions",
    "Compatible with custom orthotics and standard insoles for personalized arch support",
    `Priced at $${
      product.price ?? "—"
    } — positioned competitively in the ${category.toLowerCase()} market`,
  ];

  const hasAttr = (...keys: string[]) =>
    Object.keys(attrs).some((k) => keys.includes(k.toLowerCase()));

  const missingAttributes: string[] = [];
  if (!hasAttr("size", "size_range", "sizes")) missingAttributes.push("Size range (US/EU)");
  if (!hasAttr("weight")) missingAttributes.push("Weight (oz/g per shoe)");
  if (!hasAttr("sole", "outsole", "sole_material")) missingAttributes.push("Sole material / outsole type");
  if (!hasAttr("drop", "heel_drop", "heel_to_toe_drop")) missingAttributes.push("Heel-to-toe drop (mm)");
  if (!hasAttr("closure", "closure_type")) missingAttributes.push("Closure type (lace-up, slip-on, BOA)");
  if (!hasAttr("terrain", "terrain_type", "surface")) missingAttributes.push("Terrain type (road, trail, track)");
  if (!hasAttr("warranty", "return_policy")) missingAttributes.push("Warranty / return policy");

  const structuredDataRecommendations = [
    'Add schema.org/Product with "offers", "brand", and "aggregateRating"',
    "Include GTIN/UPC for cross-platform deduplication by shopping agents",
    "Add breadcrumb schema for category hierarchy",
    "Implement OpenGraph product tags for social agent indexing",
    "Add canonicalized product URL in JSON-LD structured data",
  ];

  return {
    betterTitle,
    improvedBullets,
    missingAttributes,
    structuredDataRecommendations,
  };
}
