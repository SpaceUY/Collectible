export type CommunityId = "metallica" | "nike" | "harry-potter";
export type CoverColor = "red" | "yellow" | "purple" | "black" | "white";

export interface Community {
  name: string;
  communityPicture: string;
  description: string;
  communityId: CommunityId;
  coverColor: CoverColor;
}
