import { CommunityId } from './community.interface';

export interface CommunityPostProps {
  postText: string;
  title: string;
  authorPicture: string;
  createdAt: string;
  postId: string;
  communityId: CommunityId;
  authorName: string;
}
