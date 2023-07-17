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

  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  return `${days}d ago`;
};

export function encodeVariables(contractAddress, tokenID, tokenUri, password) {
  const data = `${contractAddress}:::${tokenID}:::${tokenUri}:::${password}`;
  const encodedData = btoa(data);
  return encodedData;
}

export function decodeVariables(encodedData) {
  try {
    if (!isValidBase64(encodedData)) {
      console.warn("Invalid base64 string:", encodedData);
      return null;
    }

    const data = atob(encodedData);
    const [contractAddress, tokenId, tokenURI, password] = data.split(":::");
    return { contractAddress, tokenId, tokenURI, password };
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
