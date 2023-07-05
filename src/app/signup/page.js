"use client";
import { Button, InputFiled, Warning } from "@/components";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const { data } = await axios({
        method: "POST",
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/register`,
        data: userData,
      });
      toast.success("Register successfully!");
      router.push("/login");
    } catch (error) {
      console.log("error", error, error.response.data.message);
      if (error.response.status !== 500) {
        setError(error.response.data.message);
      }
      return toast.warn("Something went wrong!");
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <main className="flex justify-center box-border">
      <section className=" md:w-1/3 p-4 ">
        <header>
          <h1 className="text-3xl text-center">Signup</h1>
        </header>
        <div>
          <label>username*</label>
          <InputFiled
            type="text"
            required
            placeholder="username..."
            name="username"
            value={userData.username}
            onChange={handleOnChange}
          />
          <br />
          <label>email address*</label>
          <InputFiled
            type="email"
            required
            placeholder="email..."
            name="email"
            value={userData.email}
            onChange={handleOnChange}
          />
          <br />
          <label>password</label>
          <InputFiled
            type="password"
            required
            placeholder="password..."
            name="password"
            value={userData.password}
            onChange={handleOnChange}
          />
        </div>
        {error && <Warning title={error} />}
        <br />
        <div className="flex flex-column items-center justify-center">
          <Button onClick={handleSignup}>Sign up</Button>
        </div>
        <br />
        <footer className="text-center mt-4">
          <span className="cursor-point hover:underline hover:decoration-solid cursor-pointer text-blue-700">
            Already have and account?
          </span>
        </footer>
      </section>
    </main>
  );
}
