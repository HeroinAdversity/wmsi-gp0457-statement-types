/* Data extracted from public/legacy/mindmap.html.
   Preserved verbatim. */

export const TOOL_ID = 'mindmap';

export type BranchKind = 'priority' | 'term' | 'confusion';

export interface Branch {
  id: string;
  name: string;
  zh: string;
  kind: BranchKind;
  badge: string;
  def: string;
  yes?: string;
  no?: string;
  note?: string;
  signals?: string[];
  more?: string[];
  pairs?: [string, string][];
  children: { name: string; sub: string; ex?: boolean }[];
}

export const BRANCHES: Branch[] = [
  {
    id: 'generalisation',
    name: 'Generalisation',
    zh: '概括性陈述',
    kind: 'priority',
    badge: '1(b) — tested directly',
    def:
      'A statement that takes something true of a <strong>small group or a specific case</strong> and presents it as true for <strong>everyone</strong> — or uses an absolute like <em>always</em>, <em>never</em>, or <em>all</em> when the truth is only <em>sometimes</em>.',
    yes: 'A survey of 200 students in one city found 60% felt anxious after using social media — so teenagers everywhere are being harmed by their phones.',
    no: 'A 2024 survey of 200 students in one city found that 60% reported feeling anxious after extended social media use.',
    note:
      'The second sentence is just a <strong>fact</strong> — it stays honest about its sample. The first takes that same sample and stretches it to <em>"teenagers everywhere."</em> That stretch is the generalisation.',
    signals: ['always', 'never', 'everyone', 'all [group]', 'no one', 'every time'],
    more: [
      'All young people who use social media platforms will eventually experience a decline in their mental wellbeing.',
      'Since one student in my class felt anxious after using their phone, it proves that social media always harms every teenager.',
    ],
    children: [
      { name: 'Definition', sub: 'Small case applied to everyone, or absolute claims' },
      { name: 'Signal words', sub: 'always · never · everyone · all' },
      { name: 'Example', sub: '"…so teenagers everywhere are being harmed by their phones."', ex: true },
      { name: 'Exam focus', sub: 'Question 1(b) — 3 marks total' },
      { name: 'Explaining it', sub: 'Name the stretch, or name the absolute word' },
    ],
  },
  {
    id: 'fact',
    name: 'Fact',
    zh: '事实',
    kind: 'term',
    badge: 'Q2 · Q3 · Q4',
    def: 'A statement that can be checked and shown to be true or false using evidence.',
    yes: 'The World Health Organization reported a rise in reported cases of teen anxiety between 2015 and 2023.',
    no: 'Social media is the worst thing that has ever happened to young people.',
    note:
      'A fact can still be <em>selectively chosen</em> or presented with bias — being factual doesn’t automatically make a source balanced.',
    more: [
      'Studies have shown that a significant percentage of teenagers check their notifications within minutes of waking up.',
      'Many social media platforms have age restrictions that prevent children under 13 from creating accounts.',
    ],
    children: [
      { name: 'Definition', sub: 'Verifiable using evidence' },
      { name: 'Example', sub: '"The WHO reported a rise in teen anxiety between 2015 and 2023."', ex: true },
      { name: 'Where it appears', sub: 'Q2, Q3, Q4 — as evidence' },
      { name: 'Nuance', sub: 'Can still be presented with bias' },
    ],
  },
  {
    id: 'opinion',
    name: 'Opinion',
    zh: '观点',
    kind: 'term',
    badge: 'Q2 · Q3',
    def:
      'A personal view or judgement that cannot be proven true or false. It can be reasonable or unreasonable — but not <em>checked</em>.',
    yes: 'I think schools should ban phones completely — it’s the only way students will focus.',
    no: 'Every young person deserves the right to switch off without judgement.',
    note:
      'That second one is a <strong>value</strong>, not an opinion. A value states a <em>principle</em> about what matters; an opinion is a specific judgement or recommendation.',
    more: [
      'I believe that the only way to stop cyberbullying is to make the internet completely anonymous.',
      'It is my opinion that teenagers were much happier before the invention of the smartphone.',
    ],
    children: [
      { name: 'Definition', sub: 'Personal view, cannot be proven' },
      { name: 'Example', sub: '"I think schools should ban phones completely."', ex: true },
      { name: 'Where it appears', sub: 'Q2, Q3 — evaluating reasoning' },
      { name: 'Nuance', sub: 'Judgement, not underlying principle' },
    ],
  },
  {
    id: 'value',
    name: 'Value',
    zh: '价值观',
    kind: 'term',
    badge: 'Q3 · Q4',
    def:
      'A statement reflecting what someone believes is important, right, fair, or desirable — underlying principles rather than facts.',
    yes: 'Protecting children’s mental health should always come before a company’s profit.',
    no: 'If nothing changes, mental health referrals will keep rising over the next decade.',
    note: 'That second one is a <strong>prediction</strong> — it’s about the future, not about what matters.',
    more: [
      'Protecting the mental wellbeing of the next generation is more important than the profits of technology firms.',
      'Young people should have the right to disconnect from the digital world whenever they choose.',
    ],
    children: [
      { name: 'Definition', sub: 'Underlying principles of right and wrong' },
      { name: 'Example', sub: '"Children’s mental health should come before company profit."', ex: true },
      { name: 'Where it appears', sub: 'Q3, Q4 — perspectives' },
    ],
  },
  {
    id: 'claim',
    name: 'Claim',
    zh: '主张',
    kind: 'term',
    badge: 'Q3',
    def:
      'An assertion put forward as true. It might be backed by evidence, or it might not. The word "claim" alone tells you nothing about reliability.',
    yes: 'App developers claim their new \'focus mode\' reduces screen time by half.',
    no: 'App developers’ internal data, reviewed by an independent auditor, showed a 48% reduction in screen time among test users.',
    note:
      'The second version is a claim <em>with evidence</em> — far stronger. Always ask: <strong>what evidence backs this, and who is making it?</strong>',
    more: [
      'Social media influencers claim that their content helps to promote body positivity among their young followers.',
      'Researchers assert that there is a direct link between the number of followers a teenager has and their level of self-worth.',
    ],
    children: [
      { name: 'Definition', sub: 'Assertion put forward as true' },
      { name: 'Example', sub: '"App developers claim their focus mode halves screen time."', ex: true },
      { name: 'Where it appears', sub: 'Q3 — analysing arguments' },
      { name: 'Evaluating it', sub: 'Check the evidence and the source' },
    ],
  },
  {
    id: 'prediction',
    name: 'Prediction',
    zh: '预测',
    kind: 'term',
    badge: 'Q2 · Q4',
    def: 'A statement about what is expected to happen in the future. It cannot yet be checked against evidence.',
    yes: 'Experts warn that without regulation, screen-related anxiety cases will double by 2030.',
    no: 'Screen-related anxiety cases doubled between 2015 and 2023.',
    note: 'The second is a <strong>fact</strong> — past tense, and checkable right now. Tense is your quickest tell.',
    more: [
      'Experts suggest that by 2030, most mental health therapy for teenagers will be conducted through artificial intelligence.',
      'The number of hours spent on mobile devices is likely to decrease as new wearable technologies are developed.',
    ],
    children: [
      { name: 'Definition', sub: 'Expected future events' },
      { name: 'Example', sub: '"…anxiety cases will double by 2030."', ex: true },
      { name: 'Where it appears', sub: 'Q2, Q4 — future consequences' },
      { name: 'Distinction', sub: 'Cannot be checked yet' },
    ],
  },
  {
    id: 'bias',
    name: 'Bias',
    zh: '偏见',
    kind: 'term',
    badge: 'Q2',
    def:
      'A one-sided slant in how information is selected or presented — usually favouring one perspective while downplaying or omitting others.',
    yes: 'A wellness-app company’s blog only cites studies where its product improved user mood, and never mentions studies with no effect.',
    no: 'A university research summary presents both studies that found benefits and studies that found no significant effect.',
    note:
      'Bias is about <strong>selection</strong> — what’s left in and what’s left out — not necessarily about lying.',
    more: [
      'The article exclusively discusses the negative impacts of screen time and ignores all data regarding social connectivity.',
      'This documentary only interviews students who are happy with their digital lives and omits any mention of online risks.',
    ],
    children: [
      { name: 'Definition', sub: 'One-sided slant in selection' },
      { name: 'Example', sub: 'A blog citing only studies that flatter its own product.', ex: true },
      { name: 'Where it appears', sub: 'Q2 — evaluating research' },
      { name: 'Key idea', sub: 'Look at what is left out' },
    ],
  },
  {
    id: 'vested',
    name: 'Vested Interest',
    zh: '既得利益',
    kind: 'term',
    badge: 'Q2 · Q3',
    def:
      'A personal, financial, or professional stake that gives someone a reason to present information in a way that benefits them.',
    yes: 'A company that sells "digital detox" retreats publishes an article on the dangers of phone use.',
    no: 'An independent, government-funded health body publishes findings on phone use and anxiety.',
    note:
      'A vested interest doesn’t automatically make a source <em>wrong</em> — but it is a reason to check the evidence more carefully.',
    more: [
      'A company that sells software to track children’s phone use publishes a report on the dangers of unsupervised internet access.',
      'The developer of a new social media app claims that their platform is the only one that does not harm mental health.',
    ],
    children: [
      { name: 'Definition', sub: 'Personal or financial stake' },
      { name: 'Example', sub: 'A "digital detox" retreat warning about phone use.', ex: true },
      { name: 'Where it appears', sub: 'Q2, Q3 — source reliability' },
      { name: 'Nuance', sub: 'Not automatically wrong — check carefully' },
    ],
  },
  {
    id: 'confusions',
    name: 'Common Confusions',
    zh: '易混淆',
    kind: 'confusion',
    badge: 'Exam traps',
    def: 'These five pairs account for most lost marks. Learn the one question that separates each pair.',
    note:
      'In 1(b)(ii) you must <strong>name</strong> what makes it a generalisation — the stretched sample, or the absolute word. Saying "it generalises" earns nothing.',
    pairs: [
      ['Generalisation vs Fact', 'Does it stay honest about its sample, or stretch to "everyone"?'],
      ['Opinion vs Value', 'A specific judgement, or an underlying principle?'],
      ['Prediction vs Fact', 'About the future (uncheckable), or the past (checkable)?'],
      ['Bias vs Vested Interest', 'Bias is in the presentation; vested interest is in the stake held.'],
      ['Claim vs Fact', 'A claim is asserted; a fact is verifiable.'],
    ],
    children: [
      { name: 'Generalisation vs Fact', sub: 'Sample size — honest or stretched?' },
      { name: 'Opinion vs Value', sub: 'Judgement vs principle' },
      { name: 'Prediction vs Fact', sub: 'Future vs past' },
      { name: 'Bias vs Vested Interest', sub: 'Presentation vs stake' },
      { name: 'Claim vs Fact', sub: 'Assertion vs verification' },
    ],
  },
];

export const KIND_COLOR: Record<BranchKind, string> = {
  priority: 'amber',
  term: 'cobalt',
  confusion: 'violet',
};
