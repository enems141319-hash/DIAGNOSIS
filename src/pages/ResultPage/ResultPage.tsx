import { Navigate } from 'react-router-dom';
import { ResultPresentation } from '@/features/diagnosis/components';
import { useDiagnosisResult } from '@/features/diagnosis/hooks/useDiagnosisResult';

export function ResultPage() {
  const { result } = useDiagnosisResult();

  if (!result) {
    return <Navigate to="/diagnosis" replace />;
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-6 py-10 md:px-10">
      <ResultPresentation />
    </main>
  );
}
