import { create, globSource } from "ipfs-http-client";
import dotenv from "dotenv";
import { PostContent } from "../../frontend/types";

dotenv.config();

const auth =
  "Basic " +
  Buffer.from(process.env.INFURA_API_KEY + ":" + process.env.INFURA_API_KEY_SECRET).toString(
    "base64"
  );

const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

const content: PostContent = {
  text: "content to be encrypted",
};

async function uploadToIpfs() {
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
}

uploadToIpfs().catch(console.error);
