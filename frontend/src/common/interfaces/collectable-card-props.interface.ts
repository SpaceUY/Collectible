import { CommunityId } from "./community.interface";

export interface CollectibleCardProps {
  pictureUrl: string;
  name: string;
  description: string;
  showPictureOnly?: boolean;
  collectionID: string;
  tokenID: string;
  communityID: CommunityId;
}
