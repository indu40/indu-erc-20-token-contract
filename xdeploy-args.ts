import deployConfig from "./deploy-config";

// Input the arguments for the constructor xdeployer
const data = [
    deployConfig._multisig,
    deployConfig._amount,
    deployConfig._cap,
];
// Export the arguments to be picked up by the `hardhat.config.ts` deployment script
export { data };
