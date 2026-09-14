import { useMemo, useState } from 'react';
import { Container, DisplayH1, DisplayH2, DisplayH3, Body, Eyebrow, Lede, Callout } from '../../components/primitives';
import { Bi } from '../../lib/LanguageContext';
import { ExportFooter } from '../../components/ExportFooter';
import { useNotesExport, nx, usePersistentState } from '../../lib/useNotesExport';
import {
  TRACK_META,
  decodeEnvelope,
  decodeJsonFile,
  downloadBlob,
  dateStamp,
  isFlagged,
  toCsv,
  type ClassRecord,
  type DiagnosticRecord,
  type StatementTypesRecord,
} from './teacherDashboardData';

const TOOL_ID = 'dashboard-statements';

type Filter = 'all' | 'diagnostic' | 'statement-types' | 'flagged';

export function TeacherDashboardPage() {
  const [records, setRecords] = usePersistentState<ClassRecord[]>(TOOL_ID, 'records', []);
  const [inputMode, setInputMode] = useState<'paste' | 'upload'>('paste');
  const [pasteValue, setPasteValue] = useState('');
  const [status, setStatus] = useState<{ msg: string; tone: 'ok' | 'err' } | null>(null);
  const [filter, setFilter] = useState<Filter>('all');
  const [teacherNotes, setTeacherNotes] = usePersistentState<string>(
    TOOL_ID,
    'notes',
    '',
    (r) => r,
    (v) => v,
  );

  useNotesExport({
    toolId: TOOL_ID,
    pageTitleEn: 'Teacher Dashboard — Statement Types & Diagnostic Results',
    subtitleEn: 'IGCSE Global Perspectives 0457 · Class observations',
    filenameStem: 'GP_Statements_Dashboard',
    studentNameSelector: '#wne-student-name',
    exportDocxSelector: '#wne-export-docx',
    exportPdfSelector: '#wne-export-pdf',
    collect: () => collectDashboard(),
  });

  const report = (msg: string, tone: 'ok' | 'err' = 'ok') => {
    setStatus({ msg, tone });
    window.setTimeout(() => setStatus(null), 5000);
  };

  const addRecord = (rec: ClassRecord): boolean => {
    if (
      records.some(
        (r) => r.studentName === rec.studentName && r.timestamp === rec.timestamp && r.toolId === rec.toolId,
      )
    ) {
      return false;
    }
    setRecords((cur) => [...cur, rec]);
    return true;
  };

  const addFromPaste = () => {
    const code = pasteValue.trim();
    if (!code) {
      report('Paste a result code first.', 'err');
      return;
    }
    const decoded = decodeEnvelope(code);
    if (!decoded.ok) {
      report(`Could not read this code — ${decoded.error}. Check it was copied in full.`, 'err');
      return;
    }
    const added = addRecord(decoded.record);
    setPasteValue('');
    report(
      added
        ? `Added ${decoded.record.studentName}’s result.`
        : `${decoded.record.studentName}’s result was already added — skipped duplicate.`,
      added ? 'ok' : 'err',
    );
  };

  const addFromFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    let addedCount = 0;
    let duplicateCount = 0;
    let errorCount = 0;
    const arr = Array.from(files);
    for (const f of arr) {
      try {
        const text = await f.text();
        const decoded = decodeJsonFile(text);
        if (!decoded.ok) {
          errorCount++;
          continue;
        }
        if (addRecord(decoded.record)) addedCount++;
        else duplicateCount++;
      } catch {
        errorCount++;
      }
    }
    const parts: string[] = [];
    if (addedCount > 0) parts.push(`Added ${addedCount} result${addedCount > 1 ? 's' : ''}`);
    if (duplicateCount > 0) parts.push(`${duplicateCount} duplicate${duplicateCount > 1 ? 's' : ''} skipped`);
    if (errorCount > 0) parts.push(`${errorCount} file(s) could not be read`);
    report(parts.length ? parts.join(', ') + '.' : 'No files processed.', addedCount === 0 ? 'err' : 'ok');
  };

  const removeAt = (globalIdx: number) => setRecords((cur) => cur.filter((_, i) => i !== globalIdx));
  const clearAll = () => {
    if (!window.confirm('Remove all collected results from this dashboard? This cannot be undone (unless you already exported).')) return;
    setRecords([]);
  };

  const filtered = useMemo(() => {
    if (filter === 'all') return records;
    if (filter === 'flagged') return records.filter(isFlagged);
    return records.filter((r) => r.toolId === filter);
  }, [records, filter]);

  const diagCount = records.filter((r) => r.toolId === 'diagnostic').length;
  const stCount = records.filter((r) => r.toolId === 'statement-types').length;
  const flaggedCount = records.filter(isFlagged).length;

  const diagResults = filtered.filter((r): r is DiagnosticRecord => r.toolId === 'diagnostic');
  const stResults = filtered.filter((r): r is StatementTypesRecord => r.toolId === 'statement-types');

  return (
    <>
      <section className="pt-12 md:pt-16 pb-8">
        <Container size="wide">
          <Eyebrow color="cobalt">
            <Bi en="Teacher dashboard · Statement types + diagnostic" zh="教师面板 · 陈述类型与诊断" />
          </Eyebrow>
          <DisplayH1 className="mt-3 max-w-[26ch]">
            <Bi en="Class results — Statement Types & Generalisation" zh="全班成绩 —— 陈述类型与概括" />
          </DisplayH1>
          <Lede className="mt-6">
            <Bi
              en="Paste or upload each student's result code from either practice tool. Results persist in this browser only — export before you close it if you want to keep them beyond this session."
              zh="粘贴或上传学生的作答代码，成绩仅保存在本浏览器中，请在关闭标签页前导出。"
            />
          </Lede>
        </Container>
      </section>

      <Container size="wide">
        <section className="py-10 md:py-14 grid gap-8">
          <Callout tone="cobalt" eyebrow={<Bi en="Note on newer React tools" zh="关于新版工具" />}>
            <Bi
              en="Students who use the current React versions of Find Your Gap and Statement Types now export Word/PDF worksheets directly. This dashboard still accepts legacy base64 codes and JSON files for backwards compatibility."
              zh="使用新版 React 工具的学生现直接导出 Word/PDF 作业。此面板仍兼容旧版 base64 代码与 JSON 文件。"
            />
          </Callout>

          {/* INPUT PANEL */}
          <div className="bg-[color:var(--color-paper)] border border-[color:var(--color-line)] rounded-md p-5 md:p-6 grid gap-4">
            <DisplayH2>
              <Bi en="Add a student result" zh="添加学生结果" />
            </DisplayH2>
            <Body>
              <Bi
                en={<>Works with codes from either tool: <strong>Find Your Gap</strong> (diagnostic) or <strong>Reading Between the Lines</strong> (statement types).</>}
                zh="接受来自两个工具的代码：Find Your Gap（诊断）与 Reading Between the Lines（陈述类型）。"
              />
            </Body>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setInputMode('paste')}
                className={`text-[12.5px] font-semibold px-3 py-1.5 rounded-full border ${
                  inputMode === 'paste'
                    ? 'bg-[color:var(--color-ink)] border-[color:var(--color-ink)] text-[color:var(--color-paper)]'
                    : 'border-[color:var(--color-line)] text-[color:var(--color-ink)]'
                }`}
              >
                Paste code
              </button>
              <button
                type="button"
                onClick={() => setInputMode('upload')}
                className={`text-[12.5px] font-semibold px-3 py-1.5 rounded-full border ${
                  inputMode === 'upload'
                    ? 'bg-[color:var(--color-ink)] border-[color:var(--color-ink)] text-[color:var(--color-paper)]'
                    : 'border-[color:var(--color-line)] text-[color:var(--color-ink)]'
                }`}
              >
                Upload file
              </button>
            </div>

            {inputMode === 'paste' ? (
              <div className="grid gap-3">
                <textarea
                  value={pasteValue}
                  onChange={(e) => setPasteValue(e.target.value)}
                  placeholder="Paste the student's result code here…"
                  className="w-full min-h-[100px] p-3 font-mono text-[12.5px] bg-[color:var(--color-paper)] border border-[color:var(--color-line)] rounded-md focus:outline-none focus:border-[color:var(--color-cobalt)] focus:ring-1 focus:ring-[color:var(--color-cobalt)]"
                />
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={addFromPaste}
                    className="text-[13px] font-semibold px-4 py-2 rounded-full bg-[color:var(--color-cobalt)] text-[color:var(--color-paper)]"
                  >
                    Add to class results
                  </button>
                  <button
                    type="button"
                    onClick={() => setPasteValue('')}
                    className="text-[13px] font-semibold px-4 py-2 rounded-full border border-[color:var(--color-ink-3)] text-[color:var(--color-ink)] hover:border-[color:var(--color-ink)]"
                  >
                    Clear
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <label className="block cursor-pointer bg-[color:var(--color-paper-2)] border-2 border-dashed border-[color:var(--color-line)] rounded-md p-8 text-center hover:border-[color:var(--color-cobalt)]">
                  <div className="text-[28px] mb-2" aria-hidden="true">📁</div>
                  <div className="text-[14px] font-semibold text-[color:var(--color-ink)]">
                    Click to choose file(s)
                  </div>
                  <div className="text-[12px] text-[color:var(--color-ink-3)] mt-1">
                    Accepts .json result files — multiple files at once is fine
                  </div>
                  <input
                    type="file"
                    accept=".json"
                    multiple
                    onChange={(e) => addFromFiles(e.target.files)}
                    className="hidden"
                  />
                </label>
              </div>
            )}

            {status && (
              <p
                className={`text-[13px] ${
                  status.tone === 'ok' ? 'text-[color:var(--color-forest-deep)]' : 'text-[color:var(--color-ember)]'
                }`}
              >
                {status.msg}
              </p>
            )}
          </div>

          {/* SUMMARY + FILTER */}
          {records.length > 0 && (
            <>
              <div className="grid gap-4">
                <DisplayH3>
                  <Bi en="Class summary" zh="全班摘要" />
                </DisplayH3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <SummaryStat label="Total results" value={records.length} />
                  <SummaryStat label="Diagnostic runs" value={diagCount} />
                  <SummaryStat label="Statement Types runs" value={stCount} />
                  <SummaryStat
                    label="Needs attention"
                    value={flaggedCount}
                    tone={flaggedCount > 0 ? 'ember' : 'forest'}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {(['all', 'diagnostic', 'statement-types', 'flagged'] as Filter[]).map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFilter(f)}
                      className={`text-[12.5px] font-semibold px-3 py-1.5 rounded-full border ${
                        filter === f
                          ? 'bg-[color:var(--color-ink)] border-[color:var(--color-ink)] text-[color:var(--color-paper)]'
                          : 'border-[color:var(--color-line)] text-[color:var(--color-ink)] hover:border-[color:var(--color-ink)]'
                      }`}
                    >
                      {f === 'all'
                        ? 'All results'
                        : f === 'diagnostic'
                        ? 'Diagnostic only'
                        : f === 'statement-types'
                        ? 'Statement Types only'
                        : '⚠ Needs attention'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rosters */}
              {filtered.length === 0 ? (
                <div className="bg-[color:var(--color-paper)] border border-[color:var(--color-line)] rounded-md p-8 text-center text-[color:var(--color-ink-3)]">
                  🔍 No results match this filter.
                </div>
              ) : (
                <>
                  {diagResults.length > 0 && (
                    <div>
                      <DisplayH3>Find Your Gap — Diagnostic results</DisplayH3>
                      <div className="mt-3 overflow-x-auto bg-[color:var(--color-paper)] border border-[color:var(--color-line)] rounded-md">
                        <table className="min-w-full text-[13.5px]">
                          <thead className="bg-[color:var(--color-paper-2)] text-[color:var(--color-ink-3)] font-mono text-[11px] uppercase tracking-[0.12em]">
                            <tr>
                              <th className="text-left p-3">Name</th>
                              <th className="text-left p-3">Weakest area</th>
                              <th className="text-left p-3">Diagnostic score</th>
                              <th className="text-left p-3">Re-test</th>
                              <th className="text-left p-3">Improved?</th>
                              <th className="p-3" />
                            </tr>
                          </thead>
                          <tbody>
                            {diagResults.map((r) => {
                              const meta = TRACK_META[r.data.assignedTrack];
                              const globalIdx = records.indexOf(r);
                              const toneCls =
                                meta.tone === 'amber'
                                  ? 'bg-[color:var(--color-amber-soft)] text-[color:var(--color-amber-deep)]'
                                  : meta.tone === 'cobalt'
                                  ? 'bg-[color:var(--color-cobalt-soft)] text-[color:var(--color-cobalt-deep)]'
                                  : 'bg-[color:var(--color-violet-soft)] text-[color:var(--color-violet-deep)]';
                              return (
                                <tr key={globalIdx} className="border-t border-[color:var(--color-line)]">
                                  <td className="p-3 text-[color:var(--color-ink)]">{r.studentName}</td>
                                  <td className="p-3">
                                    <span className={`inline-block px-2 py-0.5 rounded-full font-mono text-[11px] ${toneCls}`}>
                                      {meta.name}
                                    </span>
                                  </td>
                                  <td className="p-3 font-mono text-[color:var(--color-ink)]">{r.data.diagnosticScoreInWeakArea}</td>
                                  <td className="p-3 font-mono text-[color:var(--color-ink)]">{r.data.retestScore}</td>
                                  <td className={`p-3 font-semibold ${r.data.improved ? 'text-[color:var(--color-forest-deep)]' : 'text-[color:var(--color-ember)]'}`}>
                                    {r.data.improved ? '✓ Yes' : '⚠ Not yet'}
                                  </td>
                                  <td className="p-3">
                                    <button
                                      type="button"
                                      onClick={() => removeAt(globalIdx)}
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
                    </div>
                  )}

                  {stResults.length > 0 && (
                    <div>
                      <DisplayH3>Reading Between the Lines — Statement Types results</DisplayH3>
                      <div className="mt-3 overflow-x-auto bg-[color:var(--color-paper)] border border-[color:var(--color-line)] rounded-md">
                        <table className="min-w-full text-[13.5px]">
                          <thead className="bg-[color:var(--color-paper-2)] text-[color:var(--color-ink-3)] font-mono text-[11px] uppercase tracking-[0.12em]">
                            <tr>
                              <th className="text-left p-3">Name</th>
                              <th className="text-left p-3">Sort & Classify</th>
                              <th className="text-left p-3">Gen. Drill XP</th>
                              <th className="text-left p-3">Mixed Arena</th>
                              <th className="text-left p-3">Checklist</th>
                              <th className="text-left p-3">Reflection</th>
                              <th className="p-3" />
                            </tr>
                          </thead>
                          <tbody>
                            {stResults.map((r) => {
                              const globalIdx = records.indexOf(r);
                              return (
                                <tr key={globalIdx} className="border-t border-[color:var(--color-line)]">
                                  <td className="p-3 text-[color:var(--color-ink)]">{r.studentName}</td>
                                  <td className="p-3 font-mono">{r.data.sortAndClassify}</td>
                                  <td className="p-3 font-mono">{r.data.generalisationDrillXp}</td>
                                  <td className="p-3 font-mono">
                                    {r.data.mixedArenaScore}
                                    <span className="text-[color:var(--color-ink-3)] font-normal">
                                      {' '}
                                      (streak {r.data.mixedArenaBestStreak})
                                    </span>
                                  </td>
                                  <td className="p-3 font-mono">{r.data.exitChecklistComplete}</td>
                                  <td className="p-3 text-[13px] italic text-[color:var(--color-ink-2)] max-w-[320px]">
                                    "{r.data.reflectionAnswer}"
                                  </td>
                                  <td className="p-3">
                                    <button
                                      type="button"
                                      onClick={() => removeAt(globalIdx)}
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
                    </div>
                  )}
                </>
              )}

              {/* Export */}
              <div className="bg-[color:var(--color-paper)] border border-[color:var(--color-line)] rounded-md p-5 md:p-6 grid gap-3">
                <DisplayH3>
                  <Bi en="Export class results" zh="导出班级结果" />
                </DisplayH3>
                <Body>
                  <Bi
                    en="Save everything collected before you close the tab. CSV is best for Excel/Sheets; JSON preserves full detail so you can re-import into this dashboard later in the same day."
                    zh="关闭标签前请先导出。CSV 便于在 Excel/Sheets 中处理；JSON 保留完整细节可供再次导入。"
                  />
                </Body>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => downloadBlob(toCsv(records), 'text/csv', `gp0457-class-results-${dateStamp()}.csv`)}
                    className="text-[13px] font-semibold px-4 py-2 rounded-full bg-[color:var(--color-amber)] text-[color:var(--color-paper)]"
                  >
                    Download as CSV
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      downloadBlob(
                        JSON.stringify({ exportedAt: new Date().toISOString(), results: records }, null, 2),
                        'application/json',
                        `gp0457-class-results-${dateStamp()}.json`,
                      )
                    }
                    className="text-[13px] font-semibold px-4 py-2 rounded-full border border-[color:var(--color-ink-3)] text-[color:var(--color-ink)] hover:border-[color:var(--color-ink)]"
                  >
                    Download as JSON
                  </button>
                  <div className="flex-1" />
                  <button
                    type="button"
                    onClick={clearAll}
                    className="text-[13px] font-semibold px-4 py-2 rounded-full border border-[color:var(--color-ember)] text-[color:var(--color-ember)] hover:bg-[color:var(--color-ember-soft)]"
                  >
                    Clear all results
                  </button>
                </div>
              </div>
            </>
          )}

          {records.length === 0 && (
            <div className="bg-[color:var(--color-paper)] border border-[color:var(--color-line)] rounded-md p-8 text-center text-[color:var(--color-ink-3)]">
              📋 No student results added yet. Paste a code or upload a file above to get started.
            </div>
          )}

          {/* Teacher observations */}
          <div className="bg-[color:var(--color-paper)] border border-[color:var(--color-line)] rounded-md p-5 md:p-6">
            <DisplayH3>
              <Bi en="Teacher observations" zh="教师观察记录" />
            </DisplayH3>
            <Body className="mt-3">
              <Bi
                en="Jot patterns you notice across the class — misconceptions to revisit, students who need targeted support, or reflections for next lesson. Included in the Word / PDF export below."
                zh="记录你观察到的班级共性——需要复盘的误区、需要个别支持的学生，或下节课要注意的事项。将随下方 Word/PDF 导出。"
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

function SummaryStat({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone?: 'forest' | 'ember';
}) {
  const color =
    tone === 'forest'
      ? 'text-[color:var(--color-forest-deep)]'
      : tone === 'ember'
      ? 'text-[color:var(--color-ember)]'
      : 'text-[color:var(--color-ink)]';
  return (
    <div className="bg-[color:var(--color-paper)] border border-[color:var(--color-line)] rounded-md p-4">
      <p className={`font-display text-[26px] ${color}`}>{value}</p>
      <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-ink-3)]">
        {label}
      </p>
    </div>
  );
}

function collectDashboard() {
  const sections: Array<{ heading: string; blocks: any[] }> = [];
  let records: ClassRecord[] = [];
  try {
    const raw = localStorage.getItem(`wne_${TOOL_ID}_records`);
    if (raw) records = JSON.parse(raw);
  } catch {}
  let notes = '';
  try {
    notes = localStorage.getItem(`wne_${TOOL_ID}_notes`) || '';
  } catch {}

  const summary: any[] = [
    nx.p([nx.text(`Total results: ${records.length}`, { bold: true })]),
    nx.p([
      nx.text('Diagnostic: ', { bold: true }),
      nx.text(String(records.filter((r) => r.toolId === 'diagnostic').length)),
    ]),
    nx.p([
      nx.text('Statement Types: ', { bold: true }),
      nx.text(String(records.filter((r) => r.toolId === 'statement-types').length)),
    ]),
    nx.p([
      nx.text('Needs attention: ', { bold: true }),
      nx.text(String(records.filter(isFlagged).length)),
    ]),
  ];
  sections.push({ heading: 'Class summary', blocks: summary });

  if (notes) {
    sections.push({
      heading: 'Teacher observations',
      blocks: [nx.p(notes)],
    });
  }

  const diag = records.filter((r): r is DiagnosticRecord => r.toolId === 'diagnostic');
  if (diag.length) {
    const rows: any[] = [];
    diag.forEach((r) => {
      rows.push(
        nx.p([
          nx.text(`${r.studentName}: `, { bold: true }),
          nx.text(`${TRACK_META[r.data.assignedTrack].name}, diagnostic ${r.data.diagnosticScoreInWeakArea}, re-test ${r.data.retestScore}, ${r.data.improved ? 'improved ✓' : 'not yet ⚠'}`),
        ]),
      );
    });
    sections.push({ heading: 'Find Your Gap — Diagnostic', blocks: rows });
  }

  const st = records.filter((r): r is StatementTypesRecord => r.toolId === 'statement-types');
  if (st.length) {
    const rows: any[] = [];
    st.forEach((r) => {
      rows.push(nx.h(3, r.studentName));
      rows.push(
        nx.p([
          nx.text('Sort: ', { bold: true }),
          nx.text(r.data.sortAndClassify),
          nx.text(', Drill XP: '),
          nx.text(String(r.data.generalisationDrillXp)),
          nx.text(', Arena: '),
          nx.text(`${r.data.mixedArenaScore} (streak ${r.data.mixedArenaBestStreak})`),
          nx.text(', Checklist: '),
          nx.text(r.data.exitChecklistComplete),
        ]),
      );
      if (r.data.reflectionAnswer)
        rows.push(nx.p([nx.text('Reflection: ', { bold: true }), nx.text(r.data.reflectionAnswer)]));
    });
    sections.push({ heading: 'Statement Types — Reading Between the Lines', blocks: rows });
  }

  return { sections };
}
