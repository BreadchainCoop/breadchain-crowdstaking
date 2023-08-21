import { formatUnits } from 'viem';
import { useContractRead } from 'wagmi';
import { IChartData } from '../../hooks/useBread';
import ClaimedYield from './ClaimedYield';

import BREADABI from '../../../../BreadPolygon.json';
import { BREAD_ADDRESS } from '../../../../constants';
import ClaimableYield from './ClaimableYield';
import ClaimYield from './ClaimYield';

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
  const {
    data: yieldData,
    // isError,
    // isLoading,
  } = useContractRead({
    address: BREAD_ADDRESS,
    abi,
    functionName: 'yieldAccrued',
    // args: [holderAddress],
    watch: true,
    cacheTime: 1_000,
  });

  const value = data ? formatUnits(yieldData as bigint, 18).toString() : '0';

  return (
    <>
      <ClaimedYield data={data} loading={loading} />
      <ClaimableYield value={value} />
      <ClaimYield amount={value} />
    </>
  );
}
