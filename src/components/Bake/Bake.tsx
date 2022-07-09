import React from "react";
import { useAccount } from "wagmi";
import { useValidatedWalletConnection } from "../../hooks/useValidatedWalletConnection";
import * as Main from "../App/ui/Main";
import ConnectWalletButton from "../ConnectWalletButton";
import Swap from "../Swap";

export const Bake: React.FC = () => {
  const { data: accountData } = useAccount();
  const { configuration, unsupportedChain, activeChain, activeConnector } =
    useValidatedWalletConnection();

  if (!activeConnector || !activeChain || !accountData?.address) {
    return (
      <>
        <Main.Inner>
          <ConnectWalletButton />
        </Main.Inner>
      </>
    );
  }

  if (unsupportedChain)
    return <>Unsupported network, please switch to a supported chain</>;
  if (!configuration)
    throw new Error(`Missing chainId ${activeChain.id} at config.ts`);

  return (
    <>
      <Main.Inner>
        <Swap
          chainConfig={configuration}
          accountAddress={accountData.address}
        />
      </Main.Inner>
    </>
  );
};

export default Bake;
