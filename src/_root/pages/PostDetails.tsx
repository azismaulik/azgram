import { useParams, Link, useNavigate } from "react-router-dom";

import { Button, Input } from "@/components/ui";
import { Loader } from "@/components/shared";
import { GridPostList, PostStats } from "@/components/shared";

import {
  useGetPostById,
  useGetUserPosts,
  useDeletePost,
} from "@/lib/react-query/queries";
import { multiFormatDateString } from "@/lib/utils";
import { useUserContext } from "@/context/AuthContext";
import { useState } from "react";

const PostDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUserContext();

  const { data: post, isLoading } = useGetPostById(id);
  const { data: userPosts, isLoading: isUserPostLoading } = useGetUserPosts(
    post?.creator.$id
  );
  const { mutate: deletePost } = useDeletePost();

  const [deleting, setDeleting] = useState(false);

  const relatedPosts = userPosts?.documents.filter(
    (userPost) => userPost.$id !== id
  );

  const handleDeletePost = () => {
    deletePost({ postId: id, imageId: post?.imageId });
    setDeleting(true);

    setTimeout(() => {
      navigate(-1);
    }, 3000);
  };

  if (deleting) {
    return (
      <div className="flex-center w-full h-full">
        <div>
          <Loader />
          <p className="text-light-1 mt-4 text-center w-full">
            Deleting post...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="post_details-container">
      <div className="hidden md:flex max-w-5xl w-full">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="shad-button_ghost"
        >
          <img
            src={"/assets/icons/back.svg"}
            alt="back"
            width={24}
            height={24}
          />
          <p className="small-medium lg:base-medium">Back</p>
        </Button>
      </div>

      {isLoading || !post ? (
        <Loader />
      ) : (
        <div className="post_details-card">
          <div className="flex gap-2 items-center xl:hidden mx-4 my-2">
            <img
              src={
                post?.creator.imageUrl ||
                "/assets/icons/profile-placeholder.svg"
              }
              alt="creator"
              className="w-8 h-8 lg:w-12 lg:h-12 rounded-full"
            />
            <p className="base-medium lg:body-bold text-light-1">
              {post?.creator.name}
            </p>
          </div>
          <img
            src={post?.imageUrl}
            alt="creator"
            className="post_details-img"
          />

          <div className="post_details-info">
            <div className="w-full">
              <PostStats post={post} userId={user.id} />
            </div>
            <div className="flex-between w-full">
              <Link
                to={`/profile/${post?.creator.$id}`}
                className="flex items-center gap-3"
              >
                <img
                  src={
                    post?.creator.imageUrl ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="w-8 h-8 lg:w-12 lg:h-12 rounded-full hidden xl:block"
                />
                <div className="flex flex-col">
                  <p className="text-sm text-light-1">
                    <span className="font-bold mr-2">
                      {post?.creator.name}{" "}
                    </span>
                    {post?.caption}
                  </p>
                  {/* <div className="flex-center gap-2 text-light-3">
                    <p className="subtle-semibold lg:small-regular ">
                      {multiFormatDateString(post?.$createdAt)}
                    </p>
                    {post?.location && "•"}
                    <p className="subtle-semibold lg:small-regular">
                      {post?.location}
                    </p>
                  </div> */}
                </div>
              </Link>

              <div className="flex-center">
                <Link
                  to={`/update-post/${post?.$id}`}
                  className={`${user.id !== post?.creator.$id && "hidden"}`}
                >
                  <img
                    src={"/assets/icons/edit.svg"}
                    alt="edit"
                    width={24}
                    height={24}
                  />
                </Link>

                <Button
                  onClick={handleDeletePost}
                  variant="ghost"
                  className={`ost_details-delete_btn ${
                    user.id !== post?.creator.$id && "hidden"
                  }`}
                >
                  <img
                    src={"/assets/icons/delete.svg"}
                    alt="delete"
                    width={24}
                    height={24}
                  />
                </Button>
              </div>
            </div>

            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
              {post?.tags.length > 1 && (
                <ul className="flex gap-1">
                  {post?.tags.map((tag: string, index: string) => (
                    <li
                      key={`${tag}${index}`}
                      className="text-light-3 small-regular"
                    >
                      #{tag}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <h1 className="font-bold">
              Comments <span>({post?.comments?.length})</span>
            </h1>
            {post?.comments?.slice(0, 2)?.map((item: any) => (
              <div key={item.$id} className="flex gap-4">
                <img
                  src={item.users.imageUrl}
                  alt={item.users.username}
                  className="w-9 h-9 rounded-full"
                />
                <div>
                  <p className="font-bold text-sm">
                    {item.users.username}{" "}
                    <span className="text-light-3 text-xs">
                      {multiFormatDateString(item.$createdAt)}
                    </span>
                  </p>
                  <p className="text-sm line-clamp-3">{item.comment}</p>
                </div>
              </div>
            ))}
            <Input
              className="w-full shad-input mt-4"
              placeholder="Write a comment..."
            />
          </div>
        </div>
      )}

      <div className="w-full max-w-5xl">
        <h3 className="body-bold md:h3-bold w-full my-10">
          More Related Posts
        </h3>
        {isUserPostLoading || !relatedPosts ? (
          <Loader />
        ) : (
          <GridPostList posts={relatedPosts} />
        )}
      </div>
    </div>
  );
};

export default PostDetails;
