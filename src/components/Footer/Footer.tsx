import { ReactNode } from 'react';
import FooterNav from '../FooterNav';
import PantryLink from '../PantryLink/PantryLink';

function Container({ children }: { children: ReactNode }) {
  return (
    <div className="relative mt-16 flex flex-col items-center justify-center px-2 py-12  md:px-4">
      {children}
    </div>
  );
}

function Footer() {
  return (
    <Container>
      <PantryLink />
      <FooterNav />
    </Container>
  );
}

export default Footer;
