import type { DiagnosisSection } from '@/features/diagnosis/types';
import { ProgressBar, SurfaceCard } from '@/shared/components/ui';

type SectionStat = {
  id: string;
  answered: number;
  total: number;
};

type DiagnosisProgressPanelProps = {
  progress: number;
  currentStep: number;
  totalSteps: number;
  answeredInSection: number;
  sectionTitle: string;
  sections: DiagnosisSection[];
  sectionStats: SectionStat[];
};

export function DiagnosisProgressPanel({
  progress,
  currentStep,
  sections,
  sectionStats,
}: DiagnosisProgressPanelProps) {
  return (
    <SurfaceCard tone="glass" className="space-y-6 lg:sticky lg:top-6">
      <div className="space-y-2">
        <div className="text-[11px] uppercase tracking-[0.32em] text-ink-3">
          診斷進度
        </div>
        <div className="text-2xl font-semibold tracking-[-0.02em] text-bone">
          {currentStep} / {sections.length} 段
        </div>
      </div>

      <ProgressBar value={progress} label="完成度" />

      {/* Mobile: 4-column compact grid */}
      <div className="grid grid-cols-4 gap-1.5 lg:hidden">
        {sections.map((section, index) => {
          const isActive = index + 1 === currentStep;
          const stat = sectionStats.find((s) => s.id === section.id);
          const answered = stat?.answered ?? 0;
          const total = stat?.total ?? 0;
          const isDone = answered === total && total > 0;

          return (
            <div
              key={section.id}
              className={[
                'rounded-2xl px-2 py-2.5 text-center transition',
                isActive ? 'bg-accent text-bone' : 'bg-white/[0.04] text-ink-3',
              ].join(' ')}
            >
              <div className="text-[9px] tabular-nums opacity-60">
                {answered}/{total}
              </div>
              <div className="mt-1 text-[10px] font-semibold leading-tight">
                {section.title}
              </div>
              {isDone && !isActive && (
                <div className="mx-auto mt-1.5 h-0.5 w-4 rounded-full bg-accent/60" />
              )}
            </div>
          );
        })}
      </div>

      {/* Desktop: full list */}
      <div className="hidden space-y-2 lg:block">
        {sections.map((section, index) => {
          const isActive = index + 1 === currentStep;
          const stat = sectionStats.find((s) => s.id === section.id);
          const answered = stat?.answered ?? 0;
          const total = stat?.total ?? 0;
          const isDone = answered === total && total > 0;

          return (
            <div
              key={section.id}
              className={[
                'rounded-[2rem] px-4 py-4 transition',
                isActive ? 'bg-accent text-bone' : 'bg-white/[0.04] text-ink-2',
              ].join(' ')}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="text-[10px] uppercase tracking-[0.28em] opacity-70">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div
                  className={[
                    'text-xs tabular-nums',
                    isActive ? 'text-bone/80' : isDone ? 'text-accent' : 'text-ink-3',
                  ].join(' ')}
                >
                  {answered} / {total}
                </div>
              </div>
              <div className="mt-2 text-sm font-medium">{section.title}</div>
            </div>
          );
        })}
      </div>
    </SurfaceCard>
  );
}
