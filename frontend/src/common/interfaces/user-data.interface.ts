import { CollectibleCardProps } from "./collectable-card-props.interface";

export interface UserData {
  isLoggedIn: boolean;
  loading: boolean;
  name: string;
  address: string;
  balance: string;
  shortAddress: string;
  collectibles: CollectibleCardProps[];
  communityMemberships: string[];
  communityOwnerships: string[];
}
