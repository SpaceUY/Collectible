import React, { createContext, useContext, useEffect, useState } from "react";
import { LitApi } from "@/api/litprotocolApi";
import { ILitNodeClient } from "@lit-protocol/types";
import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { useWeb3 } from "./Web3Context";
import { useUser } from "./UserContext";
import { generateRandomId } from "utils/functions";
import { useRouter } from "next/router";
import useWindowSize from "@/hooks/useWindowSize";
// test
const siwe = require("siwe");
const domain = "collectible.vercel.app/";
const origin = "collectible.vercel.app/";

function createSiweMessage(address, statement) {
  const siweMessage = new siwe.SiweMessage({
    domain,
    address,
    statement,
    uri: origin,
    version: "1",
    chainId: "1",
  });
  return siweMessage.prepareMessage();
}
//test
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
  const router = useRouter();
  const [authSig, setAuthSig] = useState<any>(null);
  const size = useWindowSize();

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
      const message = createSiweMessage(user?.address, "Authentication needed to encrypt and decrypt member-only content on Collectible.");

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
    // To be removed from the landing page
    // if (!router.pathname.includes("/app")) {
    //   return console.log("Not in app, so not signing AuthSig");
    // }
    if (!(size.width > 1024)) {
      return console.log("Must be in desktop to sign AuthSig");
    }
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
      // handleSignAuthSig();
    };
    signAuthSig();
  }, [user?.address, web3, litApi, router.pathname]);

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
