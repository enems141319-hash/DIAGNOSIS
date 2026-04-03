import { Navigate, Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage/HomePage';
import { QuestionnairePage } from '@/pages/QuestionnairePage/QuestionnairePage';
import { ResultPage } from '@/pages/ResultPage/ResultPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/diagnosis" element={<QuestionnairePage />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
