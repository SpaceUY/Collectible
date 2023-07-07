import React from "react";
import Select from "react-select";
import { BenefitOptions } from "../../common/enums/benefit-options.enum";
import { AiOutlineInfoCircle } from "react-icons/ai";

const benefitsOptions = [
  { value: BenefitOptions.MERCH, label: "Merch" },
  { value: BenefitOptions.CONTENT, label: "Content" },
  { value: BenefitOptions.ZOOM_CALL, label: "Zoom Call" },
  { value: BenefitOptions.DISCORD_ACCESS, label: "Discord Access" },
  { value: BenefitOptions.CUSTOM, label: "Custom" },
];

const BenefitSelector = ({
  benefit,
  onSelectBenefit,
}: {
  benefit: BenefitOptions;
  onSelectBenefit: React.Dispatch<React.SetStateAction<BenefitOptions>>;
}) => {
  const customStyles = {
    option: (defaultStyles, state) => ({
      ...defaultStyles,
      color: state.isSelected ? "#F5F5F5" : "rgba(245, 245, 245, 0.5)",
      backgroundColor: state.isFocused ? "#7A5FC8" : "#26252C",
      padding: "5px",
      border: state.isFocused ? 0 : 0,
      boxShadow: state.isFocused ? 0 : 0,
      "&:hover": {
        border: state.isFocused ? 0 : 0,
      },
    }),
    control: (defaultStyles) => ({
      ...defaultStyles,
      backgroundColor: "#26252C",
      padding: "7px",
      border: "none",
      boxShadow: "none",
    }),
    singleValue: (defaultStyles) => ({ ...defaultStyles, color: "#F5F5F5" }),
  };

  return (
    <>
      <Select
        options={benefitsOptions}
        onChange={(e) => onSelectBenefit(e.value)}
        styles={customStyles}
      />
      {benefit === BenefitOptions.CUSTOM && (
        <div className="mt-5 flex px-1 text-collectible-purple">
          <AiOutlineInfoCircle className="mr-4 text-[40px]" />
          <p className="text-sm">
            Tell us what kind of benefit would you like to offer:
            info@collectible.com
          </p>
        </div>
      )}
    </>
  );
};

export default BenefitSelector;
