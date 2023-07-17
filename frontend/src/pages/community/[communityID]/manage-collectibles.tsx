import Layout from "@/components/Layout";
import { useUser } from "@/context/UserContext";

import Head from "next/head";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import Button from "../../../components/UI/Button";
import { useDropzone } from "react-dropzone";
import { BsBoxArrowInDown } from "react-icons/bs";
import Image from "next/image";
import { useWeaveDB } from "../../../context/WeaveDBContext";

const ManageCollectibles = () => {
  const { user } = useUser();
  const router = useRouter();
  const { communityId } = router.query;
  const [imagePaths, setImagePaths] = useState<string[]>([]);
  const [formData, setFormData] = useState<{
    collectionName: string;
    collectionUnits: number;
    collectionDescription: string;
  }>({ collectionName: "", collectionUnits: 0, collectionDescription: "" });
  const { allCommunities } = useWeaveDB();

  const community = allCommunities.find(
    (community) => community.communityId === communityId,
  );

  const onDrop = useCallback(
    (acceptedFiles) => {
      setImagePaths((prevPaths) => [
        ...prevPaths,
        ...acceptedFiles.map((file) => URL.createObjectURL(file)),
      ]);
      // Do something with the files
    },
    [setImagePaths],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleRemoveImage = (imagePath: string) => {
    setImagePaths((prevPaths) =>
      prevPaths.filter((path) => path !== imagePath),
    );
  };

  const handleSumbit = async () => {
    alert("TBD");
    // await weaveDB.addCollection({
    //   name: formData.collectionName,
    //   description: formData.collectionDescription,
    //   address: user.address,
    //   collectionUnits: formData.collectionUnits,
    //   communityId: communityID as string,
    // });

    // TODO images
    // console.log("sent", { imagePaths: imagePaths });
  };

  return (
    <Layout title="Holders Only Area" className="">
      <Head>
        <title>Collectible </title>
      </Head>

      <>
        <h1 className="mb-5 text-xl text-gray-strong">
          New {community.name} Collection
        </h1>

        <div className="flex gap-5">
          <div className="w-1/2">
            <p className="mb-3 text-gray-strong">Collection name</p>
            <input
              name="collection-name"
              type="text"
              maxLength={40}
              placeholder={"Insert Collection name"}
              className={`mb-6 h-[52px] w-full rounded-lg bg-collectible-medium-purple p-4 text-gray-strong placeholder-gray-weak`}
              onChange={(e) =>
                setFormData((prev) => {
                  return { ...prev, collectionName: e.target.value };
                })
              }
              value={formData.collectionName}
            />
          </div>

          <div className="w-1/2">
            <p className="mb-3 text-gray-strong">Collection Units</p>
            <input
              name="collection-units"
              type="number"
              max={9999}
              placeholder={"Put Collection Units"}
              className={`mb-6 h-[52px] w-full rounded-lg bg-collectible-medium-purple p-4 text-gray-strong placeholder-gray-weak`}
              onChange={(e) =>
                setFormData((prev) => {
                  return { ...prev, collectionUnits: parseInt(e.target.value) };
                })
              }
              value={formData.collectionUnits}
            />
          </div>
        </div>

        <p className="mb-3 text-gray-strong">Collection Description</p>
        <textarea
          name="post-text"
          placeholder="Write a Collection description"
          className={`mb-4 h-32 w-full resize-none rounded-lg bg-collectible-medium-purple p-4 text-gray-strong placeholder-gray-weak`}
          maxLength={200}
          onChange={(e) =>
            setFormData((prev) => {
              return { ...prev, collectionDescription: e.target.value };
            })
          }
          value={formData.collectionDescription}
        />

        <p className="mb-3 text-gray-strong">Select Images</p>
        <div
          className="flex h-56 gap-4 rounded-lg bg-collectible-medium-purple px-5 py-3"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <div className="mx-auto flex flex-col justify-center">
              <p className="mx-auto text-gray-medium">Drop the files here...</p>
            </div>
          ) : (
            <div className="mx-auto flex flex-col justify-center">
              <BsBoxArrowInDown className="mx-auto mb-4 text-[44px] text-gray-strong" />
              <p className=" text-gray-medium">
                <em className="text-gray-strong">Click to Upload</em> or{" "}
                <em className="text-gray-strong">Drag and Drop files</em>
              </p>
            </div>
          )}
        </div>
        {!!imagePaths.length && (
          <>
            <div className="mt-4 flex gap-3 rounded-lg bg-collectible-medium-purple p-3">
              {imagePaths.map((path, idx) => (
                <div
                  onClick={() => handleRemoveImage(path)}
                  key={path}
                  className="relative flex h-28 w-28 items-center justify-center rounded-lg border-2 border-transparent bg-collectible-dark-purple p-3 hover:cursor-pointer hover:border-gray-medium"
                >
                  <Image width={100} height={100} src={path} alt={""} />
                </div>
              ))}
            </div>
            <p className="mt-2 text-xs text-gray-weak ">
              (Click on an image preview to remove)
            </p>
          </>
        )}

        <div className="mt-8 flex justify-end">
          <Button action={handleSumbit}>Send Collection</Button>
        </div>
      </>
    </Layout>
  );
};

export default ManageCollectibles;
