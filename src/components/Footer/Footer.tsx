import React from "react";

const Footer: React.FC = ({ children }) => {
  return (
    <footer className="">
      <div className="max-w-6xl m-auto px-2 py-4 md:px-4 text-xs text-neutral-500">
        <span>{children}</span>
      </div>
    </footer>
  );
};

export default Footer;
