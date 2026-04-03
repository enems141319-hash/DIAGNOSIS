import type { DiagnosisSection } from '@/features/diagnosis/types';
import { ProgressBar, StatPill, SurfaceCard } from '@/shared/components/ui';

type DiagnosisProgressPanelProps = {
  progress: number;
  currentStep: number;
  totalSteps: number;
  answeredInSection: number;
  sectionTitle: string;
  sections: DiagnosisSection[];
};

export function DiagnosisProgressPanel({
  progress,
  currentStep,
  totalSteps,
  answeredInSection,
  sectionTitle,
  sections,
}: DiagnosisProgressPanelProps) {
  return (
    <SurfaceCard tone="glass" className="space-y-6 lg:sticky lg:top-6">
      <div className="space-y-2">
        <div className="text-[11px] uppercase tracking-[0.32em] text-ink-3">
          診斷進度
        </div>
        <h2 className="text-2xl font-semibold tracking-[-0.02em] text-bone">
          {sectionTitle}
        </h2>
      </div>

      <ProgressBar value={progress} label="完成度" />

      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
        <StatPill label="段落">
          {currentStep} / {totalSteps}
        </StatPill>
        <StatPill label="本段已作答">{answeredInSection} 題</StatPill>
        <StatPill label="總區塊">{sections.length} 個</StatPill>
      </div>

      <div className="space-y-3">
        {sections.map((section, index) => {
          const isActive = index + 1 === currentStep;

          return (
            <div
              key={section.id}
              className={[
                'rounded-[2rem] px-4 py-4 transition',
                isActive ? 'bg-accent text-bone' : 'bg-white/[0.04] text-ink-2',
              ].join(' ')}
            >
              <div className="text-[10px] uppercase tracking-[0.28em] opacity-70">
                {String(index + 1).padStart(2, '0')}
              </div>
              <div className="mt-2 text-sm font-medium">{section.title}</div>
            </div>
          );
        })}
      </div>
    </SurfaceCard>
  );
}
