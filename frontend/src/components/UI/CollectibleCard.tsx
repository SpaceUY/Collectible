import React from "react";
import Image from "next/image";
import { CollectibleCardProps } from "../../common/interfaces/collectable-card-props.interface";
import { useModal } from "@/context/ModalContext";

export const CollectibleCard = ({
  pictureUrl,
  name,
  description,
  showPictureOnly = false,
  collectionID,
  tokenID,
}: CollectibleCardProps) => {
  const { handleSelectCollectible, handleOpenCollectibleModal } = useModal();

  const inspectCollectible = () => {
    console.log("Inspecting collectible", collectionID, tokenID)
    handleSelectCollectible({
      collectionID,
      tokenID,
    });
    handleOpenCollectibleModal();
  };

 return (
   <div
     className="flex-grow rounded-lg bg-collectible-medium-purple p-4 cursor-pointer"
     onClick={inspectCollectible}
   >
     <div className="relative w-full rounded-lg bg-gray-medium pb-[100%]">
       <Image
         className="absolute inset-0 rounded-lg object-cover object-center"
         src={pictureUrl}
         layout="fill"
         alt=""
       />
     </div>

     {!showPictureOnly && (
       <>
         <h3 className="mt-3 truncate text-base font-bold text-gray-strong">
           {name}
         </h3>
         <p className="truncate text-sm font-semibold text-gray-weak">
           {description}
         </p>
       </>
     )}
   </div>
 );

};

export default CollectibleCard;
