import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "../UI/Button";
import Backdrop from "./Backdrop";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/router";
import { useWeb3 } from "@/context/Web3Context";
import Confetti from "react-confetti";
import { decodeVariables } from "utils/functions";
import LoadingWheel from "../UI/LoadingWheel";
import ErrorComponent from "@/components/ErrorComponent";
import { getMerkleProof, getTokenURI } from "@/api/alchemyApi";
import { CollectibleMetadata, QRValues } from "../../../../types";
import { collectibleContractAbi } from "../../collectibleContractAbi";

interface MintModalProps {
  handleCloseMintModal: () => void;
}

const MintModal = ({ handleCloseMintModal }: MintModalProps) => {
  const { user, connectUser } = useUser();
  const { web3 } = useWeb3();
  const router = useRouter();
  const { key } = router.query;

  const [isMinting, setIsMinting] = useState(false);
  const [throwConfetti, setThrowConfetti] = useState(false);

  const [collectibleURI, setCollectibleURI] =
    useState<CollectibleMetadata | null>(null);
  const [keyVariables, setKeyVariables] = useState<QRValues | null>(null);

  const [alreadyClaimed, setAlreadyClaimed] = useState<boolean | null>(null);
  // const [claimedBy, setClaimedBy] = useState<string | null>(null);
  const [merkleProof, setMerkleProof] = useState<any | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  const [error, setError] = useState<string | null>(null);

  const checkAlreadyClaimed = async (
    contractAddress: string,
    tokenID: number,
  ): Promise<boolean> => {
    const contract = new web3.eth.Contract(
      collectibleContractAbi,
      contractAddress,
    );
    let availabilityError;
    try {
      const nftAvailability = await contract.methods.ownerOf(tokenID).call();
      // setClaimedBy(nftAvailability);
    } catch (error) {
      availabilityError = error.message;
    } finally {
      if (availabilityError && availabilityError.includes("invalid token ID")) {
        return false;
      } else {
        return true;
      }
    }
  };

  useEffect(() => {
    if (key && web3) {
      const getCollectible = async () => {
        const decodedData = decodeVariables(key);
        if (decodedData) {
          const tokenID = decodedData.tokenId;
          const tokenURI = decodedData.tokenURI;
          const merkleTreeCID = decodedData.merkleTreeCID;
          const contractAddress = decodedData.contractAddress;
          setKeyVariables(decodedData);

          const isAlreadyClaimed = await checkAlreadyClaimed(
            contractAddress,
            +tokenID,
          );
          if (isAlreadyClaimed) {
            setAlreadyClaimed(true);
            setLoading(false);
          } else {
            // if it is available, fetch the nft, the merkle proof and generate the proof
            const uri = await getTokenURI(tokenURI);
            const merkleProof = await getMerkleProof(tokenID, merkleTreeCID);
            setCollectibleURI(uri);
            setMerkleProof(merkleProof);
            setLoading(false);
          }
        } else {
          setError("Invalid QR code");
          setLoading(false);
        }
      };
      getCollectible();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, web3]);

  const handleMint = async () => {
    const contractInstance = new web3.eth.Contract(
      collectibleContractAbi,
      keyVariables?.contractAddress,
    );
    const tokenId = keyVariables?.tokenId;
    const tokenUri = keyVariables?.tokenURI;
    const password = keyVariables?.password;
    const proof = merkleProof;

    if (!tokenId || !tokenUri || !password || !proof) {
      console.error("One of the parameters is missing or undefined");
      return;
    }
    if (
      !Array.isArray(proof) ||
      !proof.every((p) => /^0x[0-9a-fA-F]{64}$/.test(p))
    ) {
      console.error("Proof must be an array of 32-byte hexadecimal strings");
      return;
    }

    try {
      await contractInstance.methods
        .safeMint(+tokenId, tokenUri, password, proof)
        .send({ from: user?.address });

      setThrowConfetti(true);
    } catch (error) {
      alert(
        "There was an error while minting the NFT. Please try again later.",
      );
      console.error(error);
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
              src={"/isologo.svg"}
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
              onClick={handleCloseMintModal}
            />
          </div>
          <div className="mb-8 flex flex-col items-center justify-center gap-4">
            {loading && (
              <div className="mb-8 flex h-[220px] items-center justify-center">
                <LoadingWheel />
              </div>
            )}

            {!loading && error && (
              <div className="mb-8 flex h-[220px] items-center justify-center">
                <ErrorComponent errorMessage={error} />
              </div>
            )}

            {!loading && !error && alreadyClaimed && (
              <div className="mb-8 flex h-[220px] items-center justify-center">
                <ErrorComponent
                  errorMessage={"This Collectible was already collected."}
                />
              </div>
            )}

            {!loading && !error && !alreadyClaimed && (
              <>
                <h3 className="text-2xl font-semibold text-gray-strong">
                  {collectibleURI.name}
                </h3>
                {throwConfetti && (
                  <Confetti
                    confettiSource={{
                      x: window.innerWidth / 2 - 250,
                      y: window.innerHeight / 2 - 250,
                      w: 500,
                      h: 500,
                    }}
                    // shape="circle"
                    // friction={0.99}
                    recycle={false}
                    numberOfPieces={250}
                    colors={[
                      "#7A5FC8",
                      "#F5F5F5",
                      "#201F23",
                      "#26252C",
                      "#433273",
                    ]}
                    wind={0}
                    gravity={0.1}
                    onConfettiComplete={() => {
                      setThrowConfetti(false);
                    }}
                  />
                )}

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
                {/* <p className="max-w-[480px] text-center text-gray-strong">
                  {collectibleURI.name}
                </p> */}

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
            {!alreadyClaimed &&
              !error &&
              !user?.loading &&
              !user?.isLoggedIn && (
                <Button isLarge fullWidth action={connectUser}>
                  Connect Account
                </Button>
              )}
            {!alreadyClaimed &&
              !error &&
              !user?.loading &&
              user?.isLoggedIn &&
              !isMinting && (
                <Button isLarge fullWidth action={handleMint}>
                  Claim your Collectible
                </Button>
              )}
            {!error && isMinting && (
              <Button isLarge fullWidth action={() => {}}>
                Claiming your Collectible...
              </Button>
            )}
            {!alreadyClaimed && !error && user?.loading && (
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
