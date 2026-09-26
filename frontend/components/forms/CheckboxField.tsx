"use client";

type CheckboxFieldProps = {
  legend: string;
  name: string;
  options: string[];
  values: string[];
  onChange: (values: string[]) => void;
  error?: string;
  required?: boolean;
  className?: string;
  columns?: 1 | 2 | 3;
};

/**
 * Reusable checkbox group. Renders as a native <fieldset>/<legend> so
 * screen readers announce the group's purpose, with each option as a
 * properly associated <label>/<input type="checkbox">.
 */
export function CheckboxField({
  legend,
  name,
  options,
  values,
  onChange,
  error,
  required = false,
  className = "",
  columns = 2,
}: CheckboxFieldProps) {
  const errorId = `${name}-error`;

  function toggle(option: string) {
    if (values.includes(option)) {
      onChange(values.filter((value) => value !== option));
    } else {
      onChange([...values, option]);
    }
  }

  const gridColsClass =
    columns === 3
      ? "sm:grid-cols-3"
      : columns === 2
        ? "sm:grid-cols-2"
        : "sm:grid-cols-1";

  return (
    <fieldset
      className={className}
      aria-describedby={error ? errorId : undefined}
    >
      <legend className="block text-sm font-medium text-white">
        {legend}
        {required ? (
          <span className="ml-1 text-gold" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-1 text-xs font-normal text-muted">(optional)</span>
        )}
      </legend>
      <div className={`mt-3 grid grid-cols-1 gap-2.5 ${gridColsClass}`}>
        {options.map((option) => {
          const id = `${name}-${option.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
          const checked = values.includes(option);
          return (
            <label
              key={option}
              htmlFor={id}
              className={`flex cursor-pointer items-center gap-2.5 border px-3.5 py-2.5 text-sm transition-colors ${
                checked
                  ? "border-border-gold bg-gold/10 text-white"
                  : "border-border bg-[#0a0a0a] text-muted hover:border-border-gold"
              }`}
            >
              <input
                id={id}
                type="checkbox"
                name={name}
                checked={checked}
                onChange={() => toggle(option)}
                className="h-4 w-4 shrink-0 accent-[#D4AF37] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              />
              {option}
            </label>
          );
        })}
      </div>
      {error ? (
        <p id={errorId} role="alert" className="mt-1.5 text-xs text-[#f87171]">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}
