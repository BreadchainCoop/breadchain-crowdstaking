import { ReactNode } from 'react';

function AppContainer({ children }: { children: ReactNode }) {
  return <div className="flex flex-col min-h-screen">{children}</div>;
}

export default AppContainer;
