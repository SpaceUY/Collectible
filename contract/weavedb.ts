const WeaveDB = require("weavedb-sdk-node");
import { ethers } from "ethers";

export async function weaveDB(): Promise<any> {
  class CustomWallet extends ethers.Wallet {
    constructor(privateKey: string) {
      super(privateKey);
    }

    getAddressString() {
      return this.address;
    }

    getPrivateKey() {
      return new Uint8Array(Buffer.from(this.privateKey.slice(2), "hex"));
    }
  }

  const privateKey = process.env.PRIVATE_KEY as string;
  const wallet = new CustomWallet(privateKey);
  const db = new WeaveDB({
    contractTxId: process.env.WEAVEDB_DB_ADDRESS,
  });
  await db.initializeWithoutWallet();
  db.setDefaultWallet(wallet, "evm");
  console.log(
    `Connected to WeaveDB!\nDatabase: ${process.env.WEAVEDB_DB_ADDRESS}\nUsing Wallet: ${wallet.address}\n`
  );
  // const { identity } = await db.createTempAddress(wallet);
  // db.identity = identity;
  return db;
}
