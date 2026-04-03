import type { PropsWithChildren } from 'react';

type StatPillProps = PropsWithChildren<{
  label: string;
}>;

export function StatPill({ label, children }: StatPillProps) {
  return (
    <div className="rounded-full bg-white/5 px-4 py-3 backdrop-blur-xl">
      <div className="text-[10px] uppercase tracking-[0.28em] text-ink-3">{label}</div>
      <div className="mt-1 text-sm font-medium text-bone">{children}</div>
    </div>
  );
}
