import { formatEther } from 'viem';
import { useBalance } from 'wagmi';
import Elipsis from '../Elipsis/Elipsis';

interface INativeBalanceProps {
  address: `0x${string}`;
}

interface INativeBalanceOpts {
  bigNumberFormat?: boolean;
}

const UNKNOWN_BALANCE = <>unknown</>;
const LOADING_BALANCE = <Elipsis />;

const formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  minimumIntegerDigits: 1,
  useGrouping: false,
});

export function NativeBalance({
  address,
  bigNumberFormat,
}: INativeBalanceProps & INativeBalanceOpts) {
  const { data, status, error } = useBalance({
    address,
    watch: true,
  });

  let value = 'Unknown';
  if (data) {
    value = bigNumberFormat
      ? data.value.toString()
      : formatter.format(parseFloat(formatEther(data.value)));
  }

  switch (status) {
    case 'success':
      return <span>{value}</span>;
    case 'loading':
      return LOADING_BALANCE;
    case 'error':
      return <span>{error ? JSON.stringify(error) : 'no error?'}</span>;
    case 'idle':
    default:
      return UNKNOWN_BALANCE;
  }
}

NativeBalance.defaultProps = {
  bigNumberFormat: false,
};

export default NativeBalance;
