"use client";

import React from "react";
import { Button } from "./button";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import { toast } from "react-toastify";

export const Header = () => {
  const router = useRouter();
  const [isAuthenticated, logout] = useStore((state) => [
    state.isAuthenticated,
    state.logout,
  ]);

  const handleButtonClick = () => {
    isAuthenticated
      ? logout(() => toast.success("Logout successfully"))
      : router.push("/login");
  };

  return (
    <header className="h-20 bg-slate-50 grid grid-rows-1 grid-cols-6 ">
      <div className="col-span-4 flex justify-center items-center text-3xl font-semibold sm:col-span-5">
        <Link href="/" className="cursor-pointer">
          Bloggers
        </Link>
      </div>
      <div className="col-span-2 flex justify-center items-center sm:col-span-1">
        {isAuthenticated ? (
          <Button onClick={handleButtonClick}>Logout</Button>
        ) : (
          <Button onClick={handleButtonClick}>Login</Button>
        )}
      </div>
    </header>
  );
};
