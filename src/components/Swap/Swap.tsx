import React from "react";

import TokenDisplay from "./TokenDisplay";
import Input from "./Input";
import Icon from "./Icon";
import SwapReverse from "./SwapReverse";
import SwapButton from "./SwapButton";
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

const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  minimumIntegerDigits: 1,
  useGrouping: false,
});

interface ISwapState {
  from: {
    name: string;
    value: string;
  };
  to: {
    name: string;
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

  const [swapState, setSwapState] =
    React.useState<ISwapState>(initialSwapState);

  const from = wallet.tokens[swapState.from.name];
  const to = wallet.tokens[swapState.to.name];

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    const sanitizedValue = sanitizeInputValue(value);

    // const newValue = sanitizedValue !== "" ? sanitizedValue : "00.00";

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
          // only want to refetch balances if transaction is confirmed as successful
          dispatch(getBalances({}));
        })
        .catch((err) => {
          // !!! need to catch error here rather than inside swap function
          // currently this block will never run
          console.log(err);
        });
    }
  };

  return (
    <>
      <TokenDisplay>
        {swapState ? (
          <>
            <TokenDisplay.Header>
              <TokenDisplay.BalanceButton onClick={handleBalanceClick}>
                Balance:{" "}
                {wallet.address &&
                swapState.from.name &&
                wallet.tokens &&
                from.status === EBalanceStatus.LOADING ? (
                  <Elipsis />
                ) : wallet.tokens && from.status === EBalanceStatus.REJECTED ? (
                  ""
                ) : (
                  formatter.format(parseFloat(from.balance))
                )}
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
                Balance:{" "}
                {wallet.tokens && to.status === EBalanceStatus.LOADING ? (
                  <Elipsis />
                ) : wallet.tokens && to.status === EBalanceStatus.REJECTED ? (
                  ""
                ) : (
                  formatter.format(parseFloat(to.balance))
                )}
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
        Matic Balance:
        {wallet.tokens &&
        wallet.tokens.MATIC.status === EBalanceStatus.LOADING ? (
          <Elipsis />
        ) : wallet.tokens.MATIC.status === EBalanceStatus.REJECTED ? (
          ""
        ) : (
          <span className="ml-4">
            {parseFloat(wallet.tokens.MATIC.balance).toFixed(4)}
          </span>
        )}
      </div>

      {approval.status !== null && (
        <SwapButton
          onClick={handleSubmit}
          from={swapState.from.name}
          disabled={
            approval.status !== EApprovalStatus.APPROVED ||
            parseFloat(swapState.from.value) === 0 ||
            swapState.from.value === ""
          }
        />
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
