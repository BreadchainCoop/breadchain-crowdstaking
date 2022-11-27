import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';

import { parseEther } from 'ethers/lib/utils.js';
import Button from '../../Button';

import type { ChainConfiguration } from '../../../config';

import BREADABI from '../../../BreadPolygon.json';
import useDebounce from '../../../hooks/useDebounce';

const { abi } = BREADABI;
interface IProps {
  mode: 'BAKE' | 'BURN',
  value: string,
  accountAddress: string,
  chainConfig: ChainConfiguration
}

function BakeOrBurn({
  mode, value, chainConfig, accountAddress,
}: IProps) {
  const [approvalTx, setapprovalTx] = useState<null | `0x${string}`>(null);

  const debouncedValue = useDebounce(value, 500);

  const { BREAD } = chainConfig;

  const parsedValue = parseEther(debouncedValue || '0');

  const { config } = usePrepareContractWrite({
    address: BREAD.address,
    abi,
    functionName: mode === 'BAKE' ? 'mint' : 'burn',
    args: [parsedValue, accountAddress],
  });

  const {
    data, isLoading, isSuccess, write,
  } = useContractWrite(config);

  useEffect(() => {
    if (isSuccess && data) {
      setapprovalTx(data.hash);
    }
  }, [isSuccess, data]);

  const handleSubmit = async () => {
    write?.();
  };

  return (
    <Button
      onClick={handleSubmit}
      disabled={
        // transaction?.status === 'PENDING'
        parseFloat(value) === 0
        || value === ''

      }
      variant="large"
      fullWidth
    >
      {mode === 'BURN' ? 'BURN BREAD' : 'BAKE BREAD'}
    </Button>
  );
}

export default BakeOrBurn;
