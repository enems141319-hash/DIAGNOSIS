import type {
  DiagnosisAnswerMap,
  DiagnosisDimensionKey,
  DiagnosisOptionId,
  DiagnosisOverallLevel,
  DiagnosisQuestionDefinition as DiagnosisQuestion,
  DiagnosisQuestionId,
  DiagnosisQuestionOption,
  DiagnosisQuestionType,
  DiagnosisResult,
  DiagnosisSection,
  DiagnosisSectionId,
  DimensionInsight as DiagnosisDimensionInsight,
  DimensionScore as DiagnosisDimensionScore,
} from '@/features/diagnosis/scoring/types';

export type {
  DiagnosisAnswerMap,
  DiagnosisDimensionKey,
  DiagnosisOptionId,
  DiagnosisOverallLevel,
  DiagnosisQuestion,
  DiagnosisQuestionId,
  DiagnosisQuestionOption,
  DiagnosisQuestionType,
  DiagnosisResult,
  DiagnosisSection,
  DiagnosisSectionId,
  DiagnosisDimensionInsight,
  DiagnosisDimensionScore,
};

export type DiagnosisStatus = 'idle' | 'in_progress' | 'completed';

export type DiagnosisState = {
  status: DiagnosisStatus;
  currentSectionIndex: number;
  answers: DiagnosisAnswerMap;
  result: DiagnosisResult | null;
};
