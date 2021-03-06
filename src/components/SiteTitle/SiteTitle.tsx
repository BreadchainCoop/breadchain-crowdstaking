import React from "react";
import TextTransition from "../../transitions/TextTransition";

export const Title: React.FC = (props) => {
  return (
    <div className="pt-16 sm:pt-32 sm:pb-16 flex flex-col text-center">
      {props.children}
    </div>
  );
};

export const H1: React.FC = (props) => (
  <h1 className="uppercase text-2xl sm:text-5xl mb-1 md:mb-2">
    {props.children}
  </h1>
);

export const H2: React.FC = (props) => (
  <h2 className="uppercase text-1xl sm:text-2xl">{props.children}</h2>
);

const SiteTitle: React.FC = () => {
  return (
    <Title>
      <H1>
        <TextTransition>BREADCHAIN</TextTransition>
      </H1>
      <H2>
        <TextTransition>Crowdstaking</TextTransition>
      </H2>
    </Title>
  );
};

export default SiteTitle;
