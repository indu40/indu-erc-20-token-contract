# `indu4.0` ERC-20 Smart Contract

## Installation

It is recommended to install [Yarn](https://classic.yarnpkg.com) through the `npm` package manager, which comes bundled with [Node.js](https://nodejs.org) when you install it on your system. It is recommended to use a Node.js version `>= 16.0.0`.

Once you have `npm` installed, you can run the following both to install and upgrade Yarn:

```bash
npm install --global yarn
```

After having installed Yarn, simply run:

```bash
yarn install
```

## Compilation

To compile the contract, it is important that you have installed the project correctly, as we use external dependencies and contracts. Use the following command to compile the contracts:

```bash
yarn compile
```

## Running Deployments

**Example Goerli:**

```bash
yarn deploy:goerli
```

**Example Ethereum Mainnet:**

```bash
yarn deploy:ethmain
```

## Running `CREATE2` Deployments

```bash
yarn xdeploy
```

This repository uses the [xdeploy](https://github.com/pcaversaccio/xdeployer) Hardhat plugin. Check out the documentation for more information on the specifics of the deployments.

## `.env` File

In the `.env` file place the private key of your wallet in the `PRIVATE_KEY` section. This allows secure access to your wallet to use with both testnet and mainnet funds during Hardhat deployments. For more information on how this works, please read the documentation of the `npm` package [`dotenv`](https://www.npmjs.com/package/dotenv).

## Unit Tests

Since we build the [ERC-20](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20) smart contract on top of the audited [OpenZeppelin node modules](https://www.npmjs.com/package/@openzeppelin/contracts), there is no further requirement to write dedicated tests for these modules.

You can run the tests with

```bash
yarn test:hh
```

## Etherscan Verification

Change the contract address to your contract after the deployment has been successful. This works for both testnet and mainnet. You will need to get an API key from [etherscan](https://etherscan.io), [snowtrace](https://snowtrace.io) etc.

**Example:**

```bash
npx hardhat verify --network ethMain <DEPLOYED_CONTRACT_ADDRESS> --constructor-args verify-args.ts
```

## Test Deployments

The smart contract [`Indu40.sol`](./contracts/Indu40.sol) has been deployed to the following test networks:

- **Mumbai:** [`0x91507f5D11B39AE8f3366c9f25cD0C3709AfcCF3`](https://mumbai.polygonscan.com/address/0x91507f5D11B39AE8f3366c9f25cD0C3709AfcCF3)
- **Sepolia:** [`0x91507f5d11b39ae8f3366c9f25cd0c3709afccf3`](https://sepolia.etherscan.io/address/0x91507f5d11b39ae8f3366c9f25cd0c3709afccf3)

## Further References

[1] https://docs.openzeppelin.com/contracts/4.x/erc20
