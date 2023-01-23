import { html } from '../markdown/about.md';

function About() {
  return (
    <section
      className="m-auto px-4 pb-16 sm:px-4 md:px-6 prose prose-pink text-[18px] prose-headings:font-pressstart
       font-redhat md:prose md:prose-pink prose-invert"
      /* eslint-disable-next-line */
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
export default About;
