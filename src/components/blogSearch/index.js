"user client";

import React from "react";
import { InputFiled } from "../inputField";
import { Button } from "../button";

export const BlogSearch = () => {
  return (
    <div className="flex justify-center p-4 w-full">
      <div className="flex gap-4 p-4 w-2/3">
        <InputFiled placeholder="search..." />
        <Button>Search</Button>
      </div>
    </div>
  );
};
