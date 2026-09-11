/**
 * Static content for the Weighing Room (Q1(d) significance skills) page.
 * Ported from legacy/the-weighing-room-q1d.html — student-facing prose kept
 * verbatim to preserve pedagogy.
 */

export type CriterionKey = 'crowd' | 'hurt' | 'fair' | 'domino' | 'stuck' | 'backitup';

export interface Criterion {
  key: CriterionKey;
  labelEn: string;
  labelZh: string;
  defEn: string;
  starterEn: string;
}

export const CRITERIA: Criterion[] = [
  {
    key: 'crowd',
    labelEn: 'The Crowd Test',
    labelZh: '人群测试',
    defEn: 'Does this hit a few people, or loads of people — a town, a country, the world?',
    starterEn: '"…this matters because it affects [X] people, not just a small group."',
  },
  {
    key: 'hurt',
    labelEn: 'The Hurt Test',
    labelZh: '伤害测试',
    defEn: 'Does this just annoy people a bit, or does it really damage their lives?',
    starterEn: '"…it has the greatest effect on [group]\'s daily life, because…"',
  },
  {
    key: 'fair',
    labelEn: 'The Fair Test',
    labelZh: '公平测试',
    defEn: 'Is there a right-or-wrong issue here — is someone being treated unfairly?',
    starterEn: '"…it is the most ethically serious, since it involves…"',
  },
  {
    key: 'domino',
    labelEn: 'The Domino Test',
    labelZh: '多米诺测试',
    defEn: 'Does it cause other problems, or spread to affect other people or things?',
    starterEn: '"…this doesn\'t stop there — it also leads to…"',
  },
  {
    key: 'stuck',
    labelEn: 'The Stuck Test',
    labelZh: '停滞测试',
    defEn: 'Once it happens, is it easy to undo — or does it last, and stay hard to fix?',
    starterEn: '"…unlike the others, this is difficult to solve because…"',
  },
];

export const BONUS_MOVE = {
  labelEn: 'Back It Up (bonus)',
  labelZh: '回溯支撑（加分）',
  bodyEn:
    "none of the five tests above, but it makes any of them stronger. If your source quotes an expert, a study, or an organisation backing up the point you've chosen, say so. \"Source 2 shows that public health researchers also identify this as…\" An opinion backed by someone else's evidence is harder to argue with than a bare opinion.",
};

/* Exam stems — Q1(d) in four disguises */

export const Q1D_STEMS: { meta: string; body: React.ReactNode }[] = [
  { meta: '2026 series, Variant 11', body: 'Sources 1 and 2 identify benefits of cooperatives. Which benefit do you think is the most significant? Explain why.' },
  { meta: '2026 series, Variant 12', body: 'Sources 1 and 2 suggest causes of vehicle crime. Which cause do you think is the most significant? Explain why.' },
  { meta: 'Practice paper', body: 'Sources 1 and 2 describe consequences of rising food prices. Which consequence do you think is the most significant? Explain why.' },
  { meta: 'Practice paper', body: 'Sources 1 and 2 raise challenges linked to social media use. Which challenge do you think is the most significant? Explain why.' },
];

/* Level descriptions for Table B */

export interface Band {
  key: string;
  label: string;
  descEn: string;
}

export const BANDS: Band[] = [
  { key: '0', label: '0', descEn: 'No creditable response' },
  { key: '1-2', label: '1–2', descEn: 'An opinion is stated but barely explained. It may not really connect to the issue at all.' },
  { key: '3-4', label: '3–4', descEn: "The opinion has an explanation, but it's thin, and only loosely tied to the source material." },
  { key: '5-6', label: '5–6', descEn: 'A believable explanation, mostly linked to the issue, with some support.' },
  { key: '7-8', label: '7–8', descEn: 'A clearly explained opinion, well supported, and consistently tied to the specific issue in front of you.' },
];

/* Matching exercise (Tab 2) */

export interface MatchItem {
  answer: CriterionKey;
  quote: string;
  optionsOrder: CriterionKey[];
}

export const MATCH_ITEMS: MatchItem[] = [
  {
    answer: 'crowd',
    quote: '"I think this is the most significant because it doesn\'t just affect one town — it affects people in almost every country that relies on this trade."',
    optionsOrder: ['crowd', 'fair', 'stuck', 'hurt'],
  },
  {
    answer: 'hurt',
    quote: '"I think this is the most significant because the families affected here don\'t just lose a little income — they lose their home completely, with nowhere else to go."',
    optionsOrder: ['domino', 'hurt', 'crowd', 'fair'],
  },
  {
    answer: 'fair',
    quote: '"I think this is the most significant because it isn\'t right that one group is treated so differently, just because of where they happened to be born."',
    optionsOrder: ['fair', 'stuck', 'crowd', 'domino'],
  },
  {
    answer: 'domino',
    quote: '"This is the most significant cause because it doesn\'t just create one problem — a family losing income leads to children leaving school, which makes it harder for that family to recover, and it starts to affect the whole neighbourhood as local shops lose customers too."',
    optionsOrder: ['hurt', 'domino', 'crowd', 'stuck'],
  },
  {
    answer: 'stuck',
    quote: '"Even once the immediate event is over, this particular effect can still be found decades later, whereas the other consequences fade within a few years."',
    optionsOrder: ['stuck', 'fair', 'crowd', 'domino'],
  },
];

/* Worked model (Tab 3) */

export const MODEL_SOURCES = {
  s1Label: "SOURCE 1 — Employers' association briefing",
  s1Body:
    "When Star Fasteners, a small manufacturing company, began actively recruiting employees with physical and sensory disabilities in 2019, managers expected mainly to fulfil a moral obligation. Three years on, the company's own figures tell a different story. Staff turnover in departments with a mixed-ability workforce fell from 34% to 11% annually — far below the sector average. Employees interviewed said they felt more loyal to a company that had adapted its processes for them, and were less likely to leave for a marginally higher salary elsewhere. A national employers' association has since published guidance encouraging other manufacturers to consider similar hiring practices, citing loyalty and retention as the clearest measurable benefit. The association's 2023 survey of 240 companies found that firms with inclusive hiring policies reported 18% lower recruitment costs than firms without such policies. Government incentive schemes, including reduced payroll tax for employers meeting inclusion quotas, were also mentioned by several companies as a reason for expanding their hiring practices, although managers were divided on how much this financial incentive alone had driven their decision.",
  s2Label: 'SOURCE 2 — Interview with Mei Ling Tan, operations manager',
  s2Body: [
    { role: 'Interviewer', text: 'What changed after you started hiring more staff with disabilities on the assembly line?' },
    { role: 'Mei Ling', text: "Honestly, we expected it to slow things down at first. We had to redesign two stations — lower the benches, add larger control buttons. But those redesigned stations turned out to be easier and faster for everyone to use, not just the staff we'd hired. Our overall error rate on that line actually dropped." },
    { role: 'Interviewer', text: 'Did you notice anything else?' },
    { role: 'Mei Ling', text: "Morale changed. Staff who'd worked here for years started saying the factory felt like somewhere that looked after its people. We also had a write-up in the local newspaper, which brought us more job applicants than any advert we've placed. But honestly, the biggest thing for me was watching two colleagues — one with and one without a hearing impairment — sort out a shared signal system between themselves without being asked to." },
  ],
  qStem:
    'Sources 1 and 2 identify benefits of employing people with disabilities. Which benefit do you think is the most significant? Explain why.',
};

export const MODEL_ANSWER: { text: string; note: string }[] = [
  {
    text: 'I think the most significant benefit is that redesigning workstations for staff with disabilities ended up improving conditions for the entire workforce, not just the employees the changes were originally made for.',
    note: 'Clear, specific opinion stated immediately — no throat-clearing.',
  },
  {
    text: 'This matters because the benefit reaches every worker on the line, not only the small group it was designed for.',
    note: 'TOOLKIT: The Crowd Test — the benefit is shown to extend beyond the group it was designed for.',
  },
  {
    text: 'Source 2 shows that when Star Fasteners lowered benches and enlarged control buttons for staff with sensory and physical disabilities, the error rate on that whole assembly line fell — meaning colleagues without disabilities benefited from the same redesign.',
    note: "BONUS MOVE: Back It Up — a direct, specific use of Source 2 (a named detail, not a vague 'the source says...').",
  },
  {
    text: 'This makes it more significant than the government incentive scheme mentioned in Source 1, because a tax incentive only benefits the company\'s finances, whereas this benefit reaches every worker and improves the product itself.',
    note: 'COMPARATIVE REASONING — required for Level 4: shows why this beats an alternative, rather than just describing it in isolation.',
  },
  {
    text: 'It also creates a kind of chain reaction: fewer errors likely means less wasted material and less rework, which could make the whole factory more efficient, not just safer for a small group of staff.',
    note: 'TOOLKIT: The Domino Test — one change is shown triggering a chain of further effects.',
  },
  {
    text: 'For this reason, I think this benefit outweighs the others identified in the sources, because its effects spread furthest and touch the day-to-day experience of the most people.',
    note: "Table B, Level 4: the opinion is 'consistently related to the identified issue' — this closing line ties everything back to the original claim.",
  },
];

export const LEVEL_COMPARE_CARDS: { levelTag: string; text: string }[] = [
  {
    levelTag: 'Level 1 · 1–2',
    text: '"I think the most significant benefit is that workers stay longer. This is good for the company."',
  },
  {
    levelTag: 'Level 2 · 3–4',
    text: '"I think the most significant benefit is that staff stay longer at the company, because Source 1 says turnover dropped a lot. This means the company doesn\'t have to keep replacing workers."',
  },
  {
    levelTag: 'Level 3 · 5–6',
    text: '"I think the most significant benefit is that staff turnover fell from 34% to 11%, as shown in Source 1. This matters because replacing staff is expensive and time-consuming, so lower turnover saves the company money and keeps experienced workers on site."',
  },
];

/* Level-Up (Tab 4) */

export const LEVELUP_BASE =
  'I think the most significant benefit is that the company got more job applicants. This is good.';

export const LEVELUP_STEPS: { tag: string; label: string; text: string }[] = [
  {
    tag: 'STEP 1 · ADD SOURCE EVIDENCE',
    label: 'Add a specific detail from the source',
    text: " Source 2 shows that after a newspaper article about the company's inclusive hiring, they received more job applications than from any advert they had placed before.",
  },
  {
    tag: 'STEP 2 · USE A TOOLKIT TEST',
    label: 'Explain why that detail actually matters',
    text: " This suggests the company's reputation genuinely improved among a wide pool of potential employees — not just a short-term news story, but a lasting change in how outsiders view the company.",
  },
  {
    tag: 'STEP 3 · COMPARE',
    label: 'Show why it beats another benefit in the sources',
    text: ' This is more significant than the drop in staff turnover mentioned in Source 1, because a stronger reputation could keep attracting good staff long into the future, while lower turnover only protects the staff already employed.',
  },
  {
    tag: 'STEP 4 · CONCLUDE',
    label: 'Tie it back to your overall judgement',
    text: ' For this reason, I believe improved reputation is the most significant benefit, because it has the potential to keep shaping the company\'s success well beyond the initial hiring decisions.',
  },
];

/* Practice sets (Tab 5) */

export interface PracticeSet {
  n: number;
  topic: string;
  s1Label: string;
  s1: string;
  s2Label: string;
  s2: string; // interview / diary style, plain paragraph
  qMeta: string;
  qStem: React.ReactNode;
  revealPoints: string[];
  revealTips: string[];
}

export const PRACTICE_SETS: PracticeSet[] = [
  {
    n: 1,
    topic: 'DIGITAL WORLD',
    s1Label: 'SOURCE 1 — Transport ministry survey',
    s1:
      'A transport ministry survey of 1,500 residents in a mid-sized city found that 62% of respondents used a ride-hailing app at least once a week, compared with just 9% five years earlier. Among users without their own vehicle, average commute times fell by around twelve minutes per trip, since ride-hailing filled gaps left by infrequent bus routes, particularly in the evenings. The survey also noted a rise in part-time earnings among drivers, many of whom said the flexible hours allowed them to combine driving with studying or caring for family members. However, traffic engineers pointed out that driver numbers on the road fluctuated sharply depending on the time of day, occasionally adding to congestion during peak hours. Local taxi associations argued that ride-hailing apps had reduced their own trade, though overall public satisfaction with transport options in the city had risen for the first time in a decade.',
    s2Label: "SOURCE 2 — University student's diary entry",
    s2:
      '"I don\'t own a car, and the bus near campus stops running after 8pm, which used to be a real problem when I had evening classes. Now I just book a ride, and it\'s usually cheaper than expected if I share the trip with other students heading the same way. My mother, who drives for one of the apps three evenings a week, says it\'s the only job she\'s found that lets her pick her own hours around my little brother\'s school schedule. She did mention some weeks are worse than others — when demand is low, her earnings barely cover fuel. Our neighbour, who drove a licensed taxi for fifteen years, is less positive. He feels the apps were allowed to operate without the same rules his profession has always followed, which he thinks is unfair on drivers like him."',
    qMeta: 'Practice item 1',
    qStem: 'Sources 1 and 2 identify benefits of ride-hailing apps in cities. Which benefit do you think is the most significant? Explain why.',
    revealPoints: [
      'Shorter commute times / filling gaps left by limited bus routes (Crowd Test — helps everyone without a car, not just one group)',
      'Flexible income for drivers balancing study or caregiving (Hurt Test — changes daily life for a specific group)',
      'Rise in overall public satisfaction with transport (Crowd Test — city-wide effect; also a good spot for the Back It Up bonus move, since it\'s backed by survey data)',
    ],
    revealTips: [
      'Naming one benefit specifically rather than summarising both sources generally',
      'Using a precise detail (a figure, a quote) rather than a paraphrase of "it helps people"',
      'Explicitly comparing your choice against a different benefit from the sources, and saying why it wins',
    ],
  },
  {
    n: 2,
    topic: 'ENVIRONMENT / CONSERVATION',
    s1Label: 'SOURCE 1 — Water-quality report, Sungai Chantek',
    s1:
      'A water-quality report on Sungai Chantek, a river running through several villages in Perak, found plastic waste concentrations three times higher than the state average. Local fishers reported declining catches over six years, with some fish species becoming rare near the market town, partly because fish mistake small plastic fragments for food. Downstream, a water treatment plant serving around 40,000 residents reported rising filter maintenance costs as plastic increasingly clogged intake screens during the rainy season. Tourism operators running river tours noted a slight fall in visitor numbers over the same period, with several visitors mentioning visible rubbish in online reviews. The report recommended community clean-up schemes and better waste collection upstream, while acknowledging much of the plastic likely came from a wider catchment area beyond any single village\'s control.',
    s2Label: 'SOURCE 2 — Interview with Pak Rashid, fisherman',
    s2:
      '"When I was young, you could see straight to the riverbed near the old bridge. Now it\'s rare to pull in a net without finding plastic tangled in it. My income from fishing has dropped by more than half compared to ten years ago, and two younger fishermen in this village have already left to find factory work instead, because they can\'t rely on the river anymore. It isn\'t only about money for us — my grandchildren used to swim here every school holiday, but their mother won\'t let them anymore because of what washes up after heavy rain. I\'ve heard the school now runs a river clean-up day, which is something, but one day a year won\'t undo what\'s built up over thirty years."',
    qMeta: 'Practice item 2',
    qStem: 'Sources 1 and 2 describe consequences of plastic pollution in Sungai Chantek. Which consequence do you think is the most significant? Explain why.',
    revealPoints: [
      'Falling fish stocks reducing fishers\' income, pushing younger fishermen out of the village entirely (Stuck Test + Domino Test — a livelihood and a whole community are both affected)',
      'Rising treatment costs affecting 40,000 residents downstream (Crowd Test)',
      'Loss of safe recreational use of the river for local children (Hurt Test / Fair Test — a quality-of-life consequence, not just financial)',
      'Decline in river tourism (Knock-on economic effect)',
    ],
    revealTips: [
      'Choosing one consequence and following it through, rather than listing several briefly',
      'Quoting a specific detail from Pak Rashid\'s account or the report\'s figures',
      'Explaining why this consequence is harder to reverse or wider-reaching than the others',
    ],
  },
  {
    n: 3,
    topic: 'HEALTH AND WELLBEING',
    s1Label: 'SOURCE 1 — Regional student wellbeing survey',
    s1:
      'A regional survey of 2,200 secondary school students found reported symptoms of anxiety had risen by 40% over five years. Asked what worried them most, 58% cited academic pressure and exam results, while 34% cited comparison with peers on social media. Counsellors interviewed for the report noted many students felt their exam results were treated as the single measure of their worth by teachers and family, with some describing sleepless nights before test dates. Students who felt less connected to a friendship group at school reported higher anxiety scores on average than those who felt well supported socially, regardless of academic performance. Researchers cautioned that these factors likely combine rather than act alone, though academic pressure was the most frequently mentioned single factor across every age group surveyed.',
    s2Label: 'SOURCE 2 — Interview with a school counsellor',
    s2:
      '"The students I see most often are not struggling with one single thing — but if I had to name what comes up in nearly every conversation, it\'s the fear of disappointing someone: a parent, a teacher, sometimes themselves. A student told me last month she\'d stopped telling her parents her real grades because she couldn\'t face another conversation about \'wasted potential.\' I also see a lot of comparison — a student doing well overall can still feel like a failure after scrolling through classmates\' exam-result posts online. What worries me most, though, is how normal it\'s become for students to say they haven\'t slept properly in weeks. That\'s not something that resolves itself once exam season ends; it tends to follow students into the next term, and the one after that."',
    qMeta: 'Practice item 3',
    qStem: 'Sources 1 and 2 suggest causes of rising anxiety among secondary school students. Which cause do you think is the most significant? Explain why.',
    revealPoints: [
      'Academic pressure / fear of disappointing family or teachers (most frequently cited — Crowd Test, since it turns up across every age group; also a good Back It Up moment, since it\'s backed by survey data)',
      'Social media comparison with peers (Crowd Test + Fair Test)',
      'Lack of social connection at school (Hurt Test)',
      'Ongoing sleep loss that outlasts exam season (Stuck Test — it "follows students into the next term")',
    ],
    revealTips: [
      'Naming ONE cause and explaining it thoroughly, not summarising the whole survey',
      'Using the counsellor\'s specific example (the student hiding her grades) as evidence, not just the statistics',
      'Comparing your chosen cause against another to justify the ranking',
    ],
  },
  {
    n: 4,
    topic: 'SOCIAL IDENTITY AND INCLUSION',
    s1Label: 'SOURCE 1 — Community integration survey',
    s1:
      'A community integration survey of 300 recently arrived families in a multicultural township found language barriers were the most commonly reported obstacle to settling in, cited by 71% of respondents, ahead of difficulty finding suitable housing (48%) and unfamiliarity with local job application processes (39%). Families reporting strong language barriers were also the least likely to say they had made friends outside their own community within the first year. Local community centres running free language classes reported waiting lists of up to four months. The survey noted children generally adapted to the local language faster than their parents through school, which sometimes placed children in the position of translating official documents and medical appointments for family members — a role support workers described as placing unusual pressure on some children.',
    s2Label: 'SOURCE 2 — Interview with Amara, a newcomer',
    s2:
      '"The hardest part wasn\'t finding a place to live, though that took a long time too. It was not being able to explain myself properly — at the clinic, at the bank, even at my son\'s school meetings. I remember standing at a counter, everyone behind me getting impatient, and just feeling so small. My son, who\'s eleven, ends up coming with me to translate sometimes, even for things I don\'t think an eleven-year-old should have to hear about, like discussing his little sister\'s illness with a doctor. I\'ve made friends with other parents from my home country, but I still don\'t really know my neighbours, even after two years, because we\'ve never had a proper conversation."',
    qMeta: 'Practice item 4',
    qStem: 'Sources 1 and 2 identify challenges faced by newcomers settling into a multicultural community. Which challenge do you think is the most significant? Explain why.',
    revealPoints: [
      'The language barrier (most cited, and shown to affect housing, jobs, and friendships — Crowd Test + Domino Test, since it spreads across many areas of life)',
      'Children taking on adult translation responsibilities, including sensitive medical matters (strong Fair Test)',
      'Long waiting lists for language classes (shows the challenge is structural, not just personal — Stuck Test)',
      'Ongoing social isolation, "even after two years" (Stuck Test + Hurt Test)',
    ],
    revealTips: [
      'Picking one challenge and tracing its effects, rather than restating the survey\'s percentages',
      'Using Amara\'s specific example (translating for her son\'s medical appointments) as evidence',
      'Explaining clearly why this challenge outweighs, say, housing difficulty',
    ],
  },
  {
    n: 5,
    topic: 'WAR, CONFLICT AND PEACE',
    s1Label: 'SOURCE 1 — Education-in-emergencies report',
    s1:
      'An education-in-emergencies report estimated that more than one million school-aged children affected by an ongoing regional conflict have missed at least one full year of formal schooling. Displaced families frequently moved between temporary shelters, making consistent school enrolment difficult even where schools remained open nearby. Girls were withdrawn from school earlier than boys on average, often to help with domestic duties or care for younger siblings while parents sought work or aid. Where temporary learning spaces were set up in camps, teacher shortages meant classes sometimes held more than 80 students, far above the recommended maximum. Children who missed more than two years of schooling were significantly less likely to return to formal education even after conflict ended in their area, since they had grown older than their expected grade level and often needed to work instead. Long-term unemployment and reduced lifetime earnings were identified as likely knock-on effects for this group.',
    s2Label: 'SOURCE 2 — Interview with a volunteer teacher',
    s2:
      '"I have children in my class from six years old up to fourteen, all in the same room, because there simply aren\'t enough teachers or tents for separate grades. Some of my older students haven\'t been in a classroom for three years. They\'ve forgotten how to hold a pencil properly, and worse, some have stopped believing school still matters for them. I had one girl, about twelve, who was clearly bright, but her mother needed her at home to look after three younger children while she queued for food supplies. I understand the family\'s situation completely, but it means that girl\'s education may never resume, even once things become calmer here. It\'s really the older group I worry about most — they\'re at the age where missing school stops being a delay and starts being permanent."',
    qMeta: 'Practice item 5',
    qStem: 'Sources 1 and 2 describe consequences of conflict-driven displacement on children\'s education. Which consequence do you think is the most significant? Explain why.',
    revealPoints: [
      'Older children\'s education becoming permanently lost rather than delayed (Stuck Test — described explicitly as the point where "missing school stops being a delay and starts being permanent")',
      'Girls withdrawn from school earlier than boys (Fair Test — an unequal impact on one group)',
      'Overcrowded, under-resourced classrooms affecting all students in the camp (Crowd Test)',
      'Long-term unemployment and reduced lifetime earnings (Domino Test — one lost year triggering lifelong consequences)',
    ],
    revealTips: [
      'Choosing one consequence and following its long-term implications, not just describing the immediate disruption',
      'Using the teacher\'s specific example (the twelve-year-old girl) as evidence for your point',
      'Comparing your chosen consequence against another using a Toolkit weight',
    ],
  },
];

/* Journal / self-check (Tab 6) */

export const SELF_CHECK_ITEMS: string[] = [
  'I can explain why "benefit", "cause", "consequence" and "challenge" all test the same skill',
  'I can name at least four of the seven Toolkit weights without looking',
  'I understand why choosing a point is free, but justifying it is where the marks are',
  'I know that a Level 4 answer must compare my choice against another option, not just describe it',
  'I attempted at least 3 of the 5 exam practice items',
];

export const JOURNAL_STEMS: string[] = [
  'One Significance Toolkit weight I now understand better is… because…',
  'In the exam practice, I chose to write about… The weight(s) I used to justify it were…',
  'Something I\'d still like more practice with before the real exam is…',
];

/* Constants used by both the tool and the teacher dashboard */

export const TOOL_ID = 'significance-judgement';
export const NUM_SETS = 5;
export const SET_MAX_MARK = 8;
export const SELF_CHECK_TOTAL = SELF_CHECK_ITEMS.length;
