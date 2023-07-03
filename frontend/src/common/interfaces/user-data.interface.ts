import { Community } from "./community.interface";

export interface UserData {
  isLoggedIn: boolean;
  loading: boolean;
  name: string;
  address: string;
  balance: string;
  shortAddress: string;
  collectibles: any[];
  refreshCollectibles: boolean;
  communityMemberships?: Community[];
  communityOwnerships?: Community[];
}
