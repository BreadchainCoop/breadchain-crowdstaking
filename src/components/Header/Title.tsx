import React from "react";

export const Title: React.FC = (props) => {
  return <div className="py-1 flex flex-col">{props.children}</div>;
};

export const HeaderTitle: React.FC = (props) => {
  return (
    <div className="hidden py-1 md:flex flex-col text-center grow">
      {props.children}
    </div>
  );
};

export const MainTitle: React.FC = (props) => {
  return (
    <div className="mt-16 py-1 flex flex-col text-center md:hidden">
      {props.children}
    </div>
  );
};

export const H1: React.FC = (props) => (
  <h1 className="uppercase text-2xl">{props.children}</h1>
);

export const H2: React.FC = (props) => (
  <h2 className="uppercase text-1xl">{props.children}</h2>
);
