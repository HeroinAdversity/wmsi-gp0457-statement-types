import { LegacyRedirect } from '../../components/LegacyRedirect';
import { Bi } from '../../lib/LanguageContext';

export function IntensiveDashboardPage() {
  return (
    <LegacyRedirect
      to="/legacy/WMSI_GP0457_Y10_T1_W2-3_Statement-Types-Intensive_Teacher-Dashboard.html"
      title={<Bi en="Teacher Dashboard — Intensive" zh="教师面板 —— 强化练习" />}
    />
  );
}
