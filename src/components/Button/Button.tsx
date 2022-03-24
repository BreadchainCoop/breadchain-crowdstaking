import React from "react";

type TProps = {
  // variant?: EButtonVariant;
  onClick: (event: React.MouseEvent) => void;
};

const Button: React.FC<TProps> = (props) => {
  const { children } = props;
  let classList =
    "px-3 py-2 text-sm button-gradient bg-opacity-95 text-neutral-900 hover:bg-opacity-100";
  return (
    <button className={classList} {...props}>
      {children}
    </button>
  );
};

export default Button;
