type MetricCardProps = {
  label: string;
  value: string;
  detail: string;
  tone?: "default" | "accent" | "muted";
};

export function MetricCard({ label, value, detail, tone = "default" }: MetricCardProps) {
  return (
    <article className={`metric-card ${tone}`}>
      <p>{label}</p>
      <strong>{value}</strong>
      <span>{detail}</span>
    </article>
  );
}
