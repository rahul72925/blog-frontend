"use client";

import { BlogCard } from "@/components/blogCard";
import { BlogSearch } from "@/components/blogSearch";
// import { HomeSection } from "@/section";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [blogsStatus, setBlogStatus] = useState("LOADING");
  const [blogs, setBlogs] = useState(null);
  const [isSearched, setIsSearched] = useState(false);

  async function fetchBlog(search = null) {
    setIsSearched(!(search == null || search?.length == 0));
    setBlogStatus("LOADING");
    axios({
      method: "get",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/blog/get${
        search ? `?search=${search}` : ""
      }`,
    })
      .then(({ data }) => {
        setBlogs(data.blogs);
        setBlogStatus("SUCCESS");
      })
      .catch((error) => {
        console.log(error);
        setBlogStatus("ERROR");
      });
  }

  useEffect(() => {
    (async function () {
      await fetchBlog();
    })();
  }, []);

  return (
    <main className="h-auto flex justify-center">
      <section className="w-full lg:w-3/5 h-full">
        <BlogSearch handleSearch={fetchBlog} isSearched={isSearched} />
        {blogsStatus == "LOADING" ? (
          <div>Loading</div>
        ) : blogsStatus == "ERROR" ? (
          <div>Something went wrong</div>
        ) : blogs.length == 0 ? (
          <span>Oops no blog available</span>
        ) : (
          <>
            {blogs.map((eachBlog) => {
              return <BlogCard blog={eachBlog} key={eachBlog.id} />;
            })}
          </>
        )}
      </section>
    </main>
  );
}
