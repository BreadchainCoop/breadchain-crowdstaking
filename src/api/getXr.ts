import axios from "axios";

export const endpoint =
  "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,EUR,GBP";

export const getXr = async (): Promise<{
  EUR: number;
  GBP: number;
  USD: number;
}> => {
  const { data } = await axios.get(endpoint);
  return data;
};
