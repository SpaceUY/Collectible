import "@/styles/globals.css";
import { UserProvider } from "@/context/UserContext";
import { Web3Provider } from "@/context/Web3Context";
import { Poppins } from "@next/font/google";
import { ModalProvider } from "@/context/ModalContext";
import { WeaveDBProvider } from "../context/WeaveDBContext";
import { LitProvider } from "@/context/LitContext";
import useWindowSize from "@/hooks/useWindowSize";
import Image from "next/image";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});
Image;
const NotAvailableAOnMobileComponent = () => {
  return (
    <div
      className="custom-scrollbar flex h-screen snap-y snap-mandatory flex-col items-center justify-center gap-8 overflow-auto"
      style={{
        backgroundImage: `url('/img/landing-system.svg')`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Image
        src={"/isologo.svg"}
        width={180}
        height={200}
        alt="Collectible Logo"
      />
      <p className="px-8 text-center text-xl text-gray-strong">
        We will be available in mobile devices soon!
      </p>
    </div>
  );
};

export default function App({ Component, pageProps }) {
  const size = useWindowSize();

  return (
    <Web3Provider>
      <UserProvider>
        <WeaveDBProvider>
          <LitProvider>
            <ModalProvider>
              <style jsx global>
                {`
                  :root {
                    --font-inter: ${poppins.style.fontFamily};
                  }
                `}
              </style>
              {size.width < 1024 ? (
                <NotAvailableAOnMobileComponent />
              ) : (
                <Component {...pageProps} />
              )}
            </ModalProvider>
          </LitProvider>
        </WeaveDBProvider>
      </UserProvider>
    </Web3Provider>
  );
}
