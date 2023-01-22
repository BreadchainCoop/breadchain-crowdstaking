import { html } from '../markdown/about.md';

function About() {
  return (
    <section
      className="prose prose-pink font-redhat md:prose md:prose-pink prose-invert  m-auto px-4 pb-16 sm:px-4 md:px-6"
      /* eslint-disable-next-line */
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
export default About;
