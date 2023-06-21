import AppHeader from "./AppHeader";
import Image from "next/image";
import Modal from "./Modal";
import Sidebar from "./UI/left-sidebar/Sidebar";

export default function Layout({ children, title, className = "" }) {
  return (
    <>
      {/* <AppHeader /> */}
      <header className="ml-5 mt-6 h-1">
        <Image
          src={"collectible-logo.svg"}
          width={82}
          height={50}
          alt="Collectible Logo"
        />
      </header>
      <Sidebar />
      <Modal />
      <main className={`container space-y-12 px-3 py-12 ${className}`}>
        {children}
      </main>
    </>
  );
}
