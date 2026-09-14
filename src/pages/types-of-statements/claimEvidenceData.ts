/* Data extracted from
   public/legacy/WMSI_GP0457_The-Source_Claim-vs-Evidence_TOOL.html
   All content preserved verbatim from the Sungai Chantek case study. */

export const TOOL_ID = 'claim-evidence';

export type SortAnswer = 'claim' | 'evidence' | 'combined';
export interface SortCard {
  text: string;
  answer: SortAnswer;
  why: string;
}
export const SORT_CARDS: SortCard[] = [
  { text: 'The river is finally getting cleaner.', answer: 'claim', why: 'A statement with no source, data, or method behind it — just an assertion.' },
  { text: 'The Department of Environment recorded a Water Quality Index of 72 (Class II – Clean) at the Sungai Chantek monitoring station on 3 March 2026, up from 48 (Class III) a year earlier.', answer: 'evidence', why: 'A named source, a standard method (WQI), an exact date, and comparable figures — this is evidence.' },
  { text: 'Residents say water clarity has improved by about 60% this year.', answer: 'claim', why: 'Watch the number trap: there’s no named source, no method, and "about 60%" is a rough impression, not a measurement.' },
  { text: 'The Ipoh Town Council recorded zero reports of illegal dumping along Sungai Chantek in the past two months, compared with six reports over the same period last year.', answer: 'evidence', why: 'A named body, a countable record, and two comparable time periods.' },
  { text: 'The Perak Fisheries Department counted 14 fish species in the river in January 2026, compared with 3 species recorded in 2019.', answer: 'evidence', why: 'A specialist body, a survey method, dates, and comparable figures.' },
  { text: 'Everyone in the kampung is happy about the clean-up.', answer: 'claim', why: 'An unqualified generalisation ("everyone") with nothing to support it — the same trap you practised spotting in generalisation work.' },
  { text: 'Sungai Bersih spent RM45,000 clearing 3.2 tonnes of rubbish from the riverbank between January and February 2026, according to its own project report.', answer: 'evidence', why: 'Specific figures, dates, and a named source — though a sharp answer would also flag that the NGO is reporting on its own success (a possible vested interest worth noting when evaluating it).' },
  { text: 'This is the most successful river clean-up in Perak’s history — DOE figures show water quality here has improved faster than at any of the state’s other nine monitored rivers.', answer: 'combined', why: 'A bold claim ("most successful… in history") directly supported by cited comparative evidence (DOE’s figures across nine rivers).' },
  { text: 'Almost 90% of residents surveyed said the river is now safe for swimming, based on a door-to-door survey of 40 households by the Residents’ Association in February 2026.', answer: 'evidence', why: 'It has a method, a sample size, and a date — genuine evidence, though a small, self-reported survey is weaker than an official lab test. Table E rewards you for noticing that difference.' },
  { text: 'You can just tell the water’s cleaner — it doesn’t smell anymore.', answer: 'claim', why: 'A personal sensory impression, not a measurement or a named source.' },
  { text: 'Critics say the clean-up has achieved little, pointing to DOE data showing the Water Quality Index dropped from 72 back to 61 in the two months after monitoring ended.', answer: 'combined', why: 'A sceptical claim directly supported by cited DOE data — combined statements don’t have to be positive.' },
  { text: 'An independent lab test commissioned by the Ipoh Echo found ammoniacal nitrogen levels fell from 3.4 mg/L to 1.1 mg/L between June 2025 and January 2026.', answer: 'evidence', why: 'A named test, a measurable unit, and two comparable dates — strong evidence.' },
  { text: 'Ninety percent of visitors to our clean-up events say they’ll come back next year.', answer: 'claim', why: 'NGO campaign material with no sample size, no method, and no date stated — it reads like a statistic but functions like a claim.' },
  { text: 'It’s obvious the river will only get dirtier again once the rainy season starts.', answer: 'claim', why: 'A prediction stated as if it were fact, with no evidence given for why.' },
  { text: 'Officials warned that without continued funding, water quality could decline again, citing illegal dumping recorded twice by DOE inspectors in the past month.', answer: 'combined', why: 'A claim (quality could decline) directly supported by cited evidence (DOE’s dumping records) — this is what a developed point looks like.' },
];

export type SentenceType = 'claim' | 'evidence' | 'neutral';
export interface ArticleSentence { text: string; type: SentenceType }
export const ARTICLE_SENTENCES: ArticleSentence[] = [
  { text: 'The clean-up of Sungai Chantek has become the talk of Kampung Saujana this year.', type: 'neutral' },
  { text: 'According to the Department of Environment, the river’s Water Quality Index rose from 48 to 72 between March 2025 and March 2026.', type: 'evidence' },
  { text: 'Many residents believe the improvement happened almost overnight.', type: 'claim' },
  { text: 'The Perak Fisheries Department counted 14 fish species in the river in January 2026, compared with just 3 species recorded in 2019.', type: 'evidence' },
  { text: 'Some longtime residents say the river hasn’t looked this healthy since the 1980s.', type: 'claim' },
  { text: 'Sungai Bersih, the NGO that organised weekend clean-ups, reported clearing 3.2 tonnes of rubbish at a cost of RM45,000 between January and February, according to its own project report.', type: 'evidence' },
  { text: 'Almost ninety percent of residents surveyed said they now consider the river safe for swimming, based on a door-to-door survey of 40 households carried out by the Residents’ Association in February.', type: 'evidence' },
  { text: 'Not everyone agrees the clean-up has made a real difference.', type: 'claim' },
  { text: 'Independent lab tests commissioned by this newspaper found ammoniacal nitrogen levels had fallen from 3.4 mg/L to 1.1 mg/L between June 2025 and January 2026.', type: 'evidence' },
  { text: 'Officials warned that without continued funding, illegal dumping — recorded twice by DOE inspectors in the past month — could reverse the progress.', type: 'evidence' },
  { text: 'One resident summed it up simply: "You can just tell the water’s cleaner — it doesn’t smell anymore."', type: 'claim' },
];

export interface UpgradePrompt { evidence: string; basic: string; model: string }
export const UPGRADE_PROMPTS: UpgradePrompt[] = [
  {
    evidence: '"The Perak Fisheries Department counted 14 fish species in January 2026, compared with 3 species in 2019."',
    basic: 'This is useful evidence because it has a number in it.',
    model: 'This is useful evidence because it comes from the Perak Fisheries Department, a specialist body that used a count/survey method, and it compares two dated figures (3 species in 2019 vs 14 in 2026). That before-and-after comparison makes the improvement measurable rather than just claimed.',
  },
  {
    evidence: '"Almost 90% of residents surveyed said the river is now safe for swimming, based on a door-to-door survey of 40 households by the Residents’ Association in February 2026."',
    basic: 'This is evidence because 40 households were surveyed.',
    model: 'This is evidence, but it is weaker than the DOE reading because the Residents’ Association surveyed only 40 households using its own door-to-door method. A small, self-reported sample is more open to bias than an official monitoring-station measurement, so its value to the research is more limited.',
  },
  {
    evidence: '"Sungai Bersih spent RM45,000 clearing 3.2 tonnes of rubbish from the riverbank, according to its own project report."',
    basic: 'This is evidence because Sungai Bersih gives exact figures.',
    model: 'This is evidence, but its value is affected by the fact that Sungai Bersih is reporting on its own project’s success in its own report. The organisation may have a vested interest in presenting a positive result, so a developed evaluation should note that the figures haven’t been independently verified.',
  },
];

export interface PracticeItem { text: string; answer: 'claim' | 'evidence' }
export const PRACTICE_POOL: PracticeItem[] = [
  { text: 'The clean-up has clearly worked.', answer: 'claim' },
  { text: 'DOE figures show ammonia levels fell by two-thirds in six months.', answer: 'evidence' },
  { text: 'Almost everyone in the kampung has noticed a difference.', answer: 'claim' },
  { text: 'A monitoring reading dated January 2026 recorded a WQI of 72.', answer: 'evidence' },
  { text: 'People say the fish are back in bigger numbers than ever.', answer: 'claim' },
  { text: 'Fisheries officers counted 14 species in a January 2026 survey.', answer: 'evidence' },
  { text: 'Nine in ten locals reckon the river’s cleaner now.', answer: 'claim' },
  { text: 'The council logged zero illegal dumping reports in the last two months.', answer: 'evidence' },
  { text: 'It’s the cleanest the river’s been in years, everyone agrees.', answer: 'claim' },
  { text: 'An independent test found nitrogen levels dropped from 3.4 to 1.1 mg/L.', answer: 'evidence' },
  { text: 'Some say the clean-up money was wasted.', answer: 'claim' },
  { text: 'The NGO’s own report says it cleared 3.2 tonnes of rubbish for RM45,000.', answer: 'evidence' },
];

export const LEVEL_TITLES: [number, string][] = [
  [0, 'Rookie'],
  [50, 'Apprentice'],
  [100, 'Scholar'],
  [150, 'Expert'],
  [200, 'Master'],
  [250, 'Legend'],
];
export function levelForXp(xp: number): string {
  let t = 'Rookie';
  for (const [thresh, name] of LEVEL_TITLES) {
    if (xp >= thresh) t = name;
  }
  return t;
}

export interface ChecklistItem { en: string; zh: string }
export const CHECKLIST_ITEMS: ChecklistItem[] = [
  { en: "I can explain why a number in a sentence doesn't automatically make it evidence.", zh: '我能解释为什么句子中出现数字并不代表它就是证据。' },
  { en: 'I can identify the source, method, and date behind a piece of evidence.', zh: '我能识别一则证据的来源、方法和日期。' },
  { en: 'I can tell the difference between a bare claim and a claim supported by cited evidence.', zh: '我能区分单纯的主张和有证据支持的主张。' },
  { en: 'I can write a basic evaluative comment about a piece of evidence.', zh: '我能就一则证据写出一个基础的评价句。' },
  { en: "I can develop that comment further by explaining why the evidence is (or isn't) reliable.", zh: '我能进一步展开该评价句，解释该证据是否可靠。' },
  { en: "I can spot when a source might have a vested interest in the story it's telling.", zh: '我能识别一个来源在讲述该故事时是否存在既得利益。' },
  { en: 'I understand the difference between Level 2 (basic) and Level 3 (developed) on Table E.', zh: '我理解表E中第2级（基础）与第3级（展开）之间的区别。' },
  { en: 'I know which card in Sort & Classify fooled me, and why.', zh: '我知道在「分类卡片」环节中哪张卡片曾误导我，以及原因。' },
];
