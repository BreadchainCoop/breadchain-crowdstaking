import React from "react";

const Header: React.FC = ({ children }) => {
  return (
    <header className="bg-breadgray-100">
      <div className="max-w-6xl m-0 mx-auto p-6 md:px-8 flex h-24">
        {children}
      </div>
    </header>
  );
};

export default Header;
