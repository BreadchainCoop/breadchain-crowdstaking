import { gql, useQuery } from '@apollo/client';
import { formatUnits } from 'ethers/lib/utils';
import { useEffect, useMemo } from 'react';

export interface IDailySnapshot {
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

export interface IChartData {
  tokenDailySnapshots: IDailySnapshot[];
  tokens: IToken[];
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
      tokenDailySnapshots: apolloData.tokenDailySnapshots
        .map((day: IDailySnapshot) => {
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
