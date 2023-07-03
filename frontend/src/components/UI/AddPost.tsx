import React, { useState } from "react";
import Image from "next/image";
import Button from "./Button";
import { POST_ICON_OPTIONS } from "../../common/constants/post-icon-options";

interface AddPostProps {
  userName: string;
  userPicture: string;
}

const AddPost = ({ userPicture, userName }: AddPostProps) => {
  const [postTitle, setPostTitle] = useState("");
  const [postText, setPostText] = useState("");

  const handleSubmitPost = () => {
    console.log("aloja"); // TODO
  };

  return (
    <article className="h-auto w-full rounded-lg bg-collectible-medium-purple p-7">
      <input
        name="search"
        type="text"
        placeholder={"Title..."}
        className={`mb-4 h-[52px] w-full rounded-lg bg-collectible-dark-purple p-4 text-gray-weak placeholder-gray-weak`}
        onChange={(e) => setPostTitle(e.target.value)}
        value={postTitle}
      />
      <input
        type="file"
        className="mb-4 w-full rounded-lg  bg-collectible-dark-purple text-gray-weak file:mr-3 file:rounded-lg file:border-none file:bg-collectible-purple file:p-2 file:text-gray-strong"
        onChange={() => console.log("a")}
      />
      <textarea
        name="post-text"
        placeholder="Post to your community"
        className={`h-44 w-full rounded-lg bg-collectible-dark-purple p-4 text-gray-weak placeholder-gray-weak`}
        onChange={(e) => setPostText(e.target.value)}
        value={postText}
      />

      <div className="mt-2 flex w-full items-center justify-between">
        <div className="flex items-start gap-x-3">
          {POST_ICON_OPTIONS.map((option) => (
            <Image
              key={option.altDescription}
              src={option.icon}
              width={15}
              height={15}
              alt={option.altDescription}
              className="cursor-pointer"
            />
          ))}
        </div>
        <Button action={handleSubmitPost}>Post</Button>
      </div>
    </article>
  );
};

export default AddPost;
