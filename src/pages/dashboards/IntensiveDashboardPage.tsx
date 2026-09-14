import { useMemo, useState } from 'react';
import { Container, DisplayH1, DisplayH2, DisplayH3, Body, Eyebrow, Lede, Callout } from '../../components/primitives';
import { Bi } from '../../lib/LanguageContext';
import { ExportFooter } from '../../components/ExportFooter';
import { useNotesExport, nx, usePersistentState } from '../../lib/useNotesExport';

const TOOL_ID = 'dashboard-intensive';

/* Legacy envelope shape for the Intensive tool */
interface IntensiveEnvelope {
  toolId: 'statement-types-intensive';
  studentName: string;
  timestamp: string;
  data: {
    sortScore?: string; // "18/24"
    sortWeakest?: string;
    pairTotal?: string;
    pairScores?: Record<string, string>;
    confidenceLevels?: Record<string, 'low' | 'mid' | 'high' | null>;
    taskCompletion?: string;
    reflectionAnswer?: string;
  };
}

function parseScore(s: string | undefined | null): { n: number; d: number } {
  if (!s) return { n: 0, d: 1 };
  const [nStr, dStr] = String(s).split('/');
  return { n: parseInt(nStr) || 0, d: parseInt(dStr) || 1 };
}
function isFlagged(r: IntensiveEnvelope): boolean {
  const sort = parseScore(r.data.sortScore);
  const pair = parseScore(r.data.pairTotal);
  return (sort.d > 0 && sort.n / sort.d < 0.6) || (pair.d > 0 && pair.n / pair.d < 0.6);
}

function decodeEnvelope(code: string): { ok: true; record: IntensiveEnvelope } | { ok: false; error: string } {
  try {
    const json = decodeURIComponent(escape(atob(code.trim())));
    const rec = JSON.parse(json);
    if (rec.toolId !== 'statement-types-intensive' || !rec.studentName || !rec.data) {
      return { ok: false, error: 'Expected toolId: statement-types-intensive' };
    }
    return { ok: true, record: rec as IntensiveEnvelope };
  } catch (e: any) {
    return { ok: false, error: e?.message || 'Could not decode' };
  }
}
function decodeJson(text: string): { ok: true; record: IntensiveEnvelope } | { ok: false; error: string } {
  try {
    const rec = JSON.parse(text);
    if (rec.toolId !== 'statement-types-intensive' || !rec.studentName || !rec.data) {
      return { ok: false, error: 'Unrecognised or wrong tool' };
    }
    return { ok: true, record: rec as IntensiveEnvelope };
  } catch (e: any) {
    return { ok: false, error: e?.message || 'Could not read JSON' };
  }
}

const CONF_LABEL: Record<'low' | 'mid' | 'high', string> = {
  low: 'Not yet',
  mid: 'Getting there',
  high: 'Confident',
};

function shortType(t: string): string {
  return t
    .replace('Value Judgement', 'VJ')
    .replace('Generalisation', 'Gen')
    .replace('Vested Interest', 'VI');
}

function toCsv(records: IntensiveEnvelope[]): string {
  const rows: string[][] = [
    [
      'Name',
      'Timestamp',
      'Sort Score',
      'Weakest Type',
      'Pairs Total',
      'Fact/Claim',
      'Opinion/Value',
      'Gen/Claim',
      'Bias/Vested',
      'Tasks Done',
      'Flag',
      'Reflection',
    ],
  ];
  records.forEach((r) => {
    const d = r.data;
    const ps = d.pairScores || {};
    rows.push([
      r.studentName,
      r.timestamp,
      d.sortScore || '',
      d.sortWeakest || '',
      d.pairTotal || '',
      ps['Fact vs Claim'] || '—',
      ps['Opinion vs Value'] || '—',
      ps['Gen vs Claim'] || '—',
      ps['Bias vs Vested'] || '—',
      d.taskCompletion || '',
      isFlagged(r) ? 'NEEDS ATTENTION' : 'OK',
      (d.reflectionAnswer || '').replace(/"/g, '""'),
    ]);
  });
  return rows
    .map((row) => row.map((c) => `"${String(c ?? '').replace(/"/g, '""')}"`).join(','))
    .join('\n');
}
function downloadBlob(content: string, mimeType: string, filename: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
function dateStamp(): string {
  return new Date().toISOString().split('T')[0];
}

export function IntensiveDashboardPage() {
  const [records, setRecords] = usePersistentState<IntensiveEnvelope[]>(TOOL_ID, 'records', []);
  const [pasteValue, setPasteValue] = useState('');
  const [status, setStatus] = useState<{ msg: string; tone: 'ok' | 'err' | 'warn' } | null>(null);
  const [teacherNotes, setTeacherNotes] = usePersistentState<string>(
    TOOL_ID,
    'notes',
    '',
    (r) => r,
    (v) => v,
  );

  useNotesExport({
    toolId: TOOL_ID,
    pageTitleEn: 'Teacher Dashboard — Statement Types Intensive',
    subtitleEn: 'IGCSE Global Perspectives 0457 · Class observations',
    filenameStem: 'GP_Intensive_Dashboard',
    studentNameSelector: '#wne-student-name',
    exportDocxSelector: '#wne-export-docx',
    exportPdfSelector: '#wne-export-pdf',
    collect: () => collectIntensiveDashboard(),
  });

  const report = (msg: string, tone: 'ok' | 'err' | 'warn' = 'ok') => {
    setStatus({ msg, tone });
    window.setTimeout(() => setStatus(null), 5000);
  };

  const addRecord = (rec: IntensiveEnvelope): boolean => {
    if (records.some((r) => r.studentName === rec.studentName && r.timestamp === rec.timestamp)) {
      report(
        `Duplicate: ${rec.studentName} at ${new Date(rec.timestamp).toLocaleString()} — already imported.`,
        'warn',
      );
      return false;
    }
    setRecords((cur) => [...cur, rec]);
    report(`Added: ${rec.studentName}`, 'ok');
    return true;
  };

  const importCode = () => {
    const code = pasteValue.trim();
    if (!code) return report('Please paste an export code first.', 'err');
    const decoded = decodeEnvelope(code);
    if (!decoded.ok) return report(decoded.error, 'err');
    if (addRecord(decoded.record)) setPasteValue('');
  };
  const importFile = async (file: File | null) => {
    if (!file) return;
    try {
      const text = await file.text();
      const decoded = decodeJson(text);
      if (!decoded.ok) return report(decoded.error, 'err');
      addRecord(decoded.record);
    } catch (e: any) {
      report(`Could not parse JSON file: ${e?.message || e}`, 'err');
    }
  };
  const removeAt = (idx: number) => {
    if (!window.confirm(`Remove ${records[idx]?.studentName}?`)) return;
    setRecords((cur) => cur.filter((_, i) => i !== idx));
  };
  const clearAll = () => {
    if (!window.confirm('Remove all imported results? This cannot be undone.')) return;
    setRecords([]);
  };

  const stats = useMemo(() => {
    if (records.length === 0) return null;
    const n = records.length;
    const sortSum = records.reduce((s, r) => s + parseScore(r.data.sortScore).n, 0);
    const pairSum = records.reduce((s, r) => s + parseScore(r.data.pairTotal).n, 0);
    const weakCounts: Record<string, number> = {};
    records.forEach((r) => {
      const w = r.data.sortWeakest;
      if (w) weakCounts[w] = (weakCounts[w] || 0) + 1;
    });
    let mostCommonWeak = '—';
    let maxCount = 0;
    Object.entries(weakCounts).forEach(([type, count]) => {
      if (count > maxCount) {
        maxCount = count;
        mostCommonWeak = type;
      }
    });
    const flagged = records.filter(isFlagged).length;
    return {
      n,
      avgSort: (sortSum / n).toFixed(1),
      avgPair: (pairSum / n).toFixed(1),
      mostCommonWeak,
      flagged,
    };
  }, [records]);

  return (
    <>
      <section className="pt-12 md:pt-16 pb-8">
        <Container size="wide">
          <Eyebrow color="cobalt">
            <Bi en="Teacher dashboard · Intensive practice" zh="教师面板 · 强化练习" />
          </Eyebrow>
          <DisplayH1 className="mt-3 max-w-[26ch]">
            <Bi en="Statement Types Intensive — Results" zh="陈述类型强化练习 —— 成绩" />
          </DisplayH1>
          <Lede className="mt-6">
            <Bi
              en="Paste or upload each student's Intensive result code. Roster persists in this browser tab across refresh — export before you close it if you need to keep it long-term."
              zh="粘贴或上传学生的强化练习作答代码。班级列表保存在本浏览器中，可跨刷新持续存在；关闭标签前请先导出。"
            />
          </Lede>
        </Container>
      </section>

      <Container size="wide">
        <section className="py-10 md:py-14 grid gap-8">
          {/* IMPORT */}
          <div className="bg-[color:var(--color-paper)] border border-[color:var(--color-line)] rounded-md p-5 md:p-6 grid gap-4">
            <DisplayH2>
              <Bi en="Import a student result" zh="导入学生结果" />
            </DisplayH2>
            <textarea
              value={pasteValue}
              onChange={(e) => setPasteValue(e.target.value)}
              placeholder="Paste export code here…"
              className="w-full min-h-[100px] p-3 font-mono text-[12.5px] bg-[color:var(--color-paper)] border border-[color:var(--color-line)] rounded-md focus:outline-none focus:border-[color:var(--color-cobalt)] focus:ring-1 focus:ring-[color:var(--color-cobalt)]"
            />
            <div className="flex flex-wrap gap-2 items-center">
              <button
                type="button"
                onClick={importCode}
                className="text-[13px] font-semibold px-4 py-2 rounded-full bg-[color:var(--color-cobalt)] text-[color:var(--color-paper)]"
              >
                Import Code
              </button>
              <label className="text-[13px] font-semibold px-4 py-2 rounded-full border border-[color:var(--color-ink-3)] text-[color:var(--color-ink)] hover:border-[color:var(--color-ink)] cursor-pointer">
                Import JSON file
                <input
                  type="file"
                  accept=".json"
                  onChange={(e) => importFile(e.target.files?.[0] || null)}
                  className="hidden"
                />
              </label>
            </div>
            {status && (
              <p
                className={`text-[13px] ${
                  status.tone === 'ok'
                    ? 'text-[color:var(--color-forest-deep)]'
                    : status.tone === 'warn'
                    ? 'text-[color:var(--color-amber-deep)]'
                    : 'text-[color:var(--color-ember)]'
                }`}
              >
                {status.msg}
              </p>
            )}
          </div>

          {/* SUMMARY */}
          {stats && (
            <div className="grid gap-4">
              <DisplayH3>
                <Bi en="Class summary" zh="全班摘要" />
              </DisplayH3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <SummaryStat label="Students imported" value={String(stats.n)} />
                <SummaryStat label="Avg Sort Score /24" value={stats.avgSort} />
                <SummaryStat label="Avg Pairs Score /16" value={stats.avgPair} />
                <SummaryStat label="Most common weak type" value={stats.mostCommonWeak} />
                <SummaryStat
                  label="Need attention (<60%)"
                  value={String(stats.flagged)}
                  tone={stats.flagged > 0 ? 'ember' : 'forest'}
                />
              </div>
            </div>
          )}

          {/* ROSTER */}
          {records.length === 0 ? (
            <div className="bg-[color:var(--color-paper)] border border-[color:var(--color-line)] rounded-md p-8 text-center text-[color:var(--color-ink-3)]">
              📋 No results imported yet.
            </div>
          ) : (
            <div className="overflow-x-auto bg-[color:var(--color-paper)] border border-[color:var(--color-line)] rounded-md">
              <table className="min-w-full text-[13px]">
                <thead className="bg-[color:var(--color-paper-2)] text-[color:var(--color-ink-3)] font-mono text-[11px] uppercase tracking-[0.12em]">
                  <tr>
                    <th className="text-left p-3">Name</th>
                    <th className="text-left p-3">Sort</th>
                    <th className="text-left p-3">Weakest type</th>
                    <th className="text-left p-3">Pairs</th>
                    <th className="text-left p-3">Confidence</th>
                    <th className="text-left p-3">Tasks</th>
                    <th className="text-left p-3">Flag</th>
                    <th className="text-left p-3">Reflection</th>
                    <th className="p-3" />
                  </tr>
                </thead>
                <tbody>
                  {records.map((r, idx) => {
                    const d = r.data;
                    const flagged = isFlagged(r);
                    const confs = d.confidenceLevels || {};
                    return (
                      <tr key={idx} className="border-t border-[color:var(--color-line)] align-top">
                        <td className="p-3">
                          <strong className="text-[color:var(--color-ink)]">{r.studentName}</strong>
                          <br />
                          <span className="text-[11px] text-[color:var(--color-ink-3)]">
                            {new Date(r.timestamp).toLocaleString()}
                          </span>
                        </td>
                        <td className="p-3 font-mono">{d.sortScore || '—'}</td>
                        <td className="p-3 text-[12px]">{d.sortWeakest || '—'}</td>
                        <td className="p-3 font-mono">{d.pairTotal || '—'}</td>
                        <td className="p-3 max-w-[220px]">
                          <div className="flex flex-wrap gap-1">
                            {Object.keys(confs).length === 0 ? (
                              <span className="text-[color:var(--color-ink-3)] text-[12px]">—</span>
                            ) : (
                              Object.entries(confs).map(([type, level]) => {
                                const cls =
                                  level === 'high'
                                    ? 'bg-[color:var(--color-forest-soft)] text-[color:var(--color-forest-deep)]'
                                    : level === 'mid'
                                    ? 'bg-[color:var(--color-amber-soft)] text-[color:var(--color-amber-deep)]'
                                    : level === 'low'
                                    ? 'bg-[color:var(--color-ember-soft)] text-[color:var(--color-ember)]'
                                    : 'bg-[color:var(--color-paper-2)] text-[color:var(--color-ink-3)]';
                                return (
                                  <span
                                    key={type}
                                    className={`inline-block px-2 py-0.5 rounded-full font-mono text-[10.5px] ${cls}`}
                                    title={level ? `${type}: ${CONF_LABEL[level]}` : `${type}: no rating`}
                                  >
                                    {shortType(type)}
                                  </span>
                                );
                              })
                            )}
                          </div>
                        </td>
                        <td className="p-3 font-mono">{d.taskCompletion || '—'}</td>
                        <td
                          className={`p-3 font-semibold ${
                            flagged ? 'text-[color:var(--color-ember)]' : 'text-[color:var(--color-forest-deep)]'
                          }`}
                        >
                          {flagged ? '⚠ Needs attention' : '✓'}
                        </td>
                        <td className="p-3 text-[12px] italic text-[color:var(--color-ink-2)] max-w-[240px]">
                          {d.reflectionAnswer
                            ? `"${d.reflectionAnswer.substring(0, 120)}${
                                d.reflectionAnswer.length > 120 ? '…' : ''
                              }"`
                            : '—'}
                        </td>
                        <td className="p-3">
                          <button
                            type="button"
                            onClick={() => removeAt(idx)}
                            title="Remove"
                            className="text-[color:var(--color-ember)] hover:text-[color:var(--color-ink)]"
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* EXPORT + CLEAR */}
          {records.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => downloadBlob(toCsv(records), 'text/csv', `intensive-results-${dateStamp()}.csv`)}
                className="text-[13px] font-semibold px-4 py-2 rounded-full bg-[color:var(--color-amber)] text-[color:var(--color-paper)]"
              >
                Export CSV
              </button>
              <button
                type="button"
                onClick={() =>
                  downloadBlob(
                    JSON.stringify({ exportedAt: new Date().toISOString(), results: records }, null, 2),
                    'application/json',
                    `intensive-results-${dateStamp()}.json`,
                  )
                }
                className="text-[13px] font-semibold px-4 py-2 rounded-full border border-[color:var(--color-ink-3)] text-[color:var(--color-ink)]"
              >
                Export JSON
              </button>
              <div className="flex-1" />
              <button
                type="button"
                onClick={clearAll}
                className="text-[13px] font-semibold px-4 py-2 rounded-full border border-[color:var(--color-ember)] text-[color:var(--color-ember)] hover:bg-[color:var(--color-ember-soft)]"
              >
                Clear All
              </button>
            </div>
          )}

          <Callout tone="cobalt" eyebrow={<Bi en="Reading the confidence chips" zh="信心色标说明" />}>
            <div className="flex flex-wrap gap-3 text-[13px]">
              <span className="inline-flex items-center gap-2">
                <span className="inline-block px-2 py-0.5 rounded-full font-mono text-[10.5px] bg-[color:var(--color-forest-soft)] text-[color:var(--color-forest-deep)]">
                  Type
                </span>
                Confident
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="inline-block px-2 py-0.5 rounded-full font-mono text-[10.5px] bg-[color:var(--color-amber-soft)] text-[color:var(--color-amber-deep)]">
                  Type
                </span>
                Getting there
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="inline-block px-2 py-0.5 rounded-full font-mono text-[10.5px] bg-[color:var(--color-ember-soft)] text-[color:var(--color-ember)]">
                  Type
                </span>
                Not yet
              </span>
            </div>
          </Callout>

          {/* Teacher observations */}
          <div className="bg-[color:var(--color-paper)] border border-[color:var(--color-line)] rounded-md p-5 md:p-6">
            <DisplayH3>
              <Bi en="Teacher observations" zh="教师观察记录" />
            </DisplayH3>
            <Body className="mt-3">
              <Bi
                en="Notes you take here bundle into the Word / PDF export at the bottom of the page."
                zh="下方观察记录将随 Word/PDF 导出。"
              />
            </Body>
            <textarea
              value={teacherNotes}
              onChange={(e) => setTeacherNotes(e.target.value)}
              placeholder="Type observations here…"
              className="mt-3 w-full min-h-[120px] p-3 text-[14px] bg-[color:var(--color-paper)] border border-[color:var(--color-line)] rounded-md focus:outline-none focus:border-[color:var(--color-cobalt)] focus:ring-1 focus:ring-[color:var(--color-cobalt)]"
            />
          </div>
        </section>
      </Container>

      <ExportFooter toolId={TOOL_ID} />
    </>
  );
}

function SummaryStat({ label, value, tone }: { label: string; value: string; tone?: 'forest' | 'ember' }) {
  const color =
    tone === 'forest'
      ? 'text-[color:var(--color-forest-deep)]'
      : tone === 'ember'
      ? 'text-[color:var(--color-ember)]'
      : 'text-[color:var(--color-ink)]';
  return (
    <div className="bg-[color:var(--color-paper)] border border-[color:var(--color-line)] rounded-md p-4">
      <p className={`font-display text-[22px] ${color}`}>{value}</p>
      <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-ink-3)]">
        {label}
      </p>
    </div>
  );
}

function collectIntensiveDashboard() {
  const sections: Array<{ heading: string; blocks: any[] }> = [];
  let records: IntensiveEnvelope[] = [];
  try {
    const raw = localStorage.getItem(`wne_${TOOL_ID}_records`);
    if (raw) records = JSON.parse(raw);
  } catch {}
  let notes = '';
  try {
    notes = localStorage.getItem(`wne_${TOOL_ID}_notes`) || '';
  } catch {}

  const n = records.length;
  const sortSum = records.reduce((s, r) => s + parseScore(r.data.sortScore).n, 0);
  const pairSum = records.reduce((s, r) => s + parseScore(r.data.pairTotal).n, 0);
  const flagged = records.filter(isFlagged).length;
  sections.push({
    heading: 'Class summary',
    blocks: [
      nx.p([nx.text(`Students imported: ${n}`, { bold: true })]),
      nx.p([nx.text('Avg Sort Score: ', { bold: true }), nx.text(n > 0 ? (sortSum / n).toFixed(1) : '—')]),
      nx.p([nx.text('Avg Pairs Score: ', { bold: true }), nx.text(n > 0 ? (pairSum / n).toFixed(1) : '—')]),
      nx.p([nx.text('Needs attention: ', { bold: true }), nx.text(String(flagged))]),
    ],
  });

  if (notes) sections.push({ heading: 'Teacher observations', blocks: [nx.p(notes)] });

  if (records.length) {
    const rows: any[] = [];
    records.forEach((r) => {
      rows.push(nx.h(3, r.studentName));
      rows.push(
        nx.p([
          nx.text(
            `Sort ${r.data.sortScore || '—'} · Pairs ${r.data.pairTotal || '—'} · Tasks ${r.data.taskCompletion || '—'} · Weakest: ${r.data.sortWeakest || '—'}${
              isFlagged(r) ? ' · ⚠ needs attention' : ''
            }`,
          ),
        ]),
      );
      if (r.data.reflectionAnswer)
        rows.push(nx.p([nx.text('Reflection: ', { bold: true }), nx.text(r.data.reflectionAnswer)]));
    });
    sections.push({ heading: 'Roster', blocks: rows });
  }

  return { sections };
}
