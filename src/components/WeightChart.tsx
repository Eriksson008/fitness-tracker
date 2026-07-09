import type { WeightEntry } from "@prisma/client";
import { formatDate } from "@/lib/date";

export function WeightChart({ entries }: { entries: WeightEntry[] }) {
  const ordered = [...entries].sort((a, b) => a.date.getTime() - b.date.getTime()).slice(-12);

  if (ordered.length < 2) {
    return (
      <div className="empty-chart">
        <strong>No trend yet</strong>
        <span>Add at least two weigh-ins to draw a progress line.</span>
      </div>
    );
  }

  const min = Math.min(...ordered.map((entry) => entry.weightLb));
  const max = Math.max(...ordered.map((entry) => entry.weightLb));
  const range = Math.max(1, max - min);
  const points = ordered.map((entry, index) => {
    const x = (index / Math.max(1, ordered.length - 1)) * 100;
    const y = 88 - ((entry.weightLb - min) / range) * 72;
    return `${x},${y}`;
  });

  return (
    <div className="chart-wrap">
      <svg aria-label="Recent weight trend" preserveAspectRatio="none" role="img" viewBox="0 0 100 100">
        <line className="chart-grid" x1="0" x2="100" y1="16" y2="16" />
        <line className="chart-grid" x1="0" x2="100" y1="52" y2="52" />
        <line className="chart-grid" x1="0" x2="100" y1="88" y2="88" />
        <polyline className="chart-line" points={points.join(" ")} />
        {ordered.map((entry, index) => {
          const [x, y] = points[index].split(",");
          return <circle className="chart-dot" cx={x} cy={y} key={entry.id} r="1.8" />;
        })}
      </svg>
      <div className="chart-labels">
        <span>{formatDate(ordered[0].date)}</span>
        <span>{formatDate(ordered[ordered.length - 1].date)}</span>
      </div>
    </div>
  );
}
