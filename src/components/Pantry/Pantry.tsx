import { spawn } from "child_process";
import React from "react";
import claimYield from "../../api/claimYield";
import getBreadSupply from "../../api/getBreadSupply";
import getMultisigDAIBalance from "../../api/getMultisigDAIBalance";
import getMultisigEtherBalance from "../../api/getMultisigEtherBalance";
import getMultisigBREADBalance from "../../api/getMultisigBREADBalance";
import getRewardsAccrued from "../../api/getRewardsAccrued";
import getYieldAccrued from "../../api/getYieldAccrued";
import { ENetwork } from "../../features/network/networkSlice";
import { useAppSelector } from "../../store/hooks";
import Button from "../Button";
import Elipsis from "../Elipsis/Elipsis";

export const Pantry: React.FC = () => {
  const [breadSupply, setBreadSupply] = React.useState<string | null>(null);
  const [yieldAccrued, setYieldAccrued] = React.useState<string | null>(null);
  const [rewardsAccrued, setRewardsAccrued] = React.useState<string | null>(
    null
  );
  const [multisigDAIBalance, setMultisigDAIBalance] = React.useState<
    string | null
  >(null);
  const [multisigBREADBalance, setMultisigBREADBalance] = React.useState<
    string | null
  >(null);
  const [multisigEtherBalance, setMultisigEtherBalance] = React.useState<
    string | null
  >(null);

  const { network, wallet } = useAppSelector((state) => state);

  React.useEffect(() => {
    if (!network.network || network.network === ENetwork.UNSUPPORTED) return;

    getBreadSupply(network.network).then((res) => {
      if (!res) {
        console.error("failed to get bread supply!");
        return;
      }
      setBreadSupply(res.totalSupply);
    });
    getYieldAccrued(network.network).then((res) => {
      if (!res) {
        console.error("Failed to get accrued yield!");
        return;
      }
      console.log("yieldAccrued: ", res.yieldAccrued);
      if (res.yieldAccrued) setYieldAccrued(res.yieldAccrued);
    });
    // getRewardsAccrued(network.network).then((res) => {
    //   if (!res) {
    //     console.error("Failed to get accrued yield!");
    //     return;
    //   }
    //   console.log("yieldAccrued: ", res.rewardsAccrued);
    //   if (res.rewardsAccrued) setRewardsAccrued(res.rewardsAccrued);
    // });
    getMultisigDAIBalance(network.network).then((res) => {
      if (!res) {
        console.error("Failed to get multisig balance!");
        return;
      }
      if (res.balance) setMultisigDAIBalance(res.balance);
    });
    getMultisigEtherBalance().then((res) => {
      if (!res) {
        console.error("Failed to get multisig balance!");
        return;
      }
      if (res.balance) setMultisigEtherBalance(res.balance);
    });
    getMultisigBREADBalance(network.network).then((res) => {
      if (!res) {
        console.error("Failed to get multisig balance!");
        return;
      }
      if (res.balance) setMultisigBREADBalance(res.balance);
    });
  }, [network]);

  const handleClaimYield = () => {
    if (!network.network || network.network === ENetwork.UNSUPPORTED) return;
    claimYield(network.network).then(async (tx) => {
      if (!network.network || network.network === ENetwork.UNSUPPORTED) return;
      setYieldAccrued("claiming yield...");
      await tx.wait();
      getYieldAccrued(network.network).then((res) => {
        if (!res) {
          console.error("Failed to get accrued yield!");
          return;
        }
        console.log("yieldAccrued: ", res.yieldAccrued);
        if (res.yieldAccrued) setYieldAccrued(res.yieldAccrued);
        if (!network.network || network.network === ENetwork.UNSUPPORTED)
          return;
        getMultisigDAIBalance(network.network).then((res) => {
          setMultisigDAIBalance(null);
          if (!res) {
            console.error("Failed to get multisig balance!");
            return;
          }
          if (res.balance) setMultisigDAIBalance(res.balance);
        });
      });
    });
  };

  const BREADformatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    minimumIntegerDigits: 1,
    useGrouping: false,
  });

  const DAIformatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 6,
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  return (
    <section className="max-w-4xl m-auto p-8 py-16 grid grid-cols-2 gap-8">
      <span>BREAD in circulation: </span>{" "}
      {breadSupply ? (
        <span>{BREADformatter.format(parseFloat(breadSupply))}</span>
      ) : (
        <Elipsis />
      )}
      {/* <span>Multisig Ether Balance: </span> <span>{multisigEtherBalance}</span> */}
      <span>Multisig DAI Balance: </span>
      {multisigDAIBalance ? (
        <span>{DAIformatter.format(parseFloat(multisigDAIBalance))}</span>
      ) : (
        <Elipsis />
      )}
      <span>Multisig BREAD Balance: </span>
      {multisigBREADBalance ? (
        <span>{BREADformatter.format(parseFloat(multisigBREADBalance))}</span>
      ) : (
        <Elipsis />
      )}
      <span>Yield Accrued: </span>
      {yieldAccrued ? (
        <span>{DAIformatter.format(parseFloat(yieldAccrued))}</span>
      ) : (
        <Elipsis />
      )}
      {/* <span>Rewards Accrued: </span> <span>{rewardsAccrued}</span> */}
      <span>
        <Button
          disabled={yieldAccrued === "claiming yield..."}
          onClick={handleClaimYield}
        >
          Claim Yield
        </Button>
      </span>
    </section>
  );
};

export default Pantry;
