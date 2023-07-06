import { Benefit } from "../src/common/interfaces/community-benefit.interface";

export const COMMUNITY_BENEFITS: Benefit[] = [
  {
    name: "Access to Discord",
    description: "Access to the community Discord server",
    image: "/img/discord-benefit.png",
    id: "benefit-id-01",
    type: "discord-access",
  },
  {
    name: "QA with the team",
    description: "Zoom call with the team",
    image: "/img/zoom-benefit.png",
    id: "benefit-id-02",
    type: "zoom-call",
  },
  {
    name: "Merch",
    description: "Special Edition T-Shirt celebrating the 1000 copies sold",
    image: "/img/merch-benefit.png",
    id: "benefit-id-03",
    type: "merch",
  },
];
