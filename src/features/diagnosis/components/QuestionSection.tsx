import type { DiagnosisAnswerMap, DiagnosisQuestion } from '@/features/diagnosis/types';
import { QuestionCard } from '@/features/diagnosis/components/QuestionCard';

type QuestionSectionProps = {
  title: string;
  description: string;
  questions: DiagnosisQuestion[];
  answers: DiagnosisAnswerMap;
  onAnswerChange: (
    questionId: DiagnosisQuestion['id'],
    optionId: NonNullable<DiagnosisAnswerMap[DiagnosisQuestion['id']]>,
  ) => void;
};

export function QuestionSection({
  title,
  description,
  questions,
  answers,
  onAnswerChange,
}: QuestionSectionProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="text-[11px] uppercase tracking-[0.32em] text-ink-3">
          問卷流程
        </div>
        <h2 className="text-4xl font-semibold tracking-[-0.03em] text-bone md:text-5xl">
          {title}
        </h2>
        <p className="max-w-2xl text-base leading-7 text-ink-2">{description}</p>
      </div>

      <div className="space-y-5">
        {questions.map((question) => (
          <QuestionCard
            key={question.id}
            question={question}
            selectedOptionId={answers[question.id]}
            onAnswerChange={onAnswerChange}
          />
        ))}
      </div>
    </div>
  );
}
