import Prose from '../components/Prose/Prose';
import * as SiteTitle from '../components/SiteTitle/SiteTitle';
import { html } from '../markdown/faq.md';

function FAQ() {
  return (
    <>
      <SiteTitle.Title>
        <SiteTitle.H1>FAQ</SiteTitle.H1>
      </SiteTitle.Title>
      <Prose html={html} />;
    </>
  );
}

export default FAQ;
