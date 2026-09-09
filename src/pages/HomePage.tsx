import { Link } from 'react-router-dom';
import { Container, DisplayH1, DisplayH2, Lede, Body } from '../components/primitives';
import { Bi } from '../lib/LanguageContext';

export function HomePage() {
  return (
    <>
      {/* HERO — text-only, no decorative asset, tight top padding */}
      <section className="pt-16 md:pt-20 pb-20 md:pb-28">
        <Container size="wide">
          <div className="max-w-[820px]">
            <DisplayH1>
              <Bi
                en={
                  <>
                    Reading the world with a{' '}
                    <em className="font-display italic text-[color:var(--color-cobalt)]">critical eye.</em>
                  </>
                }
                zh={
                  <>
                    以<em className="font-display italic text-[color:var(--color-cobalt)]">批判之眼</em>阅读世界。
                  </>
                }
              />
            </DisplayH1>
            <Lede className="mt-6">
              <Bi
                en="Interactive study and teaching resources for Wesley Methodist School International, aligned to the Cambridge IGCSE 0457 syllabus and the Oxford Global Perspectives 3rd edition textbook."
                zh="为 Wesley Methodist School International 打造的交互式自学与教学资源，紧扣剑桥 IGCSE 0457 大纲与牛津《全球视野》第三版教材。"
              />
            </Lede>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/perspectives"
                className="inline-flex items-center gap-2 bg-[color:var(--color-ink)] text-[color:var(--color-paper)] hover:bg-[color:var(--color-cobalt)] transition-colors font-semibold text-[14px] px-5 py-3 rounded-full"
              >
                <Bi en="Start with Perspectives" zh="从「观点」开始" />
                <ArrowRight />
              </Link>
              <Link
                to="/statements"
                className="inline-flex items-center gap-2 border border-[color:var(--color-line)] hover:border-[color:var(--color-ink)] transition-colors font-semibold text-[14px] px-5 py-3 rounded-full text-[color:var(--color-ink)]"
              >
                <Bi en="Types of Statements" zh="陈述类型" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* STRANDS — no chip, no numbered list, plain hairline dividers */}
      <section className="border-t border-[color:var(--color-line)] py-16 md:py-24">
        <Container size="wide">
          <div className="mb-12 md:mb-16 max-w-[720px]">
            <DisplayH2>
              <Bi en="Every 0457 answer asks two questions." zh="0457 的每一题，都在问两件事。" />
            </DisplayH2>
            <Body className="mt-5 text-[color:var(--color-ink-2)]">
              <Bi
                en="Whose voice is speaking, and at what level do they sit? And what kind of statement did they just make: fact, claim, opinion, prediction? These two strands underpin the whole paper."
                zh="说话的是谁？他属于哪个层次？他刚才说的是哪一类陈述：事实、断言、意见，还是预测？整份试卷都建立在这两条主线之上。"
              />
            </Body>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <StrandCard
              to="/perspectives"
              title={<Bi en="Identifying & Explaining Perspectives" zh="识别与解释观点" />}
              body={
                <Bi
                  en="Global, national, local, personal. How to name the level of a viewpoint, describe it fully from the source, and explain why it exists. Built on real 2026 exam material."
                  zh="全球、国家、地方、个人。如何为一个观点定位其层次、从资料中完整地描述它、并解释它为什么存在。配套真实的 2026 年试卷材料。"
                />
              }
              items={[
                <Bi en="The four levels plus a cultural lens" zh="四大层次加一层文化透镜" />,
                <Bi en="The Five Elements framework" zh="五要素分析框架" />,
                <Bi en="June 2026 Q1(c) worked example" zh="2026 年 6 月第 1(c) 题范例" />,
                <Bi en="Miren Valley case study" zh="米伦谷案例研究" />,
              ]}
              cta={<Bi en="Open Perspectives" zh="进入「观点」" />}
            />
            <StrandCard
              to="/statements"
              title={<Bi en="The Eight Types of Statement" zh="八种陈述类型" />}
              body={
                <Bi
                  en="Bias, claim, fact, generalisation, opinion, prediction, value, vested interest. Sorting drills, confusable-pair clinics, and a 120-minute intensive session."
                  zh="偏见、断言、事实、一般化、意见、预测、价值观、既得利益。分类练习、易混淆对比训练，以及 120 分钟强化课程。"
                />
              }
              items={[
                <Bi en="Video explainer and eight-term guide" zh="视频讲解与八词汇总" />,
                <Bi en="Find-Your-Gap diagnostic" zh="「找差距」诊断" />,
                <Bi en="Statement Types Intensive (120 min)" zh="陈述类型强化 (120 分钟)" />,
                <Bi en="Claim vs Evidence" zh="断言 vs 证据" />,
              ]}
              cta={<Bi en="Open Statements" zh="进入「陈述类型」" />}
            />
          </div>
        </Container>
      </section>

      {/* PATHWAYS — tighter, no chip layer, no Roman numeral column */}
      <section className="py-16 md:py-24 bg-[color:var(--color-paper-2)]">
        <Container size="wide">
          <div className="mb-12 md:mb-16 max-w-[720px]">
            <DisplayH2>
              <Bi en="Three ways to use it." zh="三种使用方式。" />
            </DisplayH2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <PathwayCard
              audience={<Bi en="Students, first pass" zh="学生 · 首次学习" />}
              title={<Bi en="Learn each strand cleanly" zh="先把两大主线学清楚" />}
              steps={[
                { to: '/statements', label: <Bi en="Watch the Statement Types video" zh="观看《陈述类型》视频" /> },
                { to: '/statements/main', label: <Bi en="Do the sorting drills" zh="完成分类练习" /> },
                { to: '/perspectives', label: <Bi en="Learn the Four Levels" zh="学习四大层次" /> },
                { to: '/perspectives#framework', label: <Bi en="Practise the Five Elements" zh="练习五要素" /> },
              ]}
            />
            <PathwayCard
              audience={<Bi en="Students, exam prep" zh="学生 · 应试准备" />}
              title={<Bi en="Diagnose and drill weaknesses" zh="诊断薄弱环节，针对性练习" />}
              steps={[
                { to: '/statements/diagnostic', label: <Bi en="Find Your Gap diagnostic" zh="完成「找差距」诊断" /> },
                { to: '/statements/intensive', label: <Bi en="Statement Types Intensive" zh="陈述类型强化" /> },
                { to: '/perspectives#examprep', label: <Bi en="Perspective exam-style questions" zh="观点应试练习" /> },
                { to: '/perspectives/weighing-room', label: <Bi en="The Weighing Room: Q1(d)" zh="秤量之室：第 1(d) 题" /> },
              ]}
            />
            <PathwayCard
              audience={<Bi en="Teachers" zh="教师" />}
              title={<Bi en="Sequence, mark, and moderate" zh="教学排序，批改，校准" />}
              steps={[
                { to: '/teachers/statements', label: <Bi en="Lesson-sequencing dashboard" zh="课时排序面板" /> },
                { to: '/teachers/statements-intensive', label: <Bi en="Intensive class results, CSV export" zh="强化课程班级成绩与 CSV 导出" /> },
                { to: '/statements/claim-vs-evidence', label: <Bi en="Model claim-vs-evidence answers" zh="断言与证据示范" /> },
                { to: '/perspectives#framework', label: <Bi en="Five Elements as a marking lens" zh="以「五要素」作为评分视角" /> },
              ]}
            />
          </div>
        </Container>
      </section>
    </>
  );
}

/* ─────────── Home-only components ─────────── */

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

type StrandCardProps = {
  to: string;
  title: React.ReactNode;
  body: React.ReactNode;
  items: React.ReactNode[];
  cta: React.ReactNode;
};

function StrandCard({ to, title, body, items, cta }: StrandCardProps) {
  return (
    <Link
      to={to}
      className="group flex flex-col justify-between gap-8 bg-[color:var(--color-paper)] border border-[color:var(--color-line)] rounded-[8px] p-8 md:p-10 transition-all hover:border-[color:var(--color-ink)]"
    >
      <div>
        <h3 className="font-display text-[28px] md:text-[32px] leading-[1.1] text-[color:var(--color-ink)] balance">
          {title}
        </h3>
        <p className="mt-5 text-[15.5px] leading-[1.6] text-[color:var(--color-ink-2)] max-w-[44ch] pretty">{body}</p>

        <ul className="mt-8 divide-y divide-[color:var(--color-line-soft)]">
          {items.map((it, i) => (
            <li key={i} className="py-2.5 text-[14.5px] text-[color:var(--color-ink)]">
              {it}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-2 font-semibold text-[14px] text-[color:var(--color-ink)] group-hover:text-[color:var(--color-cobalt)] transition-colors">
        {cta}
        <ArrowRight />
      </div>
    </Link>
  );
}

type PathwayCardProps = {
  audience: React.ReactNode;
  title: React.ReactNode;
  steps: { to: string; label: React.ReactNode }[];
};

function PathwayCard({ audience, title, steps }: PathwayCardProps) {
  return (
    <article className="bg-[color:var(--color-paper)] border border-[color:var(--color-line)] rounded-[8px] p-6 md:p-7 flex flex-col">
      <p className="text-[13px] text-[color:var(--color-ink-3)] mb-2">{audience}</p>
      <h3 className="font-display text-[22px] leading-[1.15] mb-5 text-[color:var(--color-ink)] balance">{title}</h3>
      <ol className="divide-y divide-[color:var(--color-line-soft)] flex-1">
        {steps.map((s, i) => (
          <li key={i}>
            <Link
              to={s.to}
              className="block text-[14px] text-[color:var(--color-ink-2)] hover:text-[color:var(--color-cobalt)] transition-colors py-2.5"
            >
              {s.label}
            </Link>
          </li>
        ))}
      </ol>
    </article>
  );
}
