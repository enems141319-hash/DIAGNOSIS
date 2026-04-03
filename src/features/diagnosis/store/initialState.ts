import type { DiagnosisState } from '@/features/diagnosis/types';

export const initialDiagnosisState: DiagnosisState = {
  status: 'idle',
  currentSectionIndex: 0,
  answers: {},
  result: null,
};
