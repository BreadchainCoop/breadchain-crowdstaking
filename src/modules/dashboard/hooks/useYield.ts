import { gql, useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { formatUnits } from 'viem';

export interface ITotalClaimedYield {
  totalClaimedYield: {
    amount: string;
  };
}

const TOTAL_CLAIMED_YIELD_QUERY = gql`
  query TotalClaimedYield {
    totalClaimedYield(id: "0x11d9efdf4ab4a3bfabf5c7089f56aa4f059aa14c") {
      amount
    }
  }
`;

export default function useYield() {
  const {
    data: apolloData,
    loading,
    refetch,
  } = useQuery<ITotalClaimedYield>(TOTAL_CLAIMED_YIELD_QUERY, {
    pollInterval: 1000,
  });

  const claimedYieldData: undefined | { amount: string } = useMemo(() => {
    if (!apolloData) return undefined;

    return {
      amount: formatUnits(BigInt(apolloData.totalClaimedYield.amount), 18),
    };
  }, [apolloData]);

  return {
    data: claimedYieldData,
    loading,
    refetch,
  };
}
