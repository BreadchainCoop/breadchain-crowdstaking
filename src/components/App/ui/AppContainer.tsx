import { ReactNode } from 'react';

function AppContainer({ children }: { children: ReactNode }) {
  return <div className="flex min-h-screen flex-col">{children}</div>;
}

export default AppContainer;
