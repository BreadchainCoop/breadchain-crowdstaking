import { UseTokenBalanceResult } from '../../hooks/useTokenBalance';
import { balanceFormatter } from '../../util';
import Elipsis from '../Elipsis/Elipsis';

const UNKNOWN_BALANCE = <>Balance: unknown</>;
const LOADING_BALANCE = (
  <>
    Balance: <Elipsis />
  </>
);

interface IProps {
  readings: UseTokenBalanceResult;
}

export function TokenBalance({ readings }: IProps) {
  const { value, status, error } = readings;

  const displayedValue = value
    ? balanceFormatter.format(parseFloat(value))
    : 'unknown';

  switch (status) {
    case 'success':
      return <>Balance: {displayedValue}</>;
    case 'loading':
      return LOADING_BALANCE;
    case 'error':
      return <>Balance: {error}</>;
    case 'idle':
    default:
      return UNKNOWN_BALANCE;
  }
}

export default TokenBalance;
