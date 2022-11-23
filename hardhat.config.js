require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

if (process.env.ETHERNAL_EMAIL && process.env.ETHERNAL_PASSWORD)
  require("hardhat-ethernal");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
      forking: {
        url: `https://polygon-mainnet.g.alchemy.com/v2/${process.env.VITE_ALCHEMY_ID}`,
        blockNumber: 34005554,
      },
      mining: {
        auto: true,
        interval: 2000,
      },
    },
  },
  solidity: "0.8.17",
};
