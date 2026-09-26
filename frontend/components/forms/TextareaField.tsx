"use client";

import { fieldClasses } from "@/components/forms/FormField";

type TextareaFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
  className?: string;
};

export function TextareaField({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  placeholder,
  rows = 5,
  maxLength,
  className = "",
}: TextareaFieldProps) {
  const errorId = `${id}-error`;

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-white">
        {label}
        {required ? (
          <span className="ml-1 text-gold" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-1 text-xs font-normal text-muted">(optional)</span>
        )}
      </label>
      <textarea
        id={id}
        name={id}
        value={value}
        required={required}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`${fieldClasses(!!error)} resize-y`}
      />
      {error ? (
        <p id={errorId} role="alert" className="mt-1.5 text-xs text-[#f87171]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
