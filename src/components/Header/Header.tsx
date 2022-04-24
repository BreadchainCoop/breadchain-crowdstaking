import React from "react";

const Header: React.FC = ({ children }) => {
  return (
    <header className="bg-breadgray-100">
      <div className="max-w-6xl m-0 mx-auto px-4 py-4 md:p-4 flex md:grid md:grid-cols-3">
        {children}
      </div>
    </header>
  );
};

export default Header;
