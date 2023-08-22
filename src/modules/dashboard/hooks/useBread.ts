import { gql, useQuery } from '@apollo/client';
import { formatUnits } from 'ethers/lib/utils';
import { useEffect, useMemo } from 'react';

interface IQueryDailySnapshot {
  timestamp: string;
  dailyTotalSupply: number;
}

export interface IToken {
  id: string;
  minted: string;
  burned: string;
  transfers: string;
  supply: string;
}

export interface IDailySnapshot {
  supply: number;
  date: string;
}

export interface IChartData {
  tokenDailySnapshots: IDailySnapshot[];
  tokens: IToken[];
  totalClaimedYield: string;
}

const TOKEN_DAILY_QUERY = gql`
  query TokenDailySnapshots($skip: Int, $first: Int) {
    tokens {
      id
      minted
      burned
      transfers
      supply
    }

    totalClaimedYield(id: "0x11d9efdf4ab4a3bfabf5c7089f56aa4f059aa14c") {
      amount
    }

    tokenDailySnapshots(
      skip: $skip
      first: $first
      orderBy: timestamp
      orderDirection: desc
    ) {
      timestamp
      dailyTotalSupply
    }
  }
`;

export default function useBread() {
  const { data: apolloData, loading, fetchMore } = useQuery(TOKEN_DAILY_QUERY);

  useEffect(() => {
    if (!apolloData) return;
    fetchMore({
      variables: {
        skip: apolloData.tokenDailySnapshots.length,
      },
    });
  }, [apolloData, fetchMore]);

  const chartData: null | IChartData = useMemo(() => {
    if (!apolloData) return null;

    return {
      tokens: {
        ...(apolloData.tokens as IToken[]),
      },
      totalClaimedYield: formatUnits(apolloData.totalClaimedYield.amount),

      tokenDailySnapshots: apolloData.tokenDailySnapshots
        .map((day: IQueryDailySnapshot) => {
          const date = new Date(
            parseInt(day.timestamp, 10) * 1000,
          ).toDateString();
          const supply = parseInt(formatUnits(day.dailyTotalSupply), 10);
          return {
            date,
            supply,
          };
        })
        .reverse(),
    };
  }, [apolloData]);

  return {
    data: chartData,
    loading,
  };
}
