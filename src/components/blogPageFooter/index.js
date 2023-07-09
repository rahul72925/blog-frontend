"use client";

import { useState } from "react";
import { CommentRenderer } from "../commentRenderer";
import { CommentSection } from "../commentSection";

export const BlogPageFooter = ({ blogData, comments }) => {
  const [commentsInState, setCommentInState] = useState(comments);

  const handlePaymentCompleted = (res) => {
    if (res.success) {
      setCommentInState((prev) => [res.data.comment].concat(prev));
    }
  };

  return (
    <footer>
      <CommentSection
        blogId={blogData.id}
        postCallback={handlePaymentCompleted}
      />
      <CommentRenderer comments={commentsInState} />
    </footer>
  );
};
