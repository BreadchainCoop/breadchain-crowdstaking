const config: any = {
  // MAINNET: {
  //   NETWORK_STRING: "homestead",
  //   ETHERSCAN_API_KEY: import.meta.env.VITE_ETHERSCAN_API_KEY,
  //   ETHERSCAN_URL: "https://api.etherscan.io",
  //   CDAI: {
  //     address: "0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643",
  //   },
  //   DAI: {
  //     symbol: "DAI",
  //     decimals: 18,
  //     address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
  //   },
  //   BREAD: {
  //     symbol: "BREAD",
  //     decimals: 18,
  //     address: "0xEd9265A05Fd6355061e1051c80450638EC84bff3",
  //   },
  // },
  POLYGON: {
    NETWORK_STRING: "polygon",
    ALCHEMY_API_KEY: import.meta.env.VITE_ALCHEMY_API_KEY,
    ALCHEMY_URL: "https://polygon-mainnet.g.alchemy.com/v2/",
    // CDAI: {
    //   address: "0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643",
    // },
    DAI: {
      symbol: "DAI",
      decimals: 18,
      address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
    },
    BREAD: {
      symbol: "BREAD",
      decimals: 18,
      address: "0x11d9efDf4Ab4A3bfabf5C7089F56AA4F059AA14C",
    },
  },
  RINKEBY: {
    NETWORK_STRING: "rinkeby",
    ETHERSCAN_API_KEY: import.meta.env.VITE_ETHERSCAN_API_KEY,
    ETHERSCAN_URL: "https://api-rinkeby.etherscan.io",
    CDAI: {
      address: "0x6D7F0754FFeb405d23C51CE938289d4835bE3b14",
    },
    DAI: {
      symbol: "DAI",
      decimals: 18,
      address: "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa",
    },
    BREAD: {
      symbol: "BREAD",
      decimals: 18,
      address: "0x115dA0Cc5Ffad0C0014963bd1fb3DF4cc8c36220",
    },
  },
};

export default config;
