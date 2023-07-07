"use client";

import React, { useState } from "react";
import { Button } from "./button";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import { toast } from "react-toastify";
import { UserIconForHeader } from "./userIconForHeader";
import axios from "axios";

export const Header = () => {
  const router = useRouter();
  const [isAuthenticated, logout] = useStore((state) => [
    state.isAuthenticated,
    state.logout,
  ]);

  const [isCreatingBlog, setIsCreatingBlog] = useState(false);

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleCreateBlog = () => {
    try {
      setIsCreatingBlog(true);
      axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/blog/create-blog`,
        data: {
          title: "Blog title",
          tags: [],
          post: "",
          isDraft: true,
          isAllowComments: true,
        },
        withCredentials: true,
      }).then(({ data }) => {
        console.log("new blog", data);
        router.push(`/manage-blog/${data.data.id}`);
      });
    } catch (error) {
      console.log("Error creating blog", error);
      toast.error("Something wen wrong!");
    } finally {
      setIsCreatingBlog(false);
    }
  };
  return (
    <header className="h-20 bg-slate-50 grid grid-rows-1 grid-cols-6 ">
      <div className="col-span-4 flex justify-center items-center text-3xl font-semibold sm:col-span-5">
        <Link href="/" className="cursor-pointer">
          Bloggers
        </Link>
      </div>
      <div className="col-span-2 flex justify-center items-center sm:col-span-1">
        {isAuthenticated ? (
          <div className="flex justify-around w-full">
            <Button
              variant="outline"
              className="hidden md:block"
              onClick={handleCreateBlog}
              isLoading={isCreatingBlog}
            >
              Create Blog
            </Button>
            <UserIconForHeader handleCreateBlog={handleCreateBlog} />
          </div>
        ) : (
          <Button onClick={handleLoginClick}>Login</Button>
        )}
      </div>
    </header>
  );
};
