import WeaveDB from "custom-weavedb-sdk";
import { Community, Post } from "../../types";

export class WeaveDBApi {
  private db: WeaveDB;

  constructor(db: WeaveDB) {
    this.db = db;
  }

  async getAllCommunities(): Promise<Community[]> {
    try {
      const communitiesResponse = await this.db.cget("communities");
      console.log('getAllCommunities() - communitiesResponse', communitiesResponse)
      const communities = communitiesResponse.map(
        (community) => community.data,
      );
      console.log("weaveApi - getAllCommunities() - communities:", communities);
      return communities;
    } catch (error) {
      console.log(error);
    }
  }

  async getCommunity(communityId: string) {
    try {
      const communityResponse = await this.db.cget("communities", communityId);
      const community = communityResponse.data;

      return community;
    } catch (error) {
      console.log(error);
    }
  }

  async createCommunityPost(postCreationPayload: Post, identity: any) {
    try {
      const { content, communityId, isPublic, creationDate, postId } =
        postCreationPayload;

      const lastestCommunitySnapshot = await this.getCommunity(communityId);
      console.log("lastestCommunitySnapshot", lastestCommunitySnapshot);

      if (identity) {
        console.log("Creating post with identity...");
        await this.db.update(
          { posts: [...lastestCommunitySnapshot.posts, postCreationPayload] },
          "communities",
          communityId,
          identity,
        );
      } else {
        console.log("Creatin post without identity.. db:", this.db);
        await this.db.update(
          { posts: [...lastestCommunitySnapshot.posts, postCreationPayload] },
          "communities",
          communityId,
        );
      }
      console.log("created Post for communityId", communityId);
    } catch (error) {
      console.error("createCommunityPost() failed", error);
      throw error;
    }
  }
}
