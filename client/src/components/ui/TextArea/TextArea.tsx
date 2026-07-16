import type { TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export default function TextArea({
  label,
  id,
  error,
  helperText,
  className = "",
  rows = 4,
  ...props
}: TextAreaProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>

      <textarea
        id={id}
        rows={rows}
        className={`
          w-full rounded-md border border-gray-300 dark:border-gray-700
          bg-white dark:bg-gray-900
          text-gray-900 dark:text-gray-100
          px-4 py-2
          outline-none
          transition
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-500/50
          ${error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""}
          ${className}
        `}
        {...props}
      />

      {error ? (
        <p className="text-sm text-red-500">
          {error}
        </p>
      ) : helperText ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
