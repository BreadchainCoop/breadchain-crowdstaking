import React from "react";

const Header: React.FC<React.PropsWithChildren<unknown>> = ({ children }: any) => {
  return <div className="mb-2">{children}</div>;
};

const Content: React.FC<React.PropsWithChildren<unknown>> = ({ children }: any) => {
  return <div className="flex items-center">{children}</div>;
};

type TBalanceProps = {
  onClick?: () => void;
};

const BalanceButton: React.FC<React.PropsWithChildren<TBalanceProps>> = (props: any) => {
  return (
    <button
      className="text-xs sm:text-sm p-3 hover:underline hover:text-white"
      {...props}
    >
      {props.children}
    </button>
  );
};

const Balance: React.FC<React.PropsWithChildren<unknown>> = (props: any) => {
  return (
    <span className="text-xs sm:text-sm p-3 inline-block" {...props}>
      {props.children}
    </span>
  );
};

const TokenDisplay: React.FC<React.PropsWithChildren<unknown>> & {
  Header: typeof Header;
  Content: typeof Content;
  Balance: typeof Balance;
  BalanceButton: typeof BalanceButton;
} = (props: any) => {
  return (
    <div className="bg-breadgray-100 text-gray-300 w-full p-2 pr-4 pb-4 sm:p-4 sm:pb-8 sm:pr-8">
      {props.children}
    </div>
  );
};

TokenDisplay.Header = Header;
TokenDisplay.Content = Content;
TokenDisplay.Balance = Balance;
TokenDisplay.BalanceButton = BalanceButton;

export default TokenDisplay;
