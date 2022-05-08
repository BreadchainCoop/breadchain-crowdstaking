import React from "react";
import claimYield from "../../api/claimYield";
import getBreadSupply from "../../api/getBreadSupply";
import getMultisigBalance from "../../api/getMultisigBalance";
import getRewardsAccrued from "../../api/getRewardsAccrued";
import getYieldAccrued from "../../api/getYieldAccrued";
import { ENetwork } from "../../features/network/networkSlice";
import { useAppSelector } from "../../store/hooks";
import Button from "../Button";

export const Pantry: React.FC = () => {
  const [breadSupply, setBreadSupply] = React.useState<string | null>(null);
  const [yieldAccrued, setYieldAccrued] = React.useState<string | null>(null);
  const [rewardsAccrued, setRewardsAccrued] = React.useState<string | null>(
    null
  );
  const [multisigBalance, setMultisigBalance] = React.useState<string | null>(
    null
  );

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
    getMultisigBalance(network.network).then((res) => {
      if (!res) {
        console.error("Failed to get multisig balance!");
        return;
      }
      if (res.balance) setMultisigBalance(res.balance);
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
        getMultisigBalance(network.network).then((res) => {
          setMultisigBalance(null);
          if (!res) {
            console.error("Failed to get multisig balance!");
            return;
          }
          if (res.balance) setMultisigBalance(res.balance);
        });
      });
    });
  };

  return (
    <section className="max-w-4xl m-auto p-8 py-16 grid grid-cols-2 gap-8">
      <span>BREAD in circulation: </span> <span>{breadSupply}</span>
      <span>Multisig DAI Balance: </span> <span>{multisigBalance}</span>
      <span>Yield Accrued: </span> <span>{yieldAccrued}</span>
      {/* <span>Rewards Accrued: </span> <span>{rewardsAccrued}</span> */}
      <span>
        <Button onClick={handleClaimYield}>
          {yieldAccrued === "claiming yield..." ? "claiming..." : "Claim Yield"}
        </Button>
      </span>
    </section>
  );
};

export default Pantry;
