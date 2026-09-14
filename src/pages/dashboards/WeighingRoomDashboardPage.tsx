import { useMemo, useState } from 'react';
import { Container, DisplayH1, Eyebrow, Lede } from '../../components/primitives';
import { Bi } from '../../lib/LanguageContext';
import { decodePayload, downloadFile, formatTimestamp, toCsv } from '../../lib/dashboards';
import { ExportFooter } from '../../components/ExportFooter';
import { useNotesExport, nx } from '../../lib/useNotesExport';

/* ─────────── Static reference data (mirrors legacy tool) ─────────── */

const CRITERIA: { key: string; labelEn: string; labelZh: string }[] = [
  { key: 'crowd', labelEn: 'Crowd Test', labelZh: '人群测试' },
  { key: 'hurt', labelEn: 'Hurt Test', labelZh: '伤害测试' },
  { key: 'fair', labelEn: 'Fair Test', labelZh: '公平测试' },
  { key: 'domino', labelEn: 'Domino Test', labelZh: '多米诺测试' },
  { key: 'stuck', labelEn: 'Stuck Test', labelZh: '停滞测试' },
  { key: 'backitup', labelEn: 'Back It Up (bonus)', labelZh: '回溯支撑（加分）' },
];

const BANDS: { key: string; label: string; descEn: string; descZh: string }[] = [
  { key: '0', label: '0', descEn: 'No creditable response', descZh: '无有效回应' },
  { key: '1-2', label: '1–2', descEn: 'Limited, little explanation', descZh: '有限，几乎无解释' },
  { key: '3-4', label: '3–4', descEn: 'Partial, minimal support', descZh: '部分，支撑较少' },
  { key: '5-6', label: '5–6', descEn: 'Some justification', descZh: '有一定论证' },
  { key: '7-8', label: '7–8', descEn: 'Clear, well supported', descZh: '清晰、支撑充分' },
];

const SET_MAX = 8;
const NUM_SETS = 5;
const SELF_CHECK_TOTAL = 8;

/* ─────────── Types ─────────── */

interface SetData {
  words?: number;
  band?: string | null;
  criteria?: string[];
}

interface WeighingRoomData {
  levelUpCompleted?: boolean;
  practiceCompleted?: number;
  totalWords?: number;
  selfCheckTicked?: number;
  sets?: { [k: string]: SetData };
}

interface Marks {
  perSet: number[];
  notes: string;
}

interface Record {
  studentName: string;
  timestamp: string;
  data: WeighingRoomData;
  marks: Marks;
}

function emptyMarks(): Marks {
  return { perSet: Array(NUM_SETS).fill('') as unknown as number[], notes: '' };
}

/* ─────────── Page ─────────── */

export function WeighingRoomDashboardPage() {
  const [records, setRecords] = useState<Record[]>([]);
  const [codeInput, setCodeInput] = useState('');
  const [status, setStatus] = useState<{ msg: string; tone: 'ok' | 'err' | 'warn' } | null>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  useNotesExport({
    toolId: 'dashboard-weighing-room',
    pageTitleEn: 'Teacher Dashboard — Weighing Room',
    subtitleEn: 'IGCSE Global Perspectives 0457 · Class observations',
    filenameStem: 'GP_WeighingRoom_Dashboard',
    studentNameSelector: '#wne-student-name',
    exportDocxSelector: '#wne-export-docx',
    exportPdfSelector:  '#wne-export-pdf',
    collect: () => ({
      sections: [{
        heading: 'Class summary',
        blocks: [
          nx.p([nx.text('Submissions imported: ', { bold: true }), nx.text(String(records.length))]),
        ],
      }],
    }),
  });

  function reportStatus(msg: string, tone: 'ok' | 'err' | 'warn' = 'ok') {
    setStatus({ msg, tone });
    window.setTimeout(() => setStatus(null), 5000);
  }

  function ingestCode(raw: string) {
    const decoded = decodePayload<WeighingRoomData>(raw);
    if (!decoded) {
      reportStatus('Could not decode this code. Check that you pasted it correctly.', 'err');
      return;
    }
    if (decoded.toolId !== 'significance-judgement') {
      reportStatus(
        `Wrong toolId: got "${decoded.toolId}", expected "significance-judgement". Use the Perspectives dashboard for Q1(c) codes.`,
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
        try {
          const parsed = JSON.parse(text);
          if (parsed?.toolId === 'significance-judgement') {
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
          /* fall through */
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

  function totalFor(r: Record): number {
    return r.marks.perSet.reduce((sum, m) => sum + (typeof m === 'number' ? m : 0), 0);
  }

  const maxTotal = SET_MAX * NUM_SETS;

  function exportCsv() {
    if (records.length === 0) return;
    const header = [
      'Student',
      'Timestamp',
      ...Array.from({ length: NUM_SETS }, (_, i) => `Set_${i + 1}_mark_/${SET_MAX}`),
      ...Array.from({ length: NUM_SETS }, (_, i) => `Set_${i + 1}_self_band`),
      ...Array.from({ length: NUM_SETS }, (_, i) => `Set_${i + 1}_words`),
      `Total_/${maxTotal}`,
      'Practice_completed',
      'Level_up_completed',
      'Self_check_ticked',
      'Notes',
    ];
    const rows = records.map((r) => {
      const marks = Array.from({ length: NUM_SETS }, (_, i) => {
        const m = r.marks.perSet[i];
        return typeof m === 'number' ? String(m) : '';
      });
      const bands = Array.from({ length: NUM_SETS }, (_, i) => {
        const s = r.data.sets?.[String(i + 1)];
        return s?.band ?? '';
      });
      const words = Array.from({ length: NUM_SETS }, (_, i) => {
        const s = r.data.sets?.[String(i + 1)];
        return s?.words ?? 0;
      });
      return [
        r.studentName,
        r.timestamp,
        ...marks,
        ...bands,
        ...words.map(String),
        String(totalFor(r)),
        r.data.practiceCompleted ?? '',
        r.data.levelUpCompleted ? 'yes' : 'no',
        r.data.selfCheckTicked ?? '',
        r.marks.notes,
      ];
    });
    const csv = toCsv(header, rows);
    const stamp = new Date().toISOString().slice(0, 10);
    downloadFile(`WMSI_Q1d_WeighingRoom_${stamp}.csv`, csv);
  }

  const summary = useMemo(() => {
    if (records.length === 0) return null;
    const totals = records.map((r) => totalFor(r));
    const graded = records.filter((r) => r.marks.perSet.some((m) => typeof m === 'number')).length;
    const avg = totals.length ? totals.reduce((a, b) => a + b, 0) / totals.length : 0;
    const under = totals.filter((t) => t / maxTotal < 0.6).length;
    return {
      count: records.length,
      graded,
      avg: avg.toFixed(1),
      under,
    };
  }, [records, maxTotal]);

  return (
    <>
      {/* HERO */}
      <section className="pt-12 md:pt-16 pb-8 border-b border-[color:var(--color-line)]">
        <Container size="wide">
          <Eyebrow color="cobalt">
            <Bi en="Teacher dashboard · Q1(d)" zh="教师面板 · 第 1(d) 题" />
          </Eyebrow>
          <DisplayH1 className="mt-3">
            <Bi en="Weighing Room results." zh="「权衡室」结果。" />
          </DisplayH1>
          <Lede className="mt-6">
            <Bi
              en={
                <>
                  Paste the export codes your students generate from <strong>The Weighing Room</strong>, or upload their JSON
                  exports. Their five practice sets, self-selected bands and the criteria they checked appear below; enter a
                  mark out of eight per set and download the class CSV when you're done.
                </>
              }
              zh={
                <>
                  在此粘贴学生从<strong>「权衡室」</strong>工具中生成的导出代码，或上传他们的 JSON 文件。
                  他们的五个练习组、自选评分带以及所勾选的标准会显示在下方；为每一组打分（满分 8），完成后可以下载全班 CSV。
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
                placeholder="eyJ0b29sSWQiOiJzaWduaWZpY2FuY2UtanVkZ2VtZW50Ii…"
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
                  <StatTile label={<Bi en="Class average" zh="班级平均" />} value={`${summary.avg} / ${maxTotal}`} />
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
                    total={totalFor(r)}
                    maxTotal={maxTotal}
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

      <ExportFooter toolId="dashboard-weighing-room" />
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
  total,
  maxTotal,
  onToggle,
  onMarksChange,
  onRemove,
}: {
  record: Record;
  open: boolean;
  total: number;
  maxTotal: number;
  onToggle: () => void;
  onMarksChange: (patch: Partial<Marks> | ((m: Marks) => Marks)) => void;
  onRemove: () => void;
}) {
  const practiceCompleted = record.data.practiceCompleted ?? 0;
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
          <Bi en="Practice" zh="练习" />:{' '}
          <span className="tabular-nums">
            {practiceCompleted} / {NUM_SETS}
          </span>{' '}
          ·{' '}
          <Bi en="Words" zh="字数" />:{' '}
          <span className="tabular-nums">{record.data.totalWords ?? 0}</span>
        </p>
        <p className="font-mono tabular-nums text-[15px] font-semibold text-[color:var(--color-ink)]">
          {total} / {maxTotal}
        </p>
        <span className="font-mono text-[12px] text-[color:var(--color-ink-3)]">
          {open ? '▲' : '▼'}
        </span>
      </button>

      {open && (
        <div className="border-t border-[color:var(--color-line)] p-5 md:p-8 grid gap-6">
          <div className="grid gap-3 md:grid-cols-3 text-[13px] text-[color:var(--color-ink-2)]">
            <p>
              <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[color:var(--color-ink-3)] mr-2">
                <Bi en="Level-up" zh="等级练习" />
              </span>
              {record.data.levelUpCompleted ? (
                <Bi en="completed" zh="已完成" />
              ) : (
                <Bi en="not completed" zh="未完成" />
              )}
            </p>
            <p>
              <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[color:var(--color-ink-3)] mr-2">
                <Bi en="Self-check ticks" zh="自查打勾数" />
              </span>
              <span className="tabular-nums">
                {record.data.selfCheckTicked ?? 0} / {SELF_CHECK_TOTAL}
              </span>
            </p>
            <p>
              <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[color:var(--color-ink-3)] mr-2">
                <Bi en="Total words" zh="总字数" />
              </span>
              <span className="tabular-nums">{record.data.totalWords ?? 0}</span>
            </p>
          </div>

          <div className="grid gap-4">
            {Array.from({ length: NUM_SETS }, (_, i) => {
              const setNum = i + 1;
              const s = record.data.sets?.[String(setNum)] ?? {};
              const band = BANDS.find((b) => b.key === s.band);
              const crits = (s.criteria ?? []).map((c) => CRITERIA.find((x) => x.key === c)).filter(Boolean);
              const mark = record.marks.perSet[i];
              return (
                <div
                  key={setNum}
                  className="grid gap-3 md:grid-cols-[auto_1fr_auto] md:items-start border-t border-[color:var(--color-line)] pt-4"
                >
                  <div className="min-w-[70px]">
                    <p className="font-display text-[32px] leading-none text-[color:var(--color-cobalt)]">
                      {setNum}
                    </p>
                    <p className="font-mono text-[10.5px] text-[color:var(--color-ink-3)] mt-1 tabular-nums">
                      {s.words ?? 0} <Bi en="words" zh="字" />
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <p className="text-[13px] text-[color:var(--color-ink-2)]">
                      <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[color:var(--color-ink-3)] mr-2">
                        <Bi en="Self band" zh="自评带" />
                      </span>
                      {band ? (
                        <>
                          <strong>{band.label}</strong>{' '}
                          <span className="text-[color:var(--color-ink-3)]">
                            · <Bi en={band.descEn} zh={band.descZh} />
                          </span>
                        </>
                      ) : (
                        '—'
                      )}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {CRITERIA.map((c) => {
                        const on = crits.some((k) => k?.key === c.key);
                        return (
                          <span
                            key={c.key}
                            className={`text-[11.5px] font-semibold px-2.5 py-1 rounded-full border ${
                              on
                                ? 'bg-[color:var(--color-forest-soft)] border-[color:var(--color-forest)] text-[color:var(--color-forest)]'
                                : 'border-[color:var(--color-line)] text-[color:var(--color-ink-3)]'
                            }`}
                          >
                            <Bi en={c.labelEn} zh={c.labelZh} />
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  <MarkInput
                    label={<Bi en={`Mark / ${SET_MAX}`} zh={`得分 / ${SET_MAX}`} />}
                    value={mark as unknown as number | ''}
                    max={SET_MAX}
                    onChange={(v) =>
                      onMarksChange((m) => {
                        const perSet = [...m.perSet] as unknown as (number | '')[];
                        perSet[i] = v;
                        return { ...m, perSet: perSet as unknown as number[] };
                      })
                    }
                  />
                </div>
              );
            })}
          </div>

          <div className="border-t border-[color:var(--color-line)] pt-6 grid gap-3">
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
        value={value === '' ? '' : String(value)}
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
