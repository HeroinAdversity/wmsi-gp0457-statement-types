import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { Container, DisplayH1, DisplayH2, Lede, Body } from '../components/primitives';
import { Bi } from '../lib/LanguageContext';

type Strand = {
  part: string;
  hue: 'cobalt' | 'amber' | 'forest';
  to: string;
  eyebrowEn: string;
  eyebrowZh: string;
  titleEn: string;
  titleZh: string;
  bodyEn: string;
  bodyZh: string;
  itemsEn: string[];
  itemsZh: string[];
  ctaEn: string;
  ctaZh: string;
};

const STRANDS: Strand[] = [
  {
    part: '1(b)',
    hue: 'cobalt',
    to: '/statements',
    eyebrowEn: 'What kind of statement is it?',
    eyebrowZh: '这是哪一类陈述？',
    titleEn: 'The Eight Types of Statement',
    titleZh: '八种陈述类型',
    bodyEn:
      'Bias, claim, fact, generalisation, opinion, prediction, value, vested interest. Learn to tell them apart and you unlock Q1(b), most of Paper 1, and the analytical spine of the team project.',
    bodyZh:
      '偏见、断言、事实、一般化、意见、预测、价值观、既得利益。学会分辨这八类陈述，就能解锁第 1(b) 题、卷一的大部分内容，以及团队项目的分析主线。',
    itemsEn: [
      'Video explainer + eight-term reference guide',
      '15-minute Find-Your-Gap diagnostic',
      '120-minute Statement Types Intensive',
      'Claim vs Evidence: the source-reading skill',
    ],
    itemsZh: [
      '视频讲解与八词参考手册',
      '15 分钟「找差距」诊断',
      '120 分钟陈述类型强化课程',
      '断言 vs 证据：解读资料的技能',
    ],
    ctaEn: 'Open the Statements strand',
    ctaZh: '进入「陈述类型」',
  },
  {
    part: '1(c)',
    hue: 'amber',
    to: '/perspectives',
    eyebrowEn: 'Whose voice, at what level?',
    eyebrowZh: '这是谁的声音，属于哪个层次？',
    titleEn: 'Identifying & Explaining Perspectives',
    titleZh: '识别与解释观点',
    bodyEn:
      'Global, national, local, personal. How to name the level of a viewpoint, describe it fully from the source, and explain why it exists. Built on real 2026 exam material.',
    bodyZh:
      '全球、国家、地方、个人。如何为一个观点定位层次、从资料中完整描述它，并解释它为何存在。配套真实的 2026 年试卷材料。',
    itemsEn: [
      'The four levels plus a cultural lens',
      'The Five Elements framework',
      'June 2026 Q1(c) worked example',
      'Miren Valley case study',
    ],
    itemsZh: [
      '四大层次加一层文化透镜',
      '五要素分析框架',
      '2026 年 6 月第 1(c) 题范例',
      '米伦谷案例研究',
    ],
    ctaEn: 'Open the Perspectives strand',
    ctaZh: '进入「观点」',
  },
  {
    part: '1(d)',
    hue: 'forest',
    to: '/perspectives/weighing-room',
    eyebrowEn: 'How much does it matter?',
    eyebrowZh: '这件事究竟有多重要？',
    titleEn: 'Significance — The Weighing Room',
    titleZh: '重要性 —— 秤量之室',
    bodyEn:
      'Not what the source says, but how much it matters, and to whom. Weigh a perspective’s significance across scales, evidence it from the paper, and write the Level-3 evaluative answers examiners look for.',
    bodyZh:
      '不只看资料说了什么，更判断它有多重要、对谁重要。跨层次衡量一个观点的分量，从资料中找出证据，写出考官期待的三级评价式回答。',
    itemsEn: [
      'What examiners actually mean by ‘significance’',
      'Weighing across the four levels',
      'Evidence, not assertion',
      'Level-3 evaluative writing',
    ],
    itemsZh: [
      '考官所说的「重要性」究竟是什么',
      '在四大层次之间秤量',
      '用证据，而非断言',
      '三级评价式写作',
    ],
    ctaEn: 'Open The Weighing Room',
    ctaZh: '进入「秤量之室」',
  },
];

export function HomePage() {
  return (
    <>
      <Hero />
      <Q1Map />
      <WhereToStart />
      <TeachersStrip />
    </>
  );
}

/* ─────────── Hero ─────────── */

function Hero() {
  return (
    <section className="pt-20 md:pt-28 pb-24 md:pb-32">
      <Container size="wide">
        <div className="max-w-[860px]">
          <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-ink-3)] mb-8">
            <Bi
              en="Wesley Methodist School International, Ipoh · Y10"
              zh="怡保卫理国际学校 · 十年级"
            />
          </p>
          <DisplayH1>
            <Bi
              en={<>Question 1, from every angle.</>}
              zh={<>第 1 题，从每一个角度切入。</>}
            />
          </DisplayH1>
          <Lede className="mt-8">
            <Bi
              en="Study notes, drills, and past-paper practice for IGCSE Global Perspectives 0457. Everything you need for the three connected skills in Question 1 — from your first pass through the syllabus to the week before the exam."
              zh="为剑桥 IGCSE 全球视野 0457 打造的学习笔记、练习和真题训练。三项彼此相连的第 1 题技能，从第一次学到考前一周所需的一切。"
            />
          </Lede>
          <div className="mt-10 flex flex-wrap gap-3">
            <PrimaryLink to="/statements">
              <Bi en="Start with Statements" zh="从「陈述类型」开始" />
            </PrimaryLink>
            <GhostLink to="#q1-map">
              <Bi en="See the three strands" zh="查看三大主线" />
            </GhostLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ─────────── Q1 Map — three coloured strand strips ─────────── */

function Q1Map() {
  return (
    <section
      id="q1-map"
      className="border-t border-[color:var(--color-line)] pt-20 md:pt-28 pb-8 md:pb-10 scroll-mt-24"
    >
      <Container size="wide">
        <div className="mb-14 md:mb-20 max-w-[760px]">
          <DisplayH2>
            <Bi en="Question 1, mapped out." zh="第 1 题，全景展开。" />
          </DisplayH2>
          <Body className="mt-6 text-[color:var(--color-ink-2)]">
            <Bi
              en="Paper 1 opens with a source and four connected tasks. Three of them are on this site, each with its own colour and its own set of notes."
              zh="卷一以一份资料开场，接着有四道相连的小题。其中三道我们都做了配套：每一道有自己的颜色，也有自己的一整套笔记。"
            />
          </Body>
        </div>
      </Container>

      <div className="space-y-8 md:space-y-10">
        {STRANDS.map((s) => (
          <StrandStrip key={s.part} strand={s} />
        ))}
      </div>
    </section>
  );
}

/* Colour tokens per strand hue, resolved at the call site so the JIT
   compiler keeps every class present in the built stylesheet. */
const HUE_STYLES = {
  cobalt: {
    stripBg: 'bg-[color:var(--color-cobalt-tint)]',
    numberInk: 'text-[color:var(--color-cobalt-deep)]',
    numberEdge: 'border-[color:var(--color-cobalt)]',
    numberDot: 'bg-[color:var(--color-cobalt)]',
    eyebrow: 'text-[color:var(--color-cobalt-deep)]',
    ctaBg: 'bg-[color:var(--color-cobalt)] hover:bg-[color:var(--color-cobalt-deep)]',
    bulletDot: 'bg-[color:var(--color-cobalt)]',
    divider: 'divide-[color:var(--color-cobalt-soft)]',
  },
  amber: {
    stripBg: 'bg-[color:var(--color-amber-tint)]',
    numberInk: 'text-[color:var(--color-amber-deep)]',
    numberEdge: 'border-[color:var(--color-amber)]',
    numberDot: 'bg-[color:var(--color-amber)]',
    eyebrow: 'text-[color:var(--color-amber-deep)]',
    ctaBg: 'bg-[color:var(--color-amber)] hover:bg-[color:var(--color-amber-deep)]',
    bulletDot: 'bg-[color:var(--color-amber)]',
    divider: 'divide-[color:var(--color-amber-soft)]',
  },
  forest: {
    stripBg: 'bg-[color:var(--color-forest-tint)]',
    numberInk: 'text-[color:var(--color-forest-deep)]',
    numberEdge: 'border-[color:var(--color-forest)]',
    numberDot: 'bg-[color:var(--color-forest)]',
    eyebrow: 'text-[color:var(--color-forest-deep)]',
    ctaBg: 'bg-[color:var(--color-forest)] hover:bg-[color:var(--color-forest-deep)]',
    bulletDot: 'bg-[color:var(--color-forest)]',
    divider: 'divide-[color:var(--color-forest-soft)]',
  },
} as const;

function StrandStrip({ strand }: { strand: Strand }) {
  const s = HUE_STYLES[strand.hue];
  return (
    <section className={`${s.stripBg} border-y border-[color:var(--color-line)]`}>
      <Container size="wide">
        <div className="py-12 md:py-16 grid gap-10 md:gap-14 md:grid-cols-[minmax(220px,320px)_1fr]">
          {/* Left rail: exam-part identifier */}
          <div className="flex md:flex-col items-start gap-5 md:gap-6">
            <div
              className={`shrink-0 flex items-baseline gap-2 font-display leading-none ${s.numberInk}`}
            >
              <span className="text-[68px] md:text-[104px] tracking-[-0.03em]">Q</span>
              <span className="text-[68px] md:text-[104px] tracking-[-0.03em]">
                {strand.part}
              </span>
            </div>
            <p
              className={`font-mono text-[11px] font-semibold uppercase tracking-[0.18em] ${s.eyebrow} max-w-[220px]`}
            >
              <Bi en={strand.eyebrowEn} zh={strand.eyebrowZh} />
            </p>
          </div>

          {/* Right column: title, body, bullets, CTA */}
          <div className="max-w-[640px]">
            <h3 className="font-display text-[28px] md:text-[34px] leading-[1.15] tracking-[-0.01em] text-[color:var(--color-ink)] balance">
              <Bi en={strand.titleEn} zh={strand.titleZh} />
            </h3>
            <p className="mt-5 text-[15.5px] md:text-[16px] leading-[1.75] text-[color:var(--color-ink-2)] pretty">
              <Bi en={strand.bodyEn} zh={strand.bodyZh} />
            </p>

            <ul className="mt-8 space-y-3">
              {strand.itemsEn.map((_, i) => (
                <li
                  key={i}
                  className="flex items-baseline gap-3 text-[14.5px] leading-[1.55] text-[color:var(--color-ink)]"
                >
                  <span
                    className={`inline-block w-1.5 h-1.5 rounded-full ${s.bulletDot} translate-y-[-2px] shrink-0`}
                    aria-hidden
                  />
                  <span>
                    <Bi en={strand.itemsEn[i]} zh={strand.itemsZh[i]} />
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Link
                to={strand.to}
                className={`inline-flex items-center gap-2 ${s.ctaBg} text-white transition-colors font-semibold text-[14px] px-5 py-3 rounded-full`}
              >
                <Bi en={strand.ctaEn} zh={strand.ctaZh} />
                <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ─────────── Where to start ─────────── */

const DECISIONS: {
  qEn: string;
  qZh: string;
  aEn: ReactNode;
  aZh: ReactNode;
  to: string;
  ctaEn: string;
  ctaZh: string;
}[] = [
  {
    qEn: 'You’ve never studied Global Perspectives before.',
    qZh: '你从未学过《全球视野》。',
    aEn: (
      <>
        Start with <strong>Q1(b) Statements</strong>. It teaches you how the paper is written — every question after it
        rides on top of these eight terms.
      </>
    ),
    aZh: (
      <>
        请从<strong>第 1(b) 题「陈述类型」</strong>开始。它教你整份试卷的写作逻辑 —— 之后的每一道题，都建立在这八个术语之上。
      </>
    ),
    to: '/statements',
    ctaEn: 'Start with Statements',
    ctaZh: '从「陈述类型」开始',
  },
  {
    qEn: 'Your exam is a few weeks away.',
    qZh: '距离考试只剩几周。',
    aEn: (
      <>
        Take the <strong>Find-Your-Gap diagnostic</strong> first (15 min). It routes you into the confusable-pair clinic
        for your weakest term, then into the Statement Types Intensive.
      </>
    ),
    aZh: (
      <>
        先做<strong>「找差距」诊断</strong>（15 分钟）。系统会根据你的薄弱术语，把你导向对应的对比训练，再进入陈述类型强化课程。
      </>
    ),
    to: '/statements/diagnostic',
    ctaEn: 'Take the diagnostic',
    ctaZh: '开始诊断',
  },
  {
    qEn: 'You just want to know what ‘significance’ means.',
    qZh: '你只是想弄清「重要性」到底是什么。',
    aEn: (
      <>
        Head straight to <strong>The Weighing Room (Q1(d))</strong>. It defines significance, shows worked examples,
        and gives you a template for the Level-3 answer.
      </>
    ),
    aZh: (
      <>
        直接进入<strong>「秤量之室」(第 1(d) 题)</strong>。这里给出重要性的定义、范例解析，以及三级评价式回答的模板。
      </>
    ),
    to: '/perspectives/weighing-room',
    ctaEn: 'Open The Weighing Room',
    ctaZh: '进入「秤量之室」',
  },
];

function WhereToStart() {
  return (
    <section className="border-t border-[color:var(--color-line)] py-20 md:py-28">
      <Container size="wide">
        <div className="mb-12 md:mb-16 max-w-[720px]">
          <DisplayH2>
            <Bi en="Not sure where to start?" zh="不确定从哪里开始？" />
          </DisplayH2>
          <Body className="mt-6 text-[color:var(--color-ink-2)]">
            <Bi
              en="Three common situations. Pick the one that sounds like you — the link takes you straight where you should go."
              zh="三种常见情况。选择最像你的一种 —— 链接会直接把你带到该去的地方。"
            />
          </Body>
        </div>

        <div className="space-y-10 md:space-y-12">
          {DECISIONS.map((d, i) => (
            <article
              key={i}
              className="grid md:grid-cols-[minmax(180px,220px)_1fr] gap-6 md:gap-14 border-t border-[color:var(--color-line-soft)] pt-8"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-display text-[38px] leading-none text-[color:var(--color-ink-3)] tracking-[-0.02em]">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="max-w-[640px]">
                <p className="font-display text-[22px] md:text-[24px] leading-[1.3] text-[color:var(--color-ink)] balance">
                  <Bi en={d.qEn} zh={d.qZh} />
                </p>
                <p className="mt-4 text-[15.5px] leading-[1.75] text-[color:var(--color-ink-2)] pretty">
                  <Bi en={d.aEn} zh={d.aZh} />
                </p>
                <Link
                  to={d.to}
                  className="mt-5 inline-flex items-center gap-2 font-semibold text-[14px] text-[color:var(--color-ink)] hover:text-[color:var(--color-cobalt)] transition-colors border-b border-[color:var(--color-ink)] hover:border-[color:var(--color-cobalt)] pb-0.5"
                >
                  <Bi en={d.ctaEn} zh={d.ctaZh} />
                  <ArrowRight />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ─────────── Teachers strip ─────────── */

function TeachersStrip() {
  return (
    <section className="bg-[color:var(--color-paper-2)] border-t border-[color:var(--color-line)] py-16 md:py-20">
      <Container size="wide">
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-[640px]">
            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-ink-3)] mb-4">
              <Bi en="For teachers" zh="教师专用" />
            </p>
            <h2 className="font-display text-[28px] md:text-[32px] leading-[1.2] tracking-[-0.01em] text-[color:var(--color-ink)] balance">
              <Bi
                en="Lesson sequences, answer keys, and class dashboards."
                zh="课时排序、答案要点、班级面板。"
              />
            </h2>
            <p className="mt-4 text-[15.5px] leading-[1.75] text-[color:var(--color-ink-2)] pretty">
              <Bi
                en="Import student export codes to aggregate class scores and flag students under 60%. Two dashboards: one for the main tool, one for the Intensive."
                zh="导入学生的成绩码即可自动聚合班级分数，标记 60% 以下的学生。两个面板：一个用于主工具，一个用于强化课程。"
              />
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <PrimaryLink to="/teachers/statements">
              <Bi en="Teacher dashboard" zh="教师面板" />
            </PrimaryLink>
            <GhostLink to="/teachers/statements-intensive">
              <Bi en="Intensive dashboard" zh="强化课程面板" />
            </GhostLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ─────────── Small local components ─────────── */

function PrimaryLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 bg-[color:var(--color-ink)] text-[color:var(--color-paper)] hover:bg-[color:var(--color-cobalt)] transition-colors font-semibold text-[14px] px-5 py-3 rounded-full"
    >
      {children}
      <ArrowRight />
    </Link>
  );
}

function GhostLink({ to, children }: { to: string; children: ReactNode }) {
  const isHash = to.startsWith('#');
  const className =
    'inline-flex items-center gap-2 border border-[color:var(--color-line)] hover:border-[color:var(--color-ink)] transition-colors font-semibold text-[14px] px-5 py-3 rounded-full text-[color:var(--color-ink)]';
  if (isHash) {
    return (
      <a href={to} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M1 7h12M8 2l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
