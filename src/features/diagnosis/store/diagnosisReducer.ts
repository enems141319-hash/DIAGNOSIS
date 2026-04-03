import type { DiagnosisAction, DiagnosisState } from '@/features/diagnosis/types';
import { diagnosisSections } from '@/features/diagnosis/data';
import { initialDiagnosisState } from '@/features/diagnosis/store/initialState';

export function diagnosisReducer(
  state: DiagnosisState,
  action: DiagnosisAction,
): DiagnosisState {
  switch (action.type) {
    case 'diagnosis/answerUpdated':
      return {
        ...state,
        status: 'in_progress',
        answers: {
          ...state.answers,
          [action.payload.questionId]: action.payload.value,
        },
      };

    case 'diagnosis/nextSection':
      return {
        ...state,
        currentSectionIndex: Math.min(
          state.currentSectionIndex + 1,
          diagnosisSections.length - 1,
        ),
      };

    case 'diagnosis/previousSection':
      return {
        ...state,
        currentSectionIndex: Math.max(state.currentSectionIndex - 1, 0),
      };

    case 'diagnosis/submitted':
      return {
        ...state,
        status: 'completed',
        result: action.payload.result,
      };

    case 'diagnosis/reset':
      return initialDiagnosisState;

    default:
      return state;
  }
}
