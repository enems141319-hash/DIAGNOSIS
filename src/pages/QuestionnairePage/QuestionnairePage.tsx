import { useNavigate } from 'react-router-dom';
import { DiagnosisFlow } from '@/features/diagnosis/components';
import { useDiagnosisContext } from '@/features/diagnosis/store';
import { Button } from '@/shared/components/ui';

export function QuestionnairePage() {
  const navigate = useNavigate();
  const { resetDiagnosis } = useDiagnosisContext();

  function handleReturnHome() {
    resetDiagnosis();
    navigate('/', { replace: true });
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-6 py-10 md:px-10">
      <div className="mb-10 flex items-center justify-between gap-6">
        <div>
          <div className="text-[11px] uppercase tracking-[0.32em] text-ink-3">
            SnapCo 品牌診斷
          </div>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.03em] text-bone md:text-5xl">
            結構化品牌檢視
          </h1>
        </div>
        <Button variant="ghost" onClick={handleReturnHome}>
          返回首頁
        </Button>
      </div>
      <DiagnosisFlow />
    </main>
  );
}
