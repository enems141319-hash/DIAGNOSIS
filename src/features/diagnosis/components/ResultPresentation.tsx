import type { ReactNode } from 'react';
import { useDiagnosisResult } from '@/features/diagnosis/hooks/useDiagnosisResult';
import { Button, SurfaceCard } from '@/shared/components/ui';
import type { DiagnosisDimensionKey } from '@/features/diagnosis/types';

export function ResultPresentation() {
  const { result, restartDiagnosis, returnHome } = useDiagnosisResult();

  if (!result) {
    return null;
  }

  return (
    <div className="space-y-8">
      <SurfaceCard tone="glass" className="space-y-8 px-8 py-10 md:px-12 md:py-12">
        <div className="space-y-4">
          <div className="text-[11px] uppercase tracking-[0.32em] text-ink-3">
            診斷結果
          </div>
          <h1 className="text-5xl font-semibold leading-none tracking-[-0.03em] text-bone md:text-7xl">
            {formatOverallLevel(result.overallLevel)}
          </h1>
          <p className="max-w-3xl text-base leading-7 text-ink-2 md:text-lg">
            {result.overallSummary}
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <StatItem label="總分">
            {Math.round(result.totalScore)} / {Math.round(result.maxScore)}
          </StatItem>
          <StatItem label="整體百分比">{result.percentage}%</StatItem>
          <StatItem label="最低分面向">
            {result.lowestDimension
              ? `${formatDimension(result.lowestDimension.dimension)} ${result.lowestDimension.percentage}%`
              : '無'}
          </StatItem>
        </div>
      </SurfaceCard>

      <section className="grid gap-5 lg:grid-cols-2">
        <SurfaceCard tone="high" className="space-y-5">
          <SectionLabel>面向洞察</SectionLabel>
          <div className="space-y-4">
            {result.dimensionInsights.map((item) => (
              <div key={item.dimension} className="rounded-[2rem] bg-white/[0.04] p-5">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-xl font-semibold text-bone">{item.title}</h2>
                  <span className="text-sm text-accent">{item.percentage}%</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-ink-2">{item.summary}</p>
              </div>
            ))}
          </div>
        </SurfaceCard>

        <div className="grid gap-5">
          <SurfaceCard tone="high" className="space-y-5">
            <SectionLabel>關鍵問題</SectionLabel>
            <ul className="space-y-3 text-sm leading-6 text-ink-2">
              {result.keyProblems.map((item) => (
                <li key={item} className="rounded-[2rem] bg-white/[0.04] p-5">
                  {item}
                </li>
              ))}
            </ul>
          </SurfaceCard>

          <SurfaceCard tone="high" className="space-y-5">
            <SectionLabel>建議方向</SectionLabel>
            <ul className="space-y-3 text-sm leading-6 text-ink-2">
              {result.recommendations.map((item) => (
                <li key={item} className="rounded-[2rem] bg-accent/10 p-5 text-bone">
                  {item}
                </li>
              ))}
            </ul>
          </SurfaceCard>
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <Button variant="accent" onClick={restartDiagnosis}>
          重新開始
        </Button>
        <Button variant="ghost" onClick={returnHome}>
          返回首頁
        </Button>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="text-[11px] uppercase tracking-[0.32em] text-ink-3">{children}</div>
  );
}

function StatItem({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-full bg-white/[0.05] px-4 py-3 backdrop-blur-xl">
      <div className="text-[10px] uppercase tracking-[0.28em] text-ink-3">{label}</div>
      <div className="mt-1 text-sm font-medium text-bone">{children}</div>
    </div>
  );
}

function formatOverallLevel(level: string) {
  const labels: Record<string, string> = {
    critical: '待重整',
    fragile: '基礎偏弱',
    stable: '穩定成形',
    strong: '成熟穩健',
  };

  return labels[level] ?? level;
}

function formatDimension(dimension: DiagnosisDimensionKey) {
  const labels: Record<DiagnosisDimensionKey, string> = {
    brand_clarity: '品牌清晰度',
    visual_consistency: '視覺一致性',
    differentiation: '市場差異',
    conversion_trust: '轉換與信任',
  };

  return labels[dimension];
}
