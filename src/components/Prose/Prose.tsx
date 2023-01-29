interface IProps {
  html: string;
}

export default function Prose({ html }: IProps) {
  return (
    <section
      className="prose prose-invert m-auto px-4 pb-16 font-redhat text-[18px] prose-headings:font-pressstart
       sm:px-4 md:px-6 "
      /* eslint-disable-next-line */
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
