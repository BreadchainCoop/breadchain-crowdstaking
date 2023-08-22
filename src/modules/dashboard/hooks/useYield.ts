// export default function useTokenBalance(
//   tokenAddress: `0x${string}`,
//   holderAddress: string,
// ): UseTokenBalanceResult {
//   const { data, status, error } = useContractRead({
//     address: tokenAddress,
//     abi,
//     functionName: 'balanceOf',
//     args: [holderAddress],
//     watch: true,
//   });

//   const value = data ? formatUnits(data as bigint, 18).toString() : '0';

//   return { value, status, error };
// }
