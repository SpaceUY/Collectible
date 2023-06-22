import Modal from "./Modal";
import Sidebar from "./UI/left-sidebar/Sidebar";
import { useEffect, useState } from "react";
import ConnectModal from "./Modals/ConnectModal";
import Header from "./UI/Header";
import MintModal from "./Modals/MintModal";
import { useRouter } from "next/router";
export default function Layout({ children, title, className = "" }) {
  const router = useRouter();
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const handleOpenConnectModal = () => {
    setIsConnectModalOpen(true);
  };
  const handleCloseConnectModal = () => {
    setIsConnectModalOpen(false);
  };

  const [isMintModalOpen, setIsMintModalOpen] = useState(false);
  const handleOpenMintModal = () => {
    setIsMintModalOpen(true);
  };
  const handleCloseMintModal = () => {
    setIsMintModalOpen(false);
  };

  useEffect(() => {
    if (router.query.key) {
      handleOpenMintModal();
    }
  }, [router.query.key]);

  return (
    <>
      <Header />
      <Sidebar handleOpenConnectModal={handleOpenConnectModal} />
      <Modal />
      {isConnectModalOpen && (
        <ConnectModal handleCloseConnectModal={handleCloseConnectModal} />
      )}
      {isMintModalOpen && (
        <MintModal handleCloseMintModal={handleCloseMintModal} />
      )}
      <main className={`container space-y-12 px-3 py-12 ${className}`}>
        {children}
      </main>
    </>
  );
}
