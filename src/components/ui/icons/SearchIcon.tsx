import { IconProps } from "./types";

export const SearchIcon = ({
  width = 16,
  height = 16,
  className,
}: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_1_9441)">
        <path
          d="M11.6665 11.6667L14.6665 14.6667"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M13.3335 7.33334C13.3335 4.01964 10.6472 1.33334 7.3335 1.33334C4.01979 1.33334 1.3335 4.01964 1.3335 7.33334C1.3335 10.6471 4.01979 13.3333 7.3335 13.3333C10.6472 13.3333 13.3335 10.6471 13.3335 7.33334Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1_9441">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
