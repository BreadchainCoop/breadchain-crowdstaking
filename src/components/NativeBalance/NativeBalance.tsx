import { useBalance } from "wagmi";
import { performanceConfig } from "../../config.performance";
import Elipsis from "../Elipsis/Elipsis";
import { formatEther } from "ethers/lib/utils";

interface INativeBalanceProps {
  addressOrName: string;
}

interface INativeBalanceOpts {
  bigNumberFormat?: boolean;
}

const UNKNOWN_BALANCE = <>Balance: unknown</>;
const LOADING_BALANCE = (
  <>
    Balance: <Elipsis></Elipsis>
  </>
);

const defaultProps: INativeBalanceOpts = {
  bigNumberFormat: false,
};

const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  minimumIntegerDigits: 1,
  useGrouping: false,
});

export const NativeBalance: React.FC<
  INativeBalanceProps & INativeBalanceOpts
> = (props) => {
  const { addressOrName, bigNumberFormat } = {
    ...defaultProps,
    ...props,
  };

  const { data, status, error } = useBalance({
    addressOrName,
    watch: true,
  });

  let value = "Unknown";
  if (data) {
    value = bigNumberFormat
      ? data.value.toString()
      : formatter.format(parseFloat(formatEther(data.value.toString())));
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
