/* Data extracted from
   public/legacy/WMSI_GP0457_Y10_T1_W2-3_Statement-Types-Intensive_TOOL.html
   for the native React port. All content preserved verbatim. */

export const TOOL_ID = 'statement-types-intensive';

export type IntensiveType =
  | 'Fact'
  | 'Opinion'
  | 'Prediction'
  | 'Value Judgement'
  | 'Generalisation'
  | 'Claim'
  | 'Bias'
  | 'Vested Interest';

export const INTENSIVE_TYPES: IntensiveType[] = [
  'Fact',
  'Opinion',
  'Prediction',
  'Value Judgement',
  'Generalisation',
  'Claim',
  'Bias',
  'Vested Interest',
];

export const TYPE_ZH: Record<IntensiveType, string> = {
  Fact: '事实',
  Opinion: '意见',
  Prediction: '预测',
  'Value Judgement': '价值判断',
  Generalisation: '概括',
  Claim: '主张',
  Bias: '偏见',
  'Vested Interest': '利益相关',
};

/* ─────────── Tab 1: Reference cards ─────────── */
export interface RefCard {
  type: IntensiveType;
  definition: string;
  signals: string;
  example: string;
  confuse: string;
}
export const REF_CARDS: RefCard[] = [
  {
    type: 'Fact',
    definition: 'Something that is known or can be proved to be true.',
    signals: 'statistics, named sources, dates, measured data, "according to [named source]", "data shows"',
    example: '"Malaysia’s unemployment rate was 3.6% in 2024, according to the Department of Statistics."',
    confuse:
      'Claim — a claim ASSERTS something is true but may lack verifiable evidence.',
  },
  {
    type: 'Opinion',
    definition: 'A personal view or judgement not based on fact or knowledge.',
    signals: '"I think", "I believe", "I feel", "in my view", "it seems to me", "personally"',
    example: '"I think schools should spend more time teaching practical life skills."',
    confuse:
      'Value Judgement — a value judgement specifically assesses something as good, bad, right, or wrong.',
  },
  {
    type: 'Prediction',
    definition: 'What someone thinks may happen in the future.',
    signals: '"will", "could", "is likely to", "by 2030", "in the future", "if…then", "may lead to"',
    example: '"If deforestation continues at this rate, the Amazon rainforest could disappear within 80 years."',
    confuse:
      'Claim — a claim is about the present or past, a prediction is about the future.',
  },
  {
    type: 'Value Judgement',
    definition: 'An assessment of something as good or bad in terms of someone’s standards or priorities.',
    signals: '"should", "must", "the best", "the worst", "wrong", "right", "unfair", "essential", superlatives, moral language',
    example: '"Access to clean water is the most important human right."',
    confuse:
      'Opinion — an opinion is a personal preference ("I like…"), while a value judgement makes a moral or evaluative claim about what is good/bad/important.',
  },
  {
    type: 'Generalisation',
    definition:
      'A statement suggesting something is true all of the time when it is only true some of the time, or applying the traits of a small group to a whole population.',
    signals: '"all", "every", "always", "never", "everyone", "no one", "completely", absolute language',
    example: '"Young people today are all addicted to their phones and never read books."',
    confuse:
      'Claim — a claim may be debatable but doesn’t necessarily use absolute "all/every/always" language.',
  },
  {
    type: 'Claim',
    definition:
      'A statement or assertion about an issue that is presented as true. It may or may not be supported by evidence.',
    signals: 'assertions without "I think", presented as if true, debatable statements, "research shows" (without naming the research)',
    example: '"Social media causes anxiety in teenagers."',
    confuse: 'Fact — a fact can be verified; a claim is asserted but not necessarily proved.',
  },
  {
    type: 'Bias',
    definition:
      'Being unfairly prejudiced for or against something. Shown through language, selection of evidence, or one-sided presentation.',
    signals: 'emotive language, loaded words ("reckless", "flood", "destroy"), exaggeration, one-sided arguments, ignoring counter-evidence',
    example: '"The government’s reckless spending has destroyed the economy, and only a fool would support these policies."',
    confuse:
      'Vested Interest — bias is about HOW something is said (the language); vested interest is about WHO is saying it (their personal stake).',
  },
  {
    type: 'Vested Interest',
    definition:
      'A personal reason for involvement in an issue, especially expecting financial or other gain.',
    signals: 'look at WHO is speaking — company CEO, industry spokesperson, government official assessing their own policy, someone who benefits financially',
    example: '"The CEO of a solar panel company argues that every home should be required to install solar panels."',
    confuse:
      'Bias — having a vested interest doesn’t automatically mean the statement is wrong, but it means the speaker may not be objective.',
  },
];

/* ─────────── Tab 2: Rapid Sort — 24 statements ─────────── */
export interface RapidSortItem {
  s: string;
  type: IntensiveType;
  topic: string;
  explain: string;
}
export const RAPID_SORT: RapidSortItem[] = [
  { s: 'In 2023, the global unemployment rate was 5.8%, according to the International Labour Organization.', type: 'Fact', topic: 'Employment', explain: 'This cites a specific, verifiable statistic from a named international organisation.' },
  { s: 'Malaysia’s Personal Data Protection Act was passed in 2010.', type: 'Fact', topic: 'Digital World', explain: 'This is a verifiable historical fact — the date and name of the law can be checked in official records.' },
  { s: 'The United Nations has 193 member states.', type: 'Fact', topic: 'Social Identity & Inclusion', explain: 'This is a verifiable number that can be confirmed through UN records.' },
  { s: 'I believe that remote working is more productive than office work.', type: 'Opinion', topic: 'Employment', explain: 'The phrase "I believe" marks this as a personal view, not a verifiable statement.' },
  { s: 'In my view, schools should teach students how to manage their finances.', type: 'Opinion', topic: 'Digital World', explain: '"In my view" signals this is the speaker’s personal preference. It cannot be proved true or false.' },
  { s: 'I feel that traditional medicine is more trustworthy than modern medicine.', type: 'Opinion', topic: 'Health & Wellbeing', explain: '"I feel" marks this as a personal view based on feelings rather than evidence.' },
  { s: 'If sea levels continue to rise, many coastal cities will be flooded by 2100.', type: 'Prediction', topic: 'Environment', explain: 'This describes a future event that has not yet happened — "will be" and "by 2100" are prediction markers.' },
  { s: 'Artificial intelligence is likely to create more jobs than it destroys over the next decade.', type: 'Prediction', topic: 'Employment', explain: '"Is likely to" and "over the next decade" signal a future projection.' },
  { s: 'Without immediate action, global food shortages will become a crisis within five years.', type: 'Prediction', topic: 'Environment', explain: '"Will become" and "within five years" place this in the future.' },
  { s: 'Climate change is the most serious threat to human civilisation.', type: 'Value Judgement', topic: 'Environment', explain: '"The most serious" is a superlative that ranks climate change above all other threats — this is an evaluative assessment, not a measurable fact.' },
  { s: 'It is wrong to use animals for medical testing, regardless of the potential benefits.', type: 'Value Judgement', topic: 'Health & Wellbeing', explain: '"It is wrong" makes a moral judgement about what is right and wrong.' },
  { s: 'Fair trade is a better system than free trade for developing countries.', type: 'Value Judgement', topic: 'Employment', explain: '"Better" is an evaluative comparison that reflects the speaker’s values about what matters more.' },
  { s: 'Young people today spend all their time on their phones and never talk to each other face to face.', type: 'Generalisation', topic: 'Digital World', explain: '"All their time" and "never" are absolutes — this applies an extreme claim to every young person, when many do talk face to face.' },
  { s: 'Every developing country suffers from corruption.', type: 'Generalisation', topic: 'Social Identity & Inclusion', explain: '"Every" applies a characteristic of some countries to all developing countries without exception.' },
  { s: 'All social media platforms are harmful to mental health.', type: 'Generalisation', topic: 'Health & Wellbeing', explain: '"All" makes this a generalisation — some platforms may have positive mental health features.' },
  { s: 'Renewable energy is now cheaper to produce than fossil fuels in most countries.', type: 'Claim', topic: 'Environment', explain: 'This is asserted as true and sounds factual, but it is debatable and depends on how costs are measured. Note "most" — not an absolute, so not a generalisation.' },
  { s: 'Immigration leads to higher crime rates in urban areas.', type: 'Claim', topic: 'Social Identity & Inclusion', explain: 'This is presented as truth but is highly debatable — research shows mixed evidence. It does not use absolute language, so it is a claim, not a generalisation.' },
  { s: 'Organic food is healthier than non-organic food.', type: 'Claim', topic: 'Health & Wellbeing', explain: 'This is asserted as true but is debatable — scientific evidence is mixed. It is a claim because it is presented as fact without being verified.' },
  { s: 'The reckless government has wasted millions on failed green energy schemes that nobody asked for.', type: 'Bias', topic: 'Environment', explain: '"Reckless", "wasted", "failed", and "nobody asked for" are loaded, emotive words that reveal unfair prejudice against the government’s policy. The language is one-sided.' },
  { s: 'Despite hysterical scaremongering by environmental activists, there is absolutely no crisis — the climate has always changed naturally.', type: 'Bias', topic: 'Environment', explain: '"Hysterical scaremongering" and "absolutely no crisis" are loaded, dismissive phrases. The claim that there is "absolutely no crisis" ignores scientific consensus — this is one-sided and unfair.' },
  { s: 'Immigrants are flooding into the country, stealing jobs from hard-working local people who built this economy.', type: 'Bias', topic: 'Social Identity & Inclusion', explain: '"Flooding" and "stealing" are emotive, loaded words. "Hard-working local people" creates an unfair contrast that stereotypes both groups.' },
  { s: 'The CEO of a coal mining company states that renewable energy targets are unrealistic and should be delayed.', type: 'Vested Interest', topic: 'Environment', explain: 'The CEO profits from coal — delaying renewable energy targets benefits their business financially. Look at WHO is speaking, not just what they say.' },
  { s: 'A property developer argues that building new houses on protected green land will benefit the local community.', type: 'Vested Interest', topic: 'Environment', explain: 'The property developer stands to profit financially from building on the land. Their "community benefit" argument may be motivated by self-interest.' },
  { s: 'The owner of a private tutoring company says that schools are failing students and parents should invest in extra tuition.', type: 'Vested Interest', topic: 'Employment', explain: 'The tutoring company owner profits directly if parents buy more tuition. They have a financial reason to present schools negatively.' },
];

/* ─────────── Tab 3: Source Deep Dive ─────────── */
export const SOURCE_A_TITLE = 'The Rise of Automation: What Does It Mean for Workers?';
export const SOURCE_A_PARAGRAPHS: string[] = [
  'A recent report by the International Labour Organization (ILO) found that automation has already displaced approximately 85 million jobs worldwide since 2020.',
  'In Malaysia, the manufacturing sector employs 2.7 million workers, many of whom perform routine tasks that could be automated.',
  '"Automation is the biggest threat to employment in our lifetime," says Dr Aisha Rahman, a labour economist at Universiti Malaya. "If governments don’t act now, we could see unemployment rates of 15% or higher across Southeast Asia by 2035."',
  'However, Mr Tan Wei Jie, CEO of RoboTech Solutions, argues that fears about automation are exaggerated. "Our technology creates far more jobs than it replaces. Every business that uses our systems has grown its workforce. People always resist change, but progress is inevitable and always beneficial."',
  'Trade unions have expressed concern about the impact on low-skilled workers. "All the new jobs require university degrees, so ordinary workers are being left behind completely," said Encik Ahmad Fauzi, president of the Malaysian Workers’ Union. He called on the government to fund retraining programmes.',
  'The government’s own figures show that 340,000 workers enrolled in digital skills training programmes last year, a 42% increase from the previous year. Minister of Human Resources Datuk Seri Saravanan described the programmes as "the most comprehensive workforce transformation in Malaysian history."',
];

export const SOURCE_B_TITLE = 'Two students discuss automation and employment';
export const SOURCE_B_TURNS: { speaker: string; text: string }[] = [
  { speaker: 'Mei Ling', text: 'I read that robots are taking over factories in China. My cousin works in a smartphone assembly plant and she says three of her colleagues were replaced by machines last month. I think automation is unfair to workers because companies only care about profits.' },
  { speaker: 'Ravi', text: 'But isn’t that just one factory? You can’t say all automation is bad based on what happened to three people. In India, automation in agriculture has helped farmers produce more food. The World Bank reported that agricultural productivity increased by 23% in states that adopted automated irrigation. That’s a fact.' },
  { speaker: 'Mei Ling', text: 'Maybe, but technology companies always say their products are great — they would say that, wouldn’t they? They have millions to gain. I believe governments should prioritise protecting workers’ rights over allowing companies to automate freely.' },
  { speaker: 'Ravi', text: 'I agree that workers need protection, but automation will probably create new types of jobs that we can’t even imagine yet. Every technological revolution in history has led to more employment, not less.' },
];

export interface DiveAnswer {
  type: IntensiveType;
  examples: string[];
}
export const DIVE_A_ANSWERS: DiveAnswer[] = [
  { type: 'Fact', examples: [
    '"automation has already displaced approximately 85 million jobs worldwide since 2020" — verifiable statistic from a named source (ILO).',
    '"the manufacturing sector employs 2.7 million workers" — verifiable national data.',
    '"340,000 workers enrolled in digital skills training programmes last year, a 42% increase" — verifiable government figure.',
  ] },
  { type: 'Opinion', examples: [
    'No clear opinion marked with "I think/I believe" appears in Source A — the speakers make claims and value judgements rather than expressing personal opinions. This is an important observation: not every type will appear in every source.',
  ] },
  { type: 'Prediction', examples: [
    '"we could see unemployment rates of 15% or higher across Southeast Asia by 2035" — future projection using "could" and a future date.',
  ] },
  { type: 'Value Judgement', examples: [
    '"Automation is the biggest threat to employment in our lifetime" — superlative "biggest" makes an evaluative ranking.',
    '"the most comprehensive workforce transformation in Malaysian history" — superlative "most comprehensive" reflects a value-based assessment.',
  ] },
  { type: 'Generalisation', examples: [
    '"All the new jobs require university degrees, so ordinary workers are being left behind completely" — "All" and "completely" apply the claim to every case.',
    '"Every business that uses our systems has grown its workforce" — "Every" generalises to all businesses.',
    '"People always resist change, but progress is inevitable and always beneficial" — "always" used twice, plus "inevitable" = absolute language.',
  ] },
  { type: 'Claim', examples: [
    '"Our technology creates far more jobs than it replaces" — presented as fact but not verified; debatable.',
    '"fears about automation are exaggerated" — an assertion about the debate, presented as truth.',
  ] },
  { type: 'Bias', examples: [
    'Mr Tan’s overall statement shows bias — he presents only positives of automation, uses dismissive language ("exaggerated"), and makes sweeping claims ("always beneficial") while ignoring any evidence of job losses. His argument is one-sided.',
  ] },
  { type: 'Vested Interest', examples: [
    'Mr Tan Wei Jie, CEO of RoboTech Solutions — his company sells automation technology, so he benefits financially from promoting it.',
    'Minister Saravanan — as the minister responsible, he has a political interest in praising his own department’s programmes.',
  ] },
];

export const DIVE_B_ANSWERS: DiveAnswer[] = [
  { type: 'Fact', examples: [
    '"The World Bank reported that agricultural productivity increased by 23% in states that adopted automated irrigation." — Verifiable statistic from a named international organisation.',
  ] },
  { type: 'Opinion', examples: [
    '"I think automation is unfair to workers because companies only care about profits." — "I think" marks this as Mei Ling’s personal view.',
  ] },
  { type: 'Prediction', examples: [
    '"automation will probably create new types of jobs that we can’t even imagine yet" — "will probably" and future tense make this a prediction about what has not yet happened.',
  ] },
  { type: 'Value Judgement', examples: [
    '"I believe governments should prioritise protecting workers’ rights over allowing companies to automate freely." — "should prioritise" is a values-based judgement about what ought to happen — it ranks workers’ rights above business freedom.',
  ] },
  { type: 'Generalisation', examples: [
    '"Every technological revolution in history has led to more employment, not less." — "Every" applies the claim to all revolutions without exception.',
    '"companies only care about profits" — "only" makes this absolute, suggesting no company has any other motivation.',
  ] },
  { type: 'Claim', examples: [
    '"robots are taking over factories in China" — This is an assertion that could be debated — the word "taking over" implies a complete replacement which may be exaggerated.',
  ] },
  { type: 'Bias', examples: [
    'Source B does not contain strongly biased language. Both speakers express views but without loaded or emotive words. This is an important observation — not every source will show bias. In the exam, saying "there is no clear bias" is a valid analytical point.',
  ] },
  { type: 'Vested Interest', examples: [
    'Mei Ling identifies technology companies’ vested interest: "technology companies always say their products are great — they would say that, wouldn’t they? They have millions to gain." She recognises that tech companies have a financial reason to promote their products positively.',
  ] },
];

/* ─────────── Tab 4: Confusable Pairs ─────────── */
export interface PairItem {
  s: string;
  ans: 'A' | 'B';
  explain: string;
}
export interface PairSet {
  id: string;
  title: string;
  descriptionA: string;
  descriptionB: string;
  labelA: IntensiveType;
  labelB: IntensiveType;
  test: string;
  items: PairItem[];
}
export const PAIR_SETS: PairSet[] = [
  {
    id: 'pair1',
    title: 'Pair 1: Fact vs Claim',
    labelA: 'Fact',
    labelB: 'Claim',
    descriptionA: 'Can be **verified** — checked against a reliable source, measured, or proved. Often includes specific numbers, dates, or named sources.',
    descriptionB: '**Asserted** as true but is debatable. May sound factual but cannot be simply checked — it requires argument and evidence to support.',
    test: 'Ask — "Could I look this up in a reliable source and get a definite yes/no answer?" If yes → Fact. If it needs debate or argument → Claim.',
    items: [
      { s: 'The World Health Organization declared COVID-19 a global pandemic on 11 March 2020.', ans: 'A', explain: 'Verifiable date and event from a named organisation.' },
      { s: 'Social media causes anxiety in teenagers.', ans: 'B', explain: 'This is asserted as true but is debatable — research shows mixed evidence. It needs evidence and argument to support it.' },
      { s: 'China’s population exceeded 1.4 billion in 2023.', ans: 'A', explain: 'A specific, measurable statistic that can be checked against census data.' },
      { s: 'Online learning is less effective than face-to-face teaching.', ans: 'B', explain: 'This is debatable — it depends on the subject, student, and context. It sounds factual but requires argument to support.' },
    ],
  },
  {
    id: 'pair2',
    title: 'Pair 2: Opinion vs Value Judgement',
    labelA: 'Opinion',
    labelB: 'Value Judgement',
    descriptionA: 'A **personal view** — the speaker’s own preference, feeling, or belief. Signalled by "I think", "I believe", "I feel".',
    descriptionB: 'An **evaluative assessment** — something is judged as good/bad, right/wrong, important/unimportant. Uses moral or priority language.',
    test: 'Ask — "Is the speaker just sharing what they personally prefer, or are they making a judgement about what is right/wrong/best/worst?" Personal preference → Opinion. Moral or evaluative ranking → Value Judgement.',
    items: [
      { s: 'I think history is more interesting than geography.', ans: 'A', explain: '"I think" + personal preference about what the speaker finds interesting. No moral judgement.' },
      { s: 'It is morally wrong to test cosmetics on animals.', ans: 'B', explain: '"Morally wrong" is a moral assessment — this judges an action as right/wrong, not just personal taste.' },
      { s: 'I prefer online shopping to going to physical stores.', ans: 'A', explain: '"I prefer" is a personal preference — no judgement of good/bad.' },
      { s: 'Education is the most important investment a country can make.', ans: 'B', explain: '"Most important" is an evaluative superlative — it ranks education’s value above all other investments.' },
    ],
  },
  {
    id: 'pair3',
    title: 'Pair 3: Generalisation vs Claim',
    labelA: 'Generalisation',
    labelB: 'Claim',
    descriptionA: 'Applies something to **ALL** cases when it’s only true for **some**. Uses absolute language: all, every, always, never, no one.',
    descriptionB: 'Asserts something as true but is **debatable**. Does NOT necessarily use absolute language — it may use hedging words like "some", "often", "tends to".',
    test: 'Look for absolute words (all/every/always/never). If present → probably a Generalisation. If the statement is debatable but doesn’t use absolutes → probably a Claim.',
    items: [
      { s: 'All politicians are corrupt and only interested in power.', ans: 'A', explain: '"All" and "only" are absolutes — this applies a negative trait to every single politician with no exceptions.' },
      { s: 'Social media platforms often collect more personal data than users realise.', ans: 'B', explain: '"Often" and "more than users realise" are hedged — debatable but not absolute. This is a claim.' },
      { s: 'Nobody in the developing world has access to reliable healthcare.', ans: 'A', explain: '"Nobody" is an absolute — clearly untrue for all people in all developing countries.' },
      { s: 'Fast fashion contributes to environmental degradation.', ans: 'B', explain: 'This is an assertion that is debatable (and probably true, with evidence), but it does not use absolute language. It’s a claim.' },
    ],
  },
  {
    id: 'pair4',
    title: 'Pair 4: Bias vs Vested Interest',
    labelA: 'Bias',
    labelB: 'Vested Interest',
    descriptionA: 'Shown through **HOW** something is said — emotive language, loaded words, one-sided presentation, exaggeration.',
    descriptionB: 'About **WHO** is saying it — the speaker has a personal or financial reason for their position. Look at their role or identity.',
    test: 'Ask two separate questions: (1) "Does the LANGUAGE show unfairness?" → Bias. (2) "Does the SPEAKER benefit from this view?" → Vested Interest. A statement can show BOTH.',
    items: [
      { s: 'The incompetent, wasteful local council has once again squandered taxpayers’ money on pointless projects.', ans: 'A', explain: '"Incompetent", "wasteful", "squandered", and "pointless" are loaded, emotive words showing bias in the LANGUAGE.' },
      { s: 'A car manufacturer’s spokesperson argues that electric vehicles are not yet practical for everyday use.', ans: 'B', explain: 'The car manufacturer may lose sales if consumers switch to EVs — they have a financial INTEREST in discouraging the switch. The language itself is neutral.' },
      { s: 'The so-called "experts" who support this policy clearly have no understanding of the real world and are living in an ivory tower.', ans: 'A', explain: '"So-called", "clearly have no understanding", and "ivory tower" are dismissive, loaded phrases showing bias through LANGUAGE.' },
      { s: 'A tobacco company funds a study that concludes there is no proven link between smoking and lung cancer.', ans: 'B', explain: 'The tobacco company benefits financially if people continue smoking — they have a FINANCIAL INTEREST in funding research that supports their product.' },
    ],
  },
];

/* ─────────── Tab 5: Create Your Own ─────────── */
export interface CreatePrompt {
  type: IntensiveType;
  hint: string;
}
export const CREATE_PROMPTS: CreatePrompt[] = [
  { type: 'Fact', hint: 'Write a statement with a specific number, date, or named source that someone could verify.' },
  { type: 'Opinion', hint: 'Start with "I think", "I believe", or "I feel" to share a personal view.' },
  { type: 'Prediction', hint: 'Write about something that has NOT happened yet. Use "will", "could", "is likely to", or a future date.' },
  { type: 'Value Judgement', hint: 'Judge something as good, bad, right, wrong, the best, or the most important.' },
  { type: 'Generalisation', hint: 'Use "all", "every", "always", or "never" — apply something to an entire group when it’s only true for some.' },
  { type: 'Claim', hint: 'Assert something as true WITHOUT using "I think". It should be debatable — something people could argue about.' },
  { type: 'Bias', hint: 'Write a one-sided statement using emotive or loaded language (e.g., "reckless", "flood", "destroy").' },
  { type: 'Vested Interest', hint: 'Write a statement and name WHO is saying it — someone who benefits personally or financially from this view.' },
];

/* ─────────── Tab 6: Exam Practice ─────────── */
export interface ExamItem {
  id: string;
  num: string;
  question: string;
  marks: string;
  scaffolding: string;
  model: string;
  modelNote: string;
}
export const EXAM_QUESTIONS: ExamItem[] = [
  {
    id: 'q1',
    num: 'QUESTION 1',
    question: 'Using Source A, identify one fact about automation and employment.',
    marks: '[1 mark]',
    scaffolding:
      'What to look for: A fact is something that can be verified — look for specific numbers, named organisations, or measurable data. Ask yourself: "Could I check this in a report or database?"\n\nSignal words in Source A: percentages, named organisations (ILO), specific figures (85 million, 2.7 million, 340,000, 42%).\n\nSentence starter: "One fact from Source A is that…"',
    model: '"Automation has already displaced approximately 85 million jobs worldwide since 2020" (ILO report).',
    modelNote:
      'This works because it cites a specific figure from a named source (the ILO), making it verifiable. Other acceptable answers: "the manufacturing sector employs 2.7 million workers" or "340,000 workers enrolled in digital skills training programmes last year, a 42% increase from the previous year."',
  },
  {
    id: 'q2',
    num: 'QUESTION 2',
    question: 'Using Source B, identify one opinion expressed by Mei Ling.',
    marks: '[1 mark]',
    scaffolding:
      'What to look for: An opinion is a personal view — not something that can be proved true or false. Look for phrases where Mei Ling shares what she personally thinks or feels.\n\nSignal words to find: "I think", "I believe", "I feel", "in my view".\n\nSentence starter: "One opinion expressed by Mei Ling is…"',
    model: 'Mei Ling says "I think automation is unfair to workers because companies only care about profits."',
    modelNote:
      'The phrase "I think" is the signal. This is her personal view, not a verifiable fact. Note: "companies only care about profits" is also a generalisation embedded within the opinion — but the question asks for an opinion, and the "I think" marker makes this the clearest example.',
  },
  {
    id: 'q3',
    num: 'QUESTION 3',
    question: 'Using Source A, identify one generalisation.',
    marks: '[1 mark]',
    scaffolding:
      'What to look for: A generalisation says something is true for ALL/EVERY/ALWAYS when it’s only true for some. Scan Source A for absolute words.\n\nSignal words to scan for: "all", "every", "always", "never", "everyone", "no one", "completely".\n\nTip: There are several generalisations in Source A. The clearest ones contain the words "all", "every", "always", or "completely".',
    model: '"All the new jobs require university degrees, so ordinary workers are being left behind completely."',
    modelNote:
      'The words "All" and "completely" are the markers. Other acceptable answers: "Every business that uses our systems has grown its workforce" (the word "every") or "People always resist change, but progress is inevitable and always beneficial" (the word "always" used twice).',
  },
  {
    id: 'q4',
    num: 'QUESTION 4',
    question: 'Explain why your answer to Question 3 is a generalisation.',
    marks: '[2 marks]',
    scaffolding:
      'What the examiner wants (2 marks):\nMark 1: Show you understand what a generalisation IS (the definition).\nMark 2: Explain specifically HOW your chosen statement fits that definition — point to the exact word(s) that make it a generalisation, and explain why the statement is only true for SOME, not ALL.\n\nSentence frame: "This is a generalisation because it suggests that [what the statement says is true for all] when in reality [it is only true for some]. The word \'[signal word]\' makes it a generalisation because [explain why the absolute language is an over-claim]."\n\nCommon mistake: Simply quoting the statement again without explaining WHY it is a generalisation — this earns 0 marks. You must use the word "generalisation" and explain what makes it one.',
    model:
      'This is a generalisation because it suggests that every single new job created by automation requires a university degree, which applies the experience of some workers to all workers. The word "all" makes it a generalisation because in reality, some new jobs — such as machine maintenance, data entry, or warehouse logistics — may not require a university degree. The word "completely" also generalises by suggesting that every ordinary worker without a degree is being entirely excluded from the job market, when some may have successfully retrained or found alternative employment.',
    modelNote:
      'This answer scores 2/2 because it: (1) defines what a generalisation does (applies something to all when true for some), and (2) explains specifically which words ("all", "completely") create the generalisation and gives a concrete counter-example showing it’s not universally true.',
  },
  {
    id: 'q5',
    num: 'QUESTION 5',
    question: 'Using both Source A and Source B, identify one person or group who might have a vested interest in the automation debate. Explain what their vested interest is and how this might affect the reliability of their statement.',
    marks: '[3 marks]',
    scaffolding:
      'What the examiner wants (3 marks):\nMark 1: Identify WHO has a vested interest (name or role).\nMark 2: Explain WHAT their vested interest is — what do they personally gain?\nMark 3: Explain HOW this vested interest might affect the reliability of what they say.\n\nStep-by-step approach:\n1. Scan for speakers — who is quoted? What is their job/role?\n2. Ask "who benefits?" — does this person gain money, power, or reputation if their view is accepted?\n3. Link to reliability — explain why their personal benefit might make them present information in a one-sided way.\n\nSentence frame: "[Name/role] has a vested interest because [what they gain]. This means their statement that \'[brief quote]\' may not be fully reliable because [how the interest could make them one-sided]."\n\nCandidates in the sources with potential vested interests: Mr Tan Wei Jie (CEO of RoboTech Solutions), Minister Saravanan (assessing his own government’s programmes), technology companies (mentioned by Mei Ling).',
    model:
      'Mr Tan Wei Jie, the CEO of RoboTech Solutions, has a vested interest because his company manufactures and sells automation technology. He benefits financially if more businesses adopt automation, so he has a strong personal reason to promote it.\n\nThis means his statement that "our technology creates far more jobs than it replaces" may not be fully reliable, because he is unlikely to acknowledge any negative effects of automation if doing so would discourage potential customers from buying his products. His claim that "every business that uses our systems has grown its workforce" may be selectively presented — he would not publicise cases where businesses reduced their workforce after adopting his technology.',
    modelNote:
      'This answer scores 3/3 because it: (1) names the person and their role, (2) clearly explains the financial gain (selling automation products), and (3) explains how this interest could make the statement unreliable (selective presentation, unlikely to acknowledge negatives). Note: Datuk Seri Saravanan also has a vested interest — as a government minister, he has a political interest in presenting his own department’s programmes positively.',
  },
];

/* ─────────── Tab 7: Self-Assessment ─────────── */
export const TASK_ITEMS: { label: string; time: string }[] = [
  { label: 'Read all 8 reference cards (Reference)', time: '10 min' },
  { label: 'Complete Rapid Sort — all 24 statements', time: '18 min' },
  { label: 'Source A Deep Dive — find all 8 types', time: '12 min' },
  { label: 'Source B Deep Dive — find all 8 types', time: '10 min' },
  { label: 'Confusable Pairs — Fact vs Claim', time: '4 min' },
  { label: 'Confusable Pairs — Opinion vs Value Judgement', time: '4 min' },
  { label: 'Confusable Pairs — Generalisation vs Claim', time: '4 min' },
  { label: 'Confusable Pairs — Bias vs Vested Interest', time: '4 min' },
  { label: 'Create Your Own — write 8 original statements', time: '15 min' },
  { label: 'Exam Practice — answer all 5 questions', time: '25 min' },
  { label: 'Confidence check and reflection', time: '14 min' },
];

export const CONFIDENCE_ITEMS: { type: IntensiveType; desc: string }[] = [
  { type: 'Fact', desc: 'I can identify a fact by checking whether it can be verified.' },
  { type: 'Opinion', desc: 'I can spot an opinion by looking for "I think", "I believe", "I feel".' },
  { type: 'Prediction', desc: 'I can identify a prediction by looking for future tense and "will/could/likely".' },
  { type: 'Value Judgement', desc: 'I can recognise value judgements that assess something as good, bad, right, or wrong.' },
  { type: 'Generalisation', desc: 'I can spot a generalisation by looking for "all/every/always/never".' },
  { type: 'Claim', desc: 'I can distinguish a claim from a fact — claims are asserted but debatable.' },
  { type: 'Bias', desc: 'I can identify bias by looking at the language used — emotive, loaded, one-sided.' },
  { type: 'Vested Interest', desc: 'I can identify vested interest by asking who benefits from the statement.' },
];
