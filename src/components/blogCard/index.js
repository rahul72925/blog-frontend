"use client";

import { LikeIcon } from "@/assets";
import { CommentIcon } from "@/assets/icons/comment";
import moment from "moment";
import { useState } from "react";

export const BlogCard = ({ blog }) => {
  const [isLiked, setIsLiked] = useState(blog.is_liked);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleComment = () => {};
  return (
    <div className="mx-4 border border-slate-300 p-4 rounded">
      <div className="flex">
        {blog.profile_picture ? (
          <div></div>
        ) : (
          <div className=" flex justify-center items-center w-12 h-12 text-2xl  bg-gray-300 font-medium rounded-full">
            {blog.username.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="px-4">
          <span className="cursor-pointer">{blog.username}</span>
          <br />
          <span className="text-xs">
            {moment(blog.created_at).format("DD MMM YYYY")}
          </span>
        </div>
      </div>
      <div className="pl-16">
        <h3 className="text-2xl py-2 font-medium md:text-3xl">{blog.title}</h3>
        {blog.tags.length > 0 ? <div></div> : null}
        <div className="flex justify-end">
          <div
            className="flex  items-center px-2 cursor-pointer"
            onClick={handleLike}
          >
            {<LikeIcon isLiked={isLiked} />}{" "}
            <span className="pl-1">{blog.like > 0 ? blog.like : null}</span>
          </div>
          <div className="flex items-center px-2" onClick={handleComment}>
            <CommentIcon />{" "}
            <span className="pl-1">
              {console.log("bilog", blog.comments_count)}
              {+blog.comments_count > 0 ? +blog.comments_count : null}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
