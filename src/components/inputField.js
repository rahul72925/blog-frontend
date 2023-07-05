import React from "react";

export const InputFiled = ({ className = "", ...props }) => {
  return (
    <input
      type="text"
      className={`${className} drop-shadow-md outline-none  text-gray-900 text-sm rounded-lg border-2 border-slate-300   block w-full p-2.5  `}
      {...props}
    />
  );
};
