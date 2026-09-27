/**
 * Lightweight, dependency-free client-side validation helpers.
 *
 * Reminder (Stage 7 spec, Step 14): client-side validation is a UX layer,
 * not a security boundary. Stage 8 must re-validate on the server.
 */

export type FieldError = string | undefined;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Loose, international-friendly: digits, spaces, parentheses, dashes, an
// optional leading +, 7–20 characters of content.
const PHONE_RE = /^\+?[0-9\s().-]{7,20}$/;

export function validateRequiredText(
  value: string,
  label: string,
  { min = 2, max = 120 }: { min?: number; max?: number } = {},
): FieldError {
  const trimmed = value.trim();
  if (!trimmed) return `${label} is required.`;
  if (trimmed.length < min) return `${label} should be at least ${min} characters.`;
  if (trimmed.length > max) return `${label} should be under ${max} characters.`;
  return undefined;
}

export function validateOptionalText(
  value: string,
  label: string,
  { max = 200 }: { max?: number } = {},
): FieldError {
  const trimmed = value.trim();
  if (trimmed.length > max) return `${label} should be under ${max} characters.`;
  return undefined;
}

export function validateEmail(value: string): FieldError {
  const trimmed = value.trim();
  if (!trimmed) return "Email is required.";
  if (!EMAIL_RE.test(trimmed)) return "Enter a valid email address.";
  return undefined;
}

export function validatePhone(value: string, required = true): FieldError {
  const trimmed = value.trim();
  if (!trimmed) return required ? "Phone number is required." : undefined;
  if (!PHONE_RE.test(trimmed)) return "Enter a valid phone number.";
  return undefined;
}

export function validateSelect(
  value: string,
  label: string,
  { required = true }: { required?: boolean } = {},
): FieldError {
  if (!required) return undefined;
  if (!value) return `Select ${startsWithVowel(label) ? "an" : "a"} ${label.toLowerCase()}.`;
  return undefined;
}

export function validateTextarea(
  value: string,
  label: string,
  { min = 10, max = 2000 }: { min?: number; max?: number } = {},
): FieldError {
  const trimmed = value.trim();
  if (!trimmed) return `${label} is required.`;
  if (trimmed.length < min) return `${label} should be at least ${min} characters.`;
  if (trimmed.length > max) return `${label} should be under ${max} characters.`;
  return undefined;
}

export function validateChecklist(
  values: string[],
  label: string,
  { required = false }: { required?: boolean } = {},
): FieldError {
  if (required && values.length === 0) return `Select at least one ${label.toLowerCase()}.`;
  return undefined;
}

function startsWithVowel(word: string): boolean {
  return /^[aeiou]/i.test(word.trim());
}

/** True if the given error map has at least one defined error. */
export function hasErrors(errors: Record<string, FieldError>): boolean {
  return Object.values(errors).some(Boolean);
}
