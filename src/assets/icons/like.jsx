import * as React from "react";
const LikeIcon = ({ isLiked = false, ...props }) =>
  isLiked ? (
    <svg
      width="20"
      height="20"
      viewBox="0 0 0.72 0.72"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.21 0.09c-0.046 0 -0.092 0.015 -0.128 0.051 -0.07 0.072 -0.068 0.183 0 0.255L0.36 0.69l0.277 -0.294c0.068 -0.072 0.07 -0.183 0 -0.255 -0.07 -0.069 -0.185 -0.069 -0.255 0l-0.022 0.024 -0.022 -0.024C0.302 0.105 0.256 0.09 0.21 0.09z"
        fill="#e74c3c"
      />
    </svg>
  ) : (
    <svg
      width={20}
      height={20}
      viewBox="0 0 0.72 0.72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M.36.136a.18.18 0 0 0-.247.261l.205.205a.06.06 0 0 0 .085 0L.608.397A.18.18 0 0 0 .36.136zM.325.185l.014.014a.03.03 0 0 0 .042 0L.395.185a.12.12 0 1 1 .17.17L.36.56.155.355a.12.12 0 0 1 .17-.17z"
        fill="#0D0D0D"
      />
    </svg>
  );
export { LikeIcon };
