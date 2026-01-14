import { IconProps } from "./types";

export const PrevPageIcon = ({ size = 32, className }: IconProps) => {
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
        d="M18.6998 20.5714L10.6665 13.6857L18.6998 6.79999L20.1332 8.02856L13.5332 13.6857L20.1332 19.3428L18.6998 20.5714Z"
        fill="currentColor"
      />
    </svg>
  );
};
