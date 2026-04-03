import type {
  DiagnosisQuestionId,
  DiagnosisOptionId,
  DiagnosisResult,
} from '@/features/diagnosis/types/diagnosis';

export type DiagnosisAction =
  | {
      type: 'diagnosis/answerUpdated';
      payload: {
        questionId: DiagnosisQuestionId;
        value: DiagnosisOptionId;
      };
    }
  | { type: 'diagnosis/nextSection' }
  | { type: 'diagnosis/previousSection' }
  | { type: 'diagnosis/reset' }
  | {
      type: 'diagnosis/submitted';
      payload: {
        result: DiagnosisResult;
      };
    };
