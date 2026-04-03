type ProgressBarProps = {
  value: number;
  label?: string;
};

export function ProgressBar({ value, label }: ProgressBarProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-ink-3">
        <span>{label ?? '進度'}</span>
        <span>{value}%</span>
      </div>
      <div className="h-3 rounded-full bg-white/5 p-1 backdrop-blur-xl">
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-300"
          style={{ width: `${Math.max(0, Math.min(value, 100))}%` }}
        />
      </div>
    </div>
  );
}
