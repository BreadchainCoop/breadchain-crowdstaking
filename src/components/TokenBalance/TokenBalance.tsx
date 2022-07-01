import { useAccount, useContractRead } from "wagmi";
import { performanceConfig } from "../../config.performance";
import Elipsis from "../Elipsis/Elipsis";
import abi from "../../ERC20.json";
import { formatEther, formatUnits } from "ethers/lib/utils";

interface ITokenBalanceProps {
  addressOrName: string;
  holderAddress: string;
}

interface ITokenBalanceOpts {
  bigNumberFormat?: boolean;
}

const UNKNOWN_BALANCE = <>Balance: unknown</>;
const LOADING_BALANCE = (
  <>
    Balance: <Elipsis></Elipsis>
  </>
);

const defaultProps: ITokenBalanceOpts = {
  bigNumberFormat: false,
};

const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  minimumIntegerDigits: 1,
  useGrouping: false,
});

export const TokenBalance: React.FC<ITokenBalanceProps & ITokenBalanceOpts> = (
  props
) => {
  const { addressOrName, holderAddress, bigNumberFormat } = {
    ...defaultProps,
    ...props,
  };

  const { data, status, error } = useContractRead(
    { addressOrName, contractInterface: abi },
    "balanceOf",
    { args: [holderAddress], watch: true }
  );

  let value = "Unknown";
  if (data) {
    value = bigNumberFormat
      ? data.toString()
      : formatter.format(parseFloat(formatEther(data.toString())));
  }

  switch (status) {
    case "success":
      return <>Balance: {value}</>;
    case "loading":
      return LOADING_BALANCE;
    case "error":
      return <>Balance: {error}</>;
    case "idle":
    default:
      return UNKNOWN_BALANCE;
  }
};
