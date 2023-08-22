import { Suspense, lazy } from 'react';

const EconomyDisplay = lazy(
  () => import('../modules/dashboard/components/EconomyDisplay'),
);

export default function DashBoard() {
  return (
    <section className="py-16">
      <Suspense>
        <EconomyDisplay />
      </Suspense>
    </section>
  );
}
