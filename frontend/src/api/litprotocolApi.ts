import LitJsSdk from "@lit-protocol/lit-node-client";
import { ILitNodeClient } from "@lit-protocol/types";
import { decryptFromIpfs, encryptToIpfs } from "@lit-protocol/lit-node-client";
import { PostContent } from "types";

console.log("decryptFromIpfs", decryptFromIpfs);
type EncryptedResponse = string;
type DecryptedResponse = unknown;

/** 
 @DEV: This approach will only work with already created collections.
 To also be able to decrypt with possesion of newer collections, 
 lit updateableConditions will be needed, in order to update the accessControlConditions.
 */

export class LitApi {
  private client: ILitNodeClient;
  private chain: string;

  constructor(client: ILitNodeClient, chain: string) {
    this.client = client;
    this.chain = chain;
  }

  // Generate a contract agnostic access control condition
  contractAgnosticACC(contractAddress: string) {
    return {
      contractAddress: contractAddress,
      standardContractType: "ERC721",
      chain: this.chain,
      method: "balanceOf",
      parameters: [":userAddress"],
      returnValueTest: {
        comparator: ">",
        value: "0",
      },
    };
  }

  constructACC(contractAddresses: string[]) {
    const accessControlConditions = [];
    for (let i = 0; i < contractAddresses.length; i++) {
      accessControlConditions.push(
        this.contractAgnosticACC(contractAddresses[i]),
      );
      if (i < contractAddresses.length - 1) {
        accessControlConditions.push({ operator: "or" });
      }
    }

    return accessControlConditions;
  }

  async encrypt(
    authSig: any,
    collectionAddresses: string[],
    content: PostContent,
  ): Promise<EncryptedResponse> {
    const { text, file } = content;
    console.log("encryptToIpfs() call ");

    // Generate accessControlConditions from collectionAddresses
    const accessControlConditions = this.constructACC(collectionAddresses);

    // Encrypt and store on IPFS based on the generated accessControlConditions
    const ipfsCid = await encryptToIpfs({
      authSig,
      accessControlConditions,
      chain: this.chain,
      string: text, // If you want to encrypt a string
      //   file, // If you want to encrypt a file instead of a string
      litNodeClient: this.client,
      infuraId: process.env.NEXT_PUBLIC_INFURA_API_KEY,
      infuraSecretKey: process.env.NEXT_PUBLIC_INFURA_API_KEY_SECRET,
    });

    return ipfsCid;
  }

  async decrypt(authSig, ipfsCid): Promise<DecryptedResponse> {
    console.log("decryptFromIpfs call , cid", ipfsCid);
    const decryptedString = await decryptFromIpfs({
      authSig,
      ipfsCid, // This is returned from the above encryption
      litNodeClient: this.client,
    });
    return decryptedString;
  }
}
