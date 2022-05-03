import React from "react";
import getBreadSupply from "../../api/getBreadSupply";
import getMultisigBalance from "../../api/getMultisigBalance";
import getYieldAccrued from "../../api/getYieldAccrued";
import { ENetwork } from "../../features/network/networkSlice";
import { useAppSelector } from "../../store/hooks";

export const Pantry: React.FC = () => {
  const [breadSupply, setBreadSupply] = React.useState<string | null>(null);
  const [yieldAccrued, setYieldAccrued] = React.useState<string | null>(null);

  const { network } = useAppSelector((state) => state);

  React.useEffect(() => {
    console.log("info use effect....");

    if (!network.network || network.network === ENetwork.UNSUPPORTED) return;

    getYieldAccrued(network.network).then((res) => {
      if (!res) {
        console.log("Failed to get accrued yield!");
        return;
      }
      console.log("yieldAccrued: ", res.yieldAccrued);
      if (res.yieldAccrued) setYieldAccrued(res.yieldAccrued);
    });
    getBreadSupply(network.network).then((res) => {
      if (!res) {
        console.log("failed to get bread supply!");
        return;
      }
      console.log(res.totalSupply);
      setBreadSupply(res.totalSupply);
    });
    getMultisigBalance(network.network).then((res) => {
      console.log("multisig balance: ", res);

      console.log(res?.balance);
    });
  }, [network]);

  console.log("info render: ", yieldAccrued);

  return (
    <section className="max-w-4xl m-auto p-8 grid grid-cols-2 gap-8">
      <span>BREAD in circulation: </span> <span>{breadSupply}</span>
      <span>Yield Accrued: </span> <span>{yieldAccrued}</span>
    </section>
  );
};

export default Pantry;
