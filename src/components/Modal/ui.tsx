export const Container: React.FC = (props) => (
  <section className="z-10 fixed h-screen w-screen bg-breadgray-200 bg-opacity-95 p-4 flex justify-center items-center">
    {props.children}
  </section>
);

export const Inner: React.FC = (props) => (
  <section className="bg-neutral-900 bg-opacity-100 p-16 pt-14 rounded relative">
    {props.children}
  </section>
);

export const Heading: React.FC = (props) => (
  <h2 className="text-2xl">{props.children}</h2>
);

export const Message: React.FC = (props) => (
  <p className="text-sm mt-12">{props.children}</p>
);
