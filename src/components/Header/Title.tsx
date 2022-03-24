import React from "react";

export const Title: React.FC = (props) => {
  return <div className="py-1 flex flex-col">{props.children}</div>;
};

export const H1: React.FC = (props) => (
  <h1 className="uppercase text-2xl text-center">{props.children}</h1>
);

export const H2: React.FC = (props) => (
  <h2 className="uppercase text-1xl text-center">{props.children}</h2>
);
