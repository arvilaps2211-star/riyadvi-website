"use client";

import type { InputHTMLAttributes } from "react";

type FormFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
  type?: "text" | "email" | "tel";
  autoComplete?: string;
  placeholder?: string;
  className?: string;
} & Pick<InputHTMLAttributes<HTMLInputElement>, "maxLength" | "inputMode">;

/**
 * Reusable labeled text/email/tel input.
 * Label is always a real <label htmlFor>, never placeholder-only.
 */
export function FormField({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  type = "text",
  autoComplete,
  placeholder,
  className = "",
  ...rest
}: FormFieldProps) {
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
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={fieldClasses(!!error)}
        {...rest}
      />
      {error ? (
        <p id={errorId} role="alert" className="mt-1.5 text-xs text-[#f87171]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function fieldClasses(hasError: boolean): string {
  return [
    "mt-2 block w-full border bg-[#0a0a0a] px-3.5 py-2.5 text-sm text-white placeholder:text-muted/60",
    "transition-colors duration-150 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
    "disabled:cursor-not-allowed disabled:opacity-50",
    hasError
      ? "border-[#f87171]/70 focus-visible:outline-[#f87171]"
      : "border-border hover:border-border-gold focus-visible:border-border-gold",
  ].join(" ");
}
