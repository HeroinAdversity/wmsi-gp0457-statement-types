/* Data extracted from
   public/legacy/WMSI_GP0457_Y10_T1_W2-3_Find-Your-Gap_Diagnostic-Targeted-Practice_TOOL.html
   All statements preserved verbatim. */

export const TOOL_ID = 'diagnostic';

export type TrackKey = 'generalisation' | 'pairs' | 'context';

export interface TrackMeta {
  key: TrackKey;
  name: string;
  short: string;
  bandColor: 'amber' | 'cobalt' | 'violet';
}
export const TRACKS: TrackMeta[] = [
  { key: 'generalisation', name: 'Generalisation', short: 'Generalisation', bandColor: 'amber' },
  { key: 'pairs', name: 'Confusable Pairs (Fact / Opinion / Claim / Value)', short: 'Confusable Pairs', bandColor: 'cobalt' },
  { key: 'context', name: 'Context Clues (Bias / Vested Interest / Prediction)', short: 'Context Clues', bandColor: 'violet' },
];

export interface DiagnosticItem {
  category: TrackKey;
  source: string;
  q: string;
  opts: string[];
  answer: number;
  explain: string;
}
export const DIAGNOSTIC_ITEMS: DiagnosticItem[] = [
  { category: 'generalisation',
    source: 'Source: Community newsletter, on a new neighbourhood mentoring scheme',
    q: '"A pilot mentoring scheme in one estate saw 18 out of 25 participating teenagers report feeling more accepted at school — proving mentoring solves loneliness for every young person."',
    opts: ['Generalisation', 'Fact', 'Prediction', 'Value'],
    answer: 0,
    explain: 'A result from one small pilot (18 of 25, one estate) is stretched into a claim about "every young person" everywhere.' },
  { category: 'pairs',
    source: 'Source: Local council report',
    q: '"Council records show that reported incidents of exclusion-related bullying in local schools fell by 15% between 2021 and 2024."',
    opts: ['Opinion', 'Fact', 'Value', 'Prediction'],
    answer: 1,
    explain: 'This is a specific, checkable statistic from a named source over a stated period — nothing is stretched or asserted as personal judgement.' },
  { category: 'pairs',
    source: 'Source: Op-ed, local newspaper',
    q: '"In my view, schools focus far too much on group identity and not enough on treating every student the same."',
    opts: ['Fact', 'Claim', 'Opinion', 'Bias'],
    answer: 2,
    explain: 'The phrase "in my view" signals a personal judgement that cannot be proven true or false — a textbook opinion.' },
  { category: 'pairs',
    source: 'Source: Youth organisation website',
    q: '"Our new inclusion programme reduces feelings of isolation among newcomer students within one term, say organisers."',
    opts: ['Fact', 'Claim', 'Value', 'Generalisation'],
    answer: 1,
    explain: 'This is presented as true by the people running the programme, but no independent evidence is given here — that makes it a claim, not yet a proven fact.' },
  { category: 'pairs',
    source: 'Source: Community forum post',
    q: '"Every resident deserves to feel they belong in their own neighbourhood, no matter where they were born."',
    opts: ['Fact', 'Opinion', 'Value', 'Prediction'],
    answer: 2,
    explain: 'This expresses a principle about what is right and important for everyone — a value, not a checkable fact or a narrow personal preference.' },
  { category: 'context',
    source: 'Source: Housing association blog',
    q: '"If current integration programmes continue at this pace, community tension in mixed neighbourhoods is likely to ease further over the next five years."',
    opts: ['Fact', 'Prediction', 'Bias', 'Generalisation'],
    answer: 1,
    explain: 'This is a statement about what is expected to happen in the future — it cannot yet be checked against evidence.' },
  { category: 'context',
    source: 'Source: A private "cultural integration" consultancy’s promotional article',
    q: 'A company that sells paid diversity-training workshops to local businesses publishes an article warning that most companies are "dangerously unprepared" for a diverse workforce.',
    opts: ['Bias', 'Vested interest', 'Fact', 'Value'],
    answer: 1,
    explain: 'The company profits directly if businesses believe they urgently need training — that financial stake is the vested interest.' },
  { category: 'context',
    source: 'Source: A campaign group’s social media post',
    q: 'A campaign page only shares stories of successful integration and never mentions any stories where integration efforts struggled or failed.',
    opts: ['Vested interest', 'Prediction', 'Bias', 'Fact'],
    answer: 2,
    explain: 'The one-sided selection — showing only success stories — is the signal for bias, regardless of whether each individual story is true.' },
];

/* Targeted practice */
export interface GenPracticeItem {
  stmt: string; src: string; isGen: boolean; signal: string; explainFocus?: boolean;
}
export interface LabelPracticeItem {
  stmt: string; src: string; answer: string; signal: string; explainFocus?: boolean;
}
export const TRACK_PRACTICE: {
  generalisation: GenPracticeItem[];
  pairs: LabelPracticeItem[];
  context: LabelPracticeItem[];
} = {
  generalisation: [
    { stmt: '"A survey of 30 students in one class found most felt more confident after a cultural exchange day — so cultural exchange days fix confidence issues for all students everywhere."', src: 'School newsletter', isGen: true, signal: 'a class of 30 stretched to "all students everywhere"' },
    { stmt: '"A survey of 30 students in one class found that 22 felt more confident after a cultural exchange day."', src: 'School newsletter (revised)', isGen: false, signal: 'this stays honest about its sample (30 students, one class) and does not stretch the claim any further — it is a fact, not a generalisation' },
    { stmt: '"Migrants never fully integrate into a new community within one generation."', src: 'Opinion column', isGen: true, signal: 'the absolute word "never" applied to every migrant, everywhere' },
    { stmt: '"Some migrants report that full integration can take longer than one generation, according to interviews conducted for this piece."', src: 'Opinion column (revised)', isGen: false, signal: 'the word "some" keeps the claim limited — it does not sweep every migrant into one absolute statement' },
    { stmt: '"Every single person who moves to a new country experiences the exact same sense of culture shock."', src: 'Blog post', isGen: true, signal: 'the word "every single person" claims one identical experience for a huge, varied group' },
    { stmt: '"A youth worker in one town found that mentoring helped the six young people she worked with directly — this proves mentoring programmes always work."', src: 'Charity annual report', isGen: true, explainFocus: true, signal: 'a result from six specific young people, one worker, is generalised into "always works"' },
  ],
  pairs: [
    { stmt: '"Local government data shows the number of registered community groups grew from 40 to 65 between 2019 and 2024."', src: 'Council statistics office', answer: 'Fact', signal: 'a specific, checkable statistic from a named official source' },
    { stmt: '"Honestly, I don’t think forcing people to attend integration classes helps anyone."', src: 'Reader letter, local paper', answer: 'Opinion', signal: 'a personal judgement signalled by "I don’t think" — not checkable' },
    { stmt: '"The programme’s founders say their approach has helped \'thousands\' of families settle in, though no published data confirms the figure."', src: 'Charity website', answer: 'Claim', signal: 'presented as true by the people running it, with no independent evidence given — a claim, not yet a fact' },
    { stmt: '"No community should have to choose between preserving its traditions and welcoming newcomers — both matter equally."', src: 'Community leader speech', answer: 'Value', explainFocus: true, signal: 'a statement of principle about what matters, not something you can check as true or false' },
    { stmt: '"The town’s community centre hosted 12 cultural events in the past year, according to its own published activity log."', src: 'Community centre annual log', answer: 'Fact', signal: 'a specific, verifiable number from a primary record' },
  ],
  context: [
    { stmt: '"If current housing patterns continue, some experts believe neighbourhoods may become more segregated by income over the next decade."', src: 'Urban planning report', answer: 'Prediction', signal: 'framed around what "may" happen in the future — not yet checkable' },
    { stmt: 'A relocation company that profits from helping wealthy foreign buyers purchase property publishes a glowing article about how "welcoming" the local community is to newcomers.', src: 'Real estate company blog', answer: 'Vested interest', signal: 'the company benefits financially from portraying the area positively to attract buyers' },
    { stmt: 'A local newspaper only interviews long-term residents for a story about a new immigrant community, and never interviews anyone from that new community itself.', src: 'Local newspaper feature', answer: 'Bias', explainFocus: true, signal: 'one-sided selection of whose voices are included — a classic sign of bias' },
    { stmt: '"Analysts suggest that without changes to current policy, tensions around resource allocation in mixed communities could increase in coming years."', src: 'Policy think-tank briefing', answer: 'Prediction', signal: 'again framed around future likelihood ("could increase in coming years") — not a present, checkable fact' },
  ],
};

export function trackOptions(track: TrackKey): string[] {
  if (track === 'generalisation') return ['Generalisation', 'Not a generalisation'];
  if (track === 'pairs') return ['Fact', 'Opinion', 'Claim', 'Value'];
  return ['Bias', 'Vested interest', 'Prediction'];
}

export interface RetestItem {
  stmt: string;
  opts: string[];
  answer: number;
}
export const RETEST_ITEMS: Record<TrackKey, RetestItem[]> = {
  generalisation: [
    { stmt: '"One survey of 20 residents in a single street found most enjoyed a new multicultural food festival — so every neighbourhood in the city would benefit from one."', opts: ['Generalisation', 'Fact', 'Value', 'Prediction'], answer: 0 },
    { stmt: '"A local youth club recorded a 25% rise in attendance among newcomer teenagers after introducing a buddy system, according to its own sign-in records."', opts: ['Generalisation', 'Fact', 'Opinion', 'Bias'], answer: 1 },
  ],
  pairs: [
    { stmt: '"City records confirm that the number of community language classes offered rose from 5 to 14 between 2020 and 2024."', opts: ['Opinion', 'Fact', 'Value', 'Claim'], answer: 1 },
    { stmt: '"I personally believe that neighbourhood associations should do more to welcome new residents."', opts: ['Fact', 'Opinion', 'Claim', 'Prediction'], answer: 1 },
    { stmt: '"Everyone has the right to feel safe and respected in their own community, regardless of background."', opts: ['Fact', 'Opinion', 'Value', 'Bias'], answer: 2 },
  ],
  context: [
    { stmt: '"Experts predict that community integration programmes will likely expand in scope over the next several years if funding continues."', opts: ['Fact', 'Prediction', 'Bias', 'Generalisation'], answer: 1 },
    { stmt: 'A private consultancy that is paid to run "diversity audits" for companies publishes a report claiming most companies urgently need their services.', opts: ['Bias', 'Vested interest', 'Fact', 'Prediction'], answer: 1 },
  ],
};
