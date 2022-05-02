import React from "react";
import { ENetwork } from "../../features/network/networkSlice";
import { ETransactionStatus } from "../../features/transaction/transactionSlice";
import { useAppSelector } from "../../store/hooks";
import Elipsis from "../Elipsis/Elipsis";

const Transaction: React.FC = () => {
  const {
    network,
    transaction: { status, hash },
  } = useAppSelector((state) => state);

  const endpoint =
    network.network === ENetwork.POLYGON
      ? "https://polygonscan.com"
      : `https://rinkeby.etherscan.io/`;

  return (
    <div className="mt-8 text-xs">
      <div>
        <a
          className="break-all underline"
          target="_blank"
          rel="noopener noreferrer"
          href={`${endpoint}/tx/${hash}`}
        >
          {hash}
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
