import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import { ethers } from "ethers";

export const nameToUrl = (name: string) => {
  return name
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^a-z0-9-]/g, "");
};

export const getAddressShortcut = (address: string) => {
  const shortAddress = `${address.substring(0, 5)}...${address.substring(
    address.length - 4,
  )}`;

  return shortAddress;
};

export const formatTime = (timeString) => {
  const currentTime = new Date();
  const postTime = new Date(timeString);
  const timeDiff = Math.abs(currentTime.getTime() - postTime.getTime());

  const seconds = Math.floor(timeDiff / 1000);
  if (seconds < 60) {
    return `${seconds}s ago`;
  }

  const minutes = Math.floor(timeDiff / (1000 * 60));
  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  return `${days}d ago`;
};


export function decodeVariables(encodedData) {
  try {
    if (!isValidBase64(encodedData)) {
      console.warn("Invalid base64 string:", encodedData);
      return null;
    }

    const data = atob(encodedData);
    const [contractAddress, merkleTreeCID, tokenId, tokenURI, password] =
      data.split(":::");
    return { contractAddress, merkleTreeCID, tokenId, tokenURI, password };
  } catch (error) {
    console.error("Failed to decode variables:", error);
    return null;
  }
}

function isValidBase64(str) {
  try {
    return btoa(atob(str)) == str;
  } catch (err) {
    return false;
  }
}

function toHexString(byteArray) {
  return (
    "0x" +
    Array.from(byteArray, function (byte) {
      return ("0" + ((byte as number) & 0xff).toString(16)).slice(-2);
    }).join("")
  );
}

export function generateMerkleProof(tokenId: number, treeJson: any) {
  // Load the tree
  const tree = StandardMerkleTree.load(treeJson);

  for (const [i, v] of Array.from(tree.entries())) {
    if (v[0] === tokenId) {
      const proof = tree.getProof(i);
      return proof.map((p: any) => toHexString(ethers.utils.arrayify(p)));
    }
  }

  throw new Error(`Token ID ${tokenId} not found in tree`);
}

export function generateRandomId(): string {
  const wallet = ethers.Wallet.createRandom();
  return wallet.address;
}
