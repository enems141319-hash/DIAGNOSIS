import type { DiagnosisState } from '@/features/diagnosis/types';
import { StatPill, SurfaceCard } from '@/shared/components/ui';

type DiagnosisSummaryCardProps = {
  state: DiagnosisState;
  progress: number;
};

export function DiagnosisSummaryCard({
  state,
  progress,
}: DiagnosisSummaryCardProps) {
  return (
    <SurfaceCard tone="glass" className="space-y-4">
      <StatPill label="狀態">{state.status}</StatPill>
      <StatPill label="進度">{progress}%</StatPill>
      <StatPill label="已作答">{Object.keys(state.answers).length}</StatPill>
    </SurfaceCard>
  );
}
