import useArrakis from '../hooks/useArrakis';
import { yieldFormatter } from './Yield/Yield';

export default function Arrakis() {
  const { data } = useArrakis();

  return (
    <section className="m-auto flex w-2/3 items-center justify-between p-6">
      <span>Arrakis TVL </span>
      {data && yieldFormatter.format(parseFloat(data.tvl))}
    </section>
  );
}
