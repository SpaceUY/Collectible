import Image from "next/image";
import React, { useEffect } from "react";
import Button from "../UI/Button";
import { Separator } from "./Separator";
import Backdrop from "./Backdrop";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/router";

interface MintModalProps {
  handleCloseMintModal: () => void;
}

const MintModal = ({ handleCloseMintModal }: MintModalProps) => {
  const { user, connectUser, connectBrand } = useUser();
  const router = useRouter();
  const { key } = router.query;

  return (
    <>
      <Backdrop />
      <div className="fixed inset-0 flex items-center justify-center">
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
              <Button
                isLarge
                fullWidth
                action={connectUser}
              >
                Connect Account
              </Button>
            )}
            {!user?.loading && user?.isLoggedIn && (
              <Button
                isLarge
                fullWidth
                action={() => {
                  alert("claim");
                }}
              >
                Claim your Collectible
              </Button>
            )}
            {user?.loading && (
              <Button
                isLarge
                fullWidth
                action={() => {
                  alert("claim");
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
