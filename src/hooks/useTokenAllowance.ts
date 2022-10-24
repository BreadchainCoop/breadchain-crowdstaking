import { BigNumber } from 'ethers';
import { useContractRead } from 'wagmi';
import abi from '../ERC20.json';

export interface UseTokenAllowance {
  value?: BigNumber;
  status: 'error' | 'idle' | 'loading' | 'success';
  error: Error | null;
}

export function useTokenAllowance(
  tokenAddress: string,
  holderAddress: string,
  spenderAddress: string,
): UseTokenAllowance {
  const args = [holderAddress, spenderAddress];
  const watch = true;

  const { data, status, error } = useContractRead({
    addressOrName: tokenAddress,
    contractInterface: abi,
    functionName: 'allowance',
    args,
    watch,
  });

  return { value: data && BigNumber.from(data.toString()), status, error };
}
