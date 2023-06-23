import Modal from "./Modal";
import Sidebar from "./UI/Sidebar";
import CommunitiesSidebar from "./UI/CommunitiesSidebar";
import Header from "./UI/Header";

export default function Layout({ children, title, className = "" }) {
  return (
    <div>
      <Header />
      <CommunitiesSidebar />
      <Sidebar />
      <main
        className={`container mx-72 h-full w-full space-y-12 rounded-lg bg-collectible-dark-purple px-5 py-7 md:w-auto ${className}`}
      >
        {children}
      </main>
    </div>
  );
}
