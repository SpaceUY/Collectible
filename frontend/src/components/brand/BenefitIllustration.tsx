import React from "react";
import Image from "next/image";

const benefits: { image: string; benefitName: string }[] = [
  {
    image: "/img/benefit-zoom.svg",
    benefitName: "benefit-zoom",
  },
  {
    image: "/img/benefit-merch.svg",
    benefitName: "benefit-merch",
  },
  {
    image: "/img/benefit-discord.svg",
    benefitName: "benefit-discord",
  },
];

const BenefitIllustration = ({
  illustrationName,
  onSelectIllustration,
}: {
  illustrationName: string;
  onSelectIllustration: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleBenefitSelection = (benefitValue: string) => {
    if (benefitValue === illustrationName) {
      onSelectIllustration("");
      return;
    }

    onSelectIllustration(benefitValue);
  };

  return (
    <div className="flex gap-4 rounded-lg bg-collectible-medium-purple py-3 px-5">
      {benefits.map((benefit) => {
        const borderColor =
          benefit.benefitName === illustrationName
            ? "border-collectible-purple-borde"
            : "border-transparent";

        return (
          <div
            className={`${borderColor} flex h-32 w-32 rounded-lg border-2 bg-collectible-dark-purple p-3 hover:cursor-pointer hover:border-gray-medium`}
            key={benefit.benefitName}
            onClick={() => handleBenefitSelection(benefit.benefitName)}
            rounded-lg
          >
            <Image src={benefit.image} width={150} height={150} alt="" />
          </div>
        );
      })}
    </div>
  );
};

export default BenefitIllustration;
