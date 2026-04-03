import { useMemo } from 'react';
import { diagnosisSections } from '@/features/diagnosis/data';
import {
  selectCurrentSection,
  selectIsSectionComplete,
  selectProgressPercentage,
  selectQuestionsBySection,
  selectSectionAnsweredCount,
  useDiagnosisContext,
} from '@/features/diagnosis/store';

export function useDiagnosisFlow() {
  const {
    state,
    updateAnswer,
    nextSection,
    previousSection,
    submitDiagnosis,
    resetDiagnosis,
  } = useDiagnosisContext();

  const currentSection = selectCurrentSection(state);
  const currentQuestions = selectQuestionsBySection(currentSection.id);
  const progress = selectProgressPercentage(state);
  const answeredInSection = selectSectionAnsweredCount(state, currentSection.id);
  const isCurrentSectionComplete = selectIsSectionComplete(state, currentSection.id);
  const isFirstSection = state.currentSectionIndex === 0;
  const isLastSection = state.currentSectionIndex === diagnosisSections.length - 1;

  return useMemo(
    () => ({
      state,
      sections: diagnosisSections,
      currentSection,
      currentQuestions,
      progress,
      answeredInSection,
      isCurrentSectionComplete,
      isFirstSection,
      isLastSection,
      updateAnswer,
      nextSection,
      previousSection,
      submitDiagnosis,
      resetDiagnosis,
    }),
    [
      answeredInSection,
      currentQuestions,
      currentSection,
      isCurrentSectionComplete,
      isFirstSection,
      isLastSection,
      nextSection,
      previousSection,
      progress,
      resetDiagnosis,
      state,
      submitDiagnosis,
      updateAnswer,
    ],
  );
}
