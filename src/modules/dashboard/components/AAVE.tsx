import useAAVE from "@/modules/dashboard/hooks/useAAVE";

export default function AAVE() {
  const { loading, data } = useAAVE();

  return (
    <section className="py-8 flex flex-col gap-4">
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
