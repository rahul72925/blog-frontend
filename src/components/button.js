import React from "react";

export const Button = ({ children, onClick }) => {
  return (
    <button
      className="rounded-lg bg-sky-400 px-6 py-2 hover:bg-sky-600 font-medium"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
