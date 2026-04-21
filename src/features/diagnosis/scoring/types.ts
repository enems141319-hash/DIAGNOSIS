export type DiagnosisDimensionKey =
  | 'brand'
  | 'visual'
  | 'growth'
  | 'conversion';

export type DiagnosisSectionId =
  | 'brand'
  | 'visual'
  | 'growth'
  | 'conversion';

export type DiagnosisQuestionId = string;

export type DiagnosisOptionId = string;

export type DiagnosisQuestionType = 'single' | 'binary' | 'scenario';

export type DiagnosisOverallLevel =
  | 'critical'
  | 'fragile'
  | 'stable'
  | 'strong';

export type DiagnosisQuestionOption = {
  id: DiagnosisOptionId;
  label: string;
  score: number;
  image?: string;
};

export type DiagnosisQuestionDefinition = {
  id: DiagnosisQuestionId;
  sectionId: DiagnosisSectionId;
  question: string;
  helperText?: string;
  dimension: DiagnosisDimensionKey;
  type: DiagnosisQuestionType;
  weight: number;
  options: DiagnosisQuestionOption[];
};

export type DiagnosisSection = {
  id: DiagnosisSectionId;
  title: string;
  description: string;
  questionIds: DiagnosisQuestionId[];
};

export type DiagnosisAnswerMap = Partial<
  Record<DiagnosisQuestionId, DiagnosisOptionId>
>;

export type DimensionScoringRule = {
  weaknessPenaltyRate: number;
  normalizationFloor: number;
};

export type DimensionScore = {
  dimension: DiagnosisDimensionKey;
  score: number;
  maxScore: number;
  percentage: number;
  answeredQuestions: number;
};

export type DimensionInsight = {
  dimension: DiagnosisDimensionKey;
  title: string;
  summary: string;
  score: number;
  percentage: number;
};

export type ResultTextRule = {
  minPercentage: number;
  maxPercentage: number;
  summary: string;
};

export type DimensionTextRule = {
  dimension: DiagnosisDimensionKey;
  weak: {
    insight: string;
    problem: string;
    recommendation: string;
  };
  medium: {
    insight: string;
    problem: string;
    recommendation: string;
  };
  strong: {
    insight: string;
    problem: string;
    recommendation: string;
  };
};

export type UrgencyCategory = 'branding' | 'web' | 'space' | 'social';

export type UrgencyScores = Record<UrgencyCategory, number>;

export type DiagnosisResult = {
  totalScore: number;
  maxScore: number;
  percentage: number;
  overallLevel: DiagnosisOverallLevel;
  overallSummary: string;
  dimensionScores: DimensionScore[];
  lowestDimension: DimensionScore | null;
  dimensionInsights: DimensionInsight[];
  keyProblems: string[];
  recommendations: string[];
  urgency: UrgencyScores;
};
