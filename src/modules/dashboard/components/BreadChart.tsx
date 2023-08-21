import { useMemo } from 'react';
import { Area, ComposedChart, ResponsiveContainer, Tooltip } from 'recharts';
import Icon from '../../../components/Swap/Icon';
import { IChartData } from '../hooks/useBread';

function Widget({ supply, date }: { supply: number; date: string }) {
  return (
    <div className="flex -translate-y-12 transform flex-col gap-2 bg-breadgray-burnt p-10 text-neutral-300">
      <div className="flex items-center gap-4">
        <Icon type="BREAD" />
        <span className="translate-y-0.5 transform text-lg">
          {Intl.NumberFormat().format(supply)}
        </span>
      </div>
      <p className="text-xs text-neutral-400">{date}</p>
    </div>
  );
}

function CustomCursor({ payload }: any) {
  const data = payload[0]?.payload;

  if (!data) return null;

  return (
    <div>
      <Widget supply={data.supply} date={data.date} />
    </div>
  );
}

function DefaultSupplyDisplay({ supply }: { supply: number }) {
  const date = useMemo(() => {
    const today = new Date(Date.now()).toDateString();
    return today;
  }, []);

  return (
    <div className="absolute left-0">
      <Widget supply={supply} date={date} />
    </div>
  );
}

export default function BreadChart({ chartData }: { chartData: IChartData }) {
  const { tokenDailySnapshots } = chartData;

  const latestSnapshot = tokenDailySnapshots[tokenDailySnapshots.length - 1];

  return (
    <section className="relative h-full w-full pt-24">
      <DefaultSupplyDisplay supply={latestSnapshot.supply} />
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={tokenDailySnapshots}>
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#A416AD" stopOpacity={1} />
              <stop offset="95%" stopColor="#FF99E2" stopOpacity={0.6} />
            </linearGradient>
          </defs>
          {/* <Line dot={false} type="natural" dataKey="supply" stroke="#8884d8" /> */}
          <Area
            type="monotone"
            dataKey="supply"
            strokeWidth={4}
            fillOpacity={1}
            stroke="url(#lineGrad)"
            fill="url(#areaGrad)"
          />

          <Tooltip position={{ x: 0, y: 0 }} content={<CustomCursor />} />
        </ComposedChart>
      </ResponsiveContainer>
    </section>
  );
}
