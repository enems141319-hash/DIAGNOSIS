import type {
  DiagnosisOverallLevel,
  DimensionScoringRule,
} from '@/features/diagnosis/scoring/types';

export const diagnosisScoringRules: DimensionScoringRule = {
  weaknessPenaltyRate: 0.12,
  normalizationFloor: 0,
};

export const overallLevelThresholds: Array<{
  level: DiagnosisOverallLevel;
  minPercentage: number;
}> = [
  { level: 'strong', minPercentage: 75 },
  { level: 'stable', minPercentage: 55 },
  { level: 'fragile', minPercentage: 35 },
  { level: 'critical', minPercentage: 0 },
];

export const dimensionBandThresholds = {
  strong: 75,
  medium: 45,
};
