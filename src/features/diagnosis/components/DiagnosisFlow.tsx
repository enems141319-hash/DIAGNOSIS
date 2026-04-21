import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DiagnosisProgressPanel } from '@/features/diagnosis/components/DiagnosisProgressPanel';
import { QuestionSection } from '@/features/diagnosis/components/QuestionSection';
import { useDiagnosisFlow } from '@/features/diagnosis/hooks/useDiagnosisFlow';
import {
  selectQuestionsBySection,
  selectSectionAnsweredCount,
} from '@/features/diagnosis/store';
import { Button } from '@/shared/components/ui';

export function DiagnosisFlow() {
  const navigate = useNavigate();
  const {
    state,
    sections,
    currentSection,
    currentQuestions,
    progress,
    answeredInSection,
    isCurrentSectionComplete,
    isFirstSection,
    isLastSection,
    updateAnswer,
    nextSection,
    previousSection,
    submitDiagnosis,
  } = useDiagnosisFlow();

  function handleNext() { nextSection(); }
  function handlePrevious() { previousSection(); }
  function handleSubmit() {
    submitDiagnosis();
    navigate('/result');
  }

  const currentIndex = state.currentSectionIndex;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentIndex]);

  const sectionStats = sections.map((section) => ({
    id: section.id,
    answered: selectSectionAnsweredCount(state, section.id),
    total: selectQuestionsBySection(section.id).length,
  }));

  return (
    <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
      <DiagnosisProgressPanel
        progress={progress}
        currentStep={currentIndex + 1}
        totalSteps={sections.length}
        answeredInSection={answeredInSection}
        sectionTitle={currentSection.title}
        sections={sections}
        sectionStats={sectionStats}
      />

      <div className="space-y-8">
        <QuestionSection
          title={currentSection.title}
          description={currentSection.description}
          questions={currentQuestions}
          answers={state.answers}
          onAnswerChange={updateAnswer}
        />

        <div className="flex flex-wrap gap-3">
          <Button variant="ghost" onClick={handlePrevious} disabled={isFirstSection}>
            上一段
          </Button>
          {isLastSection ? (
            <Button
              variant="ghost"
              onClick={handleSubmit}
              disabled={!isCurrentSectionComplete}
              className="font-bold !text-accent"
            >
              產出結果
            </Button>
          ) : (
            <Button
              variant="bone"
              onClick={handleNext}
              disabled={!isCurrentSectionComplete}
            >
              下一段
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
