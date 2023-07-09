"use client";

import { forwardRef, useRef, useState } from "react";
import { Button } from "../button";
import axios from "axios";
import { toast } from "react-toastify";
import { useStore } from "@/store/useStore";

export const CommentSection = forwardRef(
  ({ blogId, postCallback = () => {}, parentCommentId = null }, ref) => {
    const [comment, setComment] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const isAuthenticated = useStore((state) => state.isAuthenticated);

    const textAreaRef = useRef();

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!isAuthenticated) {
        return alert("Please login");
      }
      setIsLoading(true);

      axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/blog/comment?blogId=${blogId}`,
        withCredentials: true,
        data: {
          comment,
          parentCommentId,
        },
      })
        .then(({ data }) => {
          setComment("");
          postCallback({ data, success: true });
          toast.success("comment successfully");
        })
        .catch((error) => {
          postCallback({ error, success: false });
          console.log("error on comment", error);
          toast.error("Somethings went wrong");
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    const handleOnChange = (e) => {
      const { value } = e.target;
      setComment(value);
    };

    return (
      <div className="w-full">
        {!parentCommentId && <p className="mb-4">Comments:</p>}
        <form onSubmit={handleSubmit}>
          <div className="w-full mb-4 border border-gray-200 rounded-lg ">
            <div className="px-4 py-2 bg-white rounded-t-lg ">
              <textarea
                ref={textAreaRef}
                id="comment"
                rows="4"
                className="w-full px-0 text-sm text-gray-900 bg-white border-0 outline-none"
                placeholder="Write a comment..."
                required
                value={comment}
                onChange={handleOnChange}
              ></textarea>
            </div>
            <div className="flex items-center justify-end px-3 py-2 border-t ">
              <Button type="submit" isLoading={isLoading}>
                Comment
              </Button>
            </div>
          </div>
        </form>
      </div>
    );
  }
);
