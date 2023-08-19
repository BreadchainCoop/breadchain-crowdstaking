import {
  Area,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { IChartData } from '../../hooks/useBread';

// interface ITooltipData {
//   payload: IToken;
//   // [key: string]: string;
// }
// [];

function Widget({ supply }: { supply: number }) {
  return (
    <div className="w-auto bg-green-500 p-10 text-gray-700">
      <p>{supply}</p>
    </div>
  );
}

function CustomCursor({ payload }: any) {
  const data = payload[0]?.payload;
  // if (!data) throw new Error("no data data in tooltip!");
  // console.log({ payload });

  if (!data) return null;

  return <Widget supply={data.supply} />;
}

function DefaultSupplyDisplay({ supply }: { supply: number }) {
  return (
    <div className="absolute left-0 top-0">
      <Widget supply={supply} />
    </div>
  );
}

export default function Chart({ chartData }: { chartData: IChartData }) {
  console.log({ chartData });
  return (
    <section className="relative h-full w-full">
      <DefaultSupplyDisplay supply={200} />
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          className="relative"
          data={chartData.tokenDailySnapshots}
        >
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#E429A6" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#A416AD" stopOpacity={1} />
              <stop offset="95%" stopColor="#FF99E2" stopOpacity={0.6} />
            </linearGradient>
          </defs>
          <Line dot={false} type="natural" dataKey="supply" stroke="#8884d8" />
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
