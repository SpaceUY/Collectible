import { Command } from "commander";
import { weaveDB } from "./weavedb";
import { create, globSource } from "ipfs-http-client";
import { join } from "path";

const collection = new Command("collection");

collection
  .command("add <brandName> <name> <assetDir> <nftCount>")
  .description("Generates all the elements necessary for a collection and deploys it")
  .action(async (brandName, name, assetDir, nftCount) => {
    const db = await weaveDB();
    const existing = await db.cget("brand", ["name", "==", brandName]);
    if (!existing.length) {
      throw new Error(`Brand ${brandName} does not exist`);
    }
    const brand = existing[0];

    const auth =
      "Basic " +
      Buffer.from(process.env.INFURA_API_KEY + ":" + process.env.INFURA_API_SECRET).toString(
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

    const imgUploads = [];
    for await (const upload of ipfs.addAll(globSource(join(process.cwd(), assetDir), "**/*"), {
      wrapWithDirectory: true,
    })) {
      imgUploads.push(upload);
    }
    const imgWrappedDir = imgUploads.pop();

    const roundRobinCid = (ipfsUploads: any[], i: number): string => {
      return `ipfs://${ipfsUploads[i % ipfsUploads.length].cid.toString()}`;
    };

    // Generate metadata for all NFTs
    const metadata = [];
    for (let i = 0; i < nftCount; i++) {
      metadata.push({
        name: `${name} #${i}`,
        description: `Part of the ${name} collection, by ${brandName}`,
        image: roundRobinCid(imgUploads, i),
      });
    }

    // Upload metadata to IPFS
    const metadataUploads = [];
    for await (const upload of ipfs.addAll(
      metadata.map((m, i) => ({
        path: `${i}.json`,
        content: JSON.stringify(m),
      })),
      { wrapWithDirectory: true }
    )) {
      metadataUploads.push(upload);
    }
    const metadataWrappedDir = metadataUploads.pop();
  });

export default collection;

//ipfs/1237812392193781278931278937891237890
//ipfs/1237812392193781278931278937891237890
//ipfs/1237812392193781278931278937891237890
