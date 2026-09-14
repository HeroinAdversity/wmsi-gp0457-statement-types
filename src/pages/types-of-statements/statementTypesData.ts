/* Data extracted from
   public/legacy/WMSI_GP0457_Y10_T1_W2-3_Statement-Types-and-Generalisation_TOOL.html
   for the native React port. All statement wording, examples, and drill
   items are preserved verbatim from the original tool so students see
   the same content. */

export const TOOL_ID = 'statement-types';

export type StatementType =
  | 'Generalisation'
  | 'Fact'
  | 'Opinion'
  | 'Claim'
  | 'Value'
  | 'Prediction'
  | 'Bias'
  | 'Vested interest';

export const STATEMENT_TYPES: StatementType[] = [
  'Generalisation',
  'Fact',
  'Opinion',
  'Claim',
  'Value',
  'Prediction',
  'Bias',
  'Vested interest',
];

/* ─────────── Tab 1: Overview — term map ─────────── */
export interface TermTile {
  name: StatementType;
  where: string;
  def: string;
  priority?: boolean;
}
export const TERM_TILES: TermTile[] = [
  {
    name: 'Generalisation',
    where: '★ Tested directly — Q1(b)',
    def: 'A statement that applies something true of a small group to everyone, or claims something is always true when it’s only sometimes true.',
    priority: true,
  },
  { name: 'Fact', where: 'Q2 · Q3 · Q4 — evidence', def: 'A statement that can be checked and verified as true or false.' },
  { name: 'Opinion', where: 'Q2 · Q3 — evaluating reasoning', def: 'A personal view or judgement that cannot be proven true or false.' },
  { name: 'Claim', where: 'Q3 — analysing arguments', def: 'An assertion put forward as true, which may or may not be backed by evidence.' },
  { name: 'Value', where: 'Q3 · Q4 — perspectives', def: 'A statement reflecting what someone believes is important, right, or desirable.' },
  { name: 'Prediction', where: 'Q2 · Q4 — future consequences', def: 'A statement about what is expected to happen in the future.' },
  { name: 'Bias', where: 'Q2 — evaluating research', def: 'A one-sided slant in how information is presented, often favouring one perspective.' },
  {
    name: 'Vested interest',
    where: 'Q2 · Q3 — source reliability',
    def: 'A personal or financial stake that gives someone a reason to present information in a particular way.',
  },
];

/* ─────────── Tab 2: Eight Terms — full concept cards ─────────── */
export interface ConceptCard {
  id: string;
  name: StatementType;
  zh: string;
  badge: string;
  priority?: boolean;
  def: string;
  isExampleLabel: string;
  isExample: string;
  notLabel: string;
  notExample: string;
  note?: string;
  signalWords?: string[];
}
export const CONCEPT_CARDS: ConceptCard[] = [
  {
    id: 'generalisation',
    name: 'Generalisation',
    zh: '概括性陈述',
    badge: '1(b) — tested directly',
    priority: true,
    def:
      'A statement that takes something true of a small group or a specific case and presents it as true for everyone — or uses an absolute word like always, never, or all when the truth is only sometimes.',
    isExampleLabel: '✓ This IS a generalisation',
    isExample:
      '"A survey of 200 students in one city found 60% felt anxious after using social media — so teenagers everywhere are being harmed by their phones."',
    notLabel: '✗ This is NOT a generalisation',
    notExample:
      '"A 2024 survey of 200 students in one city found that 60% reported feeling anxious after extended social media use."',
    note:
      'The second sentence is just a fact — it stays honest about its sample size (200 students, one city) and doesn’t stretch the claim any further. The first sentence takes that same small sample and applies it to "teenagers everywhere." That stretch is the generalisation.',
    signalWords: ['always', 'never', 'everyone', 'all [group]', 'no one', 'every time'],
  },
  {
    id: 'fact',
    name: 'Fact',
    zh: '事实',
    badge: 'Q2 · Q3 · Q4',
    def: 'A statement that can be checked and shown to be true or false using evidence.',
    isExampleLabel: '✓ Fact',
    isExample:
      '"The World Health Organization reported a rise in reported cases of teen anxiety between 2015 and 2023."',
    notLabel: '✗ Not a fact — it’s an opinion',
    notExample: '"Social media is the worst thing that has ever happened to young people."',
    note:
      'A fact can still be selectively chosen or presented with bias — being factual doesn’t automatically mean a source is balanced.',
  },
  {
    id: 'opinion',
    name: 'Opinion',
    zh: '观点',
    badge: 'Q2 · Q3',
    def:
      'A personal view or judgement that cannot be proven true or false — it can be reasonable or unreasonable, but not "checked."',
    isExampleLabel: '✓ Opinion',
    isExample:
      '"I think schools should ban phones completely — it’s the only way students will focus."',
    notLabel: '✗ Not an opinion — it’s a value',
    notExample: '"Every young person deserves the right to switch off without judgement."',
    note:
      'Opinions and values overlap — the difference is that a value expresses a principle about what matters, while an opinion is usually a specific judgement or recommendation.',
  },
  {
    id: 'claim',
    name: 'Claim',
    zh: '主张',
    badge: 'Q3',
    def:
      'An assertion put forward as true — it might be backed by evidence, or it might not be. The word "claim" doesn’t tell you whether it’s reliable.',
    isExampleLabel: '✓ Claim (unsupported)',
    isExample: '"App developers claim their new ‘focus mode’ reduces screen time by half."',
    notLabel: 'A claim WITH evidence becomes stronger',
    notExample:
      '"App developers’ internal data, reviewed by an independent auditor, showed a 48% reduction in screen time among test users."',
    note: 'Your job when evaluating a claim is to ask: what evidence backs this up, and who is making it?',
  },
  {
    id: 'value',
    name: 'Value',
    zh: '价值观',
    badge: 'Q3 · Q4',
    def:
      'A statement reflecting what someone believes is important, right, fair, or desirable — underlying principles rather than facts.',
    isExampleLabel: '✓ Value',
    isExample: '"Protecting children’s mental health should always come before a company’s profit."',
    notLabel: '✗ Not a value — it’s a prediction',
    notExample: '"If nothing changes, mental health referrals will keep rising over the next decade."',
  },
  {
    id: 'prediction',
    name: 'Prediction',
    zh: '预测',
    badge: 'Q2 · Q4',
    def: 'A statement about what is expected to happen in the future — it cannot yet be checked against evidence.',
    isExampleLabel: '✓ Prediction',
    isExample: '"Experts warn that without regulation, screen-related anxiety cases will double by 2030."',
    notLabel: '✗ Not a prediction — it’s a fact (past tense, checkable now)',
    notExample: '"Screen-related anxiety cases doubled between 2015 and 2023."',
  },
  {
    id: 'bias',
    name: 'Bias',
    zh: '偏见',
    badge: 'Q2',
    def:
      'A one-sided slant in how information is selected or presented — usually favouring one perspective while downplaying or omitting others.',
    isExampleLabel: '✓ Shows bias',
    isExample:
      'A wellness-app company’s blog only cites studies where its product improved user mood, and never mentions studies with no effect.',
    notLabel: '✗ Balanced — not biased',
    notExample:
      'A university research summary presents both studies that found benefits and studies that found no significant effect.',
    note: 'Bias is about selection — what’s left in, and what’s left out — not necessarily about lying.',
  },
  {
    id: 'vested',
    name: 'Vested interest',
    zh: '既得利益',
    badge: 'Q2 · Q3',
    def:
      'A personal, financial, or professional stake that gives someone a reason to present information in a way that benefits them.',
    isExampleLabel: '✓ Vested interest present',
    isExample: 'A company that sells "digital detox" retreats publishes an article on the dangers of phone use.',
    notLabel: '✗ No obvious vested interest',
    notExample: 'An independent, government-funded health body publishes findings on phone use and anxiety.',
    note:
      'A vested interest doesn’t automatically make a source wrong — but it’s a reason to check the evidence more carefully.',
  },
];

/* ─────────── Tab 3: Sort & Classify ─────────── */
export interface SortItem {
  stmt: string;
  src: string;
  answer: StatementType;
  explain: string;
}
export const SORT_ITEMS: SortItem[] = [
  {
    stmt:
      '"A survey of 150 teenagers in one school found that 70% checked their phones within five minutes of waking — so all young people are addicted to their phones."',
    src: 'Adapted from a wellness blog',
    answer: 'Generalisation',
    explain:
      'A small, single-school sample (150 students, one school) is stretched to cover "all young people."',
  },
  {
    stmt:
      '"Reported cases of teen anxiety linked to social media rose by 34% between 2018 and 2023, according to national health records."',
    src: 'Ministry of Health summary report',
    answer: 'Fact',
    explain:
      'This is a specific, checkable statistic tied to a named source and time period — nothing is stretched beyond what the data shows.',
  },
  {
    stmt:
      '"Personally, I think parents worry too much about screen time — kids today are just growing up differently."',
    src: 'Parenting forum post',
    answer: 'Opinion',
    explain: 'This is a personal judgement ("I think") that cannot be proven true or false.',
  },
  {
    stmt: '"The makers of FocusApp claim their software cuts unwanted screen time by 40% within two weeks."',
    src: 'App store product description',
    answer: 'Claim',
    explain:
      'It is presented as true by the people selling it, but no independent evidence is given here to confirm it.',
  },
  {
    stmt: '"No child should have their wellbeing sacrificed for a company’s advertising revenue."',
    src: 'Op-ed by a child psychologist',
    answer: 'Value',
    explain: 'This expresses a principle about what is right and important, not a checkable fact.',
  },
  {
    stmt:
      '"If current trends continue, mental health services for teenagers are likely to face even greater demand by 2030."',
    src: 'Health policy briefing',
    answer: 'Prediction',
    explain:
      'This is about what is expected to happen in the future — it cannot yet be checked against evidence.',
  },
  {
    stmt:
      '"An article on a tech company’s own website only quotes the two studies that found no link between its app and teen anxiety, ignoring the five other studies that found a link."',
    src: 'Tech company blog',
    answer: 'Bias',
    explain:
      'The one-sided selection of evidence — including only favourable studies — is the signal for bias.',
  },
  {
    stmt:
      '"A company that sells screen-time monitoring software publishes a report warning parents that unsupervised phone use is dangerous."',
    src: 'Industry press release',
    answer: 'Vested interest',
    explain:
      'The company profits directly from parents believing phone use is dangerous — that financial stake is the vested interest.',
  },
  {
    stmt: '"Teenagers who use social media never do well in school."',
    src: 'Opinion column, local newspaper',
    answer: 'Generalisation',
    explain:
      'The word "never" makes an absolute claim that almost certainly is not true for every teenager who uses social media.',
  },
  {
    stmt:
      '"A youth counsellor states that in her experience, most of the students she sees for anxiety also report heavy social media use — though she notes this is not the same as proving one causes the other."',
    src: 'Interview transcript',
    answer: 'Fact',
    explain:
      'Tricky one: despite touching on a pattern, this is a careful, honest report of what one counsellor has observed — she explicitly avoids overclaiming or generalising beyond her own caseload.',
  },
];

/* ─────────── Tab 4: Generalisation Drill ─────────── */
export interface DrillRound {
  source: string;
  statements: string[];
  correctIndex: number;
  modelExplain: string;
}
export const DRILL_ROUNDS: DrillRound[] = [
  {
    source: 'Source: School wellbeing newsletter',
    statements: [
      'A recent internal survey found that 45% of Year 10 students at one school reported feeling "always exhausted" — proving that homework is destroying an entire generation.',
      'The school counsellor recorded 12 students seeking support for sleep issues this term.',
      'Some students say they would prefer more flexible deadlines for coursework.',
    ],
    correctIndex: 0,
    modelExplain:
      'This is a generalisation because it takes a result from one school (45% of Year 10 there) and stretches it into a claim about "an entire generation" — a huge leap the evidence does not support.',
  },
  {
    source: 'Source: Online magazine feature',
    statements: [
      'A wellness coach believes short daily walks can improve focus.',
      'Teenagers who post more than five times a day always struggle to concentrate in class.',
      'The article was written by a freelance journalist based in Kuala Lumpur.',
    ],
    correctIndex: 1,
    modelExplain:
      'The word "always" turns a possible pattern into an absolute claim that applies to every teenager who posts frequently — that is the generalisation.',
  },
  {
    source: 'Source: Parent support group forum',
    statements: [
      'One parent shared that her daughter’s screen time dropped after she started a new hobby.',
      'A 2023 study followed 80 students across two schools and found a correlation between late-night phone use and lower test scores.',
      'Kids these days can’t function without their phones for even five minutes.',
    ],
    correctIndex: 2,
    modelExplain:
      'Statement 3 makes a sweeping claim about all young people ("kids these days") with no evidence at all — a classic generalisation with no sample behind it.',
  },
  {
    source: 'Source: Health ministry press briefing',
    statements: [
      'Officials warned that if current trends continue, demand for youth mental health services could rise further.',
      'A pilot programme in three schools reduced reported anxiety symptoms among participants by 20%.',
      'Every teenager who uses social media for more than two hours a day will develop anxiety.',
    ],
    correctIndex: 2,
    modelExplain:
      'The word "every" and the certainty of "will develop" apply one outcome to all teenagers meeting a condition — that’s a generalisation, not a fact, because it ignores individual variation.',
  },
  {
    source: 'Source: Student-run school magazine',
    statements: [
      'A poll of the magazine’s 30 regular readers found most enjoyed the new online edition.',
      'Nobody in our generation reads printed newspapers anymore.',
      'The magazine has been published continuously since 2011.',
    ],
    correctIndex: 1,
    modelExplain:
      'This statement uses "nobody" and "our generation" to make an absolute claim about an entire age group, based on no stated evidence at all.',
  },
];

/* ─────────── Tab 5: Mixed Arena ─────────── */
export interface ArenaQuestion {
  q: string;
  opts: string[];
  answer: number;
}
export const ARENA_QUESTIONS: ArenaQuestion[] = [
  {
    q: '"Everyone who uses social media before bed struggles to sleep." What type of statement is this?',
    opts: ['Generalisation', 'Fact', 'Prediction', 'Bias'],
    answer: 0,
  },
  {
    q:
      'A tutoring company publishes a report claiming screens harm learning, while also selling "screen-free" tutoring packages. What is this an example of?',
    opts: ['Fact', 'Vested interest', 'Opinion', 'Claim'],
    answer: 1,
  },
  {
    q:
      '"National survey data (n=5,000) showed a 12% rise in reported sleep issues among 13–17 year-olds between 2020 and 2024." What type of statement is this?',
    opts: ['Generalisation', 'Fact', 'Value', 'Prediction'],
    answer: 1,
  },
  {
    q: '"I believe teenagers should be trusted to manage their own screen time." What type of statement is this?',
    opts: ['Fact', 'Claim', 'Opinion', 'Bias'],
    answer: 2,
  },
  {
    q: '"By 2030, most teenagers may rely on AI companions for emotional support." What type of statement is this?',
    opts: ['Prediction', 'Fact', 'Generalisation', 'Value'],
    answer: 0,
  },
  {
    q:
      'A blog only features testimonials from happy customers and never mentions any negative reviews. What is this an example of?',
    opts: ['Vested interest', 'Fact', 'Bias', 'Claim'],
    answer: 2,
  },
  {
    q: '"Every child deserves a childhood free from constant digital pressure." What type of statement is this?',
    opts: ['Value', 'Fact', 'Prediction', 'Claim'],
    answer: 0,
  },
  {
    q: '"The app’s creators say it ‘transforms’ users’ mental health within a week." What type of statement is this?',
    opts: ['Fact', 'Claim', 'Generalisation', 'Bias'],
    answer: 1,
  },
  {
    q: '"No teenager has ever benefited from using social media." What type of statement is this?',
    opts: ['Fact', 'Opinion', 'Generalisation', 'Prediction'],
    answer: 2,
  },
  {
    q:
      'A company selling parental-control software publishes a scary statistic about phone addiction on its homepage. What should you check first?',
    opts: [
      'Whether they have a vested interest',
      'Whether it uses good grammar',
      'Whether it is a fact',
      'Whether it is a prediction',
    ],
    answer: 0,
  },
  {
    q:
      '"Reports suggest counselling referrals for screen-related anxiety are likely to keep growing." What type of statement is this?',
    opts: ['Fact', 'Prediction', 'Generalisation', 'Value'],
    answer: 1,
  },
  {
    q:
      '"A survey of 40 students in one class found half felt more relaxed after a digital detox weekend — so digital detoxes fix everyone’s anxiety." What type of statement is this?',
    opts: ['Fact', 'Generalisation', 'Opinion', 'Bias'],
    answer: 1,
  },
];

export const ARENA_LEVELS = [
  { min: 0, title: '🏅 Rookie' },
  { min: 4, title: '🥈 Apprentice' },
  { min: 8, title: '🥉 Scholar' },
  { min: 12, title: '🏆 Expert' },
  { min: 18, title: '👑 Master' },
  { min: 24, title: '⭐ Legend' },
];

/* ─────────── Tab 6: Exit Check ─────────── */
export const EXIT_CHECK_ITEMS: string[] = [
  'I can define generalisation in my own words.',
  'I can spot the signal words that often appear in generalisations (always, never, everyone, all).',
  'I can explain WHY a statement is a generalisation, not just identify it — this is where the 2 marks for 1(b)(ii) actually come from.',
  'I can tell the difference between a fact and an opinion.',
  'I can tell the difference between a claim and a fact — a claim isn’t automatically true.',
  'I can explain what a vested interest is and why it matters when reading a source.',
  'I can tell the difference between bias and vested interest (bias = how it’s presented; vested interest = why).',
  'I completed the Generalisation Drill (Tab 4) and got at least 3/5 rounds correct.',
];
