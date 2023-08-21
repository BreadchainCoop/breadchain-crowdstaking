import clsx from 'clsx';

import { WRAPPER_CLASSES } from '../../../util';
import useBread from '../hooks/useBread';
import BreadChart from './BreadChart';
import Yield from './Yield/Yield';

export default function EconomyDisplay() {
  const { data, loading } = useBread();

  console.log({ data });

  return (
    <div className={clsx(WRAPPER_CLASSES, ' py-8')}>
      <section
        className={clsx(
          'rounded-lg border border-breadgray-rye bg-breadgray-burnt py-8 px-6 md:px-12',
        )}
      >
        {/* <EconomyDisplayHeader /> */}
        <div className="h-[300px]">
          {data && <BreadChart chartData={data} />}
        </div>
        <Yield data={data} loading={loading} />
        {/* <AAVE /> */}
      </section>
    </div>
  );
}
