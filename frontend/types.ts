// User related interfaces
export interface UserData {
  isLoggedIn: boolean;
  loading: boolean;
  name: string;
  address: string;
  balance: string;
  shortAddress: string;
  collectibles: AlchemyNFT[];
  communityMemberships: string[];
  communityOwnerships: string[];
}

// Community related interfaces
export interface WeaveDBCommunity {
  id: string;
  setter: string;
  data: Community;
}
export interface Community {
  communityId: string;
  name: string;
  coverColor: string;
  creationDate: string;
  description: string;
  picture: string;
  benefits: Benefit[];
  collections: Collection[];
  posts: Post[];
  owners: string[];
}

export interface PrePostedCommunity {
  communityId: string;
  name: string;
  coverColor: CoverColor;
  creationDate: string;
  description: string;
  picture: string;
  benefits: Benefit[];
  collections: Collection[];
  posts: string[];
  owners: string[];
}

export type CommunityId = "metallica" | "nike" | "harry-potter";
export type CoverColor = "red" | "yellow" | "purple" | "black" | "white";

// Collection or Collectible Related Interfaces
export interface Collection {
  address: string;
  name: string;
  communityId: string;
  creationDate: string;
  availableMetadataResources: string[];
}

export interface CollectionWithNfts extends Collection {
  nfts: AlchemyNFT[];
}

export interface AlchemyNFT {
  acquiredAt?: string | undefined;
  balance: number;
  contract: {
    address: string;
    contractDeployer: string;
    deployedBlockNumber: number;
    name: string;
    openSea: unknown;
    symbol: string;
    totalSupply: string;
    tokenType: string;
  };
  description: string;
  media: Media[];
  metadataError: string | undefined;
  rawMetadata: CollectibleMetadata;
  title: string;
  tokenId: string;
  tokenType: string;
  tokenUri: TokenUri;
}
export interface Media {
  bytes: string;
  format: string;
  gateway: string;
  raw: string;
  thumbnail: string;
}
export interface CollectibleMetadata {
  name: string;
  description: string;
  image: string;
}
export interface TokenUri {
  gateway: string;
  raw: string;
}
export interface QRValues {
  contractAddress: string;
  merkleTreeCID: string;
  tokenId: string;
  tokenURI: string;
  password: string;
}

// Benefit related interfaces
export interface Benefit {
  communityId: string;
  name: string;
  type: string;
  content: string;
  creationDate: string;
  finishDate: string;
  startDate: string;
  benefitId: string;
}

// Post related interfaces
export interface Post {
  communityId: string;
  content: string;
  creationDate: string;
  isPublic: boolean;
  postId: string;
  alreadyObtained?: boolean;
}
export interface PostContent {
  text: string;
  file?: File | string;
}
export interface PostWithCommunity extends Post {
  community: Community;
}
export interface PostCreationPayload {
  text: string;
  isPublic: boolean;
  creationDate: string;
}
