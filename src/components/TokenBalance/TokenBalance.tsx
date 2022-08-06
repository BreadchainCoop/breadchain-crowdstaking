import { useAccount, useContractRead } from "wagmi";
import { performanceConfig } from "../../config.performance";
import Elipsis from "../Elipsis/Elipsis";
import abi from "../../ERC20.json";
import { formatEther, formatUnits } from "ethers/lib/utils";
import { UseTokenBalanceResult } from "../../hooks/useTokenBalance";

interface TokenBalanceOpts {
  bigNumberFormat?: boolean;
}

const UNKNOWN_BALANCE = <>Balance: unknown</>;
const LOADING_BALANCE = (
  <>
    Balance: <Elipsis></Elipsis>
  </>
);

const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  minimumIntegerDigits: 1,
  useGrouping: false,
});

export const TokenBalance: React.FC<
  UseTokenBalanceResult & TokenBalanceOpts
> = (props) => {
  const { value, status, error, bigNumberFormat } = props;

  let displayedValue = "Unknown";
  if (value) {
    displayedValue = bigNumberFormat
      ? value.toString()
      : formatter.format(parseFloat(formatEther(value.toString())));
  }

  switch (status) {
    case "success":
      return <>Balance: {displayedValue}</>;
    case "loading":
      return LOADING_BALANCE;
    case "error":
      return <>Balance: {error}</>;
    case "idle":
    default:
      return UNKNOWN_BALANCE;
  }
};
