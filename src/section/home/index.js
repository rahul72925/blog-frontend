"use client";

import { Button } from "@/components";
import { BlogSearch } from "@/components/blogSearch";
import axios from "axios";
import { useState } from "react";

export const HomeSection = ({ serverBlogs }) => {
  const [blogs, setBlogs] = useState(serverBlogs);
  const [blogStatus, setBlogStatus] = useState("IDLE");

  const handleSearch = (search) => {
    axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/blog/get?search=${search}`,
    })
      .then(({ data }) => {
        setBlogs(data.blogs);
        setBlogStatus("SUCCESS");
      })
      .catch((error) => {
        setBlogStatus("ERROR");
        console.log("something went wrong", error);
      });
  };

  return (
    <>
      <BlogSearch />
      {blogStatus == "LOADING" ? (
        <span>Loading</span>
      ) : blogStatus == "ERROR" ? (
        <span>Oops something went wrong</span>
      ) : blogs.length == 0 ? (
        <span>Oops no blog available</span>
      ) : (
        blogs.map((eachBlog) => {
          return <BlogCard blog={eachBlog} key={eachBlog.id} />;
        })
      )}
    </>
  );
};
