import WeaveDB from "weavedb-sdk";
import {
  Community,
  Post,
  PostCreationPayload,
  PrePostedCommunity,
} from "../../../types";
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
      const [communityResponse, postsResponse] = await Promise.all([
        this.db.cget("communities"),
        this.db.cget("posts"),
      ]);

      const communities = communityResponse.map((community) => community.data);
      const posts = postsResponse.map((post) => post.data);

      // Map posts to their respective communities
      communities.forEach((community) => {
        community.posts = posts.filter(
          (post) => post.communityId === community.communityId,
        );
      });

      return communities;
    } catch (error) {
      console.log(error);
    }
  }

  async createCommunityPost(
    communityId: string,
    postCreationPayload: PostCreationPayload,
  ) {
    try {
      try {
        const { text, isPublic, creationDate } = postCreationPayload;
        const postId = generateRandomId();
        // await this.db.set(
        //   {
        //     communityId: communityId,
        //     content: text,
        //     creationDate: creationDate,
        //     isPublic: isPublic,
        //     postId: postId,
        //   },
        //   "posts",
        //   postId,
        // );

        await this.db.update(
          { coverColor: "#f1f1f1" },
          "communities",
          communityId,
        );
        console.log("updating colorColover of community", communityId);
      } catch (error) {
        console.error("createCommunityPost() failed", error);
        throw error;
      }
    } catch (error) {
      console.error(
        "createCommunityPost() failed on checkOrSignIdentity()",
        error,
      );
      throw error;
    }
    console.log("createCommunityPost() succeeded");
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
