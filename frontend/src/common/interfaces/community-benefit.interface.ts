export type BenefitType =
  | "discord-access"
  | "zoom-call"
  | "content"
  | "custom"
  | "merch";

export interface Benefit {
  id: string;
  type: BenefitType;
  name: string;
  description: string;
  image?: string;
}
