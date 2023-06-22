import Image from "next/image";
import Modal from "./Modal";
import Sidebar from "./UI/left-sidebar/Sidebar";
import { useState } from "react";
import ConnectModal from "./Modals/ConnectModal";

export default function Layout({ children, title, className = "" }) {
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);

  const handleOpenConnectModal = () => {
    setIsConnectModalOpen(true);
  };
  const handleCloseConnectModal = () => {
    setIsConnectModalOpen(false);
  };

  return (
    <>
      <header className="ml-5 mt-6 h-1">
        <Image
          src={"collectible-logo.svg"}
          width={82}
          height={50}
          alt="Collectible Logo"
        />
      </header>
      <Sidebar handleOpenConnectModal={handleOpenConnectModal} />
      <Modal />
      {isConnectModalOpen && (
        <ConnectModal handleCloseConnectModal={handleCloseConnectModal} />
      )}
      <main className={`container space-y-12 px-3 py-12 ${className}`}>
        {children}
      </main>
    </>
  );
}
