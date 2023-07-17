import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "../UI/Button";
import Backdrop from "./Backdrop";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/router";
import { useWeb3 } from "@/context/Web3Context";
import Confetti from "react-confetti";
import { requestMintNFT } from "@/api/nftApi";
import { encodeVariables, decodeVariables } from "utils/functions";
import LoadingWheel from "../UI/LoadingWheel";
import { getAddressShortcut } from "../../../utils/functions";
interface MintModalProps {
  handleCloseMintModal: () => void;
}

interface QRValues {
  contractAddress: string;
  tokenId: string;
  tokenURI: string;
  password: string;
}

interface URIValue {
  name: string;
  description: string;
  image: string;
}

const QRValues: QRValues = {
  contractAddress: "0x15eFF7A8c5C9d033Fa94B41B7C866d11A869085e",
  tokenId: "0",
  tokenURI: "ipfs://QmT8D9yLPxBSH7gswCZgDC6X1mB9ujGRTq8q1remM4V63a",
  password:
    "0x827187ac3122d06a757b26d9836bc979368fa0e976581eb50a7ca61f4fb3c5fc",
};

const MintModal = ({ handleCloseMintModal }: MintModalProps) => {
  const { user, connectUser } = useUser();
  const { web3 } = useWeb3();
  const router = useRouter();
  const { key } = router.query;

  const [isMinting, setIsMinting] = useState(false);
  const [throwConfetti, setThrowConfetti] = useState(false);
  const [keyVariables, setKeyVariables] = useState<QRValues | null>(null);
  const [collectibleURI, setCollectibleURI] = useState<URIValue | null>(null);

  useEffect(() => {
    const encodedData = encodeVariables(
      QRValues.contractAddress,
      QRValues.tokenId,
      QRValues.tokenURI,
      QRValues.password,
    );
    console.log("encoded data", encodedData);
  }, [key]);

  useEffect(() => {
    if (key) {
      const decodedData = decodeVariables(key);
      console.log("decoded data", decodedData);
      if (decodedData) {
        setKeyVariables(decodedData);
      }
    }
  }, [key]);

  // Find NFT about to be claimed
  useEffect(() => {
    if (keyVariables) {
      const { contractAddress, tokenId, tokenURI, password } = keyVariables;
      console.log("key variables", keyVariables);

      const fetchTokenURI = async () => {
        const gatewayUri = tokenURI.replace(
          "ipfs://",
          "https://alchemy.mypinata.cloud/ipfs/",
        );

        console.log("code gateway", gatewayUri);
        const response = await fetch(gatewayUri);
        const data = await response.json();
        console.log("code data", data);
        setCollectibleURI(data);
      };
      fetchTokenURI();
    }
  }, [keyVariables]);

  const handleMint = async () => {
    setIsMinting(true);

    try {
      console.log("Mint complete!");

      const wei = await web3.eth.getBalance(user.address);
      const balance = web3.utils.fromWei(wei);

      setThrowConfetti(true);
    } catch (error) {
      console.error("handleMint", error);
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <>
      <Backdrop />
      <div className="fixed inset-0 z-[60] flex items-center justify-center">
        <div className="min-w-[500px] rounded-xl border-2 border-collectible-purple-borders bg-collectible-dark-purple p-8">
          <div className="mb-8 flex justify-between">
            <Image
              className="w-28 "
              src={"/collectible-logo.svg"}
              width={60}
              height={50}
              alt="Collectible Logo"
            />
            <Image
              className="hover:cursor-pointer"
              src={"/page-icons/close-icon.svg"}
              width={20}
              height={20}
              alt="Close Mint modal"
              // onClick={handleCloseMintModal}
            />
          </div>
          <div className="mb-8 flex flex-col items-center justify-center gap-4">
            <h3 className="text-2xl font-semibold text-gray-strong"></h3>
            {throwConfetti && (
              <Confetti
                confettiSource={{
                  x: window.innerWidth / 2 - 300,
                  y: window.innerHeight / 2 - 300,
                  w: 600,
                  h: 600,
                }}
                // shape="circle"
                // friction={0.99}
                recycle={false}
                numberOfPieces={250}
                colors={["#7A5FC8", "#F5F5F5", "#201F23", "#26252C", "#433273"]}
                wind={0}
                gravity={0.1}
                onConfettiComplete={() => {
                  setThrowConfetti(false);
                }}
              />
            )}

            {!collectibleURI && (
              <div className="flex items-center justify-center h-[220px] mb-8">
                <LoadingWheel />
              </div>
            )}
            {collectibleURI && (
              <>
                <Image
                  className=""
                  src={`
              ${collectibleURI.image.replace(
                "ipfs://",
                "https://gateway.pinata.cloud/ipfs/",
              )}
              `}
                  width={200}
                  height={200}
                  alt="the nft about to be claimed"
                />
                <p className="max-w-[480px] text-center text-gray-strong">
                  {collectibleURI.name}
                </p>

                <p className="max-w-[480px] text-center text-gray-strong">
                  {collectibleURI.description}
                </p>
{/* 
                <p className="mb-3 text-gray-strong opacity-50">
                  key: {getAddressShortcut(key as string)}
                </p> */}
              </>
            )}
          </div>
          <div className="flex flex-col justify-center">
            {!user?.loading && !user?.isLoggedIn && (
              <Button isLarge fullWidth action={connectUser}>
                Connect Account
              </Button>
            )}
            {!user?.loading && user?.isLoggedIn && !isMinting && (
              <Button isLarge fullWidth action={handleMint}>
                Claim your Collectible
              </Button>
            )}
            {isMinting && (
              <Button isLarge fullWidth action={() => {}}>
                Claiming your Collectible...
              </Button>
            )}
            {user?.loading && (
              <Button
                isLarge
                fullWidth
                action={() => {
                  alert("loading...");
                }}
              >
                loading...
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MintModal;
