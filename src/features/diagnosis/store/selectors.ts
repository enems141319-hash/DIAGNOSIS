import { diagnosisQuestions, diagnosisSections } from '@/features/diagnosis/data';
import type {
  DiagnosisQuestion,
  DiagnosisSection,
  DiagnosisState,
} from '@/features/diagnosis/types';

export function selectCurrentSection(state: DiagnosisState): DiagnosisSection {
  return diagnosisSections[state.currentSectionIndex];
}

export function selectQuestionsBySection(sectionId: DiagnosisSection['id']): DiagnosisQuestion[] {
  return diagnosisQuestions.filter((question) => question.sectionId === sectionId);
}

export function selectAnsweredCount(state: DiagnosisState): number {
  return Object.keys(state.answers).length;
}

export function selectProgressPercentage(state: DiagnosisState): number {
  return Math.round((selectAnsweredCount(state) / diagnosisQuestions.length) * 100);
}

export function selectSelectedAnswer(
  state: DiagnosisState,
  questionId: DiagnosisQuestion['id'],
) {
  return state.answers[questionId];
}

export function selectSectionAnsweredCount(
  state: DiagnosisState,
  sectionId: DiagnosisSection['id'],
) {
  const questions = selectQuestionsBySection(sectionId);
  return questions.filter((question) => state.answers[question.id] !== undefined).length;
}

export function selectIsSectionComplete(
  state: DiagnosisState,
  sectionId: DiagnosisSection['id'],
) {
  const questions = selectQuestionsBySection(sectionId);
  return questions.every((question) => state.answers[question.id] !== undefined);
}
