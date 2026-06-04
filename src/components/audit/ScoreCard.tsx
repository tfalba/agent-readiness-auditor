import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import type { ScoreDimension } from '../../types/product';

interface Props {
  dimensions: ScoreDimension[];
}

const SHORT_LABELS: Record<string, string> = {
  'Title Quality': 'Title',
  'Attribute Completeness': 'Attributes',
  'Schema / Crawlability': 'Schema',
  'Comparison Readiness': 'Comparison',
  'Recommendation Confidence': 'Confidence',
};

export default function ScoreCard({ dimensions }: Props) {
  const radarData = dimensions.map((d) => ({
    dimension: SHORT_LABELS[d.label] ?? d.label,
    score: d.score,
    fullMark: d.max,
  }));

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="text-base font-semibold text-gray-900 mb-0.5">Score Breakdown</div>
      <div className="text-sm text-gray-400 mb-4">How each dimension contributes to AI readiness</div>

      <ResponsiveContainer width="100%" height={200}>
        <RadarChart data={radarData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 11, fill: '#6b7280' }} />
          <Radar
            name="Score"
            dataKey="score"
            stroke="#7c3aed"
            fill="#7c3aed"
            fillOpacity={0.2}
          />
          <Tooltip formatter={(val) => [`${val} / 20`, 'Score']} />
        </RadarChart>
      </ResponsiveContainer>

      <div className="mt-4 space-y-4">
        {dimensions.map((d) => {
          const pct = (d.score / d.max) * 100;
          const barColor =
            pct >= 80 ? 'bg-green-500' : pct >= 60 ? 'bg-blue-500' : pct >= 40 ? 'bg-yellow-500' : 'bg-red-400';
          return (
            <div key={d.label}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">{d.label}</span>
                <span className="text-sm font-semibold text-gray-500">
                  {d.score}<span className="text-gray-300">/{d.max}</span>
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div className={`${barColor} h-1.5 rounded-full transition-all`} style={{ width: `${pct}%` }} />
              </div>
              {d.issues.length > 0 && (
                <ul className="mt-1 space-y-0.5">
                  {d.issues.map((issue) => (
                    <li key={issue} className="text-xs text-red-500 flex items-start gap-1">
                      <span className="shrink-0 mt-0.5">•</span>
                      <span>{issue}</span>
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
