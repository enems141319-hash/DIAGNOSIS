import type { PropsWithChildren } from 'react';
import bgImage from '@/assets/01back.jpg';

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen text-ink-1">
      <div
        className="pointer-events-none fixed inset-0 will-change-transform"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="pointer-events-none fixed inset-0 will-change-transform bg-black/70" />
      <div className="relative isolate">{children}</div>
      <footer className="fixed bottom-0 left-0 right-0 z-10 py-4 text-center text-[11px] tracking-[0.2em] text-ink-3">
        © {new Date().getFullYear()} SnapCo. All rights reserved.
      </footer>
    </div>
  );
}
