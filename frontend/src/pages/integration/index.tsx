import { useCallback, useEffect, useState } from "react";
import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { ethers, utils } from "ethers";
import WeaveDB from "weavedb-sdk";
import Button from "@/components/UI/Button";
import Layout from "@/components/Layout";
import { useUser } from "@/context/UserContext";
import { useWeb3 } from "@/context/Web3Context";
import { magic } from "@/lib/magic";

const LIT_ACTION_IPFS_ID = "Qmb75qXbJ3TyR5hSSiAPWQKF3FjeHLxx1yC94qCCw9STrH"; // the OG action
const INFURA_KEY = "000a60eae4dd47f1bbccac8614b0e336";
const PKP_PUBLIC_KEY =
  "0x04bd5f75ef9c9c453ad7558bf6000b7cc91fb97a73ea6742333f5953ae0efd7e6b0f35afbea31740e91d3cfbc7d330b647a9c7a4db45063ce3d838ae0382f1f6ca";

declare global {
  interface Window {
    ethereum: {
      request({ method }: { method: string }): Promise<string[]>;
    };
  }
}

function App() {
  const { user } = useUser();
  const { web3 } = useWeb3();

  const [litNodeClient, setLitNodeClient] = useState(null);
  const [db, setDb] = useState(null);

  const [authSig, setAuthSig] = useState(null);
  const [identity, setIdentity] = useState(null);

  /**
    @DEV Overwrite window.ethereum to be able to simulate a connected wallet 
    without having to use Metamask, returns the Magic wallet address

    @TBD Make sure that this overrides the window.ethereum provided 
    by Metamask, otherwise it will return the MM address instead of Magic's
    (Currently only tested on isolated Brave without Metamask)
  */
  const overwriteEthereum = () => {
    window.ethereum = {
      request: async ({ method }) => {
        switch (method) {
          case "eth_requestAccounts":
            return [user?.address];
          case "eth_accounts":
            return [user?.address];
          default:
            return null;
        }
      },
    };
  };

  /** 
    @DEV Initialize Lit Nodes, connect in order to be able to perform functions
  */
  useEffect(() => {
    const initializeLit = async () => {
      const litNodeClient = new LitNodeClient({ litNetwork: "serrano" });
      await litNodeClient.connect();
      setLitNodeClient(litNodeClient);
      console.log("Initialized Lit Nodes successfully!", litNodeClient);
    };
    initializeLit();
  }, []);

  /** 
    @DEV Initialize WeaveDB, connect to the DB
  */
  useEffect(() => {
    const initializeWeaveDB = async () => {
      if (!web3) {
        return console.error("web3 must be connected and loaded");
      }
      if (!user?.isLoggedIn) {
        return console.error("web3 must be connected and loaded");
      }
      const db = new WeaveDB({
        /**
         @DEV Modified from the original WeaveDB initialization
        Added custom provider to be able to use Magic's RPC provider
        In order to sign with the Magic Wallet
        (Includes modification on weavedb-base and weavedb-sdk)
        */
        customProvider: magic.rpcProvider,
        contractTxId: "jCCWe4tmQa7s2VipsEUW5bIXGNeEdjpAmK2UslxMU4M",
      });

      await db.initializeWithoutWallet();
      setDb(db);
      console.log("Initialized DB successfully!", db);
      overwriteEthereum();
      console.log("window.ethereum overriten successfully!", window.ethereum);
    };
    initializeWeaveDB();
  }, [web3, user?.isLoggedIn]);

  /** 
    @DEV generate an AuthSig to be able to sign with the Magic Wallet
    This only needs to be done once per session, utile to avoid multiple signing
  */
  const signAuthSig = async () => {
    if (!user?.isLoggedIn) {
      return alert("user must be connected");
    }
    const account = user?.address;
    /** 
      @DEV An AuthSig is a wallet signature manually obtained from a user sign.
      Wallet signatures are required to communicate with the Lit Nodes and authorize requests in the user's name.
      We need a signature compliant with the EIP-4361 (SIWE).
      We are generating the authSig using the Magic SDK personal sign method.
    */
    /** 
      EIP-4361 (SIWE) compliant signature:
      {
        address: "0x7ed27ab6ce44b19e2c1ee1317b836d4dec1fd7ae"
        derivedVia: "web3.eth.personal.sign"
        sig: "0xbd181120d4a919f0a3d9e4b2a4bc15736cca6d59ca6adc98dd550bd36e5d55970d3c9affed7d1047c593f888b0cee39c15d4e20a6d613c219e9b4082a2bc80481c"
        signedMessage: "localhost:3000 wants you to sign in with your Ethereum account:\n0x56b5814b833Bf69CAb7dcee9905cD3e5e4e024BF\n\n\nURI: http://localhost:3000/integration\nVersion: 1\nChain ID: 5\nNonce: R6KpeHi
      }
    */
    const message =
      "Collectible wants you to sign in with your account to proof that you're the owner.\nThis is needed in order to proceed with the authentication process.";
    const signedMessage = await web3.eth.personal.sign(message, account, "");
    const authSig = {
      address: account,
      derivedVia: "web3.eth.personal.sign",
      sig: signedMessage,
      signedMessage: message,
    };
    setAuthSig(authSig);
    console.log("AuthSig created and signed succesfully!", authSig);
  };

  /** 
    @DEV Similar to the AuthSig, generate an Identity to be able to sign with the Magic Wallet
    This only needs to be done once per session, utile to avoid multiple signing
  */
  const signIdentity = async () => {
    if (!user?.isLoggedIn) {
      return alert("user must be connected");
    }
    if (!web3) {
      return alert("web3 must be connected and loaded");
    }
    if (!db) {
      return alert("db must be connected and loaded");
    }
    const account = user?.address;
    try {
      const { identity } = await db.createTempAddress(account);
      setIdentity(identity);
      console.log("Identity created and signed succesfully!", identity);
    } catch (error) {
      console.error("Error creating temp address", error);
    }
  };

  /**
   @TBD To be reviewed.
  */
  const litProtocol = async () => {
    const jobID = "relayedPost";
    const signedQuery = await db.sign("add", { message: "test" }, "post", {
      ...identity,
      jobID,
    });

    const res = await litNodeClient.executeJs({
      ipfsId: LIT_ACTION_IPFS_ID,
      authSig,
      jsParams: {
        infura_key: INFURA_KEY,
        params: signedQuery,
        tokenID: 0,
        publicKey: PKP_PUBLIC_KEY,
      },
    });

    const _sig = res.signatures.sig1;
    const sig = utils.joinSignature({
      r: `0x${_sig.r}`,
      s: `0x${_sig.s}`,
      v: _sig.recid,
    });

    await db.relay(jobID, signedQuery, res.response.message.extra, {
      ...identity,
      multisigs: [sig],
    });
  };

  /**
   @TBD To be reviewed 
  */
  const adminCmd = async () => {
    await db.addRelayerJob(
      "relayedPost",
      {
        schema: { type: "string" },
        signers: ["0x1A1585F9C0a2ca7E8f059D8bD722bed304f8f410"],
        multisig: "1",
        multisig_type: "number",
      },
      "peck",
    );
  };

  return (
    <Layout title="testing lit and weave integration">
      <div className="App">
        {user?.isLoggedIn ? (
          <div>
            <div className="flex flex-col gap-1">
              {litNodeClient ? (
                <p className="text-xl text-gray-strong">
                  litNodeClient loaded.
                </p>
              ) : (
                <p className="text-xl text-gray-strong">
                  loading litNodeClient...
                </p>
              )}
              {db ? (
                <p className="text-xl text-gray-strong">
                  WeaveDB Instance loaded.
                </p>
              ) : (
                <p className="text-xl text-gray-strong">
                  loading WeaveDB Instance...
                </p>
              )}
              {identity ? (
                <p className="text-xl text-gray-strong">
                  WeaveDB Identity loaded.
                </p>
              ) : (
                <Button action={signIdentity}>Sign Identity</Button>
              )}
              {authSig ? (
                <p className="text-xl text-gray-strong">Lit AuthSig loaded.</p>
              ) : (
                <Button action={signAuthSig}>Sign AuthSig</Button>
              )}
            </div>

            {litNodeClient && db && identity && authSig && (
              <div className="flex flex-col gap-4">
                <p className="mt-4 text-xl text-gray-strong">
                  All got loaded, you can proceed with your calls now.
                </p>
                <Button action={litProtocol}>
                  Do something with Lit Protocol
                </Button>
                <Button action={adminCmd}>Run admin command</Button>
              </div>
            )}
          </div>
        ) : (
          <div>
            <p className="text-2xl text-gray-strong">
              Must be logged to execute the integration
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default App;
