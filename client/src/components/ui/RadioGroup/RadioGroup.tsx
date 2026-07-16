import React, { createContext, useContext } from "react";

interface RadioGroupContextType {
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
}

const RadioGroupContext = createContext<RadioGroupContextType | undefined>(undefined);

interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  children: React.ReactNode;
}

export default function RadioGroup({
  value,
  onChange,
  name,
  children,
  className = "",
  ...props
}: RadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ value, onChange, name }}>
      <div className={`space-y-2 ${className}`} {...props}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

interface RadioGroupItemProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  label: string;
  description?: string;
}

export function RadioGroupItem({
  value,
  label,
  description,
  className = "",
  ...props
}: RadioGroupItemProps) {
  const context = useContext(RadioGroupContext);
  if (!context) {
    throw new Error("RadioGroupItem must be used within a RadioGroup component");
  }

  const isChecked = context.value === value;

  return (
    <label
      className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition select-none ${
        isChecked
          ? "border-blue-600 bg-blue-50/50 dark:border-blue-500 dark:bg-blue-950/20"
          : "border-gray-250 bg-white hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900/30 dark:hover:bg-gray-850"
      } ${className}`}
    >
      <div className="flex items-center h-5 mt-0.5">
        <input
          type="radio"
          name={context.name}
          value={value}
          checked={isChecked}
          onChange={() => context.onChange?.(value)}
          className="sr-only"
          {...props}
        />
        <div
          className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center transition-colors ${
            isChecked
              ? "border-blue-600 bg-blue-600 dark:border-blue-500 dark:bg-blue-500"
              : "border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-900"
          }`}
        >
          {isChecked && <div className="w-2 h-2 rounded-full bg-white" />}
        </div>
      </div>
      <div className="grid gap-0.5 leading-none">
        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {label}
        </span>
        {description && (
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {description}
          </span>
        )}
      </div>
    </label>
  );
}

// Attach Item for compound reference compatibility
RadioGroup.Item = RadioGroupItem;
