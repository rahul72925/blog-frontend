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
            type="password"
            value={cred.password}
            name="password"
            onChange={handleOnChange}
          />
          {error && <Warning title={error} />}
        </div>
        <br />
        <div className="flex justify-center">
          <Button
            onClick={handleLoginClick}
            className={`${isLoading ? "cursor-not-allowed opacity-20" : ""}`}
          >
            {isLoading ? (
              <div
                className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
            ) : (
              "Login"
            )}
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
