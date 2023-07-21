import WeaveDB from "custom-weavedb-sdk";
import {
  Community,
  Post,
  PostCreationPayload,
  PrePostedCommunity,
} from "../../types";

export class WeaveDBApi {
  private db: WeaveDB;
  // private checkOrSignIdentity: () => Promise<void>;

  constructor(db: WeaveDB, checkOrSignIdentity: () => Promise<void>) {
    // this.checkOrSignIdentity = checkOrSignIdentity;
    this.db = db;
  }

  async getAllCommunities(): Promise<Community[]> {
    try {
      // const [communityResponse, postsResponse] = await Promise.all([
      //   this.db.cget("communities"),
      //   this.db.cget("posts"),
      // ]);
      const communitiesResponse = await this.db.cget("communities");
      const communities = communitiesResponse.map(
        (community) => community.data,
      );
      // const posts = postsResponse.map((post) => post.data);

      // Map posts to their respective communities
      // communities.forEach((community) => {
      //   community.posts = posts.filter(
      //     (post) => post.communityId === community.communityId,
      //   );
      // });

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

      console.log("latestCommunitySnapshot", lastestCommunitySnapshot);

      console.log("identity", identity);
      if (identity) {
        await this.db.update(
          { posts: [...lastestCommunitySnapshot.posts, postCreationPayload] },
          "communities",
          communityId,
          identity,
        );
      } else {
        console.log("updating without identity. db:", this.db);
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

  // async addCollection(collection: Collection["data"]) {
  //   await this.checkOrSignIdentity();
  //   try {
  //     await this.db.add(
  //       { ...collection, creationDate: this.db.ts() },
  //       WeaveDBCollections.COLLECTION,
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  //   async getAllPosts(): Promise<CommunityPost[] | void> {
  //     try {
  //       return await this.db.cget(WeaveDBCollections.POST);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   async getAllCollections(): Promise<Collection[] | void> {
  //     try {
  //       return await this.db.cget(WeaveDBCollections.COLLECTION);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   async getAllBenefits(): Promise<Benefit[] | void> {
  //     try {
  //       return await this.db.cget(WeaveDBCollections.BENEFIT);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  // async addBenefit(benefit: Benefit["data"]) {
  //   await this.checkOrSignIdentity();
  //   try {
  //     await this.db.add(
  //       { ...benefit, creationDate: this.db.ts() },
  //       WeaveDBCollections.BENEFIT,
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  //   async getCommunityPosts(
  //     communityId: string,
  //   ): Promise<CommunityPost[] | void> {
  //     try {
  //       return await this.db.cget(
  //         WeaveDBCollections.POST,
  //         ["communityId"],
  //         ["communityId", "==", communityId],
  //       );
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   async getCommunityBenefits(communityId: string): Promise<Benefit[] | void> {
  //     try {
  //       return await this.db.cget(
  //         WeaveDBCollections.BENEFIT,
  //         ["communityId"],
  //         ["communityId", "==", communityId],
  //       );
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   async checkUser(
  //     address: string,
  //     name: string,
  //     avatar: string,
  //   ): Promise<void> {
  //     try {
  //       const user = await this.db.cget(
  //         WeaveDBCollections.USER,
  //         ["address"],
  //         ["address", "==", address],
  //       );

  //       if (!user) {
  //         await this.db.add({ address, name, avatar }, WeaveDBCollections.USER);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
}
