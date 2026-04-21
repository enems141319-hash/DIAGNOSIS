import type { PropsWithChildren } from 'react';
import { HashRouter } from 'react-router-dom';
import { DiagnosisProvider } from '@/features/diagnosis/store/DiagnosisProvider';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <DiagnosisProvider>{children}</DiagnosisProvider>
    </HashRouter>
  );
}
