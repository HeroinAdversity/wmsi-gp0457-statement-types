import { useMemo, useState } from 'react';
import { Container, DisplayH1, Eyebrow, Lede } from '../../components/primitives';
import { Bi } from '../../lib/LanguageContext';
import { decodePayload, downloadFile, formatTimestamp, toCsv, wordCount } from '../../lib/dashboards';

/* ─────────── Static reference data (mirrors legacy tool) ─────────── */

const DESCRIBE_QUESTIONS: {
  qid: string;
  authentic: boolean;
  topicEn: string;
  topicZh: string;
  promptEn: string;
  promptZh: string;
  maxMark: number;
}[] = [
  {
    qid: 'real',
    authentic: true,
    topicEn: 'Health & Wellbeing · Real past paper',
    topicZh: '健康与幸福 · 真实历年试题',
    promptEn: "From Source 2, describe the organisation's perspective on sports.",
    promptZh: '根据资料2，描述该组织对体育运动的观点。',
    maxMark: 6,
  },
  {
    qid: 'digital',
    authentic: false,
    topicEn: 'Digital World · Original practice',
    topicZh: '数码世界 · 原创练习',
    promptEn: "From Source A, describe the organisation's perspective on young people's use of technology.",
    promptZh: '根据资料A，描述该组织对青少年使用科技的观点。',
    maxMark: 6,
  },
  {
    qid: 'river',
    authentic: false,
    topicEn: 'Environment & Conservation · Original practice',
    topicZh: '环境与保育 · 原创练习',
    promptEn: "From Source B, describe the organisation's perspective on river conservation.",
    promptZh: '根据资料B，描述该组织对河流保护的观点。',
    maxMark: 6,
  },
  {
    qid: 'inclusion',
    authentic: false,
    topicEn: 'Social Identity & Inclusion · Original practice',
    topicZh: '社会身份与包容 · 原创练习',
    promptEn: "From Source C, describe the organisation's perspective on inclusive education.",
    promptZh: '根据资料C，描述该组织对全纳教育的观点。',
    maxMark: 6,
  },
];

const YOUR_TURN_MAX = 6;
const CHECKLIST_TOTAL = 7;
const ELEMENT_LABELS = ['Issues', 'Values', 'Causes', 'Consequences', 'Actions'];

/* ─────────── Types ─────────── */

interface DescribeAssessment {
  question: string;
  authentic?: boolean;
  response?: string;
  elementsChecked?: string[];
  sourceUseFrequency?: string | null;
  estimatedLevelShown?: string;
}

interface PerspectivesData {
  describePerspectiveAssessments?: DescribeAssessment[];
  yourTurnResponse?: string;
  checklistComplete?: string[];
  checklistProgress?: string;
}

interface Record {
  studentName: string;
  timestamp: string;
  data: PerspectivesData;
  marks: Marks;
}

interface Marks {
  perQuestion: { [qid: string]: number | '' };
  yourTurn: number | '';
  notes: string;
}

function emptyMarks(): Marks {
  const perQuestion: { [qid: string]: number | '' } = {};
  for (const q of DESCRIBE_QUESTIONS) perQuestion[q.qid] = '';
  return { perQuestion, yourTurn: '', notes: '' };
}

/* ─────────── Page ─────────── */

export function PerspectivesDashboardPage() {
  const [records, setRecords] = useState<Record[]>([]);
  const [codeInput, setCodeInput] = useState('');
  const [status, setStatus] = useState<{ msg: string; tone: 'ok' | 'err' | 'warn' } | null>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  function reportStatus(msg: string, tone: 'ok' | 'err' | 'warn' = 'ok') {
    setStatus({ msg, tone });
    window.setTimeout(() => setStatus(null), 5000);
  }

  function ingestCode(raw: string) {
    const decoded = decodePayload<PerspectivesData>(raw);
    if (!decoded) {
      reportStatus('Could not decode this code. Check that you pasted it correctly.', 'err');
      return;
    }
    if (decoded.toolId !== 'identifying-perspectives') {
      reportStatus(
        `Wrong toolId: got "${decoded.toolId}", expected "identifying-perspectives". Use the Weighing Room dashboard for Q1(d) codes.`,
        'err',
      );
      return;
    }
    const dup = records.some(
      (r) => r.studentName === decoded.studentName && r.timestamp === decoded.timestamp,
    );
    if (dup) {
      reportStatus(`Already imported: ${decoded.studentName} at ${formatTimestamp(decoded.timestamp)}.`, 'warn');
      return;
    }
    setRecords((rs) => [
      ...rs,
      {
        studentName: decoded.studentName,
        timestamp: decoded.timestamp,
        data: decoded.data,
        marks: emptyMarks(),
      },
    ]);
    reportStatus(`Added: ${decoded.studentName}.`, 'ok');
  }

  function importFromInput() {
    const raw = codeInput.trim();
    if (!raw) return;
    ingestCode(raw);
    setCodeInput('');
  }

  function importFile(files: FileList | null) {
    if (!files) return;
    for (const file of Array.from(files)) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = String(e.target?.result ?? '').trim();
        if (!text) return;
        // Try JSON first (raw payload); fall back to base64 code
        try {
          const parsed = JSON.parse(text);
          if (parsed?.toolId === 'identifying-perspectives') {
            const dup = records.some(
              (r) => r.studentName === parsed.studentName && r.timestamp === parsed.timestamp,
            );
            if (dup) {
              reportStatus(`Already imported: ${parsed.studentName}.`, 'warn');
              return;
            }
            setRecords((rs) => [
              ...rs,
              {
                studentName: parsed.studentName,
                timestamp: parsed.timestamp,
                data: parsed.data,
                marks: emptyMarks(),
              },
            ]);
            reportStatus(`Added: ${parsed.studentName}.`, 'ok');
            return;
          }
        } catch {
          /* not JSON, try as base64 code */
        }
        ingestCode(text);
      };
      reader.readAsText(file);
    }
  }

  function updateMarks(idx: number, patch: Partial<Marks> | ((m: Marks) => Marks)) {
    setRecords((rs) =>
      rs.map((r, i) => {
        if (i !== idx) return r;
        const next = typeof patch === 'function' ? patch(r.marks) : { ...r.marks, ...patch };
        return { ...r, marks: next };
      }),
    );
  }

  function removeRecord(idx: number) {
    setRecords((rs) => rs.filter((_, i) => i !== idx));
    if (openIdx === idx) setOpenIdx(null);
  }

  function exportCsv() {
    if (records.length === 0) return;
    const maxTotal =
      DESCRIBE_QUESTIONS.reduce((sum, q) => sum + q.maxMark, 0) + YOUR_TURN_MAX;
    const header = [
      'Student',
      'Timestamp',
      ...DESCRIBE_QUESTIONS.map((q) => `Q_${q.qid}_mark_/${q.maxMark}`),
      `Your_turn_mark_/${YOUR_TURN_MAX}`,
      `Total_/${maxTotal}`,
      'Checklist_progress',
      'Notes',
    ];
    const rows = records.map((r) => {
      const perQ = DESCRIBE_QUESTIONS.map((q) => {
        const m = r.marks.perQuestion[q.qid];
        return m === '' ? '' : String(m);
      });
      const ytNum = r.marks.yourTurn === '' ? 0 : Number(r.marks.yourTurn);
      const perQNums = DESCRIBE_QUESTIONS.map((q) =>
        r.marks.perQuestion[q.qid] === '' ? 0 : Number(r.marks.perQuestion[q.qid]),
      );
      const total = perQNums.reduce((a, b) => a + b, 0) + ytNum;
      return [
        r.studentName,
        r.timestamp,
        ...perQ,
        r.marks.yourTurn === '' ? '' : String(r.marks.yourTurn),
        String(total),
        r.data.checklistProgress ?? '',
        r.marks.notes,
      ];
    });
    const csv = toCsv(header, rows);
    const stamp = new Date().toISOString().slice(0, 10);
    downloadFile(`WMSI_Q1c_Perspectives_${stamp}.csv`, csv);
  }

  const summary = useMemo(() => {
    if (records.length === 0) return null;
    const maxTotal =
      DESCRIBE_QUESTIONS.reduce((sum, q) => sum + q.maxMark, 0) + YOUR_TURN_MAX;
    const totals = records.map((r) => {
      const perQNums = DESCRIBE_QUESTIONS.map((q) =>
        r.marks.perQuestion[q.qid] === '' ? 0 : Number(r.marks.perQuestion[q.qid]),
      );
      const yt = r.marks.yourTurn === '' ? 0 : Number(r.marks.yourTurn);
      return perQNums.reduce((a, b) => a + b, 0) + yt;
    });
    const graded = records.filter((r) => {
      const hasQ = DESCRIBE_QUESTIONS.some((q) => r.marks.perQuestion[q.qid] !== '');
      return hasQ || r.marks.yourTurn !== '';
    }).length;
    const avg = totals.length ? totals.reduce((a, b) => a + b, 0) / totals.length : 0;
    const under = totals.filter((t) => t / maxTotal < 0.6).length;
    return {
      count: records.length,
      graded,
      maxTotal,
      avg: avg.toFixed(1),
      under,
    };
  }, [records]);

  return (
    <>
      {/* HERO */}
      <section className="pt-12 md:pt-16 pb-8 border-b border-[color:var(--color-line)]">
        <Container size="wide">
          <Eyebrow color="cobalt">
            <Bi en="Teacher dashboard · Q1(c)" zh="教师面板 · 第 1(c) 题" />
          </Eyebrow>
          <DisplayH1 className="mt-3">
            <Bi en="Perspectives responses." zh="观点回应。" />
          </DisplayH1>
          <Lede className="mt-6">
            <Bi
              en={
                <>
                  Paste the export codes your students generate from the <strong>Identifying &amp; Explaining Perspectives</strong>{' '}
                  tool, or upload their JSON exports. Their describe answers, self-checked elements and your-turn responses appear
                  below; enter a mark out of six for each and download the class CSV when you're done.
                </>
              }
              zh={
                <>
                  在此粘贴学生从<strong>「识别与解释观点」</strong>工具中生成的导出代码，或上传他们的 JSON 文件。
                  他们的描述作答、自查要素与「你来试试」回应会显示在下方；为每道题打分（满分 6），完成后可以下载全班 CSV。
                </>
              }
            />
          </Lede>
        </Container>
      </section>

      {/* IMPORT */}
      <section className="py-10">
        <Container size="wide">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <label className="block font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-ink-3)] mb-2">
                <Bi en="Paste one export code" zh="粘贴一段导出代码" />
              </label>
              <textarea
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
                placeholder="eyJ0b29sSWQiOiJpZGVudGlmeWluZy1wZXJzcGVjdGl2ZXMi…"
                className="w-full min-h-[86px] font-mono text-[12.5px] p-3 bg-[color:var(--color-paper)] border border-[color:var(--color-line)] rounded-md focus:outline-none focus:border-[color:var(--color-cobalt)] focus:ring-1 focus:ring-[color:var(--color-cobalt)]"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={importFromInput}
                className="text-[13.5px] font-semibold px-5 py-2.5 rounded-full bg-[color:var(--color-ink)] text-[color:var(--color-paper)] hover:bg-[color:var(--color-cobalt)] transition-colors"
              >
                <Bi en="Import code" zh="导入代码" />
              </button>
              <label className="text-[13.5px] font-semibold px-5 py-2.5 rounded-full border border-[color:var(--color-line)] hover:border-[color:var(--color-ink)] cursor-pointer">
                <Bi en="Upload JSON file(s)…" zh="上传 JSON 文件…" />
                <input
                  type="file"
                  accept=".json,.txt,application/json,text/plain"
                  multiple
                  onChange={(e) => importFile(e.target.files)}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {status && (
            <div
              className={`mt-4 px-4 py-3 rounded-md text-[13.5px] ${
                status.tone === 'ok'
                  ? 'bg-[color:var(--color-forest-soft)] text-[color:var(--color-forest)] border border-[color:var(--color-forest)]/30'
                  : status.tone === 'warn'
                    ? 'bg-[color:var(--color-amber-soft)] text-[color:var(--color-amber)] border border-[color:var(--color-amber)]/30'
                    : 'bg-[color:var(--color-ember-soft)] text-[color:var(--color-ember)] border border-[color:var(--color-ember)]/30'
              }`}
            >
              {status.msg}
            </div>
          )}
        </Container>
      </section>

      {/* SUMMARY + ROSTER */}
      <section className="pb-24">
        <Container size="wide">
          {records.length === 0 ? (
            <div className="border border-dashed border-[color:var(--color-line)] rounded-[8px] p-10 text-center text-[color:var(--color-ink-3)]">
              <Bi
                en="No students imported yet. Paste an export code or upload a JSON file to begin."
                zh="尚未导入任何学生。粘贴一段导出代码或上传 JSON 文件开始使用。"
              />
            </div>
          ) : (
            <>
              {summary && (
                <div className="grid gap-4 md:grid-cols-4 mb-10">
                  <StatTile label={<Bi en="Students imported" zh="已导入学生" />} value={summary.count} />
                  <StatTile label={<Bi en="Graded" zh="已评分" />} value={`${summary.graded} / ${summary.count}`} />
                  <StatTile label={<Bi en="Class average" zh="班级平均" />} value={`${summary.avg} / ${summary.maxTotal}`} />
                  <StatTile
                    label={<Bi en="Under 60%" zh="低于 60%" />}
                    value={summary.under}
                    tone={summary.under > 0 ? 'ember' : 'ink'}
                  />
                </div>
              )}

              <div className="flex items-center justify-between gap-4 mb-4">
                <h2 className="font-display text-[24px] text-[color:var(--color-ink)]">
                  <Bi en="Class roster" zh="班级名单" />
                </h2>
                <button
                  type="button"
                  onClick={exportCsv}
                  className="text-[13px] font-semibold px-4 py-2 rounded-full border border-[color:var(--color-line)] hover:border-[color:var(--color-ink)]"
                >
                  <Bi en="Download CSV" zh="下载 CSV" />
                </button>
              </div>

              <div className="grid gap-3">
                {records.map((r, i) => (
                  <RecordCard
                    key={`${r.studentName}-${r.timestamp}`}
                    record={r}
                    open={openIdx === i}
                    onToggle={() => setOpenIdx(openIdx === i ? null : i)}
                    onMarksChange={(patch) => updateMarks(i, patch)}
                    onRemove={() => removeRecord(i)}
                  />
                ))}
              </div>
            </>
          )}
        </Container>
      </section>
    </>
  );
}

/* ─────────── Presentational bits ─────────── */

function StatTile({
  label,
  value,
  tone = 'ink',
}: {
  label: React.ReactNode;
  value: React.ReactNode;
  tone?: 'ink' | 'ember';
}) {
  const valueColor =
    tone === 'ember' ? 'text-[color:var(--color-ember)]' : 'text-[color:var(--color-ink)]';
  return (
    <div className="bg-[color:var(--color-paper)] border border-[color:var(--color-line)] rounded-[8px] p-5">
      <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-ink-3)]">
        {label}
      </p>
      <p className={`mt-2 font-display text-[26px] leading-none ${valueColor}`}>{value}</p>
    </div>
  );
}

function RecordCard({
  record,
  open,
  onToggle,
  onMarksChange,
  onRemove,
}: {
  record: Record;
  open: boolean;
  onToggle: () => void;
  onMarksChange: (patch: Partial<Marks> | ((m: Marks) => Marks)) => void;
  onRemove: () => void;
}) {
  const perQNums = DESCRIBE_QUESTIONS.map((q) =>
    record.marks.perQuestion[q.qid] === '' ? 0 : Number(record.marks.perQuestion[q.qid]),
  );
  const yt = record.marks.yourTurn === '' ? 0 : Number(record.marks.yourTurn);
  const total = perQNums.reduce((a, b) => a + b, 0) + yt;
  const maxTotal = DESCRIBE_QUESTIONS.reduce((s, q) => s + q.maxMark, 0) + YOUR_TURN_MAX;

  const describeByQid = new Map<string, DescribeAssessment>();
  for (const a of record.data.describePerspectiveAssessments ?? []) {
    describeByQid.set(a.question, a);
  }

  return (
    <article className="bg-[color:var(--color-paper)] border border-[color:var(--color-line)] rounded-[8px]">
      <button
        type="button"
        onClick={onToggle}
        className="w-full grid gap-3 md:grid-cols-[1.4fr_1fr_auto_auto] items-baseline text-left p-5 md:p-6 hover:bg-[color:var(--color-paper-2)] transition-colors rounded-[8px]"
      >
        <div>
          <p className="font-display text-[19px] leading-tight text-[color:var(--color-ink)]">
            {record.studentName}
          </p>
          <p className="font-mono text-[11px] text-[color:var(--color-ink-3)] mt-1">
            {formatTimestamp(record.timestamp)}
          </p>
        </div>
        <p className="text-[13px] text-[color:var(--color-ink-2)]">
          <Bi en="Checklist" zh="清单" />:{' '}
          <span className="tabular-nums">
            {record.data.checklistComplete?.length ?? 0} / {CHECKLIST_TOTAL}
          </span>
        </p>
        <p className="font-mono tabular-nums text-[15px] font-semibold text-[color:var(--color-ink)]">
          {total} / {maxTotal}
        </p>
        <span className="font-mono text-[12px] text-[color:var(--color-ink-3)]">
          {open ? '▲' : '▼'}
        </span>
      </button>

      {open && (
        <div className="border-t border-[color:var(--color-line)] p-5 md:p-8 grid gap-8">
          {DESCRIBE_QUESTIONS.map((q) => {
            const a = describeByQid.get(q.qid);
            const mark = record.marks.perQuestion[q.qid];
            return (
              <div key={q.qid} className="grid gap-4">
                <div className="flex items-baseline flex-wrap gap-3">
                  <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-ink-3)]">
                    {q.qid}
                  </span>
                  <span
                    className={`font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] ${
                      q.authentic
                        ? 'text-[color:var(--color-ember)]'
                        : 'text-[color:var(--color-cobalt)]'
                    }`}
                  >
                    <Bi en={q.topicEn} zh={q.topicZh} />
                  </span>
                </div>
                <p className="text-[14.5px] text-[color:var(--color-ink)] leading-[1.55]">
                  <strong>
                    <Bi en="Describe" zh="描述" />:
                  </strong>{' '}
                  <Bi en={q.promptEn} zh={q.promptZh} />
                </p>

                <ResponseBlock text={a?.response} />

                <div className="grid gap-4 md:grid-cols-[2fr_1fr] md:items-start">
                  <div>
                    <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-ink-3)] mb-2">
                      <Bi en="Self-checked elements" zh="自查要素" />
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {ELEMENT_LABELS.map((el) => {
                        const on = a?.elementsChecked?.includes(el);
                        return (
                          <span
                            key={el}
                            className={`text-[12px] font-semibold px-3 py-1.5 rounded-full border ${
                              on
                                ? 'bg-[color:var(--color-forest-soft)] border-[color:var(--color-forest)] text-[color:var(--color-forest)]'
                                : 'border-[color:var(--color-line)] text-[color:var(--color-ink-3)]'
                            }`}
                          >
                            {el}
                          </span>
                        );
                      })}
                    </div>
                    <div className="mt-4 grid gap-1 text-[13px] text-[color:var(--color-ink-2)]">
                      <p>
                        <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[color:var(--color-ink-3)] mr-2">
                          <Bi en="Source use" zh="资料引用" />
                        </span>
                        {a?.sourceUseFrequency ?? '—'}
                      </p>
                      <p>
                        <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[color:var(--color-ink-3)] mr-2">
                          <Bi en="Estimated level" zh="自评等级" />
                        </span>
                        {a?.estimatedLevelShown ?? '—'}
                      </p>
                      <p>
                        <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[color:var(--color-ink-3)] mr-2">
                          <Bi en="Words" zh="字数" />
                        </span>
                        {wordCount(a?.response)}
                      </p>
                    </div>
                  </div>

                  <MarkInput
                    label={
                      <Bi
                        en={`Mark / ${q.maxMark}`}
                        zh={`得分 / ${q.maxMark}`}
                      />
                    }
                    value={mark}
                    max={q.maxMark}
                    onChange={(v) =>
                      onMarksChange((m) => ({
                        ...m,
                        perQuestion: { ...m.perQuestion, [q.qid]: v },
                      }))
                    }
                  />
                </div>
              </div>
            );
          })}

          <div className="border-t border-[color:var(--color-line)] pt-8 grid gap-4">
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-ink-3)]">
                <Bi en="Your turn" zh="你来试试" />
              </span>
            </div>
            <ResponseBlock text={record.data.yourTurnResponse} />
            <div className="grid gap-4 md:grid-cols-[2fr_1fr] md:items-start">
              <p className="text-[13px] text-[color:var(--color-ink-2)]">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[color:var(--color-ink-3)] mr-2">
                  <Bi en="Words" zh="字数" />
                </span>
                {wordCount(record.data.yourTurnResponse)}
              </p>
              <MarkInput
                label={<Bi en={`Mark / ${YOUR_TURN_MAX}`} zh={`得分 / ${YOUR_TURN_MAX}`} />}
                value={record.marks.yourTurn}
                max={YOUR_TURN_MAX}
                onChange={(v) => onMarksChange({ yourTurn: v })}
              />
            </div>
          </div>

          <div className="border-t border-[color:var(--color-line)] pt-8 grid gap-3">
            <label className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-ink-3)]">
              <Bi en="Teacher notes" zh="教师批注" />
            </label>
            <textarea
              value={record.marks.notes}
              onChange={(e) => onMarksChange({ notes: e.target.value })}
              rows={3}
              className="w-full p-3 text-[14px] bg-[color:var(--color-paper)] border border-[color:var(--color-line)] rounded-md focus:outline-none focus:border-[color:var(--color-cobalt)] focus:ring-1 focus:ring-[color:var(--color-cobalt)]"
              placeholder="Feedback for this student…"
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[color:var(--color-line)]">
            <p className="font-mono text-[13px] text-[color:var(--color-ink)]">
              <Bi en="Total" zh="总分" />:{' '}
              <span className="font-semibold tabular-nums">
                {total} / {maxTotal}
              </span>
            </p>
            <button
              type="button"
              onClick={onRemove}
              className="text-[12.5px] font-semibold text-[color:var(--color-ember)] hover:underline"
            >
              <Bi en="Remove student" zh="移除该学生" />
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

function ResponseBlock({ text }: { text?: string }) {
  const trimmed = (text ?? '').trim();
  if (!trimmed) {
    return (
      <p className="text-[13px] italic text-[color:var(--color-ink-3)]">
        <Bi en="(No response written.)" zh="（未作答。）" />
      </p>
    );
  }
  return (
    <blockquote className="text-[14.5px] italic text-[color:var(--color-ink)] leading-[1.6] border-l-[3px] border-[color:var(--color-cobalt)] pl-4 pretty whitespace-pre-wrap">
      {trimmed}
    </blockquote>
  );
}

function MarkInput({
  label,
  value,
  max,
  onChange,
}: {
  label: React.ReactNode;
  value: number | '';
  max: number;
  onChange: (v: number | '') => void;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-ink-3)]">
        {label}
      </span>
      <input
        type="number"
        inputMode="numeric"
        min={0}
        max={max}
        step={1}
        value={value}
        onChange={(e) => {
          const raw = e.target.value;
          if (raw === '') return onChange('');
          const n = Number(raw);
          if (Number.isNaN(n)) return onChange('');
          const clamped = Math.max(0, Math.min(max, Math.round(n)));
          onChange(clamped);
        }}
        className="mt-2 w-24 px-3 py-2 font-mono text-[16px] font-semibold text-[color:var(--color-ink)] bg-[color:var(--color-paper)] border border-[color:var(--color-line)] rounded-md focus:outline-none focus:border-[color:var(--color-cobalt)] focus:ring-1 focus:ring-[color:var(--color-cobalt)]"
      />
    </label>
  );
}
