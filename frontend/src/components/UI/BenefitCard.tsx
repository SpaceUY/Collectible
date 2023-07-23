import Image from "next/image";
import React from "react";
import Button from "./Button";
import { Benefit } from "../../../types";

interface BenefitCardProps {
  benefit: Benefit;
  isMember: boolean;
  isOwner: boolean;
}

const BenefitCard = ({ benefit, isMember, isOwner }: BenefitCardProps) => {
  let imagePath = "";
  switch (benefit.type) {
    case "discord-access":
      imagePath = "/img/benefit-discord.png";
      break;
    case "discord":
      imagePath = "/img/benefit-discord.png";
      break;
    case "zoom-call-access":
      imagePath = "/img/benefit-zoom.png";
      break;
    case "merch":
      imagePath = "/img/benefit-merch.png";
      break;
    case "content":
      imagePath = "/img/benefit-content.png";
      break;
    default:
      break;
  }
  return (
    <div className="w-[230px] cursor-pointer rounded-lg bg-collectible-medium-purple p-4">
      <div className="relative w-full rounded-lg bg-gray-medium">
        <Image
          className="w-full rounded-lg object-cover"
          src={imagePath}
          width={200}
          height={200}
          alt=""
          quality={100}
        />
      </div>

      <h3 className="mb-[1px] mt-3 truncate text-[15px] font-bold text-gray-strong">
        {benefit.name}
      </h3>
      <p className="truncate text-xs font-semibold text-gray-weak">
        Available from {new Date(benefit.startDate).toLocaleString()} to{" "}
        {new Date(benefit.finishDate).toLocaleString()}
      </p>
      {(isMember || isOwner) && (
        <Button
          className="mt-4"
          action={() => {
            // TODO claim benefit
            alert("Currently under development, keep tuned for updates!");
          }}
        >
          Access
        </Button>
      )}
      {!(isMember || isOwner) && (
        <Button
          className="mt-4"
          action={() => {
            alert(`Become a member of this community to access this benefit!`);
          }}
          disabled
        >
          Member-only
        </Button>
      )}
    </div>
  );
};

export default BenefitCard;
