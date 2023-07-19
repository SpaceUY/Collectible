import Layout from "@/components/Layout";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/router";
import Image from "next/image";
import CollectibleCardSkeleton from "@/components/CollectibleCardSkeleton";
import Head from "next/head";
import CollectiblesReel from "@/components/UI/CollectiblesReel";
import { getAddressShortcut } from "utils/functions";
import { use, useEffect, useState } from "react";
import { getUserNFTsOnCollections } from "@/api/alchemyApi";
import { useWeaveDB } from "@/context/WeaveDBContext";
import { AlchemyNFT } from "../../../../types";
import { magic } from "@/lib/magic";

export default function CollectiblesPage() {
  const { user } = useUser();
  const { allCollectionsAddresses } = useWeaveDB();
  const router = useRouter();
  const { profileAddress } = router.query;

  const [profileNfts, setProfileNfts] = useState<AlchemyNFT[]>([]);
  const [loadingProfileNfts, setLoadingProfileNfts] = useState<boolean>(true);

  const handleShowMagicUI = async () => {
    const walletInfo = await magic.wallet.getInfo();
    const walletType = walletInfo.walletType;
    if (walletType === "magic") {
      await magic.wallet.showUI();
    }
  };

  // if inspected profile is not the current user, fetch the nfts.
  useEffect(() => {
    if (!profileAddress) return;
    // if (user?.loading) return;
    // if (profileAddress !== user?.address) {
    const getUserNfts = async () => {
      try {
        console.log("trigerring request to user nfts");
        const userNfts = await getUserNFTsOnCollections(
          profileAddress as string,
          allCollectionsAddresses,
        );
        console.log("user nfts", userNfts);
        console.log("user", user);
        setProfileNfts(userNfts as unknown as AlchemyNFT[]);
      } catch (error) {
        console.log("error at fetching profile nfts", error);
      } finally {
        setLoadingProfileNfts(false);
      }
    };
    getUserNfts();
    // } else {
    //   setProfileNfts(user?.collectibles as unknown as AlchemyNFT[]);
    // }
  }, [profileAddress, user]);

  return (
    <Layout title="Profile" className="min-h-[calc(100vh-100px)]">
      <Head>
        <title>Collectible - Profile</title>
      </Head>

      <div className="mb-8 flex items-center">
        <div
          className="flex cursor-pointer items-center gap-4"
          onClick={handleShowMagicUI}
        >
          <div className="rounded-full border-[1px] bg-gray-strong">
            <Image
              /** 
               @DEV remove opacity-0 to display image
            **/
              className="h-16 w-16 rounded-full border-gray-strong opacity-0"
              src={"isologo.svg"}
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
      </div>

      <div className="mb-8 flex flex-col justify-center gap-3">
        <h3 className="text-xl font-semibold text-gray-strong">
          Owned collectibles
        </h3>
        {loadingProfileNfts && (
          <section className="inline-grid gap-8 md:grid-cols-3 lg:grid-cols-4">
            <CollectibleCardSkeleton />
            <CollectibleCardSkeleton />
            <CollectibleCardSkeleton />
            <CollectibleCardSkeleton />
          </section>
        )}

        {profileNfts.length > 0 && <CollectiblesReel nfts={profileNfts} />}

        {profileNfts.length === 0 && <CollectibleCardSkeleton hidden />}
      </div>
    </Layout>
  );
}
