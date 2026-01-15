import { TextareaHTMLAttributes, forwardRef } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  required?: boolean;
  helperText?: string;
  error?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, required, helperText, error, className, ...props }, ref) => {
    const hasError = !!error;

    return (
      <div className="relative">
        <textarea
          ref={ref}
          className={`w-full px-4 py-3 bg-card-bg rounded-2xl border border-border/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none ${
            className || ""
          } ${hasError ? "border-red-500 focus:ring-red-500" : ""}`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        {!error && helperText && (
          <p className="text-span text-sm mt-2">{helperText}</p>
        )}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";
