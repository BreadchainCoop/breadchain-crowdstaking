import { yieldFormatter } from './Yield';

export default function ClaimableYield({ value }: { value: string }) {
  return (
    <section className="m-auto flex w-2/3 items-center justify-between rounded-lg border-2 border-breadgray-grey p-6">
      <span>Claimable Yield</span>
      <span>{yieldFormatter.format(parseFloat(value))}</span>
    </section>
  );
}
