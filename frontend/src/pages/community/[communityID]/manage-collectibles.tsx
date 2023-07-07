import Layout from "@/components/Layout";
import { useUser } from "@/context/UserContext";
import { COMMUNITY_LIST } from "mock/communities";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import Button from "../../../components/UI/Button";
import { useDropzone } from "react-dropzone";
import { BsBoxArrowInDown } from "react-icons/bs";
import Image from "next/image";

const ManageCollectibles = () => {
  const { user } = useUser();
  const router = useRouter();
  const { communityID } = router.query;
  const [imagePaths, setImagePaths] = useState<string[]>([]);
  const [formData, setFormData] = useState<{
    collectionName: string;
    collectionUnits: number;
    collectionDescription: string;
  }>({ collectionName: "", collectionUnits: 0, collectionDescription: "" });

  /**  @DEV to be implemented */
  const community = COMMUNITY_LIST.find(
    (community) => community.communityId === communityID,
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

  const handleSumbit = () => {
    // TODO define data
    console.log("sent", { formData, imagePaths: imagePaths });
  };

  return (
    <Layout title="Holders Only Area" className="">
      <Head>
        <title>Collectible </title>
      </Head>

      <>
        <h1 className="mb-5 text-xl text-gray-strong">Metallica Collection</h1>

        <div className="flex gap-5">
          <div className="w-1/2">
            <h2 className="mb-3 text-sm text-gray-strong">Collection name</h2>
            <input
              name="search"
              type="text"
              placeholder={"Insert Collection name"}
              className={`mb-6 h-[52px] w-full rounded-lg bg-collectible-medium-purple p-4 text-gray-weak placeholder-gray-weak`}
              onChange={(e) =>
                setFormData((prev) => {
                  return { ...prev, collectionName: e.target.value };
                })
              }
              value={formData.collectionName}
            />
          </div>

          <div className="w-1/2">
            <h2 className="mb-3 text-sm text-gray-strong">Collection Units</h2>
            <input
              name="search"
              type="number"
              placeholder={"Put Collection Units"}
              className={`mb-6 h-[52px] w-full rounded-lg bg-collectible-medium-purple p-4 text-gray-weak placeholder-gray-weak`}
              onChange={(e) =>
                setFormData((prev) => {
                  return { ...prev, collectionUnits: parseInt(e.target.value) };
                })
              }
              value={formData.collectionUnits}
            />
          </div>
        </div>

        <h2 className="mb-3 text-sm text-gray-strong">
          Collection Description
        </h2>
        <textarea
          name="post-text"
          placeholder="Write a Collection description"
          className={`h-36 w-full rounded-lg bg-collectible-medium-purple p-4 text-gray-weak placeholder-gray-weak`}
          onChange={(e) =>
            setFormData((prev) => {
              return { ...prev, collectionDescription: e.target.value };
            })
          }
          value={formData.collectionDescription}
        />

        <h2 className="mb-3 text-sm text-gray-strong">Select Images</h2>
        <div
          className="flex h-80 gap-4 rounded-lg bg-collectible-medium-purple py-3 px-5"
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
              {imagePaths.map((path) => (
                <div
                  onClick={() => handleRemoveImage(path)}
                  key={path}
                  className="flex h-28 w-28 items-center justify-center rounded-lg border-2 border-transparent bg-collectible-dark-purple p-3 hover:cursor-pointer hover:border-gray-medium"
                >
                  <Image width={100} height={100} src={path} alt={""} />
                </div>
              ))}
            </div>
            <p className="mt-2 text-xs text-gray-weak">
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
