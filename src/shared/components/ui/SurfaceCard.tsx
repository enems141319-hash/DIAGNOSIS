import type { PropsWithChildren } from 'react';

type SurfaceCardProps = PropsWithChildren<{
  tone?: 'low' | 'high' | 'glass';
  className?: string;
}>;

const toneClassName = {
  low: 'bg-surface-1',
  high: 'bg-surface-2',
  glass: 'bg-white/[0.04] backdrop-blur-2xl ring-1 ring-white/10',
};

export function SurfaceCard({
  tone = 'low',
  className = '',
  children,
}: SurfaceCardProps) {
  return (
    <div
      className={[
        'rounded-monolith p-6 shadow-ambient',
        toneClassName[tone],
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
}
