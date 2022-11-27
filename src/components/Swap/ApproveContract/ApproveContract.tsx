import { useEffect, useState } from 'react';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { ethers } from 'ethers';

import Button from '../../Button';

import ERC20ABI from '../../../ERC20.json';
import type { ChainConfiguration } from '../../../config';

interface IProps {
  chainConfig: ChainConfiguration;
}

function ApproveContract({ chainConfig }: IProps) {
  const [approvalTx, setapprovalTx] = useState<null | `0x${string}`>(null);

  const { DAI, BREAD } = chainConfig;

  const { config } = usePrepareContractWrite({
    address: DAI.address,
    abi: ERC20ABI,
    functionName: 'approve',
    args: [BREAD.address, ethers.constants.MaxUint256],
  });

  const {
    data, isLoading, isSuccess, write,
  } = useContractWrite(config);

  useEffect(() => {
    if (isSuccess && data) {
      setapprovalTx(data.hash);
    }
  }, [isSuccess, data]);

  const handleApproveContract = async () => {
    write?.();
  };

  return (
    <div className="flex flex-col gap-6">
      <Button
        onClick={handleApproveContract}
        variant="large"
        dataTest="approve-contract-button"
        disabled={!!approvalTx}
      >
        Approve Contract
      </Button>
      <div className="pb-6 text-xs text-neutral-300">
        You&apos;ll need to approve the BREAD contract to mint BREAD
      </div>
    </div>
  );
}

export default ApproveContract;
