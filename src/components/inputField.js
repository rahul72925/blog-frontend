import React from "react";

export const InputFiled = ({ className = "", ...props }) => {
  return (
    <input
      type="text"
      className={`${className} drop-shadow-md outline-none  text-gray-900 text-sm rounded-lg   block w-full p-2.5  `}
      {...props}
    />
  );
};
