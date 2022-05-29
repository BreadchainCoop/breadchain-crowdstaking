import React from "react";

const Header: React.FC = ({ children }) => {
  return (
    <header className="bg-breadgray-100">
      <div className="max-w-6xl m-0 mx-auto p-4 md:p-8 flex">{children}</div>
    </header>
  );
};

export default Header;
