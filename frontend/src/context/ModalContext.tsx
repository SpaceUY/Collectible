import CollectibleModal from "@/components/Modals/CollectibleModal";
import ConnectModal from "@/components/Modals/ConnectModal";
import MintModal from "@/components/Modals/MintModal";
import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";

export interface CollectibleIdentifier {
  collectionID: string;
  tokenID: string;
}

// Define the structure of the Web3 context state
type ModalContextType = {
  isConnectModalOpen: boolean;
  handleOpenConnectModal: () => void;
  handleCloseConnectModal: () => void;
  isMintModalOpen: boolean;
  handleOpenMintModal: () => void;
  handleCloseMintModal: () => void;
  isCollectibleModalOpen: boolean;
  handleOpenCollectibleModal: () => void;
  handleCloseCollectibleModal: () => void;
  selectedCollectible: CollectibleIdentifier | null;
  handleSelectCollectible: (
    collectibleIdentifier: CollectibleIdentifier,
  ) => void;
};

// Create the context with default values
const ModalContext = createContext<ModalContextType>({
  isConnectModalOpen: false,
  handleOpenConnectModal: () => {},
  handleCloseConnectModal: () => {},
  isMintModalOpen: false,
  handleOpenMintModal: () => {},
  handleCloseMintModal: () => {},
  isCollectibleModalOpen: false,
  handleOpenCollectibleModal: () => {},
  handleCloseCollectibleModal: () => {},
  selectedCollectible: null,
  handleSelectCollectible: () => {},
});

// Custom hook to use the Web3 context
export const useModal = () => useContext(ModalContext);

// Provider component to wrap around components that need access to the context
export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const handleOpenConnectModal = () => setIsConnectModalOpen(true);
  const handleCloseConnectModal = () => setIsConnectModalOpen(false);

  const [isMintModalOpen, setIsMintModalOpen] = useState(false);
  const handleOpenMintModal = () => setIsMintModalOpen(true);
  const handleCloseMintModal = () => setIsMintModalOpen(false);

  const [isCollectibleModalOpen, setIsCollectibleModalOpen] = useState(false);
  const handleOpenCollectibleModal = () => setIsCollectibleModalOpen(true);
  const handleCloseCollectibleModal = () => setIsCollectibleModalOpen(false);

  const [selectedCollectible, setSelectedCollectible] =
    useState<CollectibleIdentifier | null>(null);

  const handleSelectCollectible = ({
    collectionID,
    tokenID,
  }: CollectibleIdentifier) =>
    setSelectedCollectible({ collectionID, tokenID });

  // If the user presses the 'Escape' key, close the Collectible Modal
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCloseCollectibleModal();
      }
    };
    window.addEventListener("keydown", handleEsc);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []); // Empty array ensures effect is only run on mount and unmount

  // If the user has a NFT key param in the URL, open the mint modal
  useEffect(() => {
    if (router.query.key) {
      handleOpenMintModal();
    }
  }, [router.query.key]);

  return (
    <ModalContext.Provider
      value={{
        isConnectModalOpen,
        handleOpenConnectModal,
        handleCloseConnectModal,
        isMintModalOpen,
        handleOpenMintModal,
        handleCloseMintModal,
        isCollectibleModalOpen,
        handleOpenCollectibleModal,
        handleCloseCollectibleModal,
        selectedCollectible,
        handleSelectCollectible,
      }}
    >
      {isConnectModalOpen && (
        <ConnectModal handleCloseConnectModal={handleCloseConnectModal} />
      )}
      {isMintModalOpen && (
        <MintModal handleCloseMintModal={handleCloseMintModal} />
      )}
      {isCollectibleModalOpen && (
        <CollectibleModal
          handleCloseCollectibleModal={handleCloseCollectibleModal}
          selectedCollectibleIdentifier={selectedCollectible}
        />
      )}
      {children}
    </ModalContext.Provider>
  );
};
