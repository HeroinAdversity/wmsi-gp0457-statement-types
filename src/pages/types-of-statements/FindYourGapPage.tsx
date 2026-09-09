import { LegacyRedirect } from '../../components/LegacyRedirect';
import { Bi } from '../../lib/LanguageContext';

export function FindYourGapPage() {
  return (
    <LegacyRedirect
      to="/legacy/WMSI_GP0457_Y10_T1_W2-3_Find-Your-Gap_Diagnostic-Targeted-Practice_TOOL.html"
      title={<Bi en="Find Your Gap — Diagnostic" zh="找差距 —— 诊断练习" />}
    />
  );
}
