import Elipsis from '../Elipsis/Elipsis';
import { UseTokenBalanceResult } from '../../hooks/useTokenBalance';
import { balanceFormatter } from '../../util';

const UNKNOWN_BALANCE = <>Balance: unknown</>;
const LOADING_BALANCE = (
  <>
    Balance:
    {' '}
    <Elipsis />
  </>
);

interface IProps {
  readings: UseTokenBalanceResult
}

export function TokenBalance({ readings }: IProps) {
  const {
    value, status, error,
  } = readings;

  let displayedValue = 'Unknown';
  if (value) {
    displayedValue = balanceFormatter.format(parseFloat(value));
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
