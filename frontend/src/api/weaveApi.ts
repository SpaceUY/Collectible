import WeaveDB from "weavedb-sdk";
import { Community, PostCreationPayload } from "../../../types";
import { generateRandomId } from "../../utils/functions";

export class WeaveDBApi {
  private db: WeaveDB;
  private checkOrSignIdentity: () => Promise<void>;

  constructor(db: WeaveDB, checkOrSignIdentity: () => Promise<void>) {
    this.checkOrSignIdentity = checkOrSignIdentity;
    this.db = db;
  }

  async getAllCommunities(): Promise<Community[]> {
    try {
      const response = await this.db.cget("communities");
      const communities = response.map((community) => community.data);
      return communities;
    } catch (error) {
      console.log(error);
    }
  }

  async createCommunityPost(
    communityId: string,
    postCreationPayload: PostCreationPayload,
  ) {
    // 0. validate identity
    try {
      await this.checkOrSignIdentity();

      try {
        // 1. get updated community
        const latestCommunitySnapshot = await this.db.get(
          "communities",
          communityId,
        );
        console.log("latest community snapshot", latestCommunitySnapshot);

        const { text, isPublic } = postCreationPayload;

        // images to be added to payload

        const updatedCommunity: Community = {
          ...latestCommunitySnapshot,
          posts: [
            ...latestCommunitySnapshot.posts,
            {
              communityId: communityId,
              content: text,
              creationDate: new Date().toISOString(),
              isPublic: isPublic,
              postId: generateRandomId(),
            },
          ],
        };

        await this.db.set(updatedCommunity as any, "communities", communityId);
        console.log("Post published successfully!");
      } catch (error) {
        console.log("createCommunity Post failed", error);
      }
    } catch (error) {
      console.log("createCommunityPost failed on checkOrSignIdentity", error);
      return;
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
