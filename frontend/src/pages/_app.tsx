import "@/styles/globals.css";
import { UserProvider } from "@/context/UserContext";
import { Web3Provider } from "@/context/Web3Context";
import { Poppins } from "@next/font/google";
import { ModalProvider } from "@/context/ModalContext";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  return (
    <Web3Provider>
      <UserProvider>
        <ModalProvider>
          <style jsx global>
            {`
              :root {
                --font-inter: ${poppins.style.fontFamily};
              }
            `}
          </style>
          <Component {...pageProps} />
        </ModalProvider>
      </UserProvider>
    </Web3Provider>
  );
}
