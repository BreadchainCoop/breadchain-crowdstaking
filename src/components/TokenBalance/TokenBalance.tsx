import Elipsis from '../Elipsis/Elipsis';
import { UseTokenBalanceResult } from '../../hooks/useTokenBalance';

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

export function TokenBalance({ readings }: {
  readings: UseTokenBalanceResult
}) {
  const {
    value, status, error,
  } = readings;

  let displayedValue = 'Unknown';
  if (value) {
    displayedValue = formatter.format(parseFloat(value));
  }

  switch (status) {
    case 'success':
      return (
        <>
          Balance:
          {' '}
          {displayedValue}
        </>
      );
    case 'loading':
      return LOADING_BALANCE;
    case 'error':
      return (
        <>
          Balance:
          {' '}
          {error}
        </>
      );
    case 'idle':
    default:
      return UNKNOWN_BALANCE;
  }
}

export default TokenBalance;
