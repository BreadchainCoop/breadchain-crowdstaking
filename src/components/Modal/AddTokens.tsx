import React from "react";
import { watchAsset } from "../../api/watchAsset";

import { useAppSelector } from "../../store/hooks";
import Button from "../Button";

export const AddTokens: React.FC = () => {
  const { network } = useAppSelector((state) => state);

  const handleAddToken = async (token: string) => {
    if (!network.network) return;

    watchAsset(network.network, token);
  };

  return (
    <div className="mt-16">
      <div className="text-xs mb-8">Add tokens to MetaMask</div>
      <div className="flex gap-4">
        <Button onClick={() => handleAddToken("BREAD")} disabled={false}>
          BREAD
        </Button>
        <Button onClick={() => handleAddToken("DAI")} disabled={false}>
          DAI
        </Button>
      </div>
    </div>
  );
};

export default AddTokens;
