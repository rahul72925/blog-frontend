import { LikeIcon } from "@/assets";
import { CommentIcon } from "@/assets/icons/comment";
import { WordIcon } from "@/components";
import { BlogPageFooter } from "@/components/blogPageFooter";
import { CommentRenderer } from "@/components/commentRenderer";
import { CommentSection } from "@/components/commentSection";
import moment from "moment";
import { cookies } from "next/headers";

async function getComments(blogId) {
  const commentRes = await fetch(
    `http://localhost:4002/api/blog/comments/get?blogId=${blogId}`,
    {
      cache: "no-store",
      headers: { Cookie: cookies().toString() },
    }
  );

  if (!commentRes.ok) {
    throw new Error("Failed to fetch data");
  }

  return commentRes.json();
}
async function getBlogData(blogId) {
  const res = await fetch(
    `http://localhost:4002/api/blog/get?blogId=${blogId}`,
    {
      cache: "no-store",
      headers: { Cookie: cookies().toString() },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function BlogPage({ params }) {
  const {
    blogs: [blogData],
  } = await getBlogData(params.blogId);
  const { comments } = await getComments(params.blogId);
  return (
    <main className="grid grid-cols-7 pt-2 md:pt-4 w-full h-auto">
      <div className="hidden md:block col-span-1"></div>
      <div className="col-span-7 md:col-span-4 px-4 bg-gray-200 w-full h-auto">
        <header>
          <div className="flex my-4">
            <div className="flex items-center">
              <LikeIcon /> <span className="ml-">{blogData.likes_count}</span>
            </div>
            <div className="flex items-center ml-4">
              <CommentIcon />{" "}
              <span className="ml-1">{blogData.comments_count}</span>
            </div>
          </div>
          <div className="grid grid-cols-6 my-4">
            <WordIcon word={blogData.name || blogData.username} />
            <div className="col-span-5 ml-4">
              <span className="italic text-md">
                Written by {blogData.name || blogData.username}
              </span>
              <br />
              <span>{moment(blogData.created_at)}</span>
            </div>
          </div>
          <h1 className="text-xl md:text-4xl font-bold my-4">
            {blogData?.title}
          </h1>
          <div>
            {blogData.tags.length > 0
              ? blogData.tags.map((eachTag) => (
                  <span className="rounded-lg bg-white border-neutral-400 border p-2 mr-2 text-xs text-slate-800">
                    {eachTag}
                  </span>
                ))
              : null}
          </div>
        </header>
        <section className="my-6">
          <div dangerouslySetInnerHTML={{ __html: blogData.post }} />
        </section>
        <BlogPageFooter blogData={blogData} comments={comments} />
      </div>
      <div className="hidden md:block col-span-1"></div>
    </main>
  );
}
