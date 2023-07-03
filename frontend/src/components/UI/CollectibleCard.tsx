import React from "react";
import Image from "next/image";
import { CollectableCardProps } from "../../common/interfaces/collectable-card-props.interface";

export const CollectibleCard = ({
  pictureUrl,
  name,
  description,
  showPictureOnly = false,
}: CollectableCardProps) => {
  return (
    <div className="w-[200px] rounded-lg bg-collectible-medium-purple p-4">
      <Image
        src={pictureUrl}
        width={168}
        height={168}
        alt=""
        className="rounded-lg bg-gray-medium"
      />

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
