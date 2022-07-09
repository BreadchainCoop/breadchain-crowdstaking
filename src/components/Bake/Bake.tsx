import React from "react";
import { useAccount, useConnect, useNetwork, useProvider } from "wagmi";
import { getAllowance } from "../../api";
import config from "../../config";
import {
  setApprovalLoading,
  setApproved,
  setNotApproved,
} from "../../features/approval/approvalSlice";
import { ENetwork } from "../../features/network/networkSlice";
import { EToastType, setToast } from "../../features/toast/toastSlice";
import { getBalances } from "../../features/wallet/walletSlice";
import { useChainConfig } from "../../hooks/useChainConfig";
import { useValidatedWalletConnection } from "../../hooks/useValidatedWalletConnection";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import * as Main from "../App/ui/Main";
import ConnectWalletButton from "../ConnectWalletButton";
import Swap from "../Swap";
import UnsupportedNetwork from "../UnsupportedNetwork/UnsupportedNetwork";

export const Bake: React.FC = () => {
  const { data: accountData } = useAccount();
  const { configuration, unsupportedChain, activeChain, activeConnector } =
    useValidatedWalletConnection();

  // const { approval } = useAppSelector((state) => state);
  // const dispatch = useAppDispatch();

  // React.useEffect(() => {
  //   (async () => {
  //     if (!activeConnector) return;
  //     if (!accountData?.address) return;
  //     if (!activeChain || activeChain.unsupported || !activeConnector) return;

  //     const provider = await activeConnector.getProvider();

  //     const { BREAD, DAI } = config[activeChain.id];
  //     dispatch(getBalances({}));

  //     console.log("bake.tsx useEffect", approval);
  //     if (approval.status !== null) return;
  //     dispatch(setApprovalLoading());
  //     const allowance = await getAllowance(
  //       DAI.address,
  //       accountData?.address,
  //       BREAD.address,
  //       provider,
  //       dispatch
  //     );

  //     console.log("allowance fetched", allowance);

  //     if (!allowance) {
  //       dispatch(
  //         setToast({
  //           type: EToastType.ERROR,
  //           message: "Failed to get allowance!",
  //         })
  //       );
  //       return;
  //     }

  //     if (allowance.value > 0) dispatch(setApproved());
  //     if (allowance.value === 0) dispatch(setNotApproved());
  //   })();
  // }, [
  //   !!activeConnector,
  //   accountData?.address,
  //   activeChain?.id,
  //   !!configuration,
  // ]);

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
