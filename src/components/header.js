import React from "react";
import { Button } from "./button";

import Link from "next/link";

export const Header = () => {
  return (
    <header className="h-20 bg-slate-50 grid grid-rows-1 grid-cols-6 ">
      <div className="col-span-4 flex justify-center items-center text-3xl font-semibold sm:col-span-5">
        <Link href="/" className="cursor-pointer">
          Bloggers
        </Link>
      </div>
      <div className="col-span-2 flex justify-center items-center sm:col-span-1">
        <Button>Login</Button>
      </div>
    </header>
  );
};
