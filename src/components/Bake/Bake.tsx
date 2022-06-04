import React from "react";
import { getAllowance } from "../../api";
import {
  EApprovalStatus,
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
  const { network, wallet, approval } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    (async () => {
      if (
        !wallet.address ||
        !network.network ||
        network.network === ENetwork.UNSUPPORTED
      )
        return;

      dispatch(getBalances({}));

      if (approval.status !== null) return;
      dispatch(setApprovalLoading());
      const allowance = await getAllowance(wallet.address, network.network);

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
  }, [wallet.address]);
  return (
    <>
      {(() => {
        if (network && network.network === ENetwork.UNSUPPORTED)
          return (
            <>
              <Main.Inner>
                <UnsupportedNetwork />
              </Main.Inner>
            </>
          );
        if (wallet.address)
          return (
            <>
              <Main.Inner>
                <Swap />
              </Main.Inner>
            </>
          );
        return (
          <>
            <Main.Inner>
              <ConnectWalletButton />
            </Main.Inner>
          </>
        );
      })()}
    </>
  );
};

export default Bake;
