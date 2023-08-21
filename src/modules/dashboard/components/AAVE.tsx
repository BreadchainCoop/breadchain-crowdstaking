import useAAVE from '../hooks/useAAVE';

export default function AAVE() {
  const { data } = useAAVE();

  return (
    <section className="flex flex-col gap-4 py-8">
      <h2 className="font-bold">AAVE</h2>
      {data && (
        <dl className="grid grid-cols-2">
          <dt>Current Yield:</dt>
          <dd>{data.currentYield}</dd>
          <dt>% of Pool:</dt>
          <dd>{data.poolPercentage}</dd>
        </dl>
      )}
    </section>
  );
}
