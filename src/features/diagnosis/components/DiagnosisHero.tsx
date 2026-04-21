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
            <h1 className="max-w-3xl text-5xl font-black leading-none tracking-[-0.03em] text-accent md:text-7xl">
              你是真的有需要做品牌嗎？
            </h1>
            <p className="max-w-2xl text-base leading-7 text-ink-2 md:text-lg">
              並不是每個產業都需要做品牌系統，讓我們用簡單的診斷來識別你是否需要投資品牌建立。
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/diagnosis" className={getButtonClassName('accent')}>
              開始診斷
            </Link>
            <a href="https://snapcostudio.com/" target="_blank" rel="noreferrer" className={getButtonClassName('ghost')}>
              返回SnapCo首頁
            </a>
          </div>
        </div>
        <div className="grid gap-3">
          <MetricBlock label="流程">四大分類診斷</MetricBlock>
          <MetricBlock label="計分">總共20題選擇，依權重計分</MetricBlock>
          <MetricBlock label="結果">越高分代表急迫性越高</MetricBlock>
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
      <div className="text-[10px] uppercase tracking-[0.28em] text-accent">{label}</div>
      <div className="mt-2 text-sm text-bone">{children}</div>
    </div>
  );
}
