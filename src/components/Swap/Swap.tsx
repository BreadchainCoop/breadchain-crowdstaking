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

const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  minimumIntegerDigits: 1,
  useGrouping: false,
});

type TSwapState = {
  from: {
    name: string;
    value: string;
  };
  to: {
    name: string;
    value: string;
  };
};

const initialSwapState: TSwapState = {
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
    React.useState<TSwapState>(initialSwapState);

  const from = wallet.tokens[swapState.from.name];
  const to = wallet.tokens[swapState.to.name];

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const newValue = value
      .split("")
      .filter((i) => i.match(/^[0-9]*[.,]?[0-9]*$/))
      .join("");

    setSwapState({
      from: {
        name: swapState.from.name,
        value: newValue.replace(/^0+/, ""),
      },
      to: {
        name: swapState.to.name,
        value: newValue.replace(/^0+/, ""),
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
    if (parseFloat(from.balance.replace(/^0+/, "")) < 1) return;
    const value = formatter.format(parseFloat(from.balance.replace(/^0+/, "")));
    setSwapState({
      from: {
        name: swapState.from.name,
        value,
      },
      to: {
        name: swapState.to.name,
        value,
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
      console.log(network.network && wallet.address);

      await swap(
        network.network,
        swapState.from,
        dispatch,
        wallet.address,
        resetSwapState
      );
      dispatch(getBalances({}));
    }
  };

  // initializing swapState when wallet connects
  React.useEffect(() => {
    if (wallet.address) {
      setSwapState({
        from: {
          name: "DAI",
          value: "",
        },
        to: {
          name: "BREAD",
          value: "",
        },
      });
    } else {
      setSwapState(initialSwapState);
    }
  }, [wallet]);

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
            parseInt(from.balance) === 0
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
