import { ReactNode } from 'react';

import * as Main from '../App/ui/Main';
import SiteTitle from '../SiteTitle/SiteTitle';

function BakeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteTitle />
      <Main.Inner>{children}</Main.Inner>
    </>
  );
}

export default BakeLayout;
