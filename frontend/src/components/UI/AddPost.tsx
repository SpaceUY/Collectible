import React, { useState } from "react";
import Button from "./Button";
import { useWeaveDB } from "../../context/WeaveDBContext";

interface AddPostProps {
  communityId: string;
}

const AddPost = ({ communityId }: AddPostProps) => {
  const [postTitle, setPostTitle] = useState("");
  const [postText, setPostText] = useState("");
  const { weaveDBApi } = useWeaveDB();

  const resetForm = () => {
    setPostTitle("");
    setPostText("");
  };

  const handleSubmitPost = async () => {
    // try {
    //   await weaveDB.addPost({
    //     title: postTitle,
    //     text: postText,
    //     communityId: communityId,
    //     public: true,
    //     image: "", // TODO
    //   });

    //   resetForm();

    //   await fetchHomeData();
    // } catch (error) {
    //   console.log(error);
    // }
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
      <textarea
        name="post-text"
        placeholder="Post to your community"
        className={`h-28 w-full rounded-lg bg-collectible-dark-purple p-4 text-gray-weak placeholder-gray-weak`}
        onChange={(e) => setPostText(e.target.value)}
        value={postText}
      />
      <input
        type="file"
        className="mt-3 w-full rounded-lg  bg-collectible-dark-purple text-gray-weak file:mr-3 file:rounded-lg file:border-none file:bg-collectible-purple file:p-2 file:text-gray-strong"
        onChange={() => console.log("a")}
      />

      <div className="mt-5 flex w-full items-center justify-end">
        <Button className="px-6" action={handleSubmitPost}>
          Post
        </Button>
      </div>
    </article>
  );
};

export default AddPost;
