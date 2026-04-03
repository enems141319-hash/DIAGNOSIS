import type { PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { DiagnosisProvider } from '@/features/diagnosis/store/DiagnosisProvider';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <BrowserRouter>
      <DiagnosisProvider>{children}</DiagnosisProvider>
    </BrowserRouter>
  );
}
