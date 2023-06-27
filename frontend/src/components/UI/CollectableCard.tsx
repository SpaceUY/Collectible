import React from "react";
import Image from "next/image";

export type CollectiveCardProps = {
  pictureUrl: string;
  name: string;
  description: string;
  showPictureOnly?: boolean;
};

export const CollectableCard = ({
  pictureUrl,
  name,
  description,
  showPictureOnly = false,
}: CollectiveCardProps) => {
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

export default CollectableCard;
