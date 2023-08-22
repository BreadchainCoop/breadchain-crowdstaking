import { ReactNode } from 'react';

export function PanelHeader({ children }: { children: ReactNode }) {
  return <div className="mb-6 sm:mb-8">{children}</div>;
}

export function PanelContent({ children }: { children: ReactNode }) {
  return <div className="flex items-center">{children}</div>;
}

type TBalanceProps = {
  children: ReactNode;
  onClick: () => void;
};

export function PanelBalanceButton({ onClick, children }: TBalanceProps) {
  return (
    <button
      type="button"
      className="pb-3 text-xs hover:text-white hover:underline sm:text-sm"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function PanelBalance({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block pb-3 text-xs sm:text-sm">{children}</span>
  );
}

export function PanelContainer({ children }: { children: ReactNode }) {
  return (
    <div className="w-full bg-breadgray-og-dark px-6 py-4 text-gray-300 sm:px-8 sm:py-6">
      {children}
    </div>
  );
}
