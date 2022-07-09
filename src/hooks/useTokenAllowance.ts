import { BigNumber } from "ethers";
import { useContractRead } from "wagmi";
import abi from "../ERC20.json";

export interface UseTokenAllowance {
  value?: BigNumber;
  status: "error" | "idle" | "loading" | "success";
  error: Error | null;
}

export function useTokenAllowance(
  tokenAddress: string,
  holderAddress: string,
  spenderAddress: string
): UseTokenAllowance {
  const { data, status, error } = useContractRead(
    { addressOrName: tokenAddress, contractInterface: abi },
    "allowance",
    { args: [holderAddress, spenderAddress], watch: true }
  );

  return { value: data && BigNumber.from(data.toString()), status, error };
}
