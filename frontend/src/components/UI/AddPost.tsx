import React, { useEffect, useState } from "react";
import Button from "./Button";
import { useWeaveDB } from "../../context/WeaveDBContext";
import Image from "next/image";
import { Community, PostContent } from "../../../types";
import { useUser } from "@/context/UserContext";
import { generateRandomId } from "../../../utils/functions";
import community from "../../../../contract/smart-scripts/community";
import { useLit } from "@/context/LitContext";
import {
  checkAndSignAuthMessage,
  decryptFromIpfs,
  encryptToIpfs,
} from "@lit-protocol/lit-node-client";
import { fetchFromIpfs, uploadToIpfs } from "@/api/ipfsApi";

interface AddPostProps {
  community: Community;
}

const AddPost = ({ community }: AddPostProps) => {
  const { weaveDBApi, handleAppendNewPost, identity } = useWeaveDB();
  const { user } = useUser();
  const { litApi, authSig, handleSignAuthSig } = useLit();

  const [submitingPost, setSubmitingPost] = useState<boolean>(false);

  const [postText, setPostText] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const communityCollections = community.collections.map(
    (collection) => collection.address,
  );

  const resetForm = () => {
    setPostText("");
  };

  const handleSubmitPost = async () => {
    await handleSignAuthSig();
    if (!isPublic && !authSig) {
      return console.error("AuthSig must be signed in order to post privately");
    }
    // if (!identity) {
    //   return console.error(
    //     "Identity must be loaded in order to post to weaveDB",
    //   );
    // }

    setSubmitingPost(true);

    const postId = generateRandomId();
    const creationDate = new Date().toISOString();

    const content: PostContent = {
      text: postText,
      // file: null,
    };

    let contentCID;

    if (isPublic) {
      try {
        const ipfsResponse = await uploadToIpfs(content);
        contentCID = ipfsResponse.path;

        // Test of content recovery
        const recoveredContent = await fetchFromIpfs(contentCID);
        console.log("recoveredContent", recoveredContent);
        // Test of content recovery
      } catch (error) {
        console.log("Error at uploading post to IPFS");
      }
    } else {
      try {
        contentCID = await litApi.encrypt(
          authSig,
          communityCollections,
          content,
        );
        console.log(
          "handleSubmitPost encryption success!, encrypted and pushed, contentCID",
          contentCID,
        );

        // Test of content recovery
        console.log(
          "recovering content with cid",
          contentCID,
          "and authSig",
          authSig,
        );
        const recoveredContent = await litApi.decrypt(authSig, contentCID);
        console.log("recovered unencrypted content", recoveredContent);

        // Test of content recovery
      } catch (error) {
        console.error("Error at encrypting post to IPFS ", error);
      }
    }

    // 2. Submit
    console.log("Submiting to WeaveDB... post:", {
      content: contentCID,
      creationDate: creationDate,
      communityId: community.communityId,
      postId: postId,
      isPublic: isPublic,
    });

    const submit = true;
    if (submit) {
      try {
        // Handeled in the weaveDBApi to work with undefined identity
        await weaveDBApi.createCommunityPost(
          {
            content: contentCID,
            creationDate: creationDate,
            communityId: community.communityId,
            postId: postId,
            isPublic: isPublic,
          },
          identity,
        );
        console.log("Appending new post", {
          communityId: community.communityId,
          content: postText,
          creationDate: creationDate,
          isPublic: isPublic,
          postId: postId,
        });
        handleAppendNewPost(community, {
          communityId: community.communityId,
          content: isPublic ? postText : contentCID,
          alreadyObtained: isPublic ? true : false,
          creationDate: creationDate,
          isPublic: isPublic,
          postId: postId,
        });

        resetForm();
      } catch (e) {
        console.error("Error at submiting post", e);
      }
    }
    setSubmitingPost(false);
  };

  return (
    <article className="relative h-auto w-full rounded-lg bg-collectible-medium-purple px-5 py-6 ">
      {/* <div className={`mb-3.5 flex items-center`}>
        <Image
          className="h-10 w-10 rounded-full bg-white/10 object-contain"
          src={community.picture}
          width={100}
          height={100}
          quality={100}
          alt=""
        />
        <h3 className="ml-2.5 font-medium text-gray-medium">
          {community.name}
        </h3>
      </div> */}

      <textarea
        name="post-text"
        maxLength={350}
        placeholder="Post to your community"
        className={`h-28 w-full resize-none rounded-lg bg-collectible-dark-purple p-4 text-gray-strong placeholder-gray-weak !outline-none`}
        onChange={(e) => setPostText(e.target.value)}
        value={postText}
      />

      {/* <input
        type="file"
        className="cursr-pointer mt-3 w-full rounded-lg bg-collectible-dark-purple text-gray-weak file:mr-3 file:rounded-lg file:border-none file:bg-collectible-purple file:p-2 file:text-gray-strong"
        onChange={() => console.log("a")}
      /> */}

      <div className="mb-[-8px] mt-2 flex w-full items-center justify-end gap-10">
        <div className="flex items-center gap-2">
          <label htmlFor="is-post-public" className="text-gray-medium">
            Member-only
          </label>
          <input
            className="h-4 w-4 rounded-xl accent-purple-600"
            id="is-post-public"
            type="checkbox"
            onChange={(e) => setIsPublic(!e.target.checked)}
          />
        </div>
        <Button
          className="px-8"
          action={handleSubmitPost}
          disabled={submitingPost || postText.length === 0}
        >
          {!submitingPost ? "Post" : "Posting..."}
        </Button>
      </div>
    </article>
  );
};

export default AddPost;
