import React, { useState } from "react";
import Button from "./Button";
import { useWeaveDB } from "../../context/WeaveDBContext";
import Image from "next/image";
import { Community } from "../../../../types";
import { useUser } from "@/context/UserContext";

interface AddPostProps {
  community: Community;
}

const AddPost = ({ community }: AddPostProps) => {
  const [postText, setPostText] = useState("");
  const { weaveDBApi } = useWeaveDB();
  const { user } = useUser();

  const resetForm = () => {
    setPostText("");
  };

  const handleSubmitPost = async () => {
    console.log("submiting post..");
    console.log("user", user);
    weaveDBApi.createCommunityPost(community.communityId, {
      text: postText,
      isPublic: true, // TODO: add option to make post private
    });
  };

  return (
    <article className="h-auto w-full rounded-lg bg-collectible-medium-purple p-7">
      <div className={`mb-4 flex items-center`}>
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

      <div className="mt-4 flex w-full items-center justify-end">
        <Button className="px-6" action={handleSubmitPost}>
          Post
        </Button>
      </div>
    </article>
  );
};

export default AddPost;
