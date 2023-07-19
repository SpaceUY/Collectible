import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/router";
import Image from "next/image";
import { useWeb3 } from "@/context/Web3Context";
import CollectibleCardSkeleton from "@/components/CollectibleCardSkeleton";
import Head from "next/head";
import CollectiblesReel from "@/components/UI/CollectiblesReel";
import { getAddressShortcut } from "utils/functions";

export default function CollectiblesPage() {
  const { user } = useUser();
  console.log("USER", user);
  const router = useRouter();
  const { profileAddress } = router.query;

  const [profileCollectibles, setProfileCollectibles] = useState([]);
  const [loadingCollectibles, setLoadingCollectibles] = useState(true);
  console.log('user collectibles', user?.collectibles)

  // useEffect(() => {
  //   const fetchProfileNFTs = async () => {
  //     setLoadingCollectibles(true);
  //     const collectibles = await fetchMockedNFTs(profileAddress, contract);
  //     if (Array.isArray(collectibles)) {
  //       setProfileCollectibles(collectibles);
  //     }
  //     setLoadingCollectibles(false);
  //   };
  //   fetchProfileNFTs();
  // }, [profileAddress, contract]);

  return (
    <Layout title="Profile" className="min-h-[calc(100vh-100px)]">
      <Head>
        <title>Collectible - Profile</title>
      </Head>

      <div className="mb-8 flex items-center gap-4 ">
        <div className="rounded-full border-[1px] bg-gray-strong">
          <Image
            /** 
               @DEV remove opacity-0 to display image
            **/
            className="h-16 w-16 rounded-full border-gray-strong opacity-0"
            src={"collectible-logo.svg"}
            width={50}
            height={50}
            alt="Collectible Logo"
          />
        </div>
        <span className="flex flex-col">
          <p className="text-lg font-semibold text-gray-strong opacity-50 ">
            User Name
          </p>
          <p className="text-sm text-gray-strong opacity-50">
            {getAddressShortcut((profileAddress as string) || "")}
          </p>
        </span>
      </div>

      <div className="mb-8 flex flex-col justify-center gap-3">
        <h3 className="text-xl font-semibold text-gray-strong">Collectibles</h3>
        {/* {user?.collectibles?.length > 0 && (
          <CollectiblesReel collectibleCards={user.collectibles} />
        )} */}
        {user?.collectibles?.length === 0 && <CollectibleCardSkeleton hidden />}
        {/* <section className="inline-grid gap-8 md:grid-cols-3 lg:grid-cols-4">
          {loadingCollectibles ? (
            <>
              <CollectibleCardSkeleton />
              <CollectibleCardSkeleton />
              <CollectibleCardSkeleton />
              <CollectibleCardSkeleton />
            </>
          ) : profileCollectibles.length > 0 ? (
            profileCollectibles.map((uri, id) => (
              <CollectibleCard key={id} tokenURI={uri} />
            ))
          ) : (
            <CollectibleCardSkeleton hidden />
          )}
        </section> */}
      </div>

      {/* <div className="flex flex-col justify-center gap-3">
        <h3 className="text-xl font-semibold text-gray-strong">Communities</h3>
        <section className="inline-grid gap-8 md:grid-cols-3 lg:grid-cols-4">
          {loadingCollectibles ? (
            <>
              <CollectibleCardSkeleton />
              <CollectibleCardSkeleton />
              <CollectibleCardSkeleton />
              <CollectibleCardSkeleton />
            </>
          ) : profileCollectibles.length > 0 ? (
            profileCollectibles.map((uri, id) => (
              <CollectibleCard key={id} tokenURI={uri} />
            ))
          ) : (
            <CollectibleCardSkeleton hidden />
          )}
        </section>
      </div> */}
    </Layout>
  );
}
