import React from "react";

export const Button = ({ children, onClick, className = "" }) => {
  return (
    <button
      className={`rounded-lg bg-sky-400 px-6 py-2 hover:bg-sky-600 font-medium ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
