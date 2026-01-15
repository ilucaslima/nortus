import { InputHTMLAttributes, forwardRef, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "./Icons";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  required?: boolean;
  helperText?: string;
  error?: string;
  rightIcon?: React.ReactNode;
  type?: "text" | "password" | "email" | "number" | "tel" | "url";
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      required,
      helperText,
      error,
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
    const hasError = !!error;

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
            className={`w-full px-4 py-4 border rounded-lg text-white focus:outline-none focus:ring-2 peer ${
              hasError
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "border-border focus:ring-blue-500 focus:border-transparent"
            } ${hasRightIcon ? "pr-12" : ""} ${className || ""}`}
            placeholder=" "
            {...props}
          />
          <label
            htmlFor={props.id}
            className={`absolute left-4 top-4 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:left-2 peer-focus:text-sm peer-focus:px-2 peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:left-2 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:bg-gray-900 peer-[:not(:placeholder-shown)]:px-2 ${
              hasError
                ? "text-red-500 peer-focus:text-red-500 peer-focus:bg-gray-900"
                : "text-gray-500 peer-focus:text-blue-500 peer-focus:bg-gray-900"
            }`}
          >
            {label}
            {required && <span className="text-red-500">*</span>}
          </label>
          {hasRightIcon && (
            <div className="absolute right-2 top-0.5">
              {isPasswordType ? passwordToggleIcon : rightIcon}
            </div>
          )}
        </div>
        {error ? (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        ) : (
          helperText && <p className="text-span text-sm mt-2">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
