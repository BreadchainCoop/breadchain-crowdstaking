import { ReactNode } from 'react';

export function PanelHeader({ children }: { children: ReactNode }) { return <div className="mb-6 sm:mb-8">{children}</div>; }

export function PanelContent({ children }: { children: ReactNode }) { return <div className="flex items-center">{children}</div>; }

type TBalanceProps = {
  children: ReactNode
  onClick: () => void;
};

export function PanelBalanceButton({ onClick, children }: TBalanceProps) {
  return (
    <button
      type="button"
      className="text-xs sm:text-sm pb-3 hover:underline hover:text-white"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function PanelBalance({ children }: { children: ReactNode }) {
  return (
    <span className="text-xs sm:text-sm pb-3 inline-block">
      {children}
    </span>
  );
}

export function PanelContainer({ children }: { children: ReactNode }) {
  return (
    <div className="bg-breadgray-100 text-gray-300 w-full px-6 py-4 sm:px-8 sm:py-6">
      {children}
    </div>
  );
}
