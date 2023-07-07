import React from "react";

export const Button = ({
  children,
  onClick,
  className = "",
  variant = "solid",
  isLoading = false,
}) => {
  let additionalClass = "";
  switch (variant) {
    case "outline":
      additionalClass =
        "text-blue-700 hover:text-white border border-blue-700 hover:bg-[#1da1f2]  hover:bg-[#1da1f2]/90";
      break;
    default:
      additionalClass = "text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90";
  }
  return (
    <button
      // className={`rounded-lg bg-sky-400 px-6 py-2 hover:bg-sky-600 font-medium ${className}`}
      className={` px-5 py-2.5 text-sm font-medium rounded-lg ${additionalClass}  ${className}`}
      onClick={onClick}
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
        <>{children}</>
      )}
    </button>
  );
};
