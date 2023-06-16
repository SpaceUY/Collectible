import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";

import LoadingWrapper from "@/components/LoadingWrapper";
import CollectibleCard from "@/components/CollectibleCard";
import LoginWithMagic from "@/components/LoginWithMagic";
import MintNFTButton from "@/components/MintNFTButton";

export default function CollectiblesPage() {
  const { user } = useUser();

  // initialize the state used to track the current page's data
  const [loading, setLoading] = useState(user?.refreshCollectibles);

  useEffect(() => {
    // do nothing if the user is not logged in
    if (!user?.address) {
      setLoading(true);
      return;
    }

    // disable the loading after collectibles have already been loaded
    if (user?.address && !user?.refreshCollectibles && user?.collectibles) {
      setLoading(false);
      return;
    }
  }, [user?.address, user?.refreshCollectibles, user?.collectibles]);

  return (
    <Layout title="Mint" className="">
      <section className="hero">
        <h1>Mint</h1>

        <p>Here you can mint your NFT with your Code (Identifier).</p>
      </section>

      <LoadingWrapper>
        {user?.address ? (
          <>
            <LoadingWrapper loading={loading}>
              <MintNFTButton
                buttonText={
                  user?.collectibles?.length > 0
                    ? "Mint another NFT"
                    : "Mint an NFT"
                }
                className="mx-auto text-center"
              />
            </LoadingWrapper>
          </>
        ) : (
          <section className="space-y-3 py-10 text-center">
            <LoginWithMagic />
          </section>
        )}
      </LoadingWrapper>
    </Layout>
  );
}
