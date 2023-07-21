import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { LitApi } from "@/api/litprotocolApi";
import { ILitNodeClient } from "@lit-protocol/types";
import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { useWeb3 } from "./Web3Context";
import { useUser } from "./UserContext";
import { generateRandomId } from "utils/functions";

type LitContextType = {
  litApi: LitApi;
  authSig: any;
  handleSignAuthSig: () => void;
};

const LitContext = createContext<LitContextType>({
  litApi: null,
  authSig: null,
  handleSignAuthSig: () => {},
});

const chain = "mumbai";

export const useLit = () => useContext(LitContext);

export const LitProvider = ({ children }: { children: React.ReactNode }) => {
  const [litApi, setLitApi] = useState<LitApi | null>(null);
  const { web3 } = useWeb3();
  const { user } = useUser();
  const [authSig, setAuthSig] = useState<any>(null);

  const handleSignAuthSig = async () => {
    if (authSig) {
      return console.log("AuthSig already signed!");
    }
    if (!web3) {
      return console.error(
        "Web3 must be loaded in order to sign AuthSign with Magics",
      );
    }
    if (!user?.address) {
      return console.log("User must be logged in to sign AuthSig ");
    }
    try {
      const nonce = generateRandomId(); // numeric

      const message = `localhost wants you to sign in with your Ethereum account:
      ${user?.address}

      This is a test statement. You can put anything you want here.

      URI: https://localhost/login
      Version: 1
      Chain ID: 1
      Nonce: ${nonce}
      Issued At: ${new Date().toISOString()}
      `;

      const sig = await web3.eth.personal.sign(message, user?.address, "");
      const authSig = {
        sig: sig,
        derivedVia: "web3.eth.personal.sign",
        signedMessage: message,
        address: user?.address,
      };
      console.log("Signed AuthSig Successfully!, ", authSig);
      setAuthSig(authSig);
    } catch (error) {
      console.error("Error at handleSignAuthSig, ", error);
    }
  };

  useEffect(() => {
    const initLit = async () => {
      try {
        console.log("Connecting with Lit");
        const client = new LitNodeClient({ litNetwork: "serrano" });
        await client.connect();
        console.log("client", client);
        const litApi = new LitApi(client as unknown as ILitNodeClient, chain);
        setLitApi(litApi);
        console.log("Lit Connected Succesfully!");
      } catch (error) {
        console.error("Error at initLit, ", error);
      }
    };
    initLit();
  }, []);

  useEffect(() => {
    if (!web3) {
      return console.error(
        "Web3 must be loaded in order to sign AuthSign with Magics",
      );
    }
    if (!user?.address) {
      return console.error("User must be logged in to sign AuthSig");
    }
    if (!litApi) {
      return console.error("LitApi must be loaded in order to sign AuthSig");
    }
    const signAuthSig = async () => {
      handleSignAuthSig();
    };
    signAuthSig();
  }, [user?.address, web3, litApi]);

  return (
    <LitContext.Provider
      value={{
        litApi,
        authSig,
        handleSignAuthSig,
      }}
    >
      {children}
    </LitContext.Provider>
  );
};
