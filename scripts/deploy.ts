import { ethers } from "hardhat";
import deployConfig from '../deploy-config';

async function main() {
  const Contract = await ethers.getContractFactory("Indu40");
  const contract = await Contract.deploy(deployConfig._multisig, deployConfig._amount, deployConfig._cap);

  await contract.deployed();

  console.log("Indu40 deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
