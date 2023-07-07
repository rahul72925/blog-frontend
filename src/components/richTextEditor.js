"use client";
import { forwardRef, useImperativeHandle, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const RichTextEditor = forwardRef((props, ref) => {
  const [value, setValue] = useState(props.value || "");
  useImperativeHandle(ref, () => ({ value }), [value]);
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "code-block",
    "formula",
    "align",
    "font",
    "color",
    "strike",
  ];

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
      [{ align: [] }],
    ],
  };
  return (
    <div>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        formats={formats}
        modules={modules}
      />
      <br />
      {value}
    </div>
  );
});
