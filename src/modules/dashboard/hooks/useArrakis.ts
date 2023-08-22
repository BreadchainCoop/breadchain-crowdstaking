import { useEffect, useState } from 'react';

export default function useArrakis() {
  const [data, setData] = useState<{ tvl: string } | null>(null);

  useEffect(() => {
    fetch('https://indexer.api.arrakis.finance/api/vault?version=V1&name=bread')
      .then((res) => res.json())
      .then((jsonData) => {
        setData({
          tvl: jsonData.vaults[0].tvl,
        });
      });
  }, []);

  return {
    data,
  };
}
