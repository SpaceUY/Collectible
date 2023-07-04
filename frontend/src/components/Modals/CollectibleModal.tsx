import Image from "next/image";
import React from "react";
import Button from "../UI/Button";
import Backdrop from "./Backdrop";
import { CollectibleIdentifier } from "../../context/ModalContext";
import { COLLECTIONS } from "mock/collections";

interface CollectibleModalProps {
  handleCloseCollectibleModal: () => void;
  selectedCollectibleIdentifier: CollectibleIdentifier;
}

const findCollectible = (collectibleIdentifier: CollectibleIdentifier) => {
  console.log("collectible identifier", collectibleIdentifier);
  const collection = COLLECTIONS.find(
    (collection) => collection.id === collectibleIdentifier.collectionID,
  );
  console.log("collection", collection);

  const collectible = collection?.collectibles.find(
    (collectible) => collectible.tokenID === collectibleIdentifier.tokenID,
  );
  console.log("collectible", collectible);
  return collectible;
};

const CollectibleModal = ({
  handleCloseCollectibleModal,
  selectedCollectibleIdentifier,
}: CollectibleModalProps) => {
  const collectible = findCollectible(selectedCollectibleIdentifier);

  return (
    <>
      <Backdrop />
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        onClick={handleCloseCollectibleModal}
      >
        <div
          className="min-w-[500px] rounded-xl border-2 border-collectible-purple-borders bg-collectible-dark-purple p-8"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="mb-8 flex justify-between ">
            <Image
              src={"/collectible-logo.svg"}
              width={120}
              height={50}
              alt="Collectible Logo"
            />
            <Image
              className="hover:cursor-pointer"
              src={"/page-icons/close-icon.svg"}
              width={20}
              height={20}
              alt="Close Collectible modal"
              onClick={handleCloseCollectibleModal}
            />
          </div>
          <div className="mb-8 flex gap-8 ">
            <Image
              className="h-[300px] w-[300px] rounded-lg object-cover"
              src={collectible?.pictureUrl}
              width={300}
              height={300}
              alt="the nft about to be claimed"
            />
            <div className="flex h-full flex-col">
              <h3 className="mb-4 mt-2 text-2xl font-semibold text-gray-strong">
                {collectible.name}
              </h3>
              <p className="mb-4 max-w-[420px] text-gray-strong">
                Description about your NFT, the creator and the community youre
                about to become a member of
              </p>
              <p className="mb-8 max-w-[420px] text-gray-strong">
                Description about your NFT, the creator and the community youre
                about to become a member of
              </p>
              <a
                className="w-[60%] rounded-full"
                href="https://testnets.opensea.io/es"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="blue"
                  action={() => {}}
                  className="w-full gap-2"
                >
                  <p className="font-semibold text-gray-strong">
                    View on OpenSea
                  </p>
                  <Image
                    className=""
                    src="https://testnets.opensea.io/static/images/logos/opensea-logo.svg"
                    alt="open sea link"
                    width={30}
                    height={30}
                  />
                </Button>{" "}
              </a>
            </div>
          </div>

          {/* <p className="mb-3 text-gray-strong opacity-50">key: key</p> */}

          {/* <div className="flex flex-col justify-center">
            <Button
              isLarge
              fullWidth
              action={() => {
                alert("");
              }}
            >
              Collectible Button
            </Button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default CollectibleModal;
