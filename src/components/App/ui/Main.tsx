import React from "react";

export const Inner: React.FC = (props) => {
  return (
    <div className="m-auto w-full max-w-[490px] px-3 sm:px-4 py-16 md:px-6 flex flex-col items-center">
      {props.children}
    </div>
  );
};

export const Main: React.FC = ({ children }) => {
  return <main className="w-full flex-grow">{children}</main>;
};
