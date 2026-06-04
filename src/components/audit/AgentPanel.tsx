import type { AgentSimulation } from '../../types/product';

interface Props {
  simulations: AgentSimulation[];
}

const AGENT_STYLES: Record<string, { card: string; label: string }> = {
  ChatGPT:    { card: 'border-green-200  bg-green-50',  label: 'text-green-700' },
  Gemini:     { card: 'border-blue-200   bg-blue-50',   label: 'text-blue-700' },
  Copilot:    { card: 'border-violet-200 bg-violet-50', label: 'text-violet-700' },
  Perplexity: { card: 'border-orange-200 bg-orange-50', label: 'text-orange-700' },
};

export default function AgentPanel({ simulations }: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="text-base font-semibold text-gray-900 mb-0.5">Agent Simulations</div>
      <div className="text-sm text-gray-400 mb-4">Would each AI shopping agent recommend this product?</div>

      <div className="space-y-3">
        {simulations.map((sim) => {
          const style = AGENT_STYLES[sim.agent] ?? { card: 'border-gray-200 bg-gray-50', label: 'text-gray-700' };
          return (
            <div key={sim.agent} className={`border rounded-lg p-4 ${style.card}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-bold ${style.label}`}>{sim.agent}</span>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      sim.wouldRecommend
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {sim.wouldRecommend ? 'Would Recommend' : 'Would Not Recommend'}
                  </span>
                </div>
                <span className="text-xs font-medium text-gray-500 shrink-0">{sim.confidence}%</span>
              </div>

              <div className="w-full bg-white/60 rounded-full h-1.5 mb-2">
                <div
                  className={`h-1.5 rounded-full ${sim.wouldRecommend ? 'bg-green-500' : 'bg-red-400'}`}
                  style={{ width: `${sim.confidence}%` }}
                />
              </div>

              <p className="text-xs text-gray-600 mb-1">{sim.reasoning}</p>

              {sim.blockers.length > 0 && (
                <ul className="mt-1.5 space-y-0.5">
                  {sim.blockers.map((b) => (
                    <li key={b} className="text-xs text-red-600 flex items-start gap-1">
                      <span className="shrink-0">⚠</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
