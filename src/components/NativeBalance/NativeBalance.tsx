import { useBalance } from 'wagmi';
import { formatEther } from 'ethers/lib/utils';
import Elipsis from '../Elipsis/Elipsis';

interface INativeBalanceProps {
  addressOrName: string;
}

interface INativeBalanceOpts {
  bigNumberFormat?: boolean;
}

const UNKNOWN_BALANCE = <>Balance: unknown</>;
const LOADING_BALANCE = (
  <>
    Balance:
    {' '}
    <Elipsis />
  </>
);

const formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  minimumIntegerDigits: 1,
  useGrouping: false,
});

export function NativeBalance({
  addressOrName,
  bigNumberFormat,
}: INativeBalanceProps & INativeBalanceOpts) {
  const { data, status, error } = useBalance({
    addressOrName,
    watch: true,
  });

  let value = 'Unknown';
  if (data) {
    value = bigNumberFormat
      ? data.value.toString()
      : formatter.format(parseFloat(formatEther(data.value.toString())));
  }

  switch (status) {
    case 'success':
      return (
        <>
          Balance:
          {value}
        </>
      );
    case 'loading':
      return LOADING_BALANCE;
    case 'error':
      return (
        <>
          Balance:
          {error}
        </>
      );
    case 'idle':
    default:
      return UNKNOWN_BALANCE;
  }
}

NativeBalance.defaultProps = {
  bigNumberFormat: false,
};

export default NativeBalance;
