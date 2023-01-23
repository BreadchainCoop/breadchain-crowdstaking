import { html } from '../markdown/about.md';

function About() {
  //
  // COMMENT what is this?
  return (
    <section
      className="prose prose-invert prose-pink m-auto px-4 pb-16 font-redhat text-[18px] prose-headings:font-pressstart
       sm:px-4 md:px-6 md:prose md:prose-pink"
      /* eslint-disable-next-line */
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default About;
