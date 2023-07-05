"use client";

import { Header } from "@/components";
import "./globals.css";
import { Inter } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useSession } from "@/hooks/useSession";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  useSession();
  return (
    <html lang="en">
      <body className="h-screen">
        <Header />
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
