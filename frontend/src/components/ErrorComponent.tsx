import React from "react";

interface ErrorComponentProps {
  errorMessage: string;
}
const ErrorComponent = ({ errorMessage }: ErrorComponentProps) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center text-gray-400">
      <h1 className="text-2xl">Something Went Wrong.</h1>
      <p>{errorMessage}</p>
    </div>
  );
};

export default ErrorComponent;
