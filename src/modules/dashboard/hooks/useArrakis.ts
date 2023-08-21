const SUBGRAPH_URL =
  "https://api.thegraph.com/subgraphs/name/messari/arrakis-finance-polygon";

const arrakisClient = new ApolloClient({
  uri: SUBGRAPH_URL,
  cache: new InMemoryCache(),
});

const ARRAKIS_QUERY = gql`
  query vault {
    vault(id: "0x3055c602454dde1bda3e98b1bcfd2ed68ab9789e") {
      name
      totalValueLockedUSD
      _token0 {
        name
      }
      _token0Amount
      _token1 {
        name
      }
      _token1Amount
    }
  }
`;

import { ApolloClient, InMemoryCache, gql, useQuery } from "@apollo/client";
import { useMemo } from "react";
import { formatUnits } from "viem";

export default function useArrakis() {
  const { data: apolloData, loading } = useQuery(ARRAKIS_QUERY, {
    client: arrakisClient,
  });

  const data = useMemo(() => {
    if (!apolloData) return null;
    const {
      vault: {
        name,
        totalValueLockedUSD,
        _token0: { name: token0Name },
        _token0Amount,
        _token1: { name: token1Name },
        _token1Amount,
      },
    } = apolloData;

    const data = {
      vaultName: name,
      totalValueLockedUSD,
      token0: { name: token0Name, amount: formatUnits(_token0Amount, 18) },
      token1: { name: token1Name, amount: formatUnits(_token1Amount, 18) },
    };

    return data;
  }, [apolloData]);

  return {
    data,
    loading,
  };
}
