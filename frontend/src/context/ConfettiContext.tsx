import React, { createContext, useContext, useEffect, useState } from "react";
import Confetti from "react-confetti";

// test

type ConfettiContextType = {
  handleThrowConfetti: () => void;
};

const ConfettiContext = createContext<ConfettiContextType>({
  handleThrowConfetti: () => {},
});

export const useConfetti = () => useContext(ConfettiContext);

export const ConfettiProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [throwConfetti, setThrowConfetti] = useState(false);

  const handleThrowConfetti = () => {
    setThrowConfetti(true);

    setTimeout(() => {
      setThrowConfetti(false);
    }, 5000);
  };

  return (
    <ConfettiContext.Provider
      value={{
        handleThrowConfetti,
      }}
    >
      <div className="">
        {throwConfetti && (
          <Confetti
            confettiSource={{
              x: window.innerWidth / 2 - 250,
              y: window.innerHeight / 2 - 250,
              w: 500,
              h: 500,
            }}
            // shape="circle"
            // friction={0.99}
            recycle={false}
            numberOfPieces={250}
            colors={["#7A5FC8", "#F5F5F5", "#201F23", "#26252C", "#433273"]}
            wind={0}
            gravity={0.1}
            onConfettiComplete={() => {
              setThrowConfetti(false);
            }}
          />
        )}
        {children}
      </div>
    </ConfettiContext.Provider>
  );
};
