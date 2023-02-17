import Prose from '../components/Prose/Prose';
import * as SiteTitle from '../components/SiteTitle/SiteTitle';
import { html } from '../markdown/about.md';

function About() {
  return (
    <>
      <SiteTitle.Title>
        <SiteTitle.H1>About</SiteTitle.H1>
      </SiteTitle.Title>
      <Prose html={html} />;
    </>
  );
}

export default About;
