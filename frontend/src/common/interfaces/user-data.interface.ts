import { Community } from "./community.interface";
import { CollectibleCardProps } from "./collectable-card-props.interface";

export interface UserData {
  isLoggedIn: boolean;
  loading: boolean;
  name: string;
  address: string;
  balance: string;
  shortAddress: string;
  collectibles: CollectibleCardProps[];
  refreshCollectibles: boolean;
  communityMemberships?: Community[];
  communityOwnerships?: Community[];
}
