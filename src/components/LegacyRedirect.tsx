import { useEffect } from 'react';
import { Container, DisplayH2, Body, Eyebrow, Button } from './primitives';
import { Bi } from '../lib/LanguageContext';

/**
 * A page that immediately redirects to the given legacy HTML path,
 * and shows a fallback link if the redirect is blocked or the user's back button lands here.
 */
export function LegacyRedirect({ to, title }: { to: string; title: React.ReactNode }) {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);

  return (
    <Container>
      <div className="py-24 md:py-32 max-w-[560px]">
        <Eyebrow color="amber">
          <Bi en="Opening…" zh="正在打开……" />
        </Eyebrow>
        <DisplayH2 className="mt-3">{title}</DisplayH2>
        <Body className="mt-5">
          <Bi
            en="If the page doesn't open automatically, tap below."
            zh="如果页面没有自动打开，请点击下方按钮。"
          />
        </Body>
        <div className="mt-6">
          <a href={to}>
            <Button variant="primary">
              <Bi en="Open the tool →" zh="打开工具 →" />
            </Button>
          </a>
        </div>
      </div>
    </Container>
  );
}
