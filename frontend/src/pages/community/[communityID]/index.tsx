import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import CommunityOverviewCard from "../../../components/home/CommunityOverviewCard";
import Button from "../../../components/UI/Button";
import { COMMUNITY_LIST } from "mock/communities";
import CommunityFeed from "../../../components/community/CommunityFeed";
import CommunityCollections from "../../../components/community/CommunityCollections";
import Head from "next/head";
import Image from "next/image";
import CommunityBenefits from "../../../components/community/CommunityBenefits";

enum CommunityTabs {
  FEED = "feed",
  BENEFITS = "benefits",
  COLLECTIONS = "collections",
}

const communitySections = [
  { tabName: "Feed", tabParam: CommunityTabs.FEED },
  { tabName: "Benefits", tabParam: CommunityTabs.BENEFITS },
  { tabName: "Collections", tabParam: CommunityTabs.COLLECTIONS },
];

export default function CollectiblesPage() {
  const { user } = useUser();
  const router = useRouter();
  const { communityID } = router.query;
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  // initialize the state used to track the current page's data
  const [loading, setLoading] = useState(user?.refreshCollectibles);
  const [selectedSectionParam, setSelectedSectionParam] =
    useState<CommunityTabs>(CommunityTabs.FEED);

  /**  @DEV to be implemented */
  const community = COMMUNITY_LIST.find(
    (community) => community.communityId === communityID,
  );

  const isOwner = user?.communityOwnerships?.find(
    (community) => community.communityId === communityID,
  )
    ? true
    : false;

  const isMember = user?.communityMemberships?.find(
    (community) => community.communityId === communityID,
  )
    ? true
    : false;

  useEffect(() => {
    if (Object.values(CommunityTabs).includes(tab as CommunityTabs)) {
      setSelectedSectionParam(tab as CommunityTabs);
    }

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
  }, [user?.address, user?.refreshCollectibles, user?.collectibles, tab]);

  const handleTabSelection = (sectionParam: CommunityTabs) => {
    router.replace({ query: { ...router.query, tab: sectionParam } });
  };

  return (
    <Layout title="Community Page" className="">
      <Head>
        <title>Collectible - {community?.name}</title>
      </Head>
      <CommunityOverviewCard
        description={community?.description}
        communityName={community?.name}
        communityPicture={community?.communityPicture}
        isOwner={isOwner}
        isMember={isMember}
        coverColor={community?.coverColor}
      />

      <div className="mt-10 mb-11 flex gap-5 ">
        {communitySections.map((section) => {
          const buttonVariant =
            section.tabParam === selectedSectionParam ? "purple" : "empty";
          return (
            <Button
              variant={buttonVariant}
              key={section.tabName}
              action={() => handleTabSelection(section.tabParam)}
            >
              {section.tabName}
            </Button>
          );
        })}
        {isOwner && selectedSectionParam === CommunityTabs.BENEFITS && (
          <Button
            className="ml-auto"
            variant="outlined"
            action={() => {
              router.push(`/community/${communityID}/manage-benefits`);
            }}
          >
            <span className="flex items-center gap-2">
              <Image
                className="h-5 w-5"
                src={"/page-icons/edit-icon.svg"}
                alt="add icon"
                width={20}
                height={20}
              />
              <span>Manage Benefits</span>
            </span>
          </Button>
        )}
        {isOwner && selectedSectionParam === CommunityTabs.COLLECTIONS && (
          <Button
            className="ml-auto"
            variant="outlined"
            action={() => {
              router.push(`/community/${communityID}/manage-collectibles`);
            }}
          >
            <span className="flex items-center gap-2">
              <Image
                className="h-5 w-5"
                src={"/page-icons/edit-icon.svg"}
                alt="add icon"
                width={20}
                height={20}
              />
              <span>Manage Collections</span>
            </span>
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-5">
        {selectedSectionParam === CommunityTabs.FEED && (
          <CommunityFeed
            communityId={community?.communityId}
            communityPicture={community?.communityPicture}
            communityName={community?.name}
            isMember={isMember}
            isOwner={isOwner}
          />
        )}

        {selectedSectionParam === CommunityTabs.BENEFITS && (
          <CommunityBenefits
            communityId={community?.communityId}
            communityName={community?.name}
            isMember={isMember}
          />
        )}
        {selectedSectionParam === CommunityTabs.COLLECTIONS && (
          <CommunityCollections communityId={community?.communityId} />
        )}
      </div>
    </Layout>
  );
}
