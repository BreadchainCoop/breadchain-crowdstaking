import React from "react";
import { ENetwork } from "../../features/network/networkSlice";
import { useAppSelector } from "../../store/hooks";
import TextTransition from "../../transitions/TextTransition";
import * as Main from "../App/ui/Main";
import BreadchainInfo from "../BreadchainInfo/BreadchainInfo";
import ConnectWalletButton from "../ConnectWalletButton";
import * as Title from "../Header/Title";
import Swap from "../Swap";
import UnsupportedNetwork from "../UnsupportedNetwork/UnsupportedNetwork";

export const MintAndBurn: React.FC = () => {
  const { network, wallet } = useAppSelector((state) => state);
  return (
    <>
      <Title.MainTitle>
        <Title.H1>
          <TextTransition>BREADCHAIN</TextTransition>
        </Title.H1>
        <Title.H2>
          <TextTransition>Crowdstaking</TextTransition>
        </Title.H2>
      </Title.MainTitle>
      {(() => {
        if (network && network.network === ENetwork.UNSUPPORTED)
          return (
            <>
              <Main.Inner>
                <UnsupportedNetwork />
              </Main.Inner>
              <BreadchainInfo />
            </>
          );
        if (wallet.address)
          return (
            <>
              <Main.Inner>
                <Swap />
              </Main.Inner>
              <BreadchainInfo />
            </>
          );
        return (
          <>
            <Main.Inner>
              <ConnectWalletButton />
            </Main.Inner>
            <BreadchainInfo />
          </>
        );
      })()}

      {/* {wallet.address && <Transactions />} */}
    </>
  );
};

export default MintAndBurn;
