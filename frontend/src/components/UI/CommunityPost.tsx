import Image from "next/image";
import { POST_ICON_OPTIONS } from "../../common/constants/post-icon-options";
import Link from "next/link";
import { Post, Community, PostContent } from "../../../types";
import { formatTime } from "utils/functions";
import { useEffect, useState } from "react";
import { useLit } from "@/context/LitContext";
import { fetchFromIpfs } from "@/api/ipfsApi";
import LoadingWheel from "@/components/UI/LoadingWheel";

interface CommunityPostProps {
  community: Community;
  post: Post;
  isMemberOrOwner?: boolean;
  disableCommunityLink?: boolean;
  isCollectiblePost?: boolean;
}

const CommunityPost = ({
  community,
  post,
  disableCommunityLink,
  isCollectiblePost,
  isMemberOrOwner,
}: CommunityPostProps) => {
  const { litApi, authSig, handleSignAuthSig } = useLit();

  const { communityId, isPublic, creationDate, content } = post;

  const [revealedContent, setRevealedContent] = useState<string>("");
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [isRevealing, setIsRevealing] = useState<boolean>(false);

  const [obtainedContent, setObtainedContent] = useState<PostContent | null>(
    null,
  );
  const [isObtained, setIsObtained] = useState<boolean>(false);
  const [isObtaining, setIsObtaining] = useState<boolean>(false);

  const handleObtainPost = async () => {
    setIsObtaining(true);
    try {
      const recoveredContent = await fetchFromIpfs(post.content);
      console.log("recoveredContent from Ipfs", recoveredContent);
      setObtainedContent(recoveredContent);
      setIsObtained(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsObtaining(false);
    }
  };

  useEffect(() => {
    if (isPublic && !post.alreadyObtained) {
      handleObtainPost();
    }
  }, [isPublic]);

  const handleRevealPost = async () => {
    await handleSignAuthSig();
    setIsRevealing(true);
    try {
      console.log(
        "revealing post with authsig",
        authSig,
        "and content",
        content,
      );
      const decryptedContent = await litApi.decrypt(authSig, content);
      console.log("revealedContent", revealedContent);
      setRevealedContent(decryptedContent as string);
      setIsRevealed(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsRevealing(false);
    }
  };

  return (
    <article className="h-auto w-full rounded-lg bg-collectible-medium-purple px-5 py-6 ">
      {community && (
        <div className="mb-3 flex items-center justify-between">
          <div className="flex cursor-default items-center gap-4">
            <Link
              href={
                !disableCommunityLink ? `/app/community/${communityId}` : ""
              }
              className={`flex items-center`}
            >
              <Image
                className={`h-10 w-10 rounded-full bg-white/10 ${
                  isCollectiblePost ? "object-contain" : "object-cover"
                }}`}
                src={community.picture}
                width={100}
                height={100}
                quality={100}
                alt=""
              />
              <h3 className="ml-2.5 font-medium text-gray-medium">
                {community.name}
              </h3>
            </Link>

            <p className="text-sm text-gray-medium">
              {formatTime(creationDate)}
            </p>
          </div>

          {!isPublic && (
            <span className="rounded-full bg-gray-strong px-3 py-1">
              <p className="text-gray-soft text-sm font-semibold leading-5">
                member-only
              </p>
            </span>
          )}
        </div>
      )}

      {/* Collectible Post*/}
      {isCollectiblePost && (
        <p className="text-sm font-normal leading-6 text-gray-strong">
          {content}
        </p>
      )}

      {/* Just created posts */}
      {post.alreadyObtained && (
        <p className="text-sm font-normal leading-6 text-gray-strong">
          {content}
        </p>
      )}

      {/* Public Posts */}

      {!isCollectiblePost && isPublic && isObtaining && (
        <div className="h-10 text-sm font-normal leading-6 text-gray-strong">
          <LoadingWheel />
        </div>
      )}

      {isPublic && isObtained && (
        <p className="text-sm font-normal leading-6 text-gray-strong">
          {obtainedContent?.text}
        </p>
      )}

      {/* Private Posts */}
      {!isPublic && !isRevealed && (
        <div
          className={`relative flex items-center justify-center ${
            isMemberOrOwner ? "cursor-pointer" : "cursor-default"
          }`}
          onClick={
            isMemberOrOwner && !isRevealing ? handleRevealPost : () => {}
          }
        >
          <p className="text-sm font-normal leading-6 text-gray-strong opacity-60 blur-md filter">
            This content is private, and only can be unlocked for those members
            of the community. Secured and encrypted using Blockchain Technology.
            In order to be able to de-crypt this content, you need to be a
            member of this community, and have a valid Collectible from this
            community. If you have one, click here to reveal the content.
          </p>
          {isMemberOrOwner && !isRevealing && (
            <span className="top-[50%]flex absolute items-center justify-center text-center font-semibold text-purple-500 opacity-90">
              Click ro reveal
            </span>
          )}

          {isRevealing && (
            <span className="top-[50%]flex absolute items-center justify-center text-center font-semibold text-purple-500 opacity-80">
              Unencrypting member-only post...
            </span>
          )}
        </div>
      )}

      {!isPublic && isRevealed && (
        <p className="text-sm font-normal leading-6 text-gray-strong">
          {revealedContent}
        </p>
      )}

      <div className="mt-[1.125rem] flex items-start gap-x-3">
        {POST_ICON_OPTIONS.map((option) => (
          <Image
            key={option.altDescription}
            src={option.icon}
            width={15}
            height={15}
            alt={option.altDescription}
            className="h-4 w-4 cursor-pointer"
          />
        ))}
      </div>
    </article>
  );
};

export default CommunityPost;
