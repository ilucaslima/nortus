import { IconProps } from "./types";

export const ResolvedTodayIcon = ({
  width = 32,
  height = 32,
  className,
}: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M20.0002 3.33333H16.0002C10.029 3.33333 7.04348 3.33333 5.18848 5.18831C3.3335 7.04331 3.3335 10.0289 3.3335 16C3.3335 21.9711 3.3335 24.9567 5.18848 26.8117C7.04348 28.6667 10.029 28.6667 16.0002 28.6667C21.9712 28.6667 24.9568 28.6667 26.8119 26.8117C28.6668 24.9567 28.6668 21.9711 28.6668 16V13.3333"
        stroke="#43D2CB"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M11.3335 13.3333L16.0002 18L28.0004 4.66667"
        stroke="#43D2CB"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
