export type CommunityId = "metallica" | "nike" | "harry-potter";
export type CoverColor = "red" | "yellow" | "purple" | "black" | "white";

export interface Collection {
  address: string;
  name: string;
}

export interface Benefit {
  communityId: string;
  content: string;
  creationDate: string;
  finishDate: string;
  startDate: string;
}

export interface Post {
  communityId: string;
  content: string;
  creationDate: string;
  public: string;
}

export interface Community {
  benefits: Benefit[];
  collections: Collection[];
  communityId: string;
  coverColor: string;
  creationDate: string;
  description: string;
  name: string;
  picture: string;
  posts: Post[];
}
