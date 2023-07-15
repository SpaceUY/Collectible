import Image from "next/image";
import React, { useState } from "react";
import Button from "../UI/Button";
import Backdrop from "./Backdrop";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/router";
import { useWeb3 } from "@/context/Web3Context";
import Confetti from "react-confetti";
import { requestMintNFT } from "@/api/nftApi";
interface MintModalProps {
  handleCloseMintModal: () => void;
}

const MintModal = ({ handleCloseMintModal }: MintModalProps) => {
  const { user,  connectUser } = useUser();
  const { web3, contract} = useWeb3();
  const router = useRouter();
  const { key } = router.query;

  const [isMinting, setIsMinting] = useState(false);
  const [throwConfetti, setThrowConfetti] = useState(false);

  const handleMint = async () => {
    // Set loading state to true
    setIsMinting(true);

    try {
      // Request to mint NFT
      const res = await requestMintNFT(user.address, contract);
      // If the request returns no result, log an error and return
      if (!res) {
        console.log("Mint failed (or was canceled by the user).");
        return;
      }

      // Log minting success
      console.log("Mint complete!");

      // Log balance update
      console.log("Updating the user's balance...");

      // Fetch the user's balance in wei
      const wei = await web3.eth.getBalance(user.address);
      // Convert the balance from wei to Ether
      const balance = web3.utils.fromWei(wei);

      // Update the user's state to refresh the collectibles and set the new token ID and balance
      // setUser({
      //   ...user,
      //   refreshCollectibles: true,
      //   balance,
      // });
      setThrowConfetti(true);
    } catch (error) {
      // Log any errors that occur during the process
      console.error("handleMint", error);
    } finally {
      // Set loading state back to false when the operation is complete
      setIsMinting(false);
    }
  };

  return (
    <>
      <Backdrop />
      <div className="fixed inset-0 z-20 flex items-center justify-center">
        <div className="min-w-[500px] rounded-xl border-2 border-collectible-purple-borders bg-collectible-dark-purple p-8">
          <div className="mb-8 flex justify-between">
            <Image
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
              onClick={handleCloseMintModal}
            />
          </div>
          <div className="mb-8 flex flex-col items-center justify-center gap-4">
            <h3 className="text-2xl font-semibold text-gray-strong">
              Collectible Name
            </h3>
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

            <Image
              className=""
              src={"/img/Ace Hiro.png"}
              width={200}
              height={200}
              alt="the nft about to be claimed"
            />
            <p className="max-w-[480px] text-center text-gray-strong">
              Description about your NFT, the creator and the community youre
              about to become a member of
            </p>
          </div>
          <p className="mb-3 text-gray-strong opacity-50">key: {key}</p>
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
