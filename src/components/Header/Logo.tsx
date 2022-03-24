import React from "react";

export const Logo: React.FC = (props) => {
  return (
    <div className="flex items-center">
      <span className="text-breadpink-200">{props.children}</span>
    </div>
  );
};

export default Logo;
