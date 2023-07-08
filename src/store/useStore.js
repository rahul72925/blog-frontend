"use client";

import axios from "axios";
import { create } from "zustand";
import jwt from "jsonwebtoken";

export const useStore = create((set, get) => ({
  isAuthenticated: false,
  isAuthenticating: true,
  userId: null,
  userData: null,
  login: (token) => {
    if (!token) {
      return set(() => ({ isAuthenticated: false, isAuthenticating: false }));
    }
    localStorage.setItem("token", token);
    var decoded = jwt.decode(token);
    console.log("decoded", decoded);
    return set(() => ({
      isAuthenticated: true,
      isAuthenticating: false,
      userId: decoded.user_data.id,
      userData: decoded.user_data,
    }));
  },
  logout: async (cb) => {
    localStorage.removeItem("token");
    axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/logout`,
      withCredentials: true,
    })
      .then(() => {
        cb();
        localStorage.removeItem("token");
        set(() => ({ isAuthenticated: false, userId: null, userData: null }));
      })
      .catch((error) => {
        console.log("logout error", error);
      });
  },
  handleLike: async (blogId, successCB, failureCB) => {
    if (!get().isAuthenticated) {
      return alert("Please login!");
    }
    axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/blog/like?blogId=${blogId}`,
      withCredentials: true,
    })
      .then((res) => {
        successCB();
      })
      .catch((error) => {
        console.log("Error:", error);
        failureCB();
      });
  },
}));
