/* eslint-disable */
import React from 'react';
import {
  useAccount, useNetwork, useProvider, useSigner,
} from 'wagmi';
import { BaseProvider } from '@ethersproject/providers';
import claimYield from '../../api/claimYield';
import getBreadSupply from '../../api/getBreadSupply';
import getMultisigDAIBalance from '../../api/getMultisigDAIBalance';
import getMultisigEtherBalance from '../../api/getMultisigEtherBalance';
import getMultisigBREADBalance from '../../api/getMultisigBREADBalance';
import getYieldAccrued from '../../api/getYieldAccrued';
import Button from '../Button';
import Elipsis from '../Elipsis/Elipsis';

export const Pantry: React.FC<React.PropsWithChildren<unknown>> = () => {
  const polygonProvider = useProvider({ chainId: 137 });
  const mumbaiProvider = useProvider({ chainId: 80001 });

  const { connector: activeConnector } = useAccount();
  const { data: signer } = useSigner();
  const { chain: activeChain } = useNetwork();

  const [breadSupply, setBreadSupply] = React.useState<string | null>(null);

  const [claimingYield, setClaimingYield] = React.useState<number>(0);

  const [yieldAccrued, setYieldAccrued] = React.useState<string | null>(null);
  const [rewardsAccrued, setRewardsAccrued] = React.useState<string | null>(
    null,
  );
  const [multisigDAIBalance, setMultisigDAIBalance] = React.useState<
    string | null
  >(null);
  const [multisigBREADBalance, setMultisigBREADBalance] = React.useState<
    string | null
  >(null);
  const [multisigEtherBalance, setMultisigEtherBalance] = React.useState<
    string | null
  >(null);

  React.useEffect(() => {
    const provider = activeChain?.id === 80001 ? mumbaiProvider : polygonProvider;

    getBreadSupply(provider as BaseProvider).then((res) => {
      if (!res) {
        console.error('failed to get bread supply!');
        return;
      }
      setBreadSupply(res.totalSupply);
    });

    getYieldAccrued(provider as BaseProvider).then((res) => {
      if (!res) {
        console.error('Failed to get accrued yield!');
        return;
      }
      console.log('yieldAccrued: ', res.yieldAccrued);
      if (res.yieldAccrued) setYieldAccrued(res.yieldAccrued);
    });
    // getRewardsAccrued(network.network).then((res) => {
    //   if (!res) {
    //     console.error("Failed to get accrued yield!");
    //     return;
    //   }
    //   console.log("yieldAccrued: ", res.rewardsAccrued);
    //   if (res.rewardsAccrued) setRewardsAccrued(res.rewardsAccrued);
    // });
    getMultisigDAIBalance(provider).then((res) => {
      if (!res) {
        console.error('Failed to get multisig balance!');
        return;
      }
      if (res.balance) setMultisigDAIBalance(res.balance);
    });
    getMultisigEtherBalance(provider).then((res) => {
      if (!res) {
        console.error('Failed to get multisig balance!');
        return;
      }
      if (res.balance) setMultisigEtherBalance(res.balance);
    });
    getMultisigBREADBalance(provider).then((res) => {
      if (!res) {
        console.error('Failed to get multisig balance!');
        return;
      }
      if (res.balance) setMultisigBREADBalance(res.balance);
    });
  }, [polygonProvider, activeConnector?.id, activeChain?.id, claimingYield]);

  const handleClaimYield = () => {
    if (activeChain?.unsupported) return;
    if (!activeChain) return;
    if (!signer) return;

    const provider = activeChain.id === 80001 ? mumbaiProvider : polygonProvider;

    claimYield(signer, provider)
      .then((tx) => {
        setYieldAccrued('claiming yield...');
        return tx.wait();
      })
      .catch((error) => console.error(error))
      .finally(() => setClaimingYield(claimingYield + 1));
  };

  const BREADformatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    minimumIntegerDigits: 1,
    useGrouping: false,
  });

  const DAIformatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 6,
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  return (
    <section className="max-w-4xl m-auto p-8 py-16 grid grid-cols-2 gap-8">
      <span>BREAD in circulation: </span>
      {' '}
      {breadSupply ? (
        <span>{BREADformatter.format(parseFloat(breadSupply))}</span>
      ) : (
        <Elipsis />
      )}
      {/* <span>Multisig Ether Balance: </span> <span>{multisigEtherBalance}</span> */}
      <span>Multisig DAI Balance: </span>
      {multisigDAIBalance ? (
        <span>{DAIformatter.format(parseFloat(multisigDAIBalance))}</span>
      ) : (
        <Elipsis />
      )}
      <span>Multisig BREAD Balance: </span>
      {multisigBREADBalance ? (
        <span>{BREADformatter.format(parseFloat(multisigBREADBalance))}</span>
      ) : (
        <Elipsis />
      )}
      <span>Yield Accrued: </span>
      {parseFloat(yieldAccrued || '') ? (
        <span>{DAIformatter.format(parseFloat(yieldAccrued!))}</span>
      ) : (
        <Elipsis />
      )}
      {/* <span>Rewards Accrued: </span> <span>{rewardsAccrued}</span> */}
      <span>
        <Button
          disabled={yieldAccrued === 'claiming yield...'}
          onClick={handleClaimYield}
        >
          Claim Yield
        </Button>
      </span>
    </section>
  );
};

export default Pantry;
