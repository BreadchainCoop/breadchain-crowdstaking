import useAAVE from '../hooks/useAAVE';

export const yieldRateFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  minimumIntegerDigits: 1,
  maximumFractionDigits: 2,
  useGrouping: true,
});

export default function AAVE() {
  const { data } = useAAVE();

  return (
    <section className="m-auto flex w-2/3 items-center justify-between p-6">
      <span>Current Yield</span>
      <span>
        {data && (
          <span className="flex gap-2">
            <div>%</div>
            <span>{yieldRateFormatter.format(data.currentYield)}</span>
          </span>
        )}
      </span>
    </section>
  );
}
