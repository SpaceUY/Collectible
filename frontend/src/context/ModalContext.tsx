import CollectibleModal from "@/components/Modals/CollectibleModal";
import ConnectModal from "@/components/Modals/ConnectModal";
import MintModal from "@/components/Modals/MintModal";
import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";

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
  selectedCollectibleId: string;
  handleSelectCollectibleId: (collectibleId: string) => void;
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
  selectedCollectibleId: "",
  handleSelectCollectibleId: (collectibleId: string) => {},
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

  const [selectedCollectibleId, setSelectedCollectibleID] = useState("");
  const handleSelectCollectibleId = (collectibleId: string) =>
    setSelectedCollectibleID(collectibleId);

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
        selectedCollectibleId,
        handleSelectCollectibleId,
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
        />
      )}
      {children}
    </ModalContext.Provider>
  );
};
