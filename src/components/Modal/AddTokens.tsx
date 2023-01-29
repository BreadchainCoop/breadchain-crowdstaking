import { useNetwork } from 'wagmi';
import { watchAsset } from '../../api/watchAsset';

import Button from '../Button';

export function AddTokens() {
  const { chain: activeChain } = useNetwork();

  const handleAddToken = async (token: 'DAI' | 'BREAD') => {
    if (!activeChain || activeChain.unsupported)
      throw new Error('Active chain not valid');
    const { id: chainId } = activeChain;
    watchAsset(token, chainId);
  };

  return (
    <div className="mt-16">
      <div className="mb-8 text-xs text-neutral-300">Add tokens to wallet</div>
      <div className="flex gap-4">
        <Button onClick={() => handleAddToken('BREAD')} disabled={false}>
          BREAD
        </Button>
        <Button onClick={() => handleAddToken('DAI')} disabled={false}>
          DAI
        </Button>
      </div>
    </div>
  );
}

export default AddTokens;
