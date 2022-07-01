import React from "react";

import TokenDisplay from "./TokenDisplay";
import Input from "./Input";
import Icon from "./Icon";
import SwapReverse from "./SwapReverse";
import { EBalanceStatus } from "../../features/wallet/walletSlice";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { swap } from "../../api/swap";
import Transaction from "./Transaction";
import { getBalances } from "../../features/wallet/walletSlice";
import ApproveBreadButton from "../ApproveBreadButton/ApproveBreadButton";
import { approveBREAD } from "../../api/approveBread";
import { EApprovalStatus } from "../../features/approval/approvalSlice";
import Elipsis from "../Elipsis/Elipsis";
import { sanitizeInputValue } from "./swapUtils";
import { EToastType, setToast } from "../../features/toast/toastSlice";
import { closeModal } from "../../features/modal/modalSlice";
import Button from "../Button";
import config from "../../config";
import { useAccount, useBalance, useNetwork, useSigner } from "wagmi";
import TokenBalance from "../TokenBalance";
import NativeBalance from "../NativeBalance";

const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  minimumIntegerDigits: 1,
  useGrouping: false,
});

interface ISwapState {
  from: {
    name: "DAI" | "BREAD";
    value: string;
  };
  to: {
    name: "DAI" | "BREAD";
    value: string;
  };
}

const initialSwapState: ISwapState = {
  from: {
    name: "DAI",
    value: "",
  },
  to: {
    name: "BREAD",
    value: "",
  },
};

const SwapUI: React.FC = () => {
  const dispatch = useAppDispatch();
  const { wallet, network, transaction, approval } = useAppSelector(
    (state) => state
  );

  const { activeChain } = useNetwork();
  const {
    data: account,
    isFetching: isFetchingAccount,
    error: accountError,
  } = useAccount();
  const {
    data: signer,
    isFetching: isFetchingSigner,
    error: signerError,
  } = useSigner();

  const [swapState, setSwapState] =
    React.useState<ISwapState>(initialSwapState);

  const isFetching = isFetchingAccount || isFetchingSigner;
  const error = accountError || signerError;

  if (!activeChain || isFetching) return <Elipsis />;
  if (activeChain.unsupported) return <>Unsupported network</>;
  if (error) return <>{error}</>;
  if (!account?.address || !signer) return <>Could not connect to wallet</>;

  const from = wallet.tokens[swapState.from.name];
  const to = wallet.tokens[swapState.to.name];

  const inputTokenAddress = config[activeChain.id][swapState.from.name].address;
  const outputTokenAddress = config[activeChain.id][swapState.to.name].address;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const sanitizedValue = sanitizeInputValue(value);

    setSwapState({
      from: {
        name: swapState.from.name,
        value: sanitizedValue,
      },
      to: {
        name: swapState.to.name,
        value: sanitizedValue,
      },
    });
  };

  const handleSwapReverse = () => {
    setSwapState((state) => {
      return {
        from: { ...state.to, value: "" },
        to: { ...state.from, value: "" },
      };
    });
  };

  const handleBalanceClick = () => {
    console.log("balance click", swapState);

    setSwapState({
      from: {
        name: swapState.from.name,
        value: from.balance,
      },
      to: {
        name: swapState.to.name,
        value: from.balance,
      },
    });
  };

  const resetSwapState = () => {
    setSwapState(initialSwapState);
  };

  const handleApproveBREAD = async () => {
    if (network.network && wallet.address) {
      await approveBREAD(network.network, dispatch);
    }
  };

  const handleSubmit = async () => {
    if (network.network && wallet.address) {
      swap(
        network.network,
        swapState.from,
        dispatch,
        wallet.address,
        resetSwapState
      )
        .then(() => {
          dispatch(getBalances({}));
        })
        .catch((err: any) => {
          const message = err.data ? err.data.message : err.message;
          dispatch(
            setToast({
              type: EToastType.ERROR,
              message,
            })
          );
          dispatch(closeModal());
        });
    }
  };

  console.log("approval", approval);

  return (
    <>
      <TokenDisplay>
        {swapState ? (
          <>
            <TokenDisplay.Header>
              <TokenDisplay.BalanceButton onClick={handleBalanceClick}>
                This shouldnt be in a component, rather we should use a hook for
                it: useTokenBalance(tokenAddress, holderAddress) that wraps a
                useContractRead inside of it
                <TokenBalance
                  addressOrName={inputTokenAddress}
                  holderAddress={account.address}
                />
              </TokenDisplay.BalanceButton>
            </TokenDisplay.Header>
            <TokenDisplay.Content>
              <Input
                name="from"
                value={swapState.from.value}
                handleInputChange={handleInputChange}
              />
              <Icon type={swapState.from.name} />
              <span className="ml-4 w-20 pt-0.5">{swapState.from.name}</span>
            </TokenDisplay.Content>
          </>
        ) : (
          <span>"No SwapState!"</span>
        )}
      </TokenDisplay>
      <SwapReverse onClick={handleSwapReverse} />
      <TokenDisplay>
        {swapState && (
          <>
            <TokenDisplay.Header>
              <TokenDisplay.Balance>
                <TokenBalance
                  addressOrName={outputTokenAddress}
                  holderAddress={account.address}
                />
              </TokenDisplay.Balance>
            </TokenDisplay.Header>
            <TokenDisplay.Content>
              <span className="bg-breadgray-100 p-4 mr-8 text-lg sm:text-2xl truncate overflow-ellipsis w-0 flex-auto">
                {swapState.to.value ? swapState.to.value : "00.00"}
              </span>
              <Icon type={swapState.to.name} />
              <span className="ml-4 w-20 pt-0.5">{swapState.to.name}</span>
            </TokenDisplay.Content>
          </>
        )}
      </TokenDisplay>
      <div className="w-full px-4 pt-8 pb-12 text-xs">
        Matic <NativeBalance addressOrName={account.address} />
      </div>

      {approval.status !== null && (
        <Button
          onClick={handleSubmit}
          disabled={
            approval.status !== EApprovalStatus.APPROVED ||
            parseFloat(swapState.from.value) === 0 ||
            swapState.from.value === ""
          }
          variant="large"
          fullWidth
        >
          {swapState.from.name === "BREAD" ? "BURN BREAD" : "BAKE BREAD"}
        </Button>
      )}
      {swapState.from.name === "DAI" &&
        approval.status === EApprovalStatus.NOT_APPROVED && (
          <div className="py-12 text-xs text-neutral-300">
            <div className="pb-6 text-xs text-neutral-300">
              You'll need to approve the BREAD contract to mint BREAD
            </div>
            <ApproveBreadButton
              handleClick={handleApproveBREAD}
              status={approval.status}
            />
          </div>
        )}
      {approval.status === EApprovalStatus.LOADING && (
        <div className="w-full py-12 text-xs text-neutral-300">
          Checking contract approval <Elipsis />
        </div>
      )}
      {approval.status === EApprovalStatus.PENDING && (
        <div className="py-12 text-xs text-neutral-300">
          <div className="pb-6 text-xs text-neutral-300">
            You'll need to approve the BREAD contract to mint BREAD
          </div>
          <ApproveBreadButton
            handleClick={handleApproveBREAD}
            status={approval.status}
          />
        </div>
      )}
      {transaction.hash && <Transaction />}
    </>
  );
};

export default SwapUI;
