import React from "react";
import { watchAsset } from "../../api/watchAsset";
import {
  EModalType,
  openModal,
  unlockModal,
} from "../../features/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const Button: React.FC<{ onClick: () => void }> = (props) => {
  return (
    <button
      className="text-sm px-4 py-2 mr-4 bg-breadpink-100 text-neutral-900"
      {...props}
    >
      {props.children}
    </button>
  );
};
export const AddTokens: React.FC = () => {
  const { network } = useAppSelector((state) => state);

  const handleAddToken = async (token: string) => {
    if (!network.network) return;

    watchAsset(network.network, token);
  };

  return (
    <div className="mt-16">
      <div className="text-xs pb-6">Add tokens to MetaMask</div>
      <div>
        <Button onClick={() => handleAddToken("BREAD")}>BREAD</Button>
        <Button onClick={() => handleAddToken("DAI")}>DAI</Button>
      </div>
    </div>
  );
};

export default AddTokens;
