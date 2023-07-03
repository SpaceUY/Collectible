import { Community } from "../src/common/interfaces/community.interface";

const metallica: Community = {
  communityPicture: "https://cdn.wallpapersafari.com/18/76/aWHv8q.jpg",
  name: "Metallica",
  description:
    "Welcome to Metallica's Collectible Community. A dedicated hub for all things Metallica. Dive into discography discussions, engage with fellow fans, and unlock exclusive content. Join us as we keep the metal legacy alive.",
  id: "metallica",
  coverColor: "from-purple-500",
};

const nike: Community = {
  communityPicture:
    "data:image/jpeg;base64,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",
  name: "Nike",
  description:
    "Welcome to the Nike Collectible Community. Embrace the spirit of innovation, athleticism, and determination. Engage with fellow enthusiasts, explore exclusive content, and unlock a world of distinctive products. Together, we redefine the boundaries of sport and style.",
  id: "nike",
  coverColor: "from-[#000000]",
};

const harryPotter: Community = {
  communityPicture:
    "https://1000marcas.net/wp-content/uploads/2020/02/Logo-Hogwarts.png",
  name: "Harry Potter",
  description:
    "Welcome to the magical world of the Harry Potter Collectible Community. Dive into the enchanting lore, engage in spellbinding discussions, and unlock exclusive content from the Wizarding World. Join us as we continue to celebrate the magical journey that transcends generations.",
  id: "harry-potter",
  coverColor: "from-yellow-500",
};

export const COMMUNITY_LIST: Community[] = [nike, metallica, harryPotter];
export const USER_COMMUNITY_MEMBERSHIP: Community[] = [nike, metallica];
export const USER_COMMUNITY_OWNERSHIP: Community[] = [metallica];
