"use client";

import { useState } from "react";
import { Comment } from "./comment";

export const CommentRenderer = ({
  comments,
  showNotAvailableMessage = true,
}) => {
  return (
    <div className="ml-4">
      {comments.length == 0 ? (
        showNotAvailableMessage ? (
          <p>No comments available</p>
        ) : (
          false
        )
      ) : (
        comments.map((eachComment) => (
          <Comment comment={eachComment} key={eachComment.id} />
        ))
      )}
    </div>
  );
};
