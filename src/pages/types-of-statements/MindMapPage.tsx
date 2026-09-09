import { LegacyRedirect } from '../../components/LegacyRedirect';
import { Bi } from '../../lib/LanguageContext';

export function MindMapPage() {
  return (
    <LegacyRedirect
      to="/legacy/mindmap.html"
      title={<Bi en="Statement Types — Mind Map" zh="陈述类型 —— 思维导图" />}
    />
  );
}
