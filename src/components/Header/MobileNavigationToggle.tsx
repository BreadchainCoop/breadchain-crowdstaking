import React from "react";

const MobileNavigationToggle: React.FC = () => {
  return (
    <div className="flex justify-end md:hidden">
      <button className="text-neutral-600 p-1 h-10 w-10 fill">
        <svg className="fill-current" viewBox="0 0 24 24">
          <path d="M3 18h18v-2H3v2Zm0-5h18v-2H3v2Zm0-7v2h18V6H3Z" />
        </svg>
      </button>
    </div>
  );
};

export default MobileNavigationToggle;
