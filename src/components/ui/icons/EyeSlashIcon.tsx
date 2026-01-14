import { IconProps } from "./types";

export const EyeSlashIcon = ({
  width = 20,
  height = 20,
  className,
}: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 62 62"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_3011_388)">
        <g opacity="0.5">
          <path
            d="M17.8802 30.3108C17.7912 30.0471 17.7912 29.7615 17.8802 29.4978C19.645 24.1881 24.6544 20.3582 30.5583 20.3582C36.4596 20.3582 41.4665 24.1843 43.2351 29.4914C43.3241 29.7548 43.3241 30.0398 43.2351 30.3045C41.4715 35.6142 36.4621 39.4441 30.5583 39.4441C24.6569 39.4441 19.6488 35.618 17.8802 30.3108Z"
            stroke="currentColor"
            strokeWidth="1.90858"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M34.3546 30.5373C34.3546 31.5497 33.9524 32.5206 33.2365 33.2365C32.5207 33.9523 31.5498 34.3545 30.5374 34.3545C29.525 34.3545 28.5541 33.9523 27.8382 33.2365C27.1224 32.5206 26.7202 31.5497 26.7202 30.5373C26.7202 29.5249 27.1224 28.554 27.8382 27.8382C28.5541 27.1223 29.525 26.7202 30.5374 26.7202C31.5498 26.7202 32.5207 27.1223 33.2365 27.8382C33.9524 28.554 34.3546 29.5249 34.3546 30.5373Z"
            stroke="currentColor"
            strokeWidth="1.90858"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="20"
            y1="20"
            x2="42"
            y2="42"
            stroke="currentColor"
            strokeWidth="1.90858"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_3011_388">
          <rect width="61.0747" height="61.0747" rx="30.5373" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
