import ReactMarkdown from 'react-markdown';

import markdown from '../../info';

function BreadchainInfo() {
  return (
    <section className="prose prose-pink font-redhat md:prose md:prose-pink prose-invert  m-auto px-4 pb-16 sm:px-4 md:px-6">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </section>
  );
}
export default BreadchainInfo;
