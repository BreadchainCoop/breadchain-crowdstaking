const hre = require("hardhat");
// const { chalk } = require("chalk");
require("dotenv").config();

const ABI = require("../src/ERC20.json");

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

const main = async () => {
  const addressWithDAI = "0xd6b26861139a52877Cd7adc437Edd7c5383fF585";
  const hardhat1 = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
  const hardhat2 = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
  const hardhat3 = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC";

  const signer = await hre.ethers.getImpersonatedSigner(addressWithDAI);

  const DAIcontract = new hre.ethers.Contract(config.DAI.address, ABI, signer);

  let DAIbalanceHardhat = await DAIcontract.balanceOf(hardhat1);
  let DAIbalanceSource = await DAIcontract.balanceOf(addressWithDAI);
  const parsedDAIHardhatbalance = hre.ethers.utils.formatUnits(
    DAIbalanceHardhat,
    18
  );
  const parsedDAISourcebalance = hre.ethers.utils.formatUnits(
    DAIbalanceSource,
    18
  );

  console.log(
    "BEFORE TRANSFER - source wallet DAI balance: ",
    parsedDAISourcebalance
  );

  console.log(
    "BEFORE TRANSFER - hardhat1 wallet DAI balance: ",
    parsedDAIHardhatbalance
  );

  await DAIcontract.transfer(hardhat1, hre.ethers.utils.parseEther("20000.00"));
  await DAIcontract.transfer(hardhat2, hre.ethers.utils.parseEther("20000.00"));
  await DAIcontract.transfer(hardhat3, hre.ethers.utils.parseEther("20000.00"));

  let DAIbalanceNEW = await DAIcontract.balanceOf(hardhat1);
  const parsedDAIbalanceNEW = hre.ethers.utils.formatUnits(DAIbalanceNEW, 18);

  console.log(
    "AFTER TRANSFER - hardhat wallet DAI balance: ",
    parsedDAIbalanceNEW
  );
};

main();
