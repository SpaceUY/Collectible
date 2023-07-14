import { CommunityId } from "./community.interface";

export interface CommunityPostProps {
  postText: string;
  title: string;
  createdAt: string;
  postId: string;
  communityId: string;
}
