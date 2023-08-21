import { yieldFormatter } from './Yield';

export default function ClaimableYield({ value }: { value: string }) {
  return (
    <section className="m-auto flex w-2/3 items-center justify-between p-6">
      <span>Claimable Yield</span>
      <span>{yieldFormatter.format(parseFloat(value))}</span>
    </section>
  );
}
