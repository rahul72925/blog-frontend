import axios from "axios";
import { create } from "zustand";
import jwt from "jsonwebtoken";

export const useStore = create((set) => ({
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
}));
