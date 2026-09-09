import { LegacyRedirect } from '../../components/LegacyRedirect';
import { Bi } from '../../lib/LanguageContext';

export function ClaimVsEvidencePage() {
  return (
    <LegacyRedirect
      to="/legacy/WMSI_GP0457_The-Source_Claim-vs-Evidence_TOOL.html"
      title={<Bi en="Claim vs Evidence — The Source" zh="断言与证据 —— 解读资料" />}
    />
  );
}
