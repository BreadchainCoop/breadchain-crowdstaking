import React from "react";
import { ENetwork } from "../../features/network/networkSlice";

import { appendClasses } from "../../transitions/NiceTransition";
import TextTransition from "../../transitions/TextTransition";

// !!! This isn't a nav... more like wallet display?

export const Nav: React.FC = (props) => {
  return (
    <nav className="flex flex-col md:items-end justify-center grow md:grow-0 mr-6 md:mr-0">
      {props.children}
    </nav>
  );
};

type TProps = {
  network: ENetwork;
};

export const Network: React.FC<TProps> = (props) => {
  const { network } = props;
  return (
    <span
      className={appendClasses(
        props,
        "text-xs text-center flex justify-center items-center"
      )}
    >
      <TextTransition>
        {network
          ? (() => {
              if (network === ENetwork.RINKEBY)
                return (
                  <>
                    <span className="inline-block h-5 w-5 mr-4 text-neutral-200">
                      <svg className="fill-current" viewBox="0 0 24 24">
                        <path d="M7.76 16.24A5.944 5.944 0 0 1 6 12c0-1.66.67-3.16 1.76-4.24l1.42 1.42C8.45 9.9 8 10.9 8 12c0 1.1.45 2.1 1.17 2.83l-1.41 1.41Zm8.48 0A5.944 5.944 0 0 0 18 12c0-1.66-.67-3.16-1.76-4.24l-1.42 1.42C15.55 9.9 16 10.9 16 12c0 1.1-.45 2.1-1.17 2.83l1.41 1.41ZM12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Zm8 2c0 2.21-.9 4.21-2.35 5.65l1.42 1.42A9.969 9.969 0 0 0 22 12c0-2.76-1.12-5.26-2.93-7.07l-1.42 1.42A7.94 7.94 0 0 1 20 12ZM6.35 6.35 4.93 4.93A9.969 9.969 0 0 0 2 12c0 2.76 1.12 5.26 2.93 7.07l1.42-1.42A7.94 7.94 0 0 1 4 12c0-2.21.9-4.21 2.35-5.65Z" />
                      </svg>
                    </span>
                    <span className="mt-[3px]">Rinkeby Testnet</span>
                  </>
                );
              if (network === ENetwork.POLYGON)
                return (
                  <div className="flex align-middle">
                    <span className="inline-block h-5 w-5 mr-4 text-neutral-200">
                      <svg className="fill-current" viewBox="0 0 24 24">
                        <path d="M7.76 16.24A5.944 5.944 0 0 1 6 12c0-1.66.67-3.16 1.76-4.24l1.42 1.42C8.45 9.9 8 10.9 8 12c0 1.1.45 2.1 1.17 2.83l-1.41 1.41Zm8.48 0A5.944 5.944 0 0 0 18 12c0-1.66-.67-3.16-1.76-4.24l-1.42 1.42C15.55 9.9 16 10.9 16 12c0 1.1-.45 2.1-1.17 2.83l1.41 1.41ZM12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Zm8 2c0 2.21-.9 4.21-2.35 5.65l1.42 1.42A9.969 9.969 0 0 0 22 12c0-2.76-1.12-5.26-2.93-7.07l-1.42 1.42A7.94 7.94 0 0 1 20 12ZM6.35 6.35 4.93 4.93A9.969 9.969 0 0 0 2 12c0 2.76 1.12 5.26 2.93 7.07l1.42-1.42A7.94 7.94 0 0 1 4 12c0-2.21.9-4.21 2.35-5.65Z" />
                      </svg>
                    </span>
                    <span className="mt-[3px]">Polygon</span>
                  </div>
                );

              if (network === ENetwork.UNSUPPORTED) return "Unsupported Chain";
              else {
                return "Invalid network state!";
              }
            })()
          : "Wallet Not Connected"}
      </TextTransition>
    </span>
  );
};
