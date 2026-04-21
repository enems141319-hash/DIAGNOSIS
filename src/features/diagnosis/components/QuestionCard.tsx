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
    <SurfaceCard tone="glass" className="space-y-6">
      <div className="space-y-3">
        <div className="text-[11px] uppercase tracking-[0.32em] text-ink-3">
          {formatDimension(question.dimension)}
        </div>
        <div className="text-sm font-bold text-accent">{question.id}</div>
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
                'overflow-hidden rounded-[2rem] text-left transition duration-200',
                option.image ? '' : 'min-h-[88px] px-5 py-4',
                isSelected
                  ? option.image
                    ? 'ring-4 ring-accent shadow-ambient'
                    : 'bg-accent text-bone shadow-ambient'
                  : 'bg-white/[0.04] text-ink-2 hover:bg-white/[0.08]',
              ].join(' ')}
            >
              {option.image ? (
                <div className="relative">
                  <img
                    src={option.image}
                    alt={option.label}
                    className="h-48 w-full object-cover"
                  />
                  <div className="absolute left-3 top-3 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-accent text-xs font-bold leading-none text-white">
                    {formatQuestionType(question.type, index)}
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold leading-none text-white">
                    {formatQuestionType(question.type, index)}
                  </div>
                  <div className="mt-3 text-base font-medium">{option.label}</div>
                </>
              )}
            </button>
          );
        })}
      </div>
    </SurfaceCard>
  );
}

function formatDimension(dimension: DiagnosisQuestion['dimension']) {
  const labels: Record<DiagnosisQuestion['dimension'], string> = {
    brand: '概況與展望',
    visual: '消費者角度',
    growth: '經營與擴張',
    conversion: '轉換與現況',
  };

  return labels[dimension];
}

function formatQuestionType(
  _type: DiagnosisQuestion['type'],
  index: number,
) {
  return 'ABCD'[index] ?? String(index + 1);
}
