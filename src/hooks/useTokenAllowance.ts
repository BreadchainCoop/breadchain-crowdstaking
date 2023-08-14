import { BigNumber } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { useContractRead } from 'wagmi';
import abi from '../ERC20.json';

export interface IUseTokenAllowanceResult {
  value?: string;
  status: 'error' | 'idle' | 'loading' | 'success';
  error: Error | null;
}

export function useTokenAllowance(
  tokenAddress: `0x${string}`,
  holderAddress: string,
  spenderAddress: string,
): IUseTokenAllowanceResult {
  const args = [holderAddress, spenderAddress];
  const watch = true;

  const { data, status, error } = useContractRead({
    address: tokenAddress,
    abi,
    functionName: 'allowance',
    args,
    watch,
  });

  const value = data ? formatUnits(data as BigNumber, 18) : undefined;

  return {
    value,
    status,
    error,
  };
}
