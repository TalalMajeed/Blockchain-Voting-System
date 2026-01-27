require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
    sepolia: {
      provider: () =>
        new HDWalletProvider(
          process.env.MNEMONIC,
          `https://eth-sepolia.g.alchemy.com/v2/${process.env.RPC_API_KEY}`,
        ),
      network_id: 11155111,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
      networkCheckTimeout: 1000000,
    },
  },

  mocha: {},

  compilers: {
    solc: {
      version: "0.5.7",
    },
  },
};
