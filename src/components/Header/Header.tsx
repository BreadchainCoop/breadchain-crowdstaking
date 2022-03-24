import React from "react";

const Header: React.FC = ({ children }) => {
  return (
    <header className="bg-breadgray-100">
      <div className="max-w-6xl m-0 mx-auto p-2 md:p-4 grid grid-cols-3">
        {children}
      </div>
    </header>
  );
};

export default Header;
