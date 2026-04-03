import { useNavigate } from 'react-router-dom';
import { DiagnosisProgressPanel } from '@/features/diagnosis/components/DiagnosisProgressPanel';
import { QuestionSection } from '@/features/diagnosis/components/QuestionSection';
import { useDiagnosisFlow } from '@/features/diagnosis/hooks/useDiagnosisFlow';
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

  function handleSubmit() {
    submitDiagnosis();
    navigate('/result');
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
      <DiagnosisProgressPanel
        progress={progress}
        currentStep={state.currentSectionIndex + 1}
        totalSteps={sections.length}
        answeredInSection={answeredInSection}
        sectionTitle={currentSection.title}
        sections={sections}
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
          <Button variant="ghost" onClick={previousSection} disabled={isFirstSection}>
            上一段
          </Button>
          {isLastSection ? (
            <Button
              variant="accent"
              onClick={handleSubmit}
              disabled={!isCurrentSectionComplete}
            >
              產出結果
            </Button>
          ) : (
            <Button
              variant="bone"
              onClick={nextSection}
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
