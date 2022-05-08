import React from "react";
import getBreadSupply from "../../api/getBreadSupply";
import getMultisigBalance from "../../api/getMultisigBalance";
import getRewardsAccrued from "../../api/getRewardsAccrued";
import getYieldAccrued from "../../api/getYieldAccrued";
import { ENetwork } from "../../features/network/networkSlice";
import { useAppSelector } from "../../store/hooks";

export const Pantry: React.FC = () => {
  const [breadSupply, setBreadSupply] = React.useState<string | null>(null);
  const [yieldAccrued, setYieldAccrued] = React.useState<string | null>(null);
  const [rewardsAccrued, setRewardsAccrued] = React.useState<string | null>(
    null
  );

  const { network } = useAppSelector((state) => state);

  React.useEffect(() => {
    if (!network.network || network.network === ENetwork.UNSUPPORTED) return;

    getBreadSupply(network.network).then((res) => {
      if (!res) {
        console.error("failed to get bread supply!");
        return;
      }
      console.error(res.totalSupply);
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
    getRewardsAccrued(network.network).then((res) => {
      if (!res) {
        console.error("Failed to get accrued yield!");
        return;
      }
      console.log("yieldAccrued: ", res.rewardsAccrued);
      if (res.rewardsAccrued) setRewardsAccrued(res.rewardsAccrued);
    });
    getMultisigBalance(network.network).then((res) => {
      console.log("multisig balance: ", res);
    });
  }, [network]);

  return (
    <section className="max-w-4xl m-auto p-8 grid grid-cols-2 gap-8">
      <span>BREAD in circulation: </span> <span>{breadSupply}</span>
      <span>Yield Accrued: </span> <span>{yieldAccrued}</span>
    </section>
  );
};

export default Pantry;
