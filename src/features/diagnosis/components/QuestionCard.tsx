import type { DiagnosisOptionId, DiagnosisQuestion } from '@/features/diagnosis/types';
import { SurfaceCard } from '@/shared/components/ui';

type QuestionCardProps = {
  question: DiagnosisQuestion;
  selectedOptionId?: DiagnosisOptionId;
  onAnswerChange: (questionId: DiagnosisQuestion['id'], optionId: DiagnosisOptionId) => void;
};

export function QuestionCard({
  question,
  selectedOptionId,
  onAnswerChange,
}: QuestionCardProps) {
  return (
    <SurfaceCard tone="high" className="space-y-6">
      <div className="space-y-3">
        <div className="text-[11px] uppercase tracking-[0.32em] text-ink-3">
          {formatDimension(question.dimension)}
        </div>
        <h3 className="text-2xl font-semibold tracking-[-0.02em] text-bone">
          {question.question}
        </h3>
        {question.helperText ? (
          <p className="max-w-3xl text-sm leading-6 text-ink-2">
            {question.helperText}
          </p>
        ) : null}
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {question.options.map((option, index) => {
          const isSelected = option.id === selectedOptionId;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onAnswerChange(question.id, option.id)}
              className={[
                'min-h-[88px] rounded-[2rem] px-5 py-4 text-left transition duration-200',
                isSelected
                  ? 'bg-accent text-bone shadow-ambient'
                  : 'bg-white/[0.04] text-ink-2 backdrop-blur-xl hover:bg-white/[0.08]',
              ].join(' ')}
            >
              <div className="text-[10px] uppercase tracking-[0.28em] opacity-70">
                {formatQuestionType(question.type, index)}
              </div>
              <div className="mt-3 text-base font-medium">{option.label}</div>
            </button>
          );
        })}
      </div>
    </SurfaceCard>
  );
}

function formatDimension(dimension: DiagnosisQuestion['dimension']) {
  const labels: Record<DiagnosisQuestion['dimension'], string> = {
    brand_clarity: '品牌清晰度',
    visual_consistency: '視覺一致性',
    differentiation: '市場差異',
    conversion_trust: '轉換與信任',
  };

  return labels[dimension];
}

function formatQuestionType(
  type: DiagnosisQuestion['type'],
  index: number,
) {
  if (type === 'binary') {
    return index === 0 ? '二選一' : '二選一';
  }

  if (type === 'scenario') {
    return `情境 ${index + 1}`;
  }

  return `選項 ${index + 1}`;
}
