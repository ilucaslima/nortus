import { SelectHTMLAttributes, forwardRef } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  required?: boolean;
  helperText?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      required,
      helperText,
      error,
      options,
      placeholder,
      className,
      ...props
    },
    ref
  ) => {
    const hasError = !!error;

    return (
      <div className="relative">
        <select
          ref={ref}
          className={`w-full px-4 py-3 bg-card-bg rounded-full border border-border/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
            className || ""
          } ${hasError ? "border-red-500 focus:ring-red-500" : ""}`}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        {!error && helperText && (
          <p className="text-span text-sm mt-2">{helperText}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
