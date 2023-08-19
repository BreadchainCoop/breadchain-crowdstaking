import BreadChart from '.';
import useBread from '../../hooks/useBread';

export default function EconomyDisplay() {
  const { data } = useBread();

  console.log({ data });
  return (
    <section className="wax-w-6xl p-4">
      {/* chart container */}
      <div className="h-[1200px]">
        {data && <BreadChart chartData={data} />}
      </div>
    </section>
  );
}
