import { Link } from 'react-router-dom';
import { Container, DisplayH1, DisplayH2, DisplayH3, Lede, Body, Eyebrow, Chip } from '../components/primitives';
import { Bi, useLanguage } from '../lib/LanguageContext';

export function HomePage() {
  const { lang } = useLanguage();

  return (
    <>
      {/* ─────────── HERO ─────────── */}
      <section className="relative overflow-hidden pt-8 md:pt-14 pb-16 md:pb-20">
        {/* soft radial paper wash */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-70"
          style={{
            background:
              'radial-gradient(circle at 15% 10%, rgba(11,76,166,0.06) 0%, transparent 45%), radial-gradient(circle at 88% 88%, rgba(33,94,72,0.05) 0%, transparent 45%)',
          }}
        />
        <Container size="wide">
          <div className="grid gap-10 md:gap-14 md:grid-cols-[1.15fr_1fr] items-end">
            <div>
              <Eyebrow color="cobalt">
                <Bi en="IGCSE · Cambridge 0457 · Year 10" zh="IGCSE · 剑桥 0457 · 十年级" />
              </Eyebrow>
              <DisplayH1 className="mt-4">
                <Bi
                  en={
                    <>
                      Reading the world <br className="hidden sm:block" /> with a{' '}
                      <em className="font-display italic text-[color:var(--color-cobalt)]">critical eye.</em>
                    </>
                  }
                  zh={
                    <>
                      以<em className="font-display italic text-[color:var(--color-cobalt)]">批判之眼</em>
                      <br className="hidden sm:block" />
                      阅读世界。
                    </>
                  }
                />
              </DisplayH1>
              <Lede className="mt-6">
                <Bi
                  en="Interactive study and teaching resources for Wesley Methodist School International — built to sit next to the Cambridge syllabus and the Oxford Global Perspectives 3rd edition textbook, in English and 中文."
                  zh="为 Wesley Methodist School International 打造的交互式自学与教学资源——紧扣剑桥考试大纲与牛津《全球视野》第三版教材，中英双语。"
                />
              </Lede>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/perspectives">
                  <span className="inline-flex items-center gap-2 bg-[color:var(--color-ink)] text-[color:var(--color-paper)] hover:bg-[color:var(--color-cobalt)] transition-colors font-semibold text-[14px] px-5 py-3 rounded-full">
                    <Bi en="Start with Perspectives" zh="从「观点」开始" />
                    <ArrowRight />
                  </span>
                </Link>
                <Link to="/statements">
                  <span className="inline-flex items-center gap-2 border border-[color:var(--color-line)] hover:border-[color:var(--color-ink)] transition-colors font-semibold text-[14px] px-5 py-3 rounded-full text-[color:var(--color-ink)]">
                    <Bi en="Types of Statements" zh="陈述类型" />
                  </span>
                </Link>
              </div>
            </div>

            {/* Visual: an editorial "field diagram" of the four perspective levels */}
            <div className="relative">
              <PerspectiveDiagram lang={lang} />
            </div>
          </div>
        </Container>
      </section>

      {/* ─────────── STRANDS ─────────── */}
      <section className="border-t border-[color:var(--color-line)] py-14 md:py-20">
        <Container size="wide">
          <div className="mb-10 md:mb-14 max-w-[720px]">
            <Eyebrow color="ember">
              <Bi en="Two strands · one skill" zh="两大主线 · 一项技能" />
            </Eyebrow>
            <DisplayH2 className="mt-3">
              <Bi
                en="Every 0457 answer asks two questions."
                zh="0457 的每一题，都在问两件事。"
              />
            </DisplayH2>
            <Body className="mt-5 text-[color:var(--color-ink-2)]">
              <Bi
                en="First: whose voice is speaking, and what level do they sit at? Second: what kind of statement did they just make — a fact, a claim, an opinion, a prediction? These two strands underpin the whole paper."
                zh="第一：说话的是谁？他属于哪个层次？第二：他刚才说的是哪一类陈述——事实、断言、意见、还是预测？整份试卷都建立在这两条主线之上。"
              />
            </Body>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <StrandCard
              to="/perspectives"
              tag={<Bi en="Strand 1 · Perspectives" zh="主线 1 · 观点" />}
              tagColor="cobalt"
              title={<Bi en="Identifying & Explaining Perspectives" zh="识别与解释观点" />}
              body={
                <Bi
                  en="Global · National · Local · Personal. How to name the level of a viewpoint, describe it fully from the source, and explain why it exists — with real 2026 exam material."
                  zh="全球 · 国家 · 地方 · 个人。如何为一个观点定位其层次、从资料中完整地描述它、并解释它为什么存在——配套真实的 2026 年试卷材料。"
                />
              }
              items={[
                <Bi en="The Four Levels + cultural lens" zh="四大层次 + 文化透镜" />,
                <Bi en="The Five Elements framework" zh="五要素分析框架" />,
                <Bi en="June 2026 Q1(c) worked example" zh="2026 年 6 月第 1(c) 题范例" />,
                <Bi en="Miren Valley case study" zh="米伦谷案例研究" />,
              ]}
              cta={<Bi en="Open Perspectives" zh="进入「观点」" />}
            />
            <StrandCard
              to="/statements"
              tag={<Bi en="Strand 2 · Statements" zh="主线 2 · 陈述类型" />}
              tagColor="ember"
              title={<Bi en="The Eight Types of Statement" zh="八种陈述类型" />}
              body={
                <Bi
                  en="Bias · Claim · Fact · Generalisation · Opinion · Prediction · Value · Vested interest. Sorting drills, confusable-pairs clinics, and a 120-minute intensive session."
                  zh="偏见 · 断言 · 事实 · 一般化 · 意见 · 预测 · 价值观 · 既得利益。分类练习、易混淆对比训练，以及 120 分钟强化课程。"
                />
              }
              items={[
                <Bi en="Video explainer + eight-term guide" zh="视频讲解 + 八词汇总" />,
                <Bi en="Find-Your-Gap diagnostic" zh="「找差距」诊断" />,
                <Bi en="Statement Types Intensive (120 min)" zh="陈述类型强化 (120 分钟)" />,
                <Bi en="Claim vs Evidence" zh="断言 vs 证据" />,
              ]}
              cta={<Bi en="Open Statements" zh="进入「陈述类型」" />}
            />
          </div>
        </Container>
      </section>

      {/* ─────────── LEARNING PATHWAYS ─────────── */}
      <section className="py-14 md:py-20 bg-[color:var(--color-paper-2)]">
        <Container size="wide">
          <div className="mb-10 md:mb-14 max-w-[720px]">
            <Eyebrow color="forest">
              <Bi en="Suggested pathways" zh="建议路径" />
            </Eyebrow>
            <DisplayH2 className="mt-3">
              <Bi en="How to actually use this site." zh="该如何使用这个网站。" />
            </DisplayH2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <PathwayCard
              index="I"
              tag={<Bi en="For students · first pass" zh="给学生 · 首次学习" />}
              title={<Bi en="Learn each strand cleanly" zh="先把两大主线学清楚" />}
              steps={[
                { to: '/statements', label: <Bi en="1 · Watch the Statement Types video" zh="1 · 观看《陈述类型》视频" /> },
                { to: '/statements/main', label: <Bi en="2 · Do the sorting drills" zh="2 · 完成分类练习" /> },
                { to: '/perspectives', label: <Bi en="3 · Learn the Four Levels" zh="3 · 学习四大层次" /> },
                { to: '/perspectives#framework', label: <Bi en="4 · Practise the Five Elements" zh="4 · 练习五要素" /> },
              ]}
            />
            <PathwayCard
              index="II"
              tag={<Bi en="For students · exam prep" zh="给学生 · 应试准备" />}
              title={<Bi en="Diagnose and drill weaknesses" zh="诊断薄弱环节 · 针对性练习" />}
              steps={[
                { to: '/statements/diagnostic', label: <Bi en="1 · Find Your Gap diagnostic" zh="1 · 完成「找差距」诊断" /> },
                { to: '/statements/intensive', label: <Bi en="2 · Statement Types Intensive (120 min)" zh="2 · 陈述类型强化 (120 分钟)" /> },
                { to: '/perspectives#examprep', label: <Bi en="3 · Perspective exam-style questions" zh="3 · 观点应试练习" /> },
                { to: '/perspectives/weighing-room', label: <Bi en="4 · The Weighing Room — Q1(d)" zh="4 · 秤量之室 —— 第 1(d) 题" /> },
              ]}
            />
            <PathwayCard
              index="III"
              tag={<Bi en="For teachers" zh="给教师" />}
              title={<Bi en="Sequence, mark, and moderate" zh="教学排序 · 批改 · 校准" />}
              steps={[
                { to: '/teachers/statements', label: <Bi en="1 · Lesson-sequencing dashboard" zh="1 · 课时排序面板" /> },
                { to: '/teachers/statements-intensive', label: <Bi en="2 · Intensive class results & CSV export" zh="2 · 强化课程班级成绩与 CSV 导出" /> },
                { to: '/statements/claim-vs-evidence', label: <Bi en="3 · Model claim-vs-evidence answers" zh="3 · 断言与证据示范" /> },
                { to: '/perspectives#framework', label: <Bi en="4 · Five Elements as a marking lens" zh="4 · 以「五要素」作为评分视角" /> },
              ]}
            />
          </div>
        </Container>
      </section>

      {/* ─────────── SOURCE NOTE ─────────── */}
      <section className="py-14 md:py-16 border-t border-[color:var(--color-line)]">
        <Container size="wide">
          <div className="grid gap-8 md:grid-cols-[auto_1fr] items-start">
            <div className="max-w-[220px]">
              <Chip color="amber">
                <Bi en="Source discipline" zh="资料出处" />
              </Chip>
            </div>
            <div className="max-w-[620px]">
              <DisplayH3 className="mb-3">
                <Bi
                  en="Real Cambridge material, with clean labels."
                  zh="真实的剑桥材料，出处清楚可查。"
                />
              </DisplayH3>
              <Body className="text-[color:var(--color-ink-2)]">
                <Bi
                  en="Where a question or a source comes directly from a released Cambridge paper, it is labelled with the paper code, year, and question number. Anything I have written to practise the same skill in the same style is labelled ‘original practice’ so you never confuse it with the real thing."
                  zh="题目或资料若直接来自剑桥历年真题，会标注试卷编号、年份及题号。凡是我为练习同一技能而按同样风格自写的段落，会标注「原创练习」，避免与真题混淆。"
                />
              </Body>
            </div>
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
      <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type StrandCardProps = {
  to: string;
  tag: React.ReactNode;
  tagColor: 'cobalt' | 'ember' | 'forest' | 'amber';
  title: React.ReactNode;
  body: React.ReactNode;
  items: React.ReactNode[];
  cta: React.ReactNode;
};

function StrandCard({ to, tag, tagColor, title, body, items, cta }: StrandCardProps) {
  return (
    <Link
      to={to}
      className="group relative flex flex-col justify-between gap-6 bg-[color:var(--color-paper)] border border-[color:var(--color-line)] rounded-[8px] p-7 md:p-9 transition-all hover:border-[color:var(--color-ink)]"
    >
      <div>
        <Chip color={tagColor}>{tag}</Chip>
        <h3 className="font-display text-[26px] md:text-[30px] leading-[1.1] mt-4 text-[color:var(--color-ink)] balance">
          {title}
        </h3>
        <p className="mt-4 text-[15px] leading-[1.6] text-[color:var(--color-ink-2)] max-w-[42ch] pretty">{body}</p>

        <ul className="mt-6 space-y-2">
          {items.map((it, i) => (
            <li key={i} className="flex items-baseline gap-3 text-[14px] text-[color:var(--color-ink)]">
              <span className="font-mono text-[10px] text-[color:var(--color-ink-3)] tabular-nums pt-0.5">
                {String(i + 1).padStart(2, '0')}
              </span>
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
  index: string;
  tag: React.ReactNode;
  title: React.ReactNode;
  steps: { to: string; label: React.ReactNode }[];
};

function PathwayCard({ index, tag, title, steps }: PathwayCardProps) {
  return (
    <article className="bg-[color:var(--color-paper)] border border-[color:var(--color-line)] rounded-[8px] p-6 md:p-7 flex flex-col">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-ink-3)]">
            {tag}
          </p>
        </div>
        <span className="font-display text-[38px] leading-none text-[color:var(--color-cobalt)]">{index}</span>
      </div>
      <h3 className="font-display text-[22px] leading-[1.15] mb-4 text-[color:var(--color-ink)] balance">{title}</h3>
      <ol className="mt-2 space-y-2.5 flex-1">
        {steps.map((s, i) => (
          <li key={i}>
            <Link
              to={s.to}
              className="block text-[14px] text-[color:var(--color-ink-2)] hover:text-[color:var(--color-cobalt)] transition-colors py-1"
            >
              {s.label}
            </Link>
          </li>
        ))}
      </ol>
    </article>
  );
}

/* ─────────── Perspective diagram: four concentric levels ─────────── */
function PerspectiveDiagram({ lang }: { lang: 'en' | 'zh' }) {
  const labels =
    lang === 'zh'
      ? { g: '全球', n: '国家', l: '地方', p: '个人', frame: '文化透镜' }
      : { g: 'Global', n: 'National', l: 'Local', p: 'Personal', frame: 'Cultural lens' };

  return (
    <figure className="relative mx-auto max-w-[460px] aspect-square">
      {/* faint outer frame — the "cultural lens" */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-full border border-dashed border-[color:var(--color-line)]"
      />
      <div className="absolute inset-4 rounded-full bg-[color:var(--color-cobalt-soft)]" />
      <div className="absolute inset-[18%] rounded-full bg-[color:var(--color-forest-soft)]" />
      <div className="absolute inset-[35%] rounded-full bg-[color:var(--color-amber-soft)]" />
      <div className="absolute inset-[52%] rounded-full bg-[color:var(--color-violet-soft)]" />

      <div className="absolute inset-4 rounded-full border border-[color:var(--color-cobalt)]/40" />
      <div className="absolute inset-[18%] rounded-full border border-[color:var(--color-forest)]/40" />
      <div className="absolute inset-[35%] rounded-full border border-[color:var(--color-amber)]/40" />
      <div className="absolute inset-[52%] rounded-full border border-[color:var(--color-violet)]/40" />

      {/* labels */}
      <span className="absolute top-[3%] left-1/2 -translate-x-1/2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-cobalt)]">
        {labels.g}
      </span>
      <span className="absolute top-[19%] left-1/2 -translate-x-1/2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-forest)]">
        {labels.n}
      </span>
      <span className="absolute top-[36%] left-1/2 -translate-x-1/2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-amber)]">
        {labels.l}
      </span>
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-violet)]">
        {labels.p}
      </span>

      {/* frame caption */}
      <figcaption className="absolute -bottom-8 right-0 font-mono text-[10.5px] uppercase tracking-[0.18em] text-[color:var(--color-ink-3)]">
        {labels.frame} ✧
      </figcaption>
    </figure>
  );
}
