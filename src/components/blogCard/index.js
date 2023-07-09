"use client";

import { LikeIcon } from "@/assets";
import { CommentIcon } from "@/assets/icons/comment";
import { EditIcon } from "@/assets/icons/editIcon";
import { useStore } from "@/store/useStore";
import axios from "axios";
import moment from "moment";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import {} from "next/navigation";

export const BlogCard = ({ blog, showEditIcon = false }) => {
  const [isLiked, setIsLiked] = useState(blog.is_liked);
  const [likeCount, setLikeCount] = useState(blog.likes_count);
  const [handleLike, userId] = useStore((state) => [
    state.handleLike,
    state.userId,
  ]);
  const { userId: paramsUserId } = useParams();

  const router = useRouter();

  const handleOnLikeClick = () => {
    handleLike(
      blog.id,
      () => {
        setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
        setIsLiked((prev) => !prev);
      },
      () => {
        toast.error("something went wrong!");
      }
    );
  };

  const redirectToBlogViewPage = () => {
    router.push(`/blog/${blog.id}`);
  };

  const handleEditIconClick = () => {
    router.push(`/manage-blog/${blog.id}`);
  };

  const handleUserClick = () => {
    if (paramsUserId === blog.user_id) {
      return;
    }
    router.push(`/profile/${blog.user_id}`);
  };

  return (
    <div className="mx-4 border border-slate-300 p-4 rounded-lg mb-4">
      <div className="flex">
        {blog.profile_picture ? (
          <div></div>
        ) : (
          <div className=" flex justify-center items-center w-12 h-12 text-2xl  bg-gray-300 font-medium rounded-full">
            {blog.username.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="px-4" onClick={handleUserClick}>
          <span className="cursor-pointer">{blog.username}</span>
          <br />
          <span className="text-xs italic">
            {moment(blog.created_at).format("DD MMM YYYY hh:mm a")}
          </span>
        </div>
      </div>
      <div className="pl-16">
        <h3
          className="text-2xl py-2 font-medium md:text-3xl cursor-pointer"
          onClick={redirectToBlogViewPage}
        >
          {blog.title}
        </h3>
        {blog.tags.length > 0 ? (
          <div className="mt-1">
            {blog.tags.map((eachTag) => (
              <span className="rounded-lg bg-white border-neutral-400 border p-2 mr-2 text-xs text-slate-800">
                {eachTag}
              </span>
            ))}
          </div>
        ) : null}
        <div className="flex justify-end">
          {!blog.is_published && (
            <span className="italic text-sm mr-4">draft</span>
          )}
          {blog.is_published && (
            <div
              className="flex  items-center px-2 cursor-pointer"
              onClick={handleOnLikeClick}
            >
              {<LikeIcon isLiked={isLiked} />}{" "}
              <span className="pl-1">{likeCount > 0 ? likeCount : null}</span>
            </div>
          )}
          {blog.is_allow_comments && blog.is_published && (
            <div
              className="flex items-center px-2 cursor-pointer"
              onClick={redirectToBlogViewPage}
            >
              <CommentIcon />{" "}
              <span className="pl-1">
                {+blog.comments_count > 0 ? +blog.comments_count : null}
              </span>
            </div>
          )}
          {showEditIcon && userId === blog.user_id && (
            <div
              className="flex items-center px-2 cursor-pointer"
              onClick={handleEditIconClick}
            >
              <EditIcon />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
