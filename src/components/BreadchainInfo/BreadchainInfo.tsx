import React from "react";

import ReactMarkdown from "react-markdown";

import markdown from "../../info";

const BreadchainInfo: React.FC = () => {
  return (
    <section className="prose prose-sm prose-pink md:prose md:prose-pink prose-invert max-w-4xl m-auto px-4 py-16 sm:px-4 md:px-6">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </section>
  );
};

export default BreadchainInfo;
