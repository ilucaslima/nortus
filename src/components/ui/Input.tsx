import { InputHTMLAttributes, forwardRef, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "./Icons";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  required?: boolean;
  helperText?: string;
  rightIcon?: React.ReactNode;
  type?: "text" | "password" | "email" | "number" | "tel" | "url";
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      required,
      helperText,
      rightIcon,
      type = "text",
      className,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPasswordType = type === "password";
    const inputType = isPasswordType && showPassword ? "text" : type;
    const hasRightIcon = rightIcon || isPasswordType;

    const passwordToggleIcon = (
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="text-gray-400 focus:outline-none"
      >
        {showPassword ? (
          <EyeSlashIcon width="46" height="46" />
        ) : (
          <EyeIcon width="46" height="46" />
        )}
      </button>
    );

    return (
      <div className="relative">
        <div className="flex">
          <input
            ref={ref}
            type={inputType}
            className={`w-full px-4 py-4 border border-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent peer ${
              hasRightIcon ? "pr-12" : ""
            } ${className || ""}`}
            placeholder=" "
            {...props}
          />
          <label
            htmlFor={props.id}
            className="absolute left-4 top-4 text-gray-500 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:left-2 peer-focus:text-sm peer-focus:text-blue-500 peer-focus:bg-gray-900 peer-focus:px-2 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:left-2 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:bg-gray-900 peer-[:not(:placeholder-shown)]:px-2"
          >
            {label}
            {required && <span>*</span>}
          </label>
          {hasRightIcon && (
            <div className="absolute right-2 top-0.5">
              {isPasswordType ? passwordToggleIcon : rightIcon}
            </div>
          )}
        </div>
        {helperText && <p className="text-span text-sm mt-2">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
