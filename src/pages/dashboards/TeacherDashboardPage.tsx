import { LegacyRedirect } from '../../components/LegacyRedirect';
import { Bi } from '../../lib/LanguageContext';

export function TeacherDashboardPage() {
  return (
    <LegacyRedirect
      to="/legacy/WMSI_GP0457_Y10_T1_W2-3_Teacher-Dashboard.html"
      title={<Bi en="Teacher Dashboard — Statements" zh="教师面板 —— 陈述类型" />}
    />
  );
}
