import { diagnosisQuestionBank } from '@/features/diagnosis/scoring/questionBank';
import {
  dimensionBandThresholds,
  diagnosisScoringRules,
  overallLevelThresholds,
} from '@/features/diagnosis/scoring/scoringRules';
import {
  dimensionTextRules,
  overallSummaryRules,
} from '@/features/diagnosis/scoring/resultTextRules';
import type {
  DiagnosisAnswerMap,
  DiagnosisDimensionKey,
  DiagnosisOverallLevel,
  DiagnosisQuestionDefinition,
  DiagnosisQuestionId,
  DiagnosisResult,
  DimensionScore,
  DimensionTextRule,
} from '@/features/diagnosis/scoring/types';

const questionMap = new Map<DiagnosisQuestionId, DiagnosisQuestionDefinition>(
  diagnosisQuestionBank.map((question) => [question.id, question]),
);

validateDiagnosisConfiguration();

export function getDiagnosisQuestionBank() {
  return diagnosisQuestionBank;
}

export function normalizeAnswers(answers: DiagnosisAnswerMap): DiagnosisAnswerMap {
  return Object.fromEntries(
    Object.entries(answers).filter(([, value]) => value !== undefined),
  ) as DiagnosisAnswerMap;
}

export function calculateQuestionScore(
  questionId: DiagnosisQuestionId,
  answers: DiagnosisAnswerMap,
): number {
  const answer = answers[questionId];
  const question = getQuestion(questionId);

  if (!answer) {
    return 0;
  }

  const option = question.options.find((item) => item.id === answer);
  if (!option) {
    return 0;
  }

  return option.score * question.weight;
}

export function calculateDimensionScores(
  answers: DiagnosisAnswerMap,
): DimensionScore[] {
  const normalizedAnswers = normalizeAnswers(answers);
  const dimensions = new Map<DiagnosisDimensionKey, DimensionScore>();

  for (const question of diagnosisQuestionBank) {
    const current = dimensions.get(question.dimension) ?? {
      dimension: question.dimension,
      score: 0,
      maxScore: 0,
      percentage: 0,
      answeredQuestions: 0,
    };

    const maxOptionScore = Math.max(...question.options.map((option) => option.score));
    current.maxScore += maxOptionScore * question.weight;
    current.score += calculateQuestionScore(question.id, normalizedAnswers);

    if (normalizedAnswers[question.id]) {
      current.answeredQuestions += 1;
    }

    dimensions.set(question.dimension, current);
  }

  return Array.from(dimensions.values()).map((item) => ({
    ...item,
    percentage:
      item.maxScore === 0
        ? 0
        : Math.round((item.score / item.maxScore) * 100),
  }));
}

export function calculateTotalScore(dimensionScores: DimensionScore[]) {
  const rawTotal = dimensionScores.reduce((sum, item) => sum + item.score, 0);
  const maxScore = dimensionScores.reduce((sum, item) => sum + item.maxScore, 0);
  const basePercentage = maxScore === 0 ? 0 : (rawTotal / maxScore) * 100;
  const lowest = findLowestDimension(dimensionScores);
  const weaknessPenalty = lowest
    ? (100 - lowest.percentage) * diagnosisScoringRules.weaknessPenaltyRate
    : 0;
  const percentage = Math.max(
    diagnosisScoringRules.normalizationFloor,
    Math.min(100, Math.round(basePercentage - weaknessPenalty)),
  );

  return {
    totalScore: percentage,
    maxScore: 100,
    percentage,
  };
}

export function findLowestDimension(
  dimensionScores: DimensionScore[],
): DimensionScore | null {
  if (dimensionScores.length === 0) {
    return null;
  }

  return [...dimensionScores].sort((left, right) => {
    if (left.percentage !== right.percentage) {
      return left.percentage - right.percentage;
    }

    return left.score - right.score;
  })[0];
}

export function resolveOverallLevel(
  percentage: number,
): DiagnosisOverallLevel {
  const match =
    overallLevelThresholds.find((item) => percentage >= item.minPercentage) ??
    overallLevelThresholds[overallLevelThresholds.length - 1];

  return match.level;
}

export function buildOverallSummary(level: DiagnosisOverallLevel) {
  return overallSummaryRules[level].summary;
}

export function buildDimensionInsights(dimensionScores: DimensionScore[]) {
  return dimensionScores.map((dimensionScore) => {
    const texts = pickDimensionBandText(
      dimensionScore.percentage,
      dimensionScore.dimension,
    );

    return {
      dimension: dimensionScore.dimension,
      title: formatDimensionTitle(dimensionScore.dimension),
      summary: texts.insight,
      score: Math.round(dimensionScore.score * 10) / 10,
      percentage: dimensionScore.percentage,
    };
  });
}

export function buildKeyProblems(dimensionScores: DimensionScore[]) {
  return dimensionScores
    .filter((item) => item.percentage < dimensionBandThresholds.strong)
    .sort((left, right) => left.percentage - right.percentage)
    .map((item) => pickDimensionBandText(item.percentage, item.dimension).problem);
}

export function buildRecommendations(dimensionScores: DimensionScore[]) {
  return dimensionScores
    .sort((left, right) => left.percentage - right.percentage)
    .slice(0, 2)
    .map((item) => pickDimensionBandText(item.percentage, item.dimension).recommendation);
}

export function runDiagnosisScoring(
  answers: DiagnosisAnswerMap,
): DiagnosisResult {
  const dimensionScores = calculateDimensionScores(answers);
  const totals = calculateTotalScore(dimensionScores);
  const overallLevel = resolveOverallLevel(totals.percentage);
  const lowestDimension = findLowestDimension(dimensionScores);

  return {
    ...totals,
    overallLevel,
    overallSummary: buildOverallSummary(overallLevel),
    dimensionScores,
    lowestDimension,
    dimensionInsights: buildDimensionInsights(dimensionScores),
    keyProblems: buildKeyProblems(dimensionScores),
    recommendations: buildRecommendations(dimensionScores),
  };
}

export function validateDiagnosisConfiguration() {
  for (const question of diagnosisQuestionBank) {
    if (question.options.length < 2) {
      throw new Error(`Question must have at least 2 options: ${question.id}`);
    }

    if (question.weight <= 0) {
      throw new Error(`Question weight must be positive: ${question.id}`);
    }
  }
}

function getQuestion(questionId: DiagnosisQuestionId): DiagnosisQuestionDefinition {
  const question = questionMap.get(questionId);

  if (!question) {
    throw new Error(`Missing question bank entry: ${questionId}`);
  }

  return question;
}

function pickDimensionBandText(
  percentage: number,
  dimension: DiagnosisDimensionKey,
): DimensionTextRule['weak' | 'medium' | 'strong'] {
  const texts = dimensionTextRules[dimension];

  if (percentage >= dimensionBandThresholds.strong) {
    return texts.strong;
  }

  if (percentage >= dimensionBandThresholds.medium) {
    return texts.medium;
  }

  return texts.weak;
}

function formatDimensionTitle(dimension: DiagnosisDimensionKey) {
  const titles: Record<DiagnosisDimensionKey, string> = {
    brand_clarity: '品牌清晰度',
    visual_consistency: '視覺一致性',
    differentiation: '市場差異',
    conversion_trust: '轉換與信任',
  };

  return titles[dimension];
}
