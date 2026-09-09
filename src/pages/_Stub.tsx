import type { ReactNode } from 'react';
import { Container, DisplayH1, Body, Eyebrow } from '../components/primitives';

export function Stub({ title, note, eyebrow = 'IN PROGRESS' }: { title: ReactNode; note?: ReactNode; eyebrow?: ReactNode }) {
  return (
    <Container>
      <div className="py-24 md:py-32 max-w-[600px]">
        <Eyebrow color="amber">{eyebrow}</Eyebrow>
        <DisplayH1 className="mt-3">{title}</DisplayH1>
        {note && <Body className="mt-5 text-[color:var(--color-ink-2)]">{note}</Body>}
      </div>
    </Container>
  );
}
