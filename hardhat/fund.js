const hre = require("hardhat");

const { config } = require("./config");
const ABI = require("../src/ERC20.json");

require("dotenv").config();

const addressWithDAI = "0xd6b26861139a52877Cd7adc437Edd7c5383fF585";
const sourceSigner = await hre.ethers.getImpersonatedSigner(addressWithDAI);

const fundAccount = async ({ address, name }) => {
  const DAIcontract = new hre.ethers.Contract(
    config.DAI.address,
    ABI,
    sourceSigner
  );

  await DAIcontract.transfer(address, hre.ethers.utils.parseEther("20000.00"));

  let DAIbalanceNEW = await DAIcontract.balanceOf(address);
  const parsedDAIbalanceNEW = hre.ethers.utils.formatUnits(DAIbalanceNEW, 18);

  console.log(
    `transfer complete -> ${name} wallet DAI balance: `,
    parsedDAIbalanceNEW
  );
};

const main = async () => {
  // Timeout is to allow time for node to spin up
  // when running two scripts concurrently.
  // See hardhat:dev script in package.json
  setTimeout(async () => {
    const accounts = [
      {
        name: "hardhat1",
        address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      },
      {
        name: "hardhat2",
        address: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
      },
      {
        name: "hardhat3",
        address: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
      },
    ];
    await Promise.all(accounts.map((account) => fundAccount(account)));
  }, 3000);
};

main();
