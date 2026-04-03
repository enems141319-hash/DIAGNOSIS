import type { PropsWithChildren } from 'react';

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-surface-0 text-ink-1">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(255,77,46,0.08),transparent_30%)]" />
      <div className="relative">{children}</div>
    </div>
  );
}
