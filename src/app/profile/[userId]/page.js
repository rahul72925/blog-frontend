import { WordIcon } from "@/components";
import { BlogCard } from "@/components/blogCard";
import { cookies } from "next/headers";

async function getData(userId) {
  const res = await fetch(
    `http://localhost:4002/api/user?userId=${userId}&withBlogs=true`,
    { cache: "no-store", headers: { Cookie: cookies().toString() } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Profile({ params }) {
  const { data } = await getData(params.userId);
  const user = data.userData[0];
  const blogs = data.blogs;

  return (
    <div className="grid grid-cols-3 md:grid-cols-5 h-full">
      <div className="hidden col-span-1 md:block"></div>
      <div className="col-span-3 p-4 bg-gray-200 ">
        <div className="grid grid-cols-5 mb-4">
          <div className="col-span-1 grid items-center justify-center">
            <WordIcon word={user.username} />
          </div>
          <div className=" grid col-span-4 items-center">
            <span className="text-xl">{user.username}</span>
            <span className="text-xl">{user.name || "name"} </span>
            <span className="text-md italic">{user.email || ""} </span>
          </div>
        </div>
        {/* BLOGS */}
        <hr></hr>
        <div className="mt-4">
          {blogs.map((eachBlog) => (
            <BlogCard key={eachBlog.id} blog={eachBlog} showEditIcon={true} />
          ))}
        </div>
      </div>
      <div className="hidden col-span-1 md:block"></div>
    </div>
  );
}
