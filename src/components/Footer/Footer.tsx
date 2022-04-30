import React from "react";

const Footer: React.FC = ({ children }) => {
  return (
    <footer className="">
      <div className="px-2 py-4 md:px-4 flex justify-between items-center text-xs text-neutral-500">
        {children}
      </div>
    </footer>
  );
};

export default Footer;
