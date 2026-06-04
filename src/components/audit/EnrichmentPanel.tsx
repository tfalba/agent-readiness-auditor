import type { EnrichmentSuggestion, AgentInterpretation } from '../../types/product';

interface Props {
  interpretation: AgentInterpretation;
  enrichment: EnrichmentSuggestion;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
      {children}
    </div>
  );
}

export default function EnrichmentPanel({ interpretation, enrichment }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="text-base font-semibold text-gray-900 mb-0.5">What AI Agents Understand</div>
        <div className="text-sm text-gray-400 mb-4">How agents interpret this product today</div>

        <div className="space-y-4">
          <div>
            <SectionLabel>Product Type</SectionLabel>
            <p className="text-sm text-gray-800">{interpretation.productType}</p>
          </div>
          <div>
            <SectionLabel>Target Customer</SectionLabel>
            <p className="text-sm text-gray-800">{interpretation.targetCustomer}</p>
          </div>
          <div>
            <SectionLabel>Best Use Cases</SectionLabel>
            <ul className="space-y-0.5">
              {interpretation.bestUseCases.map((u) => (
                <li key={u} className="text-sm text-gray-700 flex items-start gap-1.5">
                  <span className="text-violet-500 shrink-0">•</span>{u}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionLabel>Likely Comparison Set</SectionLabel>
            <ul className="space-y-0.5">
              {interpretation.likelyComparisonSet.map((c) => (
                <li key={c} className="text-sm text-gray-600 flex items-start gap-1.5">
                  <span className="text-gray-300 shrink-0">vs</span>{c}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionLabel>Missing Decision Data</SectionLabel>
            <ul className="space-y-0.5">
              {interpretation.missingDecisionData.map((m) => (
                <li key={m} className="text-sm text-red-500 flex items-start gap-1.5">
                  <span className="shrink-0">⚠</span>{m}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="text-base font-semibold text-gray-900 mb-0.5">Enrichment Suggestions</div>
        <div className="text-sm text-gray-400 mb-4">Changes to improve AI discoverability</div>

        <div className="space-y-5">
          <div>
            <SectionLabel>Better Title</SectionLabel>
            <p className="text-sm text-gray-800 bg-violet-50 border border-violet-200 rounded-lg px-3 py-2">
              {enrichment.betterTitle}
            </p>
          </div>
          <div>
            <SectionLabel>Improved Bullets</SectionLabel>
            <ul className="space-y-1">
              {enrichment.improvedBullets.map((b) => (
                <li key={b} className="text-sm text-gray-700 flex items-start gap-1.5">
                  <span className="text-violet-400 shrink-0 mt-0.5">•</span>{b}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionLabel>Missing Attributes</SectionLabel>
            <ul className="space-y-0.5">
              {enrichment.missingAttributes.map((a) => (
                <li key={a} className="text-sm text-red-500 flex items-start gap-1.5">
                  <span className="shrink-0 font-bold">+</span>{a}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionLabel>Structured Data</SectionLabel>
            <ul className="space-y-0.5">
              {enrichment.structuredDataRecommendations.map((r) => (
                <li key={r} className="text-sm text-gray-600 flex items-start gap-1.5">
                  <span className="text-violet-400 shrink-0">→</span>{r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
