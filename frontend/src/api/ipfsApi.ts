import { create, globSource } from "ipfs-http-client";

// Initialize IPFS client
const auth =
  "Basic " +
  Buffer.from(
    process.env.NEXT_PUBLIC_INFURA_API_KEY +
      ":" +
      process.env.NEXT_PUBLIC_INFURA_API_KEY_SECRET,
  ).toString("base64");

const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

export const uploadToIpfs = async (content) => {
  console.log("uploading content to ipfs, content:", content);

  // Stringify the JSON object and create a Buffer
  const buffer = Buffer.from(JSON.stringify(content));

  try {
    const ipfsCid = await ipfs.add(buffer);
    console.log("uploaded to ipfs correctly, content CID obtained:", ipfsCid);
    return ipfsCid;
  } catch (error) {
    console.error(error);
  }
};
