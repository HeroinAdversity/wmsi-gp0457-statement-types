import { useEffect, useRef, useState } from 'react';

/* ============================================================
   Bridge between React pages and the vanilla WMSI_Notes module
   loaded from /notes-export.js in index.html.
   ============================================================ */

export interface Run {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  highlight?: boolean;
}
export type Block =
  | { type: 'p'; runs: Run[] }
  | { type: 'h2' | 'h3'; runs: Run[] }
  | { type: 'ul' | 'ol'; items: Run[][] };
export interface Section { heading: string; blocks: Block[] }
export interface Workbook { sections: Section[] }

export interface NotesPageConfig {
  toolId: string;
  pageTitleEn: string;
  pageTitleZh?: string;
  subtitleEn?: string;
  filenameStem: string;
  studentNameSelector?: string;
  exportDocxSelector?: string;
  exportPdfSelector?: string;
  openNotesSelector?: string;
  collect: () => Workbook;
}

interface WmsiNotesApi {
  install: () => void;
  setPage: (cfg: NotesPageConfig) => void;
  text: (s: string, opts?: Partial<Run>) => Run;
  p: (x: string | Run[] | Run) => Block;
  h: (level: 2 | 3, x: string | Run[] | Run) => Block;
  ul: (items: Array<string | Run[] | Run>) => Block;
  ol: (items: Array<string | Run[] | Run>) => Block;
  openPanel: () => void;
  exportDocx: () => void;
  exportPdf: () => void;
  loadField: (key: string) => string | null;
  saveField: (key: string, value: string) => void;
}

declare global {
  interface Window {
    WMSI_Notes?: WmsiNotesApi;
  }
}

/**
 * Attach a page-specific notes + Word/PDF export configuration.
 *
 * `collect` is a stable function that is called at export time and should
 * read the LATEST state via a ref you keep updated across renders. Pass a
 * function that does not close over stale state values.
 */
export function useNotesExport(config: NotesPageConfig): void {
  // Pin the config in a ref so collect() always sees the latest closure.
  const cfgRef = useRef(config);
  cfgRef.current = config;

  useEffect(() => {
    let cancelled = false;
    const waitAndSetup = () => {
      if (cancelled) return;
      const w = window.WMSI_Notes;
      if (!w) { setTimeout(waitAndSetup, 40); return; }
      w.setPage({
        ...cfgRef.current,
        // wrap collect so it always calls through the ref
        collect: () => cfgRef.current.collect(),
      });
    };
    waitAndSetup();
    return () => { cancelled = true; };
    // Intentionally empty deps — collect() is proxied through cfgRef.current
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.toolId]);
}

/**
 * Small helpers exposed for building blocks in a page's collect().
 * All are simple wrappers that fall through to window.WMSI_Notes at call time.
 */
export const nx = {
  text(str: string, opts?: Partial<Run>): Run {
    return {
      text: str ?? '',
      bold: !!opts?.bold,
      italic: !!opts?.italic,
      underline: !!opts?.underline,
      highlight: !!opts?.highlight,
    };
  },
  p(x: string | Run[] | Run): Block {
    const runs = Array.isArray(x) ? x : [typeof x === 'string' ? nx.text(x) : x];
    return { type: 'p', runs };
  },
  h(level: 2 | 3, x: string | Run[] | Run): Block {
    const runs = Array.isArray(x) ? x : [typeof x === 'string' ? nx.text(x) : x];
    return { type: level === 3 ? 'h3' : 'h2', runs };
  },
  ul(items: Array<string | Run[] | Run>): Block {
    return {
      type: 'ul',
      items: items.map((it) => (Array.isArray(it) ? it : [typeof it === 'string' ? nx.text(it) : it])),
    };
  },
  ol(items: Array<string | Run[] | Run>): Block {
    return {
      type: 'ol',
      items: items.map((it) => (Array.isArray(it) ? it : [typeof it === 'string' ? nx.text(it) : it])),
    };
  },
};

/**
 * Small per-key localStorage hook. Reads once on mount, saves on every set.
 * Storage is namespaced by `wne_<toolId>_<key>` — same convention the vanilla
 * module uses, so notes and per-field state stay together per lesson.
 */
export function usePersistentState<T>(
  toolId: string,
  key: string,
  initial: T,
  parse: (raw: string) => T = (raw) => JSON.parse(raw) as T,
  serialize: (value: T) => string = (value) => JSON.stringify(value),
): [T, (v: T | ((prev: T) => T)) => void] {
  const storageKey = `wne_${toolId}_${key}`;
  const [value, setValueState] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw !== null) return parse(raw);
    } catch { /* storage disabled */ }
    return initial;
  });
  const setValue = (v: T | ((prev: T) => T)) => {
    setValueState((prev: T) => {
      const next = typeof v === 'function' ? (v as (p: T) => T)(prev) : v;
      try { localStorage.setItem(storageKey, serialize(next)); } catch {}
      return next;
    });
  };
  return [value, setValue];
}
