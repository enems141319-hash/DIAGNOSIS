import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type Dispatch,
  type PropsWithChildren,
} from 'react';
import { runDiagnosisScoring } from '@/features/diagnosis/scoring';
import { diagnosisReducer } from '@/features/diagnosis/store/diagnosisReducer';
import { initialDiagnosisState } from '@/features/diagnosis/store/initialState';
import type {
  DiagnosisAction,
  DiagnosisQuestionId,
  DiagnosisOptionId,
  DiagnosisState,
} from '@/features/diagnosis/types';

type DiagnosisContextValue = {
  state: DiagnosisState;
  dispatch: Dispatch<DiagnosisAction>;
  updateAnswer: (questionId: DiagnosisQuestionId, value: DiagnosisOptionId) => void;
  nextSection: () => void;
  previousSection: () => void;
  submitDiagnosis: () => void;
  resetDiagnosis: () => void;
};

const DiagnosisContext = createContext<DiagnosisContextValue | null>(null);

export function DiagnosisProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(diagnosisReducer, initialDiagnosisState);

  const value = useMemo<DiagnosisContextValue>(() => {
    return {
      state,
      dispatch,
      updateAnswer(questionId, value) {
        dispatch({
          type: 'diagnosis/answerUpdated',
          payload: { questionId, value },
        });
      },
      nextSection() {
        dispatch({ type: 'diagnosis/nextSection' });
      },
      previousSection() {
        dispatch({ type: 'diagnosis/previousSection' });
      },
      submitDiagnosis() {
        const result = runDiagnosisScoring(state.answers);
        dispatch({
          type: 'diagnosis/submitted',
          payload: { result },
        });
      },
      resetDiagnosis() {
        dispatch({ type: 'diagnosis/reset' });
      },
    };
  }, [state]);

  return (
    <DiagnosisContext.Provider value={value}>
      {children}
    </DiagnosisContext.Provider>
  );
}

export function useDiagnosisContext() {
  const context = useContext(DiagnosisContext);

  if (!context) {
    throw new Error('useDiagnosisContext must be used within DiagnosisProvider.');
  }

  return context;
}
