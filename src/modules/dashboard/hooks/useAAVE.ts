const SUBGRAPH_URL = "https://api.thegraph.com/subgraphs/name/jaimehgb/aave-v3-polygon"

const aaveClient = new ApolloClient({
    uri: SUBGRAPH_URL,
    cache: new InMemoryCache(),
  });

const AAVE_QUERY = gql`
  query positions {
    positions(where: {account: "0x11d9efdf4ab4a3bfabf5c7089f56aa4f059aa14c"}) {
      balance
      market {
        name
        totalValueLockedUSD
        totalDepositBalanceUSD
        inputTokenBalance
        rates {
          rate
          side
          type
        }
        inputToken {
          name
        }
        outputToken {
          name
        }
      }
    }
  }
`;

import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';
import { formatUnits } from 'ethers';
import { useMemo } from 'react';

export default function useAAVE() {
    const { data: apolloData, loading } = useQuery(AAVE_QUERY, {client: aaveClient }); 

    const data = useMemo(() => {
        if (!apolloData) return null
        if (apolloData.positions.length > 1) throw new Error("query should only return one position!")
       const position = apolloData.positions[0]
       const rate = position.market.rates.find((rate: {rate: string, side: string, type: string}) => rate.side === "LENDER")
       if (!rate) throw new Error("couldn't find rate!")
       const currentYield = rate.rate
        
       const {balance, market: { inputTokenBalance }} = position;
       const poolPercentage = balance / inputTokenBalance * 100

        return {currentYield, poolPercentage}
    }, [apolloData])

    return {
        data,
        loading
    }
}