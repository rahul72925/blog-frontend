"use client";

import { Button, InputFiled, RichTextEditor } from "@/components";
import { blogTags } from "@/utils/blogTags";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";

const blogTagsMapped = blogTags.map((eachTag) => ({
  value: eachTag,
  label: eachTag,
}));

export default function CreateBlog({ params }) {
  const [blogData, setBlogData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [loadingState, setLoadingState] = useState({
    publishBtnDisabled: false,
    saveDraftBtnDisabled: false,
  });

  const richTextRef = useRef(null);

  useEffect(() => {
    setIsLoading(true);
    axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/blog/get?blogId=${params.blogId}`,
    })
      .then(({ data }) => {
        setBlogData(data.blogs[0]);
      })
      .catch((err) => {
        console.log("blog fetch error", err);
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const onPublishClick = () => {
    setLoadingState((prev) => ({ ...prev, publishBtnDisabled: true }));
    axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/blog/update-blog?blogId=${params.blogId}`,
      data: {
        title: blogData.title,
        tags: blogData.tags,
        post: richTextRef.current.value,
        isAllowComments: blogData.is_allow_comments,
        isDraft: false,
        isPublished: true,
        isArchived: blogData?.is_archived,
      },
      withCredentials: true,
    })
      .then((res) => {
        toast.success("Published successfully");
      })
      .catch((error) => {
        console.log("save draft error", error);
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setLoadingState((prev) => ({ ...prev, publishBtnDisabled: false }));
      });
  };

  const onSaveDraftClick = () => {
    setLoadingState((prev) => ({ ...prev, saveDraftBtnDisabled: true }));

    axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/blog/update-blog?blogId=${params.blogId}`,
      data: {
        title: blogData.title,
        tags: blogData.tags,
        post: richTextRef.current.value,
        isAllowComments: blogData.is_allow_comments,
        isDraft: true,
        isPublished: false,
        isArchived: blogData?.is_archived,
      },
      withCredentials: true,
    })
      .then((res) => {
        toast.success("Save successfully");
      })
      .catch((error) => {
        console.log("save draft error", error);
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setLoadingState((prev) => ({ ...prev, saveDraftBtnDisabled: false }));
      });
  };

  const handleOnChange = (e) => {
    const { name, value, type } = e.target;
    console.log(name, value, type);
    setBlogData((prev) => ({
      ...prev,
      [name]: type == "checkbox" ? !prev[name] : value,
    }));
  };

  const handleTagSelection = (selected) => {
    const val = selected.map((x) => x.value);
    setBlogData((prev) => ({
      ...prev,
      tags: val,
    }));
  };

  if (isLoading) {
    return (
      <main className="h-36 w-full flex justify-center items-center">
        <div
          className="inline-block h-10 w-10 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </main>
    );
  }

  return (
    <main className="m-4">
      <header className="flex items-center mb-4">
        <label className="mr-4 text-xl">Title:</label>
        <InputFiled value={blogData.title} />
      </header>
      <section className="mb-4">
        <div>
          <div class="flex items-center w-36 mb-4">
            <label for="allow-comment-checkbox-list" class="w-full py-3 ">
              Allow comments:
            </label>
            <input
              id="allow-comment-checkbox-list"
              type="checkbox"
              value={blogData.is_allow_comments}
              name="is_allow_comments"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              onChange={handleOnChange}
              checked={blogData.is_allow_comments}
            />
          </div>
          <div class="flex items-center  w-full md:w-1/2 mb-4">
            <label for="tags" class="py-3">
              Tags:
            </label>
            <Select
              defaultValue={blogData.tags.map((x) => ({ value: x, label: x }))}
              isMulti
              name="tags"
              options={blogTagsMapped}
              className="basic-multi-select w-full md:w-2/3 ml-4"
              classNamePrefix="select"
              onChange={handleTagSelection}
            />
          </div>
        </div>

        <RichTextEditor ref={richTextRef} value={blogData?.post} />
      </section>
      <footer className="flex justify-end">
        <Button
          variant="outline"
          onClick={onSaveDraftClick}
          isLoading={loadingState.saveDraftBtnDisabled}
        >
          Save Draft
        </Button>
        <Button
          className="ml-4"
          onClick={onPublishClick}
          isLoading={loadingState.publishBtnDisabled}
        >
          {" "}
          Publish
        </Button>
      </footer>
    </main>
  );
}
