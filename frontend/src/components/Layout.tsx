import Sidebar from "./UI/Sidebar";
import CommunitiesSidebar from "./UI/CommunitiesSidebar";
import Header from "./UI/Header";
import { useRouter } from "next/router";

export default function Layout({ children, title, className = "" }) {
  const router = useRouter();

  const isHomeOrExplore =
    router.pathname === "/" || router.pathname === "/explore";
  return (
    <div className="relative mx-auto flex w-full flex-col border-red-500 2xl:px-20">
      <header className="fixed left-0 right-[252px] z-10 flex items-center bg-collectible-medium-purple px-6 py-4 2xl:px-20">
        <Header />
      </header>

      <aside className="fixed top-[87px] bottom-0 z-30 flex w-64 flex-shrink-0 flex-col rounded-lg bg-collectible-dark-purple px-4 py-4">
        <Sidebar />
      </aside>

      <main
        className={`relative top-[87px] mx-auto h-[calc(100vh-100px)] w-[calc(100%-550px)]  flex-shrink flex-grow rounded-lg bg-collectible-dark-purple px-8 py-10`}
      >
        {children}
        <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />{" "}
        <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />{" "}
        <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />{" "}
        <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />{" "}
        <br /> <br />
        <br />
      </main>

      <aside className="fixed top-[0px] bottom-0 right-0 z-40 w-64 flex-shrink-0 rounded-lg bg-collectible-dark-purple px-4 py-4">
        {isHomeOrExplore && <CommunitiesSidebar />}
      </aside>
    </div>
  );
}
