import { formatUnits } from 'viem';
import { useAccount, useContractRead, useNetwork } from 'wagmi';
import config from '../../../../config';
import { IChartData } from '../../hooks/useBread';
import ClaimYield from './ClaimYield';
import ClaimableYield from './ClaimableYield';
import ClaimedYield from './ClaimedYield';

import BREADABI from '../../../../BreadPolygon.json';

const { abi } = BREADABI;

export const yieldFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 4,
  minimumIntegerDigits: 1,
  useGrouping: false,
});

export default function Yield({
  data,
  loading,
}: {
  data: IChartData | null;
  loading: boolean;
}) {
  const { chain: activeChain } = useNetwork();
  const {
    isConnected: hookIsConnected,
    connector: activeConnector,
    address: accountAddress,
  } = useAccount();

  const chainConfig =
    activeChain?.id && config[activeChain.id]
      ? config[activeChain.id]
      : undefined;

  const isConnected =
    hookIsConnected &&
    activeConnector !== undefined &&
    accountAddress !== undefined &&
    chainConfig !== undefined;

  const {
    data: yieldData,
    // isError,
    // isLoading,
  } = useContractRead({
    address: chainConfig?.BREAD.address,
    abi,
    functionName: 'yieldAccrued',
    // args: [holderAddress],
    watch: true,
  });

  const value = data ? formatUnits(yieldData as bigint, 18).toString() : '0';

  console.log({ value });
  console.log({ value });
  console.log({ value });
  console.log({ value });
  console.log({ value });

  return (
    <>
      <ClaimedYield data={data} loading={loading} />
      <ClaimableYield value={value} />
      <section>
        {isConnected && value ? (
          <ClaimYield
            amount={value}
            accountAddress={accountAddress}
            chainConfig={chainConfig}
          />
        ) : (
          <section>connect wallet to claim</section>
        )}
      </section>
    </>
  );
}
