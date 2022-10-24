import React from "react";
import { watchAsset } from "../../api/watchAsset";

import Button from "../Button";

export const AddTokens: React.FC<React.PropsWithChildren<unknown>> = () => {
  const handleAddToken = async (token: "DAI" | "BREAD") => {
    watchAsset(token);
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
