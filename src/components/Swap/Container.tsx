import React from "react";

const Container: React.FC = (props) => {
  return (
    <div className="m-auto w-full sm:w-[460px] px-3 sm:px-4 py-16 lg:py-32 md:px-6 flex flex-col items-center">
      {props.children}
    </div>
  );
};

export default Container;
