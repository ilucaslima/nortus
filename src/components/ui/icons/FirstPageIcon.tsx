import { IconProps } from "./types";

export const FirstPageIcon = ({ size = 32, className }: IconProps) => {
  return (
    <svg
      width={size}
      height="28"
      viewBox="0 0 32 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M8 20.5714V6.85712H10V20.5714H8ZM22.9 20.4857L15.1 13.8L22.9 7.11426L24.3333 8.34283L17.9667 13.8L24.3333 19.2571L22.9 20.4857Z"
        fill="currentColor"
      />
    </svg>
  );
};
