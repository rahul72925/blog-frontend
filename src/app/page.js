import { BlogCard } from "@/components/blogCard";
import { BlogSearch } from "@/components/blogSearch";
import { cookies } from "next/headers";

async function getData() {
  const res = await fetch("http://localhost:4002/api/blog/get", {
    cache: "no-store",
    headers: { Cookie: cookies().toString() },
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();
  const { blogs } = data;
  console.log("blog length", blogs);
  if (blogs.length == 0) {
    return (
      <main className="home_blog_content_main">
        <span>Oops no blog available</span>
      </main>
    );
  }
  console.log("blog length after", blogs.length);

  return (
    <main className="h-auto flex justify-center">
      <section className="w-full lg:w-3/5 h-full">
        <BlogSearch />
        {blogs.map((eachBlog) => {
          return <BlogCard blog={eachBlog} key={eachBlog.id} />;
        })}
      </section>
    </main>
  );
}
