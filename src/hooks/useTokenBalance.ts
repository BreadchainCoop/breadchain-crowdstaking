import { BigNumber } from 'ethers';
import { useContractRead } from 'wagmi';
import abi from '../ERC20.json';

export interface UseTokenBalanceResult {
  value?: BigNumber;
  status: 'error' | 'idle' | 'loading' | 'success';
  error: Error | null;
}

export function useTokenBalance(
  tokenAddress: string,
  holderAddress: string,
): UseTokenBalanceResult {
  const { data, status, error } = useContractRead({
    addressOrName: tokenAddress,
    contractInterface: abi,
    functionName: 'balanceOf',
    args: [holderAddress],
    watch: true,
  });

  return { value: data && BigNumber.from(data.toString()), status, error };
}
