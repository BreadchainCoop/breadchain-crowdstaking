import React from "react";

export const Title: React.FC<React.PropsWithChildren<unknown>> = (props) => {
  return (
    <div className="pt-16 sm:pt-32 sm:pb-16 flex flex-col text-center">
      {props.children}
    </div>
  );
};

export const H1: React.FC<React.PropsWithChildren<unknown>> = (props) => (
  <h1 className="uppercase text-2xl sm:text-5xl mb-1 md:mb-2">
    {props.children}
  </h1>
);

export const H2: React.FC<React.PropsWithChildren<unknown>> = (props) => (
  <h2 className="uppercase text-1xl sm:text-2xl">{props.children}</h2>
);

const SiteTitle: React.FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <Title>
      <H1>BREADCHAIN</H1>
      <H2>Crowdstaking</H2>
    </Title>
  );
};

export default SiteTitle;
