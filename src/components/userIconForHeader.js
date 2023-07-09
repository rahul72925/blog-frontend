"use client";
import { BlogCreateIcon, Logout, ProfileIcon } from "@/assets";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

export const UserIconForHeader = ({ handleCreateBlog }) => {
  const [userData, logout, userId] = useStore((state) => [
    state.userData,
    state.logout,
    state.userId,
  ]);

  const showDetailsRef = useRef();

  const router = useRouter();

  const [showDetail, setShowDetail] = useState(false);

  useOnClickOutside(showDetailsRef, () => {
    setShowDetail(false);
  });

  const handleClick = () => {
    setShowDetail(!showDetail);
  };

  const handleLogout = () => {
    logout(() => {
      router.push("/");
      toast.success("Logout successfully");
    });
  };

  const handleMyProfileClick = () => {
    router.push(`/profile/${userId}`);
  };

  return (
    <div className="relative">
      {userData.profile_picture ? null : (
        <div
          className=" flex justify-center items-center w-12 h-12   bg-gray-300 font-medium rounded-full cursor-pointer relative"
          onClick={handleClick}
        >
          <span className="text-2xl">
            {userData.username.charAt(0).toUpperCase()}
          </span>
        </div>
      )}
      {showDetail && (
        <div
          className="absolute w-52 h-36 md:w-36 md:h-28 z-50 bg-slate-50 top-12 right-3 rounded drop-shadow-md p-4"
          ref={showDetailsRef}
        >
          <div
            className="flex cursor-pointer mb-4 "
            onClick={handleMyProfileClick}
          >
            <ProfileIcon />
            <span className="text-md text-slate-700 ml-1  hover:underline">
              My Profile
            </span>
          </div>
          <div className="flex cursor-pointer mb-4" onClick={handleLogout}>
            <Logout />
            <span className="text-md text-slate-700 cursor-pointer hover:underline ml-1">
              Logout
            </span>
          </div>
          <div
            className="flex cursor-pointer md:hidden"
            onClick={handleCreateBlog}
          >
            <BlogCreateIcon />
            <span className="text-md text-slate-700 cursor-pointer hover:underline ml-1">
              Create Blog
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
