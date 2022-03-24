import React from "react";

const Button: React.FC = (props) => {
  return (
    <button className="text-sm px-4 py-2 mr-4 bg-breadpink-100 text-neutral-900">
      {props.children}
    </button>
  );
};
const AddTokens: React.FC = () => {
  return (
    <div className="mt-16">
      <div className="text-xs pb-6">Add tokens to MetaMask</div>
      <div>
        <Button>BREAD</Button>
        <Button>DAI</Button>
      </div>
    </div>
  );
};

export default AddTokens;
