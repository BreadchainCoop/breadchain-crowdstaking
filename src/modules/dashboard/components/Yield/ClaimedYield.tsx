import { IChartData } from '../hooks/useBread';

export default function ClaimedYield({
  data,
  loading,
}: {
  data: IChartData | null;
  loading: boolean;
}) {
  // const { data: boo } = useBread();
  const amount = data?.totalClaimedYield.toString();

  return <section>Claimed Yield:{loading ? 'loading...' : amount}</section>;
}
