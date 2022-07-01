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
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import * as Main from "../App/ui/Main";
import ConnectWalletButton from "../ConnectWalletButton";
import Swap from "../Swap";
import UnsupportedNetwork from "../UnsupportedNetwork/UnsupportedNetwork";

export const Bake: React.FC = () => {
  const { activeConnector } = useConnect();
  const { data: accountData } = useAccount();
  const { activeChain } = useNetwork();
  const provider = useProvider({ chainId: activeChain?.id });

  const { network, wallet, approval } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    (async () => {
      if (!activeConnector) return;
      if (!accountData?.address) return;
      if (!activeChain || activeChain.unsupported) return;
      if (activeChain.id != provider.network.chainId) return;

      const { BREAD, DAI } = config[activeChain.id];
      dispatch(getBalances({}));

      if (approval.status !== null) return;
      dispatch(setApprovalLoading());
      const allowance = await getAllowance(
        DAI.address,
        accountData?.address,
        BREAD.address,
        provider,
        dispatch
      );

      if (!allowance) {
        dispatch(
          setToast({
            type: EToastType.ERROR,
            message: "Failed to get allowance!",
          })
        );
        return;
      }

      if (allowance.value > 0) dispatch(setApproved());
      if (allowance.value === 0) dispatch(setNotApproved());
    })();
  }, [
    !!activeConnector,
    accountData?.address,
    activeChain?.id,
    provider.network.chainId,
  ]);

  if (!activeConnector) {
    return (
      <>
        <Main.Inner>
          <ConnectWalletButton />
        </Main.Inner>
      </>
    );
  }

  return (
    <>
      <Main.Inner>
        <Swap />
      </Main.Inner>
    </>
  );
};

export default Bake;
