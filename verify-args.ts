import deployConfig from "./deploy-config";

// Arguments export for the constructor npx hardhat verify --network polygon <DEPLOYED_CONTRACT_ADDRESS> --constructor-args ./verify-args.ts
module.exports = [ deployConfig._multisig, deployConfig._amount, deployConfig._cap ];