require("@nomiclabs/hardhat-ethers");
require("hardhat-ethernal");

require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
      forking: {
        url: `https://polygon-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_ID}`,
        blockNumber: 34005554,
      },
    },
  },
  solidity: "0.8.17",
};
