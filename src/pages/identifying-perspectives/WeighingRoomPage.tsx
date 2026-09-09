import { LegacyRedirect } from '../../components/LegacyRedirect';
import { Bi } from '../../lib/LanguageContext';

export function WeighingRoomPage() {
  return (
    <LegacyRedirect
      to="/legacy/the-weighing-room-q1d.html"
      title={<Bi en="The Weighing Room — Q1(d) Significance" zh="秤量之室 —— 第 1(d) 题：重要性" />}
    />
  );
}
