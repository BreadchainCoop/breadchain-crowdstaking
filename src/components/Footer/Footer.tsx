import { ReactNode } from 'react';

type TProps = { children: ReactNode };

function Footer({ children }: TProps) {
  return (
    <footer>
      <div className="flex items-center justify-between px-2 py-4 text-xs text-neutral-500 md:px-4">
        {children}
      </div>
    </footer>
  );
}

export default Footer;
