import { Link } from 'react-router-dom';
import { Container, DisplayH1, Body, Button, Eyebrow } from '../components/primitives';
import { Bi } from '../lib/LanguageContext';

export function NotFoundPage() {
  return (
    <Container>
      <div className="py-24 md:py-32 max-w-[560px]">
        <Eyebrow color="ember">404</Eyebrow>
        <DisplayH1 className="mt-3">
          <Bi en="Page not found." zh="页面未找到。" />
        </DisplayH1>
        <Body className="mt-5">
          <Bi
            en="The page you're looking for isn't here. It may have been moved during the site's port from static HTML to React."
            zh="您所查找的页面不在此处。可能在网站从静态 HTML 移植到 React 的过程中被移动。"
          />
        </Body>
        <div className="mt-8">
          <Link to="/">
            <Button variant="primary">
              <Bi en="← Back to home" zh="← 返回首页" />
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}
