import Sidebar from "./UI/Sidebar";
import CommunitiesSidebar from "./UI/CommunitiesSidebar";
import Header from "./UI/Header";
import { useRouter } from "next/router";

export default function Layout({ children, title, className = "" }) {
  const router = useRouter();

  const isHomeOrExplore =
    router.pathname === "/app" || router.pathname === "/app/explore";
  return (
    <div
      className={`relative mx-auto flex w-full flex-col border-red-500 ${className} min-h-[calc(100vh-96px)]`}
    >
      <header className="fixed left-0 right-[calc(250px+14px)] z-10 flex items-center bg-collectible-medium-purple pt-[14px] pb-[14px] 2xl:left-[7vw] 2xl:right-[calc(250px+14px+7vw)]">
        <Header />
      </header>

      <aside className="fixed left-0 top-[80px] bottom-0 z-30 flex w-[250px] flex-shrink-0 flex-col rounded-lg bg-collectible-dark-purple px-4 py-4 2xl:left-[7vw]">
        <Sidebar />
      </aside>

      <main
        className={`absolute left-[calc(250px+14px)] top-[80px] mx-auto min-h-full w-[calc(100%-500px-28px)] flex-shrink flex-grow rounded-lg bg-collectible-dark-purple px-8 py-10 2xl:left-[calc(250px+7vw+14px)] 2xl:w-[calc(100%-14vw-500px-28px)]`}
      >
        {children}
      </main>

      <aside className="fixed top-[0px] bottom-0 right-0 z-40 w-[250px] flex-shrink-0 rounded-lg bg-collectible-dark-purple px-4 py-[14px] 2xl:right-[7vw]">
        {isHomeOrExplore && <CommunitiesSidebar />}
      </aside>
    </div>
  );
}
