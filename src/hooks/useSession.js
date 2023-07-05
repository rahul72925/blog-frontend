"use client";

import { useStore } from "@/store/useStore";
import { useEffect } from "react";

export function useSession() {
  const login = useStore((state) => state.login);

  useEffect(() => {
    const token = localStorage.getItem("token");
    login(token);
  }, []);
}
