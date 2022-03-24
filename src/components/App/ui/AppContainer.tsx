import React from "react";

const AppContainer: React.FC = ({ children }) => {
  return <div className="flex flex-col min-h-screen">{children}</div>;
};

export default AppContainer;
