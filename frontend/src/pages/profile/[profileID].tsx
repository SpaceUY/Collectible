import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";

import LoadingWrapper from "@/components/LoadingWrapper";
import CollectibleCard from "@/components/CollectibleCard";
import LoginWithMagic from "@/components/LoginWithMagic";
import MintNFTButton from "@/components/MintNFTButton";
import { useRouter } from "next/router";

export default function CollectiblesPage() {
  const { user } = useUser();
  const router = useRouter();
  const { profileID } = router.query;

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
    <Layout title="Profile" className="">
      <section className="hero">
        <h1>Profile</h1>
        <h2>User: {profileID}</h2>

        <p>Users can see their obtained Collectibles.</p>
      </section>

      <LoadingWrapper>
        {user?.address ? (
          <>
            <LoadingWrapper loading={loading}>
              <div className="flex justify-center">
                <section className="mx-auto inline-grid gap-8 md:grid-cols-3 lg:grid-cols-4">
                  {user?.collectibles?.map((uri, id) => (
                    <CollectibleCard key={id} tokenURI={uri} />
                  ))}
                </section>
              </div>
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
