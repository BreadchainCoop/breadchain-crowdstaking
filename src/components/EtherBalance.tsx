import React from "react";
import { useAppSelector } from "../store/hooks";

const EtherBalance: React.FC = () => {
  const {
    network,
    wallet: { tokens },
  } = useAppSelector((state) => state);

  return (
    <div className="w-full pt-8 text-xs grid grid-cols-1 gap-4">
      <div>
        <div className="text-gray-300 mb-2">Current Gas Price: </div>
        <div className="text-sm">
          {network.gasPrice && network.xr.USD
            ? parseFloat(network.gasPrice) * network.xr.USD
            : "Can't get gas price right now"}
        </div>
      </div>
      <div>
        <div className="text-gray-300 mb-2">Eth Balance: </div>
        <div className="text-sm">
          {network.xr.USD
            ? "USD " + parseFloat(tokens.ETH.balance) * network.xr.USD
            : tokens.ETH.balance}
        </div>
      </div>
    </div>
  );
};

export default EtherBalance;
