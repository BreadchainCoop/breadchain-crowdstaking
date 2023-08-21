import { useMemo } from 'react';
import { formatUnits } from 'viem';
import { useContractRead } from 'wagmi';
import { IChartData } from '../../hooks/useBread';
import ClaimedYield from './ClaimedYield';

import BREADABI from '../../../../BreadPolygon.json';
import { BREAD_ADDRESS } from '../../../../constants';
import ClaimYield from './ClaimYield';
import ClaimableYield from './ClaimableYield';

const { abi } = BREADABI;

export const yieldFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 4,
  minimumIntegerDigits: 2,
  useGrouping: true,
});

export default function Yield({
  data,
  loading,
}: {
  data: IChartData | null;
  loading: boolean;
}) {
  const {
    data: yieldData,
    // isError,
    // isLoading,
  } = useContractRead({
    address: BREAD_ADDRESS,
    abi,
    functionName: 'yieldAccrued',
    watch: true,
    cacheTime: 1_000,
  });

  const claimable = useMemo(
    () => (yieldData ? formatUnits(yieldData as bigint, 18).toString() : '0'),
    [data],
  );

  return (
    <section className="grid grid-rows-3 pt-12">
      <ClaimedYield data={data} loading={loading} />
      <ClaimableYield value={claimable} />
      <ClaimYield amount={claimable} />
    </section>
  );
}
