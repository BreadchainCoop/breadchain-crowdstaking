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
  const hardhatWallet = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
  const myWallet = "0x8a35D1EB766f4f0Cb3Bb34760B7628f3e04c1c0d";

  const signer = await hre.ethers.getImpersonatedSigner(addressWithDAI);

  const DAIcontract = new hre.ethers.Contract(config.DAI.address, ABI, signer);
  const BREADcontract = new hre.ethers.Contract(
    config.BREAD.address,
    ABI,
    signer
  );

  let DAIbalance = await DAIcontract.balanceOf(hardhatWallet);
  const parsedDAIbalance = hre.ethers.utils.formatUnits(DAIbalance, 18);

  // console.log("myWallet balance: ", parsedDAIbalance);

  // let BREADbalance = await BREADcontract.balanceOf(hardhatWallet);
  // const parsedBREADbalance = hre.ethers.utils.formatUnits(BREADbalance, 18);

  console.log(
    "BEFORE TRANSFER - hardhat wallet DAI balance: ",
    parsedDAIbalance
  );

  // balance = await DAIcontract.balanceOf(myWallet);
  // const parsed = hre.ethers.utils.formatUnits(balance.toString(), 18);

  // console.log("dev wallet balance: ", parsed);

  // const res = await hre.network.provider.send("hardhat_reset");

  await DAIcontract.transfer(
    hardhatWallet,
    hre.ethers.utils.parseEther("20.00")
  );

  let DAIbalanceNEW = await DAIcontract.balanceOf(hardhatWallet);
  const parsedDAIbalanceNEW = hre.ethers.utils.formatUnits(DAIbalanceNEW, 18);

  console.log(
    "AFTER TRANSFER - hardhat wallet DAI balance: ",
    parsedDAIbalanceNEW
  );
};

main();
