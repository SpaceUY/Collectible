import { CollectableCardProps } from "./collectable-card-props.interface";

export interface Collection {
  id: string;
  communityId: string;
  name: string;
  description: string;
  createdAt: string;
  collectables: CollectableCardProps[];
}
