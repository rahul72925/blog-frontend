"use client";

import { Button, InputFiled, Warning } from "@/components";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useStore } from "@/store/useStore";

export default function Login() {
  const router = useRouter();

  const login = useStore((state) => state.login);

  const [currentLoginBy, setCurrentLoginBy] = useState("username");
  const [showPassword, setShowPassword] = useState(false);
  const [cred, setCred] = useState({
    fieldValue: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, serError] = useState(null);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setCred((prev) => ({ ...prev, [name]: value }));
  };

  const changeLoginBy = () => {
    setCurrentLoginBy((prev) => (prev == "username" ? "email" : "username"));
  };

  const handleLoginClick = async (e) => {
    e.preventDefault();
    serError(null);
    setIsLoading(true);
    try {
      const { data } = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/login`,
        data: {
          [currentLoginBy]: cred.fieldValue,
          password: cred.password,
        },
        withCredentials: true,
      });
      if (data.success) {
        // localStorage.setItem("token", data.data.token);
        // var decoded = jwt.decode(data.data.token);
        login(data.data.token);
        router.push("/");
      }
    } catch (error) {
      console.log("error", error);
      if (error.response.status !== 500) {
        serError(error.response.data.message);
      }
      return toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateNewAccount = () => {
    router.push("/signup");
  };
  const handleShowPasswordClick = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <main className="w-full flex justify-center items-center h-auto">
      <section className="w-full rounded-md md:w-1/3 m-4 bg-sky-100 p-4 box-border h-full">
        <header className="text-center">
          <h2 className="font-bold text-4xl py-4 ">Login</h2>
        </header>
        <div>
          <div className="flex justify-between items-center">
            <p className="py-2">{currentLoginBy}</p>
            <span
              onClick={changeLoginBy}
              className="text-sm underline italic cursor-pointer"
            >
              by {currentLoginBy == "username" ? "email" : "username"}
            </span>
          </div>
          <InputFiled
            value={cred.fieldValue}
            name="fieldValue"
            onChange={handleOnChange}
          />
          <br />
          <p className="py-2">password</p>
          <InputFiled
            type={showPassword ? "text" : "password"}
            value={cred.password}
            name="password"
            onChange={handleOnChange}
          />
          <div className="flex justify-end mt-2 ">
            <span
              className="italic text-sm cursor-pointer underline"
              onClick={handleShowPasswordClick}
            >
              {!showPassword ? "show" : "hide"} password
            </span>
          </div>
          {error && <Warning title={error} />}
        </div>
        <br />
        <div className="flex justify-center">
          <Button
            onClick={handleLoginClick}
            className={`${isLoading ? "cursor-not-allowed opacity-20" : ""}`}
            isLoading={isLoading}
          >
            Login
          </Button>
        </div>
        <footer className="text-center mt-10">
          <span
            className="cursor-point hover:underline hover:decoration-solid cursor-pointer text-blue-700"
            onClick={handleCreateNewAccount}
          >
            Create a new account
          </span>
        </footer>
      </section>
    </main>
  );
}
