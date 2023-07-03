"use client";

import { Button, InputFiled } from "@/components";
import React from "react";

export default function Login() {
  return (
    <main className="w-full flex justify-center items-center h-96">
      <section className="sm:w-1/3 sm:py-10 ">
        <header className="text-center">
          <h2 className="font-bold text-4xl py-4 ">Login</h2>
        </header>
        <div>
          <p className="py-2">username or email</p>
          <InputFiled />
          <br />
          <p className="py-2">password</p>
          <InputFiled type="password" />
          <br />
        </div>
        <div className="flex justify-center">
          <Button>Login</Button>
        </div>
        <footer className="text-center mt-10">
          <span className="cursor-point hover:underline hover:decoration-solid cursor-pointer text-blue-700">
            Create a new account
          </span>
        </footer>
      </section>
    </main>
  );
}
