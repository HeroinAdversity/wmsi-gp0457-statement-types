/* Types + decode/CSV helpers for the Statement Types teacher dashboard.
   Preserves the legacy envelope format so teachers can paste/upload the
   same result codes their students still generate. */

export type ToolId = 'diagnostic' | 'statement-types';

export interface EnvelopeBase<T extends ToolId, D> {
  toolId: T;
  studentName: string;
  timestamp: string;
  data: D;
}

export interface DiagnosticData {
  assignedTrack: 'generalisation' | 'pairs' | 'context';
  diagnosticScoreInWeakArea: string; // e.g. "2/4"
  retestScore: string; // e.g. "3/3"
  improved: boolean;
}

export interface StatementTypesData {
  sortAndClassify: string; // e.g. "8/10"
  generalisationDrillXp: string | number;
  mixedArenaScore: string | number;
  mixedArenaBestStreak: string | number;
  exitChecklistComplete: string; // e.g. "5/7"
  reflectionAnswer: string;
}

export type DiagnosticRecord = EnvelopeBase<'diagnostic', DiagnosticData>;
export type StatementTypesRecord = EnvelopeBase<'statement-types', StatementTypesData>;
export type ClassRecord = DiagnosticRecord | StatementTypesRecord;

export const TRACK_META: Record<
  DiagnosticData['assignedTrack'],
  { name: string; tone: 'amber' | 'cobalt' | 'violet' }
> = {
  generalisation: { name: 'Generalisation', tone: 'amber' },
  pairs: { name: 'Confusable Pairs', tone: 'cobalt' },
  context: { name: 'Context Clues', tone: 'violet' },
};

export function decodeEnvelope(code: string): { ok: true; record: ClassRecord } | { ok: false; error: string } {
  try {
    const json = decodeURIComponent(escape(atob(code.trim())));
    const record = JSON.parse(json);
    if (!record.toolId || !record.studentName || !record.data) {
      throw new Error('Missing required fields');
    }
    if (record.toolId !== 'diagnostic' && record.toolId !== 'statement-types') {
      throw new Error('Unrecognised tool ID — this code may be from a different resource');
    }
    return { ok: true, record: record as ClassRecord };
  } catch (e: any) {
    return { ok: false, error: e?.message || 'Could not decode code' };
  }
}

export function decodeJsonFile(text: string): { ok: true; record: ClassRecord } | { ok: false; error: string } {
  try {
    const record = JSON.parse(text);
    if (!record.toolId || !record.studentName || !record.data) {
      throw new Error('Missing required fields');
    }
    if (record.toolId !== 'diagnostic' && record.toolId !== 'statement-types') {
      throw new Error('Unrecognised tool ID');
    }
    return { ok: true, record: record as ClassRecord };
  } catch (e: any) {
    return { ok: false, error: e?.message || 'Could not read JSON' };
  }
}

export function isFlagged(record: ClassRecord): boolean {
  if (record.toolId === 'diagnostic') return record.data.improved === false;
  if (record.toolId === 'statement-types') {
    const [sortCorrect, sortTotal] = record.data.sortAndClassify.split('/').map(Number);
    const [checklistDone, checklistTotal] = record.data.exitChecklistComplete.split('/').map(Number);
    return (
      (sortTotal > 0 && sortCorrect / sortTotal < 0.5) ||
      (checklistTotal > 0 && checklistDone / checklistTotal < 0.5)
    );
  }
  return false;
}

export function toCsv(records: ClassRecord[]): string {
  const rows: string[][] = [[
    'Student Name',
    'Tool',
    'Timestamp',
    'Weakest Area / Category',
    'Score 1',
    'Score 2',
    'Score 3',
    'Flag',
    'Notes',
  ]];
  records.forEach((r) => {
    if (r.toolId === 'diagnostic') {
      rows.push([
        r.studentName,
        'Diagnostic (Find Your Gap)',
        r.timestamp,
        TRACK_META[r.data.assignedTrack]?.name || r.data.assignedTrack,
        r.data.diagnosticScoreInWeakArea,
        r.data.retestScore,
        '',
        r.data.improved ? 'OK' : 'NEEDS ATTENTION',
        '',
      ]);
    } else {
      rows.push([
        r.studentName,
        'Statement Types (Reading Between the Lines)',
        r.timestamp,
        '',
        r.data.sortAndClassify,
        String(r.data.generalisationDrillXp),
        String(r.data.mixedArenaScore),
        isFlagged(r) ? 'NEEDS ATTENTION' : 'OK',
        r.data.reflectionAnswer,
      ]);
    }
  });
  return rows
    .map((row) => row.map((cell) => `"${String(cell ?? '').replace(/"/g, '""')}"`).join(','))
    .join('\n');
}

export function dateStamp(): string {
  return new Date().toISOString().split('T')[0];
}

export function downloadBlob(content: string, mimeType: string, filename: string): void {
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
