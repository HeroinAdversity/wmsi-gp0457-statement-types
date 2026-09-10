import type { ReactNode, HTMLAttributes } from 'react';

/* ─────────── Container ─────────── */
export function Container({
  children,
  className = '',
  size = 'default',
}: {
  children: ReactNode;
  className?: string;
  size?: 'narrow' | 'default' | 'wide';
}) {
  const max = size === 'narrow' ? 'max-w-[780px]' : size === 'wide' ? 'max-w-[1180px]' : 'max-w-[980px]';
  return <div className={`${max} mx-auto px-5 md:px-8 ${className}`}>{children}</div>;
}

/* ─────────── Section ─────────── */
export function Section({
  children,
  className = '',
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-14 md:py-20 ${className}`}>
      {children}
    </section>
  );
}

/* ─────────── Eyebrow ─────────── */
export function Eyebrow({
  children,
  color = 'cobalt',
  className = '',
}: {
  children: ReactNode;
  color?: 'cobalt' | 'ember' | 'forest' | 'amber' | 'violet' | 'ink';
  className?: string;
}) {
  const colors: Record<string, string> = {
    cobalt: 'text-[color:var(--color-cobalt)]',
    ember: 'text-[color:var(--color-ember)]',
    forest: 'text-[color:var(--color-forest)]',
    amber: 'text-[color:var(--color-amber)]',
    violet: 'text-[color:var(--color-violet)]',
    ink: 'text-[color:var(--color-ink-2)]',
  };
  return (
    <p
      className={`font-mono text-[11px] font-semibold uppercase tracking-[0.18em] ${colors[color]} ${className}`}
    >
      {children}
    </p>
  );
}

/* ─────────── Display headings ─────────── */
export function DisplayH1({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <h1
      className={`font-display text-[clamp(38px,5.5vw,64px)] leading-[1.1] tracking-[-0.02em] text-[color:var(--color-ink)] balance ${className}`}
    >
      {children}
    </h1>
  );
}

export function DisplayH2({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={`font-display text-[clamp(28px,3.6vw,42px)] leading-[1.18] tracking-[-0.015em] text-[color:var(--color-ink)] balance ${className}`}
    >
      {children}
    </h2>
  );
}

export function DisplayH3({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <h3
      className={`font-display text-[clamp(20px,2.2vw,26px)] leading-[1.25] text-[color:var(--color-ink)] balance ${className}`}
    >
      {children}
    </h3>
  );
}

/* ─────────── Lede / body prose ─────────── */
export function Lede({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={`text-[17px] md:text-[18px] leading-[1.7] text-[color:var(--color-ink-2)] max-w-[62ch] pretty ${className}`}
    >
      {children}
    </p>
  );
}

export function Body({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-[15.5px] leading-[1.75] text-[color:var(--color-ink)] max-w-[65ch] pretty ${className}`}>
      {children}
    </p>
  );
}

/* ─────────── Prose container (for long rich text) ─────────── */
export function Prose({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`text-[15.5px] leading-[1.65] text-[color:var(--color-ink)] max-w-[65ch] pretty [&>p]:mb-4 [&>p:last-child]:mb-0 [&_strong]:font-semibold [&_em]:italic ${className}`}
    >
      {children}
    </div>
  );
}

/* ─────────── Card ─────────── */
export function Card({
  children,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'article' | 'section';
}) {
  return (
    <Tag
      className={`bg-white/60 backdrop-blur-[2px] border border-[color:var(--color-line)] rounded-[6px] p-6 md:p-7 ${className}`}
    >
      {children}
    </Tag>
  );
}

/* ─────────── Callout (for warnings, exam tips, cultural notes) ─────────── */
export function Callout({
  children,
  tone = 'cobalt',
  eyebrow,
  className = '',
}: {
  children: ReactNode;
  tone?: 'cobalt' | 'ember' | 'forest' | 'amber' | 'violet';
  eyebrow?: ReactNode;
  className?: string;
}) {
  const map: Record<string, { bar: string; text: string }> = {
    cobalt: {
      bar: 'border-l-[color:var(--color-cobalt)]',
      text: 'text-[color:var(--color-cobalt-deep)]',
    },
    ember: {
      bar: 'border-l-[color:var(--color-ember)]',
      text: 'text-[color:var(--color-ember)]',
    },
    forest: {
      bar: 'border-l-[color:var(--color-forest)]',
      text: 'text-[color:var(--color-forest)]',
    },
    amber: {
      bar: 'border-l-[color:var(--color-amber)]',
      text: 'text-[color:var(--color-amber)]',
    },
    violet: {
      bar: 'border-l-[color:var(--color-violet)]',
      text: 'text-[color:var(--color-violet)]',
    },
  };
  const t = map[tone];
  return (
    <aside
      className={`bg-[color:var(--color-paper-2)] border-l-[3px] ${t.bar} px-5 py-4 md:px-6 md:py-5 rounded-r-[4px] ${className}`}
    >
      {eyebrow && (
        <p className={`font-mono text-[11px] font-semibold uppercase tracking-[0.18em] mb-2 ${t.text}`}>
          {eyebrow}
        </p>
      )}
      <div className="text-[15px] leading-[1.6] text-[color:var(--color-ink)] pretty">{children}</div>
    </aside>
  );
}

/* ─────────── Buttons ─────────── */
type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  disabled,
  ...rest
}: ButtonProps & { children: ReactNode }) {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200 whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed';
  const sizes = {
    sm: 'text-[13px] px-4 py-2',
    md: 'text-[14px] px-5 py-2.5',
  };
  const variants = {
    primary:
      'bg-[color:var(--color-ink)] text-[color:var(--color-paper)] hover:bg-[color:var(--color-cobalt)] active:translate-y-[1px]',
    secondary:
      'bg-[color:var(--color-paper-2)] text-[color:var(--color-ink)] border border-[color:var(--color-line)] hover:border-[color:var(--color-ink)] active:translate-y-[1px]',
    ghost:
      'bg-transparent text-[color:var(--color-ink-2)] hover:text-[color:var(--color-ink)] hover:bg-[color:var(--color-paper-2)]',
  };
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

/* ─────────── Chip / tag ─────────── */
export function Chip({
  children,
  color = 'ink',
  className = '',
}: {
  children: ReactNode;
  color?: 'ink' | 'cobalt' | 'ember' | 'forest' | 'amber' | 'violet';
  className?: string;
}) {
  const map: Record<string, string> = {
    ink: 'bg-[color:var(--color-paper-2)] text-[color:var(--color-ink)]',
    cobalt: 'bg-[color:var(--color-cobalt-soft)] text-[color:var(--color-cobalt-deep)]',
    ember: 'bg-[color:var(--color-ember-soft)] text-[color:var(--color-ember)]',
    forest: 'bg-[color:var(--color-forest-soft)] text-[color:var(--color-forest)]',
    amber: 'bg-[color:var(--color-amber-soft)] text-[color:var(--color-amber)]',
    violet: 'bg-[color:var(--color-violet-soft)] text-[color:var(--color-violet)]',
  };
  return (
    <span
      className={`inline-flex items-center font-mono text-[11px] font-semibold uppercase tracking-[0.1em] px-2.5 py-1 rounded-full ${map[color]} ${className}`}
    >
      {children}
    </span>
  );
}
