import { Routes, Route } from 'react-router-dom';
import { SiteLayout } from './components/SiteLayout';
import { HomePage } from './pages/HomePage';
import { IdentifyingPerspectivesPage } from './pages/identifying-perspectives/IdentifyingPerspectivesPage';
import { WeighingRoomPage } from './pages/identifying-perspectives/WeighingRoomPage';
import { StatementTypesHubPage } from './pages/types-of-statements/StatementTypesHubPage';
import { StatementTypesToolPage } from './pages/types-of-statements/StatementTypesToolPage';
import { StatementTypesIntensivePage } from './pages/types-of-statements/StatementTypesIntensivePage';
import { FindYourGapPage } from './pages/types-of-statements/FindYourGapPage';
import { ClaimVsEvidencePage } from './pages/types-of-statements/ClaimVsEvidencePage';
import { MindMapPage } from './pages/types-of-statements/MindMapPage';
import { TeacherDashboardPage } from './pages/dashboards/TeacherDashboardPage';
import { IntensiveDashboardPage } from './pages/dashboards/IntensiveDashboardPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />

        {/* Identifying Perspectives */}
        <Route path="perspectives" element={<IdentifyingPerspectivesPage />} />
        <Route path="perspectives/weighing-room" element={<WeighingRoomPage />} />

        {/* Types of Statements */}
        <Route path="statements" element={<StatementTypesHubPage />} />
        <Route path="statements/main" element={<StatementTypesToolPage />} />
        <Route path="statements/intensive" element={<StatementTypesIntensivePage />} />
        <Route path="statements/diagnostic" element={<FindYourGapPage />} />
        <Route path="statements/claim-vs-evidence" element={<ClaimVsEvidencePage />} />
        <Route path="statements/mindmap" element={<MindMapPage />} />

        {/* Teacher dashboards */}
        <Route path="teachers/statements" element={<TeacherDashboardPage />} />
        <Route path="teachers/statements-intensive" element={<IntensiveDashboardPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
