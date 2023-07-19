import React from "react";
import Image from "next/image";
import { useModal } from "@/context/ModalContext";
import { AlchemyNFT } from "../../../../types";

interface CollectibleCardProps {
  nft: AlchemyNFT;
  showPictureOnly?: boolean;
}
export const CollectibleCard = ({
  nft,
  showPictureOnly,
}: CollectibleCardProps) => {
  const { handleSelectCollectible, handleOpenCollectibleModal } = useModal();

  const inspectCollectible = () => {
    handleSelectCollectible(nft);
    handleOpenCollectibleModal();
  };

  return (
    <div
      className="flex-grow cursor-pointer rounded-lg bg-collectible-medium-purple p-4"
      onClick={inspectCollectible}
    >
      <div className="relative w-full rounded-lg bg-gray-medium pb-[100%]">
        <Image
          className="absolute inset-0 rounded-lg object-cover object-center"
          src={nft.media[0].gateway}
          layout="fill"
          alt=""
        />
      </div>

      {!showPictureOnly && (
        <>
          <h3 className="mt-3 truncate text-base font-bold text-gray-strong">
            {nft.title}
          </h3>
          <p className="truncate text-sm font-semibold text-gray-weak">
            {nft.description}
          </p>
        </>
      )}
    </div>
  );
};

export default CollectibleCard;
