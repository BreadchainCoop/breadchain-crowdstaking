import React from "react";

const AppContainer: React.FC<React.PropsWithChildren<unknown>> = ({ children }: any) => {
  return <div className="flex flex-col min-h-screen">{children}</div>;
};

export default AppContainer;
