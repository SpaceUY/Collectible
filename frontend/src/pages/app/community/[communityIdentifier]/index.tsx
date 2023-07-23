import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import CommunityOverviewCard from "../../../../components/home/CommunityOverviewCard";
import Button from "../../../../components/UI/Button";
import CommunityFeed from "../../../../components/community/CommunityFeed";
import CommunityCollections from "../../../../components/community/CommunityCollections";
import Head from "next/head";
import Image from "next/image";
import CommunityBenefits from "../../../../components/community/CommunityBenefits";
import { CoverColor, Community } from "../../../../../types";
import { useWeaveDB } from "@/context/WeaveDBContext";
import ErrorComponent from "@/components/ErrorComponent";
import LoadingWheel from "../../../../components/UI/LoadingWheel";

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
  const { communityIdentifier: communityId } = router.query;
  const { allCommunities, loadingDB, loadingDBData } = useWeaveDB();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  const [community, setCommunity] = useState<Community | null>(null);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [isMember, setIsMember] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedSectionParam, setSelectedSectionParam] =
    useState<CommunityTabs>(CommunityTabs.FEED);

  useEffect(() => {
    if (Object.values(CommunityTabs).includes(tab as CommunityTabs)) {
      setSelectedSectionParam(tab as CommunityTabs);
    }
  }, [tab]);

  const handleTabSelection = (sectionParam: CommunityTabs) => {
    router.replace({ query: { ...router.query, tab: sectionParam } });
  };

  useEffect(() => {
    console.log("communityId", communityId);
    if (!loadingDB && !loadingDBData) {
      const community = allCommunities.find(
        (community) => community.communityId === communityId,
      );
      if (!community) {
        setError("Community not found");
        return;
      }
      const isOwner = user.communityOwnerships.includes(communityId as string);
      const isMember = user.communityMemberships.includes(
        communityId as string,
      );
      setCommunity(community);
      setIsOwner(isOwner);
      setIsMember(isMember);
    }
  }, [allCommunities, communityId, user, loadingDB, loadingDBData]);

  return (
    <Layout title="Community Page" className="">
      {error && <ErrorComponent errorMessage={error} />}

      {loadingDBData && (
        <div className="flex h-[calc(100vh-200px)] items-center justify-center">
          <LoadingWheel />
        </div>
      )}
      {!loadingDBData && community && (
        <>
          <Head>
            <title>Collectible - {community.name}</title>
          </Head>
          <CommunityOverviewCard
            description={community.description}
            communityName={community.name}
            communityPicture={community.picture}
            isOwner={isOwner}
            isMember={isMember}
            coverColor={community.coverColor as CoverColor}
          />
          <div className="mb-11 mt-10 flex gap-5 ">
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
                  router.push(`/app/community/${communityId}/manage-benefits`);
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
                  router.push(
                    `/app/community/${communityId}/manage-collectibles`,
                  );
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
                community={community}
                isMember={isMember}
                isOwner={isOwner}
              />
            )}

            {selectedSectionParam === CommunityTabs.BENEFITS && (
              <CommunityBenefits
                community={community}
                isMember={isMember}
                isOwner={isOwner}
              />
            )}

            {selectedSectionParam === CommunityTabs.COLLECTIONS && (
              <CommunityCollections community={community} />
            )}
          </div>
        </>
      )}
    </Layout>
  );
}
