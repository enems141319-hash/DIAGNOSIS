import { Link } from 'react-router-dom';
import { getButtonClassName, SurfaceCard } from '@/shared/components/ui';

export function DiagnosisHero() {
  return (
    <SurfaceCard tone="glass" className="overflow-hidden px-8 py-10 md:px-12 md:py-14">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)] lg:items-end">
        <div className="space-y-6">
          <div className="text-[11px] uppercase tracking-[0.32em] text-ink-3">
            Strategic Monolith
          </div>
          <div className="space-y-4">
            <h1 className="max-w-3xl text-5xl font-semibold leading-none tracking-[-0.03em] text-bone md:text-7xl">
              在擴張之前，先看清你的品牌結構。
            </h1>
            <p className="max-w-2xl text-base leading-7 text-ink-2 md:text-lg">
              透過品牌清晰度、視覺一致性、市場差異與轉換信任四個面向，快速找出目前最影響品牌成效的問題。
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/diagnosis" className={getButtonClassName('accent')}>
              開始診斷
            </Link>
            <Link to="/result" className={getButtonClassName('ghost')}>
              查看結果頁
            </Link>
          </div>
        </div>
        <div className="grid gap-3">
          <MetricBlock label="流程">多步驟品牌診斷流程</MetricBlock>
          <MetricBlock label="計分">純前端本地計分，不串 API</MetricBlock>
          <MetricBlock label="架構">React feature module 拆分</MetricBlock>
        </div>
      </div>
    </SurfaceCard>
  );
}

function MetricBlock({
  label,
  children,
}: {
  label: string;
  children: string;
}) {
  return (
    <div className="rounded-[2rem] bg-white/[0.04] px-5 py-4 backdrop-blur-xl">
      <div className="text-[10px] uppercase tracking-[0.28em] text-ink-3">{label}</div>
      <div className="mt-2 text-sm text-bone">{children}</div>
    </div>
  );
}
