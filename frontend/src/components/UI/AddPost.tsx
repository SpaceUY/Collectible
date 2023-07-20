import React, { useState } from "react";
import Button from "./Button";
import { useWeaveDB } from "../../context/WeaveDBContext";
import Image from "next/image";
import { Community } from "../../../../types";
import { useUser } from "@/context/UserContext";
import { generateRandomId } from "../../../utils/functions";

interface AddPostProps {
  community: Community;
}

const AddPost = ({ community }: AddPostProps) => {
  const [postText, setPostText] = useState("");
  const { weaveDBApi, handleAppendNewPost } = useWeaveDB();
  const { user } = useUser();

  const resetForm = () => {
    setPostText("");
  };

  const handleSubmitPost = async () => {
    console.log("handleSubmitPost() call");

    const isPublic = true;
    const postId = generateRandomId();
    try {
      await weaveDBApi.createCommunityPost(community.communityId, {
        text: postText,
        creationDate: new Date().toISOString(),
        isPublic: isPublic, // TODO: add option to make post private
      });
      handleAppendNewPost(community, {
        communityId: community.communityId,
        content: postText,
        creationDate: new Date().toISOString(),
        isPublic: isPublic,
        postId: postId,
      });

      resetForm();
    } catch (e) {
      console.error("Error at submiting post", e);
    }
  };

  return (
    <article className="relative h-auto w-full rounded-lg bg-collectible-medium-purple px-5 py-6 ">
      <div className={`mb-3.5 flex items-center`}>
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
      </div>

      <textarea
        name="post-text"
        maxLength={250}
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

      <div className="mb-[-4px] mt-2 flex w-full items-center justify-end">
        <Button className="px-8" action={handleSubmitPost}>
          Post
        </Button>
      </div>
    </article>
  );
};

export default AddPost;
