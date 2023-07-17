import { HardhatUserConfig } from "hardhat/config";
require("@nomiclabs/hardhat-ethers");
require("@nomicfoundation/hardhat-toolbox");
require("@openzeppelin/hardhat-upgrades");
require("dotenv").config();

const config: HardhatUserConfig = {
  defaultNetwork: "mumbai", // Default network to use for hardhat commands, comment line to use localhost
  networks: {
    hardhat: {},
    mumbai: {
      url: process.env.ALCHEMY_MUMBAI_URL,
      accounts: [process.env.PRIVATE_KEY as string],
    },
  },
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
      },
    },
  },
};

export default config;
