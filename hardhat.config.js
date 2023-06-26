require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    hardhat: {
      forking: {
        url: "https://rpc.testnet.fantom.network/",
      }
    },
    tftm: {
      url: "https://rpc.testnet.fantom.network/",
      accounts: [process.env.PK]
    }
  }
};
