import Sidebar from "./UI/Sidebar";
import CommunitiesSidebar from "./UI/CommunitiesSidebar";
import Header from "./UI/Header";
import { useRouter } from "next/router";

export default function Layout({ children, title, className = "" }) {
  const router = useRouter();

  const isHomeOrExplore = router.pathname === "/" || router.pathname === "/explore";
  return (
    <div className="relative mx-auto flex w-full flex-col  border-red-500 px-6 xl:px-10 2xl:px-20">
      <header className="flex w-full items-center gap-4  py-4">
        <Header />
      </header>

      <div className="flex min-h-[calc(100vh-100px)] w-full gap-4 border-blue-500">
        <aside className=" sticky top-0 bottom-0 min-h-full w-64 flex-shrink-0 rounded-lg bg-collectible-dark-purple px-4 py-4">
          <Sidebar />
        </aside>

        <main
          className={`h-full w-full flex-shrink flex-grow rounded-lg bg-collectible-dark-purple px-8 py-10`}
        >
          {children}
          <br /> <br /> <br /> <br /> <br /> <br /> <br />
          <br /> <br /> <br /> <br /> <br /> <br /> <br />
        </main>

        <aside className="sticky top-0 bottom-0 min-h-full w-64 flex-shrink-0 rounded-lg bg-collectible-dark-purple px-4 py-4 ">
          {isHomeOrExplore && <CommunitiesSidebar />}
        </aside>
      </div>
    </div>
  );
}
