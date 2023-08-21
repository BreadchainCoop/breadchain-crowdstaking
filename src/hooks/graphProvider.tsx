import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ReactNode } from 'react';

const SUBGRAPH_URL =
  'https://api.thegraph.com/subgraphs/name/breadchaincoop/bread-polygon';

const client = new ApolloClient({
  uri: SUBGRAPH_URL,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          tokenDailySnapshots: {
            // Don't cache separate results based on
            // any of this field's arguments.
            keyArgs: false,
            // Concatenate the incoming list items with
            // the existing list items.
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
        },
      },
    },
  }),
});

export default function SubgraphProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
