import { useNavigate } from 'react-router-dom';
import { useDiagnosisContext } from '@/features/diagnosis/store';

export function useDiagnosisResult() {
  const navigate = useNavigate();
  const { state, resetDiagnosis } = useDiagnosisContext();

  function restartDiagnosis() {
    resetDiagnosis();
    navigate('/diagnosis', { replace: true });
  }

  function returnHome() {
    resetDiagnosis();
    navigate('/', { replace: true });
  }

  return {
    result: state.result,
    resetDiagnosis,
    restartDiagnosis,
    returnHome,
  };
}
