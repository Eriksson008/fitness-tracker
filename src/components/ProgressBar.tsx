type ProgressBarProps = {
  value: number;
  max: number;
  label: string;
};

export function ProgressBar({ value, max, label }: ProgressBarProps) {
  const percent = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;

  return (
    <div className="progress-block">
      <div className="progress-row">
        <span>{label}</span>
        <strong>
          {Math.round(value).toLocaleString()} / {Math.round(max).toLocaleString()}
        </strong>
      </div>
      <div aria-label={label} aria-valuemax={max} aria-valuemin={0} aria-valuenow={value} className="progress-track" role="progressbar">
        <span style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
