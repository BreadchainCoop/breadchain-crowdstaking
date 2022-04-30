import React from "react";
import getYieldAccrued from "../../api/getYieldAccrued";
import config from "../../config";
import { ENetwork } from "../../features/network/networkSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const Transactions: React.FC = () => {
  const dispatch = useAppDispatch();
  const { network, wallet } = useAppSelector((state) => state);
  const [state, setState] = React.useState<{
    transactions: any[];
    ETHERSCAN_URL: string;
  }>({
    ETHERSCAN_URL: "",
    transactions: [],
  });

  const { transactions } = state;

  React.useEffect(() => {
    console.log("TRANSACTIONS: ", network);

    // const { ETHERSCAN_API_KEY, ETHERSCAN_URL } = config[network.network];

    // console.log(ETHERSCAN_URL);
    // console.log("address", wallet.address);

    // const url = `${ETHERSCAN_URL}/api?module=account&action=txlist&address=${wallet.address}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=${ETHERSCAN_API_KEY}`;

    setTimeout(async () => {
      if (!network.network || network.network === ENetwork.UNSUPPORTED) return;
      const yieldAccrued = await getYieldAccrued(network.network);
      console.log("yieldAccrued: ", yieldAccrued);

      // fetch(url)
      //   .then((res) => res.json())
      //   .then((data) => {
      //     setState({ ...state, transactions: [...data.result] });
      //   });
    }, 2000);

    //   fetch(`${ETHERSCAN_URL}/api
    // ?module=account
    // &action=balance
    // &address=${address}
    // &tag=latest
    // &apikey=${ETHERSCAN_API_KEY}`)
    //     .then((res) => res.json())
    //     .then((data) => {
    //       console.log(data);
    //     });
  }, [network.network]);

  const makeEtherscanURL = (hash: string, resourceType: "address" | "tx") => {
    if (!network.network) return;
    const endpoint =
      network.network === ENetwork.MAINNET
        ? "https://etherscan.io"
        : "https://rinkeby.etherscan.io";
    return `${endpoint}/${resourceType}/${hash}`;
  };

  return (
    <section className="max-w-4xl m-auto px-2 sm:px-4">
      <div className="text-gray-300">
        {transactions.map((tx: any, i: number) => {
          const num = parseInt(tx.timeStamp) * 1000;
          const date = new Date(num).toLocaleDateString();
          const time = new Date(num).toLocaleTimeString();
          const { hash, from, to } = tx;

          return (
            <div
              key={`tx_key__${i}`}
              className="my-4 p-4 text-xs bg-breadgray-100"
            >
              <div className="pb-4">
                <span className="mr-4">{date}</span>
                <span>{time}</span>
              </div>
              <div className="pb-4 truncate text-ellipsis">
                Hash:{" "}
                <a
                  href={makeEtherscanURL(hash, "tx")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-gray-200"
                >
                  {hash}
                </a>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="mb-2">From:</div>
                  <a
                    href={makeEtherscanURL(from, "address")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-gray-200"
                  >
                    <div className="truncate text-ellipsis">{from}</div>
                  </a>
                </div>
                <div>
                  <div className="mb-2">To:</div>
                  <a
                    href={makeEtherscanURL(to, "address")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-gray-200"
                  >
                    <div className="truncate text-ellipsis">{to}</div>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Transactions;
