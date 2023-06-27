import React, { useState } from "react";
import Image from "next/image";
import Button from "./Button";

type AddPostProps = {
  userName: string;
  userPicture: string;
};

const postIconOptions: { altDescription: string; icon: string }[] = [
  { altDescription: "Like", icon: "/page-icons/heart-icon.svg" },
  { altDescription: "Comments", icon: "/page-icons/chat-icon.svg" },
  { altDescription: "Share", icon: "/page-icons/share-icon.svg" },
];

const AddPost = ({ userPicture, userName }: AddPostProps) => {
  const [postText, setPostText] = useState("");

  const handleSubmitPost = () => {
    console.log("aloja"); // TODO
  };

  return (
    <article className="h-auto w-full rounded-lg bg-collectible-medium-purple p-7">
      <div className="mb-5 flex items-center">
        <Image
          src={userPicture}
          width={65}
          height={65}
          alt=""
          className="rounded-full bg-gray-medium"
        />
        <p className="ml-5 text-2xl font-bold text-gray-strong">{userName}</p>
      </div>

      <textarea
        name="post-text"
        placeholder="Post to your community"
        className={`h-44 w-full rounded-lg bg-collectible-dark-purple p-4 text-gray-weak placeholder-gray-weak`}
        onChange={(e) => setPostText(e.target.value)}
        value={postText}
      />

      <div className="mt-2 flex w-full items-center justify-between">
        <div className="flex items-start gap-x-3">
          {postIconOptions.map((option) => (
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
