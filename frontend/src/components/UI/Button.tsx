import React from "react";

interface ButtonProps {
  variant?: "purple" | "white" | "outlined" | "blue";
  isLarge?: boolean;
  fullWidth?: boolean;
  action: () => void;
  children: React.ReactNode;
  className?: string;
}

const Button = ({
  variant = "purple",
  isLarge = false,
  fullWidth = false,
  action,
  children,
  className = "",
}: ButtonProps) => {
  return (
    <button
      className={`flex items-center justify-center rounded-full  text-gray-strong hover:bg-opacity-80
      ${
        variant === "purple"
          ? "border border-transparent bg-collectible-purple"
          : variant === "white"
          ? "border-none border-gray-strong bg-white !text-collectible-purple "
          : variant === "blue"
          ? "border border-transparent bg-collectible-blue "
          : "border-gray-strong bg-transparent hover:bg-collectible-purple hover:bg-opacity-40"
      } ${
        isLarge ? "max-h-12 px-6 py-3 text-base" : "max-h-10 px-5 py-2 text-sm"
      } ${fullWidth ? "w-full" : ""} 
      ${className}`}
      onClick={action}
    >
      {children}
    </button>
  );
};

export default Button;
