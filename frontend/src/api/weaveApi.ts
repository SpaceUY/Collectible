import WeaveDB from "weavedb-sdk";
import { WeaveDBCollections } from "@/common/enums/weave-db-collections.enum";
import { AddPost } from "./../common/types/AddPost.type";
import { Benefit } from "./../common/types/Benefit.type";
import { Collection } from "./../common/types/Collection.type";
import { Community } from '../common/types';

export class WeaveDBApi {
  private db: WeaveDB;

  constructor(db: WeaveDB) {
    this.db = db;
  }

  async getAllCommunities(): Promise<Community[]> {
    try {
      const response = await this.db.cget(WeaveDBCollections.COMMUNITIES);
      const communities = response.map((community) => community.data);
      return communities;
    } catch (error) {
      console.log(error);
    }
  }

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

  async addPost(addPost: AddPost) {
    try {
      await this.db.add(
        { ...addPost, date: this.db.ts() },
        WeaveDBCollections.POST,
      );
    } catch (error) {
      console.log(error);
    }
  }

  async addBenefit(benefit: Benefit["data"]) {
    try {
      await this.db.add(
        { ...benefit, creationDate: this.db.ts() },
        WeaveDBCollections.BENEFIT,
      );
    } catch (error) {
      console.log(error);
    }
  }

  async addCollection(collection: Collection["data"]) {
    try {
      await this.db.add(
        { ...collection, creationDate: this.db.ts() },
        WeaveDBCollections.COLLECTION,
      );
    } catch (error) {
      console.log(error);
    }
  }

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
