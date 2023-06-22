import Image from "next/image";
import Modal from "./Modal";
import Sidebar from "./UI/left-sidebar/Sidebar";
import SearchBar from "./UI/SearchBar";
import CommunitiesSidebar from "./UI/right-sidebar/CommunitiesSidebar";
import { useState } from "react";
import ConnectModal from "./Modals/ConnectModal";

export default function Layout({ children, title, className = "" }) {
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [searchbarQuery, setSearchbarQuery] = useState("");

  const handleOpenConnectModal = () => {
    setIsConnectModalOpen(true);
  };
  const handleCloseConnectModal = () => {
    setIsConnectModalOpen(false);
  };

  return (
    <>
      {/* <AppHeader /> */}
      <header className="mt-6 ml-5 flex">
        <div className="mr-6 w-64">
          <Image
            src={"collectible-logo.svg"}
            width={82}
            height={50}
            alt="Collectible Logo"
          />
        </div>

        <SearchBar
          query={searchbarQuery}
          handleQuery={setSearchbarQuery}
          placeholderText="Search Collectibles..."
        />
      </header>
      <CommunitiesSidebar />
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
