import React from "react";

export const MobileNavigation: React.FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <section className="fixed right-0 h-screen w-10/12 bg-neutral-900 p-4">
      <nav></nav>
    </section>
  );
};

export default MobileNavigation;
