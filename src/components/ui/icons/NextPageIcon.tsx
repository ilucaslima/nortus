import { IconProps } from "./types";

export const NextPageIcon = ({ width = 32, className }: IconProps) => {
  return (
    <svg
      width={width}
      height="28"
      viewBox="0 0 32 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12.5002 20.5714L11.0669 19.3428L17.6669 13.6857L11.0669 8.02856L12.5002 6.79999L20.5336 13.6857L12.5002 20.5714Z"
        fill="currentColor"
      />
    </svg>
  );
};
