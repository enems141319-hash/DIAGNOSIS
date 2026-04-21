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
  UrgencyCategory,
  UrgencyScores,
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
  const percentage = Math.max(
    diagnosisScoringRules.normalizationFloor,
    Math.min(100, Math.round(maxScore === 0 ? 0 : (rawTotal / maxScore) * 100)),
  );

  return {
    totalScore: percentage,
    maxScore: 100,
    percentage,
  };
}

// Returns the highest-urgency dimension (highest percentage = most urgent need).
export function findLowestDimension(
  dimensionScores: DimensionScore[],
): DimensionScore | null {
  if (dimensionScores.length === 0) {
    return null;
  }

  return [...dimensionScores].sort((left, right) => {
    if (left.percentage !== right.percentage) {
      return right.percentage - left.percentage;
    }

    return right.score - left.score;
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
  return [...dimensionScores]
    .sort((left, right) => right.percentage - left.percentage)
    .map((dimensionScore) => {
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
  return [...dimensionScores]
    .filter((item) => item.percentage >= dimensionBandThresholds.medium)
    .sort((left, right) => right.percentage - left.percentage)
    .map((item) => pickDimensionBandText(item.percentage, item.dimension).problem);
}

export function buildRecommendations(dimensionScores: DimensionScore[]) {
  return [...dimensionScores]
    .sort((left, right) => right.percentage - left.percentage)
    .slice(0, 2)
    .map((item) => pickDimensionBandText(item.percentage, item.dimension).recommendation);
}

// Questions contributing to each urgency category for the base weighted-risk calculation.
const URGENCY_QUESTION_MAP: Record<UrgencyCategory, DiagnosisQuestionId[]> = {
  branding: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'],
  web: ['Q16', 'Q18', 'Q19', 'Q20'],
  space: ['Q12', 'Q15', 'Q17'],
  social: ['Q9', 'Q10', 'Q16', 'Q18'],
};

function getQuestionScoreValue(
  questionId: DiagnosisQuestionId,
  answers: DiagnosisAnswerMap,
): number | null {
  const optionId = answers[questionId];
  if (!optionId) return null;
  const question = questionMap.get(questionId);
  if (!question) return null;
  return question.options.find((o) => o.id === optionId)?.score ?? null;
}

export function calculateUrgency(answers: DiagnosisAnswerMap): UrgencyScores {
  const normalized = normalizeAnswers(answers);
  const q = (id: string) => getQuestionScoreValue(id, normalized);

  const categories: UrgencyCategory[] = ['branding', 'web', 'space', 'social'];
  const base = {} as Record<UrgencyCategory, number>;

  // Scores are direct urgency signals: high score = high urgency (1–4 scale).
  // Normalize per category: base = (sum score*weight) / (sum 4*weight) * 100
  for (const category of categories) {
    let total = 0;
    let maxTotal = 0;

    for (const qId of URGENCY_QUESTION_MAP[category]) {
      const question = questionMap.get(qId);
      if (!question) continue;
      maxTotal += 4 * question.weight;
      const score = q(qId);
      if (score !== null) {
        total += score * question.weight;
      }
    }

    base[category] = maxTotal === 0 ? 0 : Math.round((total / maxTotal) * 100);
  }

  // Force-trigger bonuses — aligned with new score direction (high score = urgent).
  // Reversed questions (Q2,Q3,Q4,Q5,Q12,Q13,Q16,Q17,Q18,Q19): urgent = score >= 3.
  // Unchanged questions (Q1,Q15): urgent = score >= 3.
  const brandingBonus =
    (q('Q1') !== null && q('Q1')! >= 3 ? 25 : 0) +
    (q('Q3') !== null && q('Q3')! >= 3 ? 25 : 0) +
    (q('Q5') !== null && q('Q5')! === 4 ? 30 : 0);

  const webBonus =
    (q('Q16') !== null && q('Q16')! >= 3 ? 25 : 0) +
    (q('Q18') !== null && q('Q18')! >= 3 ? 30 : 0);

  const spaceBonus =
    (q('Q17') !== null && q('Q17')! >= 3 ? 25 : 0) +
    (q('Q12') !== null && q('Q12')! >= 3 ? 20 : 0) +
    (q('Q15') !== null && q('Q15')! >= 3 ? 20 : 0);

  const socialBonus =
    (q('Q16') !== null && q('Q16')! >= 2 ? 20 : 0) +
    (q('Q18') !== null && q('Q18')! >= 3 ? 25 : 0);

  return {
    branding: Math.min(100, base.branding + brandingBonus),
    web: Math.min(100, base.web + webBonus),
    space: Math.min(100, base.space + spaceBonus),
    social: Math.min(100, base.social + socialBonus),
  };
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
    urgency: calculateUrgency(answers),
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
    brand: '概況與展望',
    visual: '消費者角度',
    growth: '經營與擴張',
    conversion: '轉換與現況',
  };

  return titles[dimension];
}
