import Layout from "@/components/layout";
import { useContext } from "react";
import { UserContext } from "@/lib/UserContext";

import LoadingWrapper from "@/components/LoadingWrapper";
import CollectibleCard from "@/components/CollectibleCard";
import FaucetSection from "@/components/FaucetSection";
import ConnectOrMint from "@/components/ConnectOrMint";

// store a default listing of NFT images from the collection for display on the page
const tokens = [
  { id: 0, image: "/img/0.jpg" },
  { id: 1, image: "/img/1.jpg" },
  { id: 4, image: "/img/4.jpg" },
  { id: 5, image: "/img/5.jpg" },
];

export default function Home() {
  const [user, setUser] = useContext(UserContext);

  return (
    <Layout title="Home" className="">
      <section className="hero">
        <h1>Magic NFT Demo Site</h1>

        <p>Connect a wallet or use Magic.link to mint a free NFT</p>
      </section>

      <LoadingWrapper>
        <section className="mx-auto space-y-8 text-center">
          <ConnectOrMint />

          <FaucetSection />
        </section>

        <section className="grid gap-8 mx-auto md:grid-cols-3 lg:grid-cols-4">
          {tokens.slice(0, 4).map((item, id) => (
            <CollectibleCard key={id} item={item} />
          ))}
        </section>
      </LoadingWrapper>
    </Layout>
  );
}
