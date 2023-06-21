import React from "react";

const Button = ({
  text,
  isFilled,
  isLarge,
  action,
}: {
  text: string;
  isFilled: boolean;
  isLarge: boolean;
  action: () => void;
}) => {
  return (
    <button
      className={`${
        isFilled
          ? "border-transparent bg-collectible-purple hover:border-gray-strong"
          : "border-t-gray-strong bg-transparent"
      } ${
        isLarge
          ? "max-h-12 px-6 py-3 text-base font-semibold"
          : "max-h-10 px-5 py-2 text-sm font-normal"
      } rounded-full border  text-gray-strong  hover:border-t-gray-strong hover:bg-collectible-purple`}
      onClick={action}
    >
      {text}
    </button>
  );
};

export default Button;
