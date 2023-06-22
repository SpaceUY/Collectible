import AppHeader from "./AppHeader";
import Image from "next/image";
import Modal from "./Modal";
import Sidebar from "./UI/left-sidebar/Sidebar";
import SearchBar from "./UI/SearchBar";
import CommunitiesSidebar from "./UI/right-sidebar/CommunitiesSidebar";

export default function Layout({ children, title, className = "" }) {
  return (
    <>
      {/* <AppHeader /> */}
      <header className="ml-5 mt-6 flex">
        <Image
          src={"collectible-logo.svg"}
          width={82}
          height={50}
          alt="Collectible Logo"
        />
        <SearchBar placeholderText="Search Collectibles..." />
      </header>
      <Sidebar />
      <CommunitiesSidebar />
      <Modal />
      <main className={`container space-y-12 px-3 py-12 ${className}`}>
        {children}
      </main>
    </>
  );
}
