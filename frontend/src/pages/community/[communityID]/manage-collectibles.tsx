import Layout from "@/components/Layout";
import { useUser } from "@/context/UserContext";
import { COMMUNITY_LIST } from "mock/community";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

const ManageCollectibles = () => {
  const { user } = useUser();
  const router = useRouter();
  const { communityID } = router.query;

  /**  @DEV to be implemented */
  const community = COMMUNITY_LIST.find(
    (community) => community.id === communityID,
  );

  return (
    <Layout title="Holders Only Area" className="">
      <Head>
        <title>Collectible - {community?.name}</title>
      </Head>
    </Layout>
  );
};

export default ManageCollectibles;
