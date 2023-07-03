import { Magic } from "magic-sdk";

// Initialize the Magic instance
const createMagic = () => {
  return (
    typeof window !== "undefined" &&
    new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY, {
      // network: {
      //   rpcUrl: "https://rpc.ankr.com/polygon_mumbai",
      //   chainId: 80001,
      // },
      network: {
        rpcUrl: "https://rpc.sepolia.org",
        chainId: 11155111,
      },
    })
  );
};

export const magic = createMagic();
