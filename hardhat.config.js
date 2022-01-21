require("dotenv/config");
require("@nomiclabs/hardhat-truffle5");
require("hardhat-gas-reporter");

accInfo = [`0x${process.env.MMC_OWPK}`,
           `0x${process.env.MMC_PK1}`,]

accInfoTest = [`0x${process.env.MMC_OWPK}`,
               `0x${process.env.MMC_PK1}`,]

accInfoLocal = [{privateKey: `0x${process.env.MMC_OWPK}`, balance: (4.056033348118027032 * 1e18).toString()},
                {privateKey: `0x${process.env.MMC_PK1}`, balance: (0.35 * 1e18).toString()},]

module.exports = {
  networks: {
    mainnet: {
      url: process.env.ALCHEMY_API_URL,
      accounts: accInfo,
    },
    rinkeby: {
      url: process.env.ALCHEMY_TESTAPI_URL,
      accounts: accInfoTest,
    },
    hardhat: {
      accounts: accInfoLocal,
      forking: {
        url: process.env.ALCHEMY_TESTAPI_URL,
        //blockNumber: 11422626,
        enabled: true,
      },
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.7",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      {
        version: "0.8.4",
      },
      {
        version: "0.7.3",
      },
      {
        version: "0.4.21",
      },
    ],
  },
  mocha: {
    timeout: 300 * 1e3,
  },
};