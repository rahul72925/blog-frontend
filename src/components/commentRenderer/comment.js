"use client";

import moment from "moment";
import { WordIcon } from "../wordIcon";
import React, { useState } from "react";
import axios from "axios";
import { CommentRenderer } from ".";
import { CommentSection } from "../commentSection";

export const Comment = React.memo(({ comment }) => {
  const [showChildCommentSection, setShowChildCommentSection] = useState(false);

  const [childComments, setChildComments] = useState(null);
  const [childCommentsStatus, setChildCommentsStatus] = useState("IDLE");

  const handleReplyClick = () => {
    setShowChildCommentSection((prev) => !prev);
    if (childCommentsStatus !== "IDLE") {
      setChildCommentsStatus("IDLE");
      return;
    }
    setChildCommentsStatus("LOADING");
    axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/blog/comments/get?blogId=${comment.blog_id}&parentCommentId=${comment.id}`,
      withCredentials: true,
    })
      .then(({ data }) => {
        setChildComments(data.comments);
        setChildCommentsStatus("SUCCESS");
      })
      .catch((error) => {
        console.log("error", error);
        setChildCommentsStatus("ERROR");
      });
  };

  const handlePaymentCompleted = (res) => {
    if (res.success) {
      setChildComments((prev) => [res.data.comment].concat(prev));
    }
  };

  return (
    <div className="p-4 bg-zinc-300 rounded-lg mb-4">
      <div className="flex">
        <WordIcon word={comment.username} />
        <div className="ml-4">
          <span className="text-md">{comment.username}</span>
          <br />
          <span className="text-xs italic text-indigo-500">
            {moment(comment.created_at).fromNow()}
          </span>
        </div>
      </div>
      <div className="mt-4 ml-4">{comment.comment}</div>
      {!comment.parent_comment_id && (
        <div className="flex justify-end">
          <span
            className="italic text-sm text-red-400 cursor-pointer px-4 hover:opacity-70 mb-4"
            onClick={handleReplyClick}
          >
            Reply
            {comment.child_comment_count == 0
              ? null
              : `(${comment.child_comment_count || ""})`}
          </span>
        </div>
      )}
      {showChildCommentSection && (
        <div>
          {childCommentsStatus == "LOADING" ? (
            <span className="italic">loading...</span>
          ) : childCommentsStatus == "ERROR" ? (
            <span>Something went wrong</span>
          ) : childCommentsStatus == "SUCCESS" ? (
            <CommentRenderer
              comments={childComments}
              showNotAvailableMessage={false}
            />
          ) : null}
          <CommentSection
            blogId={comment.blog_id}
            parentCommentId={comment.id}
            postCallback={handlePaymentCompleted}
          />
        </div>
      )}
    </div>
  );
});
