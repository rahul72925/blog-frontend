import { Logout, ProfileIcon } from "@/assets";
import { useStore } from "@/store/useStore";
import { useState } from "react";
import { toast } from "react-toastify";

export const UserIconForHeader = () => {
  const [userData, logout] = useStore((state) => [
    state.userData,
    state.logout,
  ]);

  const [showDetail, setShowDetail] = useState(false);

  const handleClick = () => {
    setShowDetail(!showDetail);
  };

  const handleLogout = () => {
    logout(() => {
      toast.success("Logout successfully");
    });
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
        <div className="absolute w-36 h-32 bg-slate-50 top-12 right-3 rounded drop-shadow-md p-4">
          <div className="flex cursor-pointer my-3 ">
            <ProfileIcon />
            <span className="text-md text-slate-700 ml-1  hover:underline">
              My Profile
            </span>
          </div>
          <br />
          <div className="flex cursor-pointer " onClick={handleLogout}>
            <Logout />
            <span className="text-md text-slate-700 cursor-pointer hover:underline ml-1">
              Logout
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
