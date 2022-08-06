import React from "react";
import { ENetwork } from "../../features/network/networkSlice";
import { ETransactionStatus } from "../../features/transaction/transactionSlice";
import { useChainConfig } from "../../hooks/useChainConfig";
import { useAppSelector } from "../../store/hooks";
import Elipsis from "../Elipsis/Elipsis";

const Transaction: React.FC = () => {
  const {
    transaction: { status, hash },
  } = useAppSelector((state) => state);

  const { activeChain } = useChainConfig();

  if (!activeChain) return <></>;

  let endpoint: string;

  switch (activeChain.id) {
    case 137:
      endpoint = "https://polygonscan.com";
    case 80001:
      endpoint = "https://mumbai.polygonscan.com";
      break;
    default:
      return <></>;
  }

  return (
    <div className="mt-8 text-xs">
      <div>
        <a
          className="break-all underline"
          target="_blank"
          rel="noopener noreferrer"
          href={`${endpoint}/tx/${hash}`}
        >
          {status === ETransactionStatus.COMPLETE && hash}
        </a>
      </div>
      <div className="mt-4">
        {status === ETransactionStatus.PENDING && (
          <>
            transaction pending
            <Elipsis />
          </>
        )}
        {status === ETransactionStatus.COMPLETE && "transaction complete!"}
      </div>
    </div>
  );
};

export default Transaction;
