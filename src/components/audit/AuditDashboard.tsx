import { useState } from 'react';
import { runAudit } from '../../lib/index';
import { ProductInputSchema } from '../../types/product';
import type { AuditResult } from '../../types/product';
import ScoreCard from './ScoreCard';
import AgentPanel from './AgentPanel';
import EnrichmentPanel from './EnrichmentPanel';

const SAMPLE_JSON = JSON.stringify(
  {
    title: 'Blue Running Shoe',
    brand: 'StrideCo',
    description: 'Comfortable running shoe for everyday use.',
    price: 89,
    category: 'Footwear',
    attributes: { color: 'Blue', gender: 'Men', material: 'Mesh' },
  },
  null,
  2
);

function scoreTheme(score: number) {
  if (score >= 80) return { label: 'Excellent', text: 'text-green-600',  ring: 'bg-green-50 border-green-200' };
  if (score >= 60) return { label: 'Good',      text: 'text-blue-600',   ring: 'bg-blue-50 border-blue-200' };
  if (score >= 40) return { label: 'Moderate',  text: 'text-yellow-600', ring: 'bg-yellow-50 border-yellow-200' };
  return           { label: 'Poor',             text: 'text-red-600',    ring: 'bg-red-50 border-red-200' };
}

export default function AuditDashboard() {
  const [json, setJson] = useState(SAMPLE_JSON);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleAudit() {
    setError(null);
    try {
      const parsed = JSON.parse(json);
      const validated = ProductInputSchema.parse(parsed);
      setResult(runAudit(validated));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid input');
      setResult(null);
    }
  }

  const theme = result ? scoreTheme(result.totalScore) : null;

  return (
    <div className="min-h-screen bg-gray-50 text-left">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-violet-600 text-lg font-bold">⬡</span>
            <span className="text-lg font-bold text-gray-900">Agent Readiness Auditor</span>
          </div>
          <p className="text-sm text-gray-400">
            Score how well AI shopping agents can understand and recommend your product.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        {/* Input */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="text-sm font-semibold text-gray-700 mb-0.5">Product JSON</div>
          <div className="text-xs text-gray-400 mb-3">
            Paste raw product data or edit the sample, then click Run Audit.
          </div>
          <textarea
            className="w-full font-mono text-sm bg-gray-50 border border-gray-200 rounded-lg p-3 h-48 resize-y focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            value={json}
            onChange={(e) => setJson(e.target.value)}
            spellCheck={false}
          />
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          <div className="mt-3 flex justify-end">
            <button
              onClick={handleAudit}
              className="bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors cursor-pointer"
            >
              Run Audit
            </button>
          </div>
        </div>

        {result && theme && (
          <>
            {/* Overall Score */}
            <div className={`border rounded-xl p-6 ${theme.ring}`}>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">AI Readiness Score</div>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-5xl font-bold ${theme.text}`}>{result.totalScore}</span>
                    <span className="text-xl text-gray-300">/100</span>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ml-1 ${theme.text} ${theme.ring}`}>
                      {theme.label}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-gray-400">
                  Audited {new Date(result.auditedAt).toLocaleTimeString()}
                </span>
              </div>
            </div>

            {/* Score breakdown + Agent simulations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ScoreCard dimensions={result.dimensions} />
              <AgentPanel simulations={result.agentSimulations} />
            </div>

            {/* Enrichment */}
            <EnrichmentPanel
              interpretation={result.interpretation}
              enrichment={result.enrichment}
            />
          </>
        )}
      </div>
    </div>
  );
}
