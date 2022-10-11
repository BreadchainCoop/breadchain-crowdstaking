const config = {
  NETWORK_STRING: "Hardhat",
  ALCHEMY_API_KEY: process.env.ALCHEMY_ID?.toString(),
  ALCHEMY_URL: "https://polygon-mainnet.g.alchemy.com/v2/",

  DAI: {
    symbol: "DAI",
    decimals: 18,
    address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
  },
  DERIVATIVE: {
    symbol: "ADAI",
    decimals: 18,
    address: "0x82E64f49Ed5EC1bC6e43DAD4FC8Af9bb3A2312EE",
  },
  BREAD: {
    symbol: "BREAD",
    decimals: 18,
    address: "0x11d9efDf4Ab4A3bfabf5C7089F56AA4F059AA14C",
  },
  BREAD: {
    symbol: "BREAD",
    decimals: 18,
    address: "0x11d9efDf4Ab4A3bfabf5C7089F56AA4F059AA14C",
  },
};

module.exports = { config };
