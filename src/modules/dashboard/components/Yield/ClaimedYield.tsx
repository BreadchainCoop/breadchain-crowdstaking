import { useMemo } from 'react';
import { yieldFormatter } from './Yield';

export default function ClaimedYield({
  data,
  loading,
}: {
  data: { amount: string } | undefined;
  loading: boolean;
}) {
  const claimed = useMemo(
    () => (data ? yieldFormatter.format(parseFloat(data.amount)) : '...'),
    [data],
  );

  return (
    <section className="m-auto flex w-2/3 items-center justify-between p-6">
      <span>Claimed Yield</span>
      <span>{loading ? 'loading...' : claimed}</span>
    </section>
  );
}
