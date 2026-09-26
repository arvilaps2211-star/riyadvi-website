/**
 * Shared frontend API client for lead-generation submissions (Stage 8).
 *
 * Centralizes the fetch call + response shape so no component duplicates
 * `fetch(...)` directly. Base URL comes from NEXT_PUBLIC_API_URL — the only
 * env var safe to expose to the browser; never put secrets in a
 * NEXT_PUBLIC_* variable.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export type ApiSuccess<T> = {
  success: true;
  message: string;
  data?: T;
};

export type ApiValidationError = {
  success: false;
  message: string;
  errors: Record<string, string>;
};

export type ApiFailure = {
  success: false;
  message: string;
  errors?: Record<string, string>;
};

export type ApiResult<T> = ApiSuccess<T> | ApiFailure;

/**
 * POST JSON to a Riyadvi API route and return its parsed response.
 *
 * Never throws for an ordinary API-level failure (validation error, server
 * error) — those come back as `{ success: false, ... }` so callers can
 * render them normally. Only a genuine network failure (server unreachable,
 * DNS failure, etc.) is surfaced as a thrown error, since there is no JSON
 * response to parse in that case.
 */
export async function postJson<T>(
  path: string,
  payload: unknown,
): Promise<ApiResult<T>> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    // Network-level failure — the API could not be reached at all.
    return {
      success: false,
      message:
        "We couldn't reach the server. Check your connection and try again.",
    };
  }

  let body: unknown;
  try {
    body = await response.json();
  } catch {
    return {
      success: false,
      message: "We could not process your request right now. Please try again later.",
    };
  }

  return body as ApiResult<T>;
}

export const api = {
  contact: (payload: unknown) => postJson<{ id: string }>("/api/contact", payload),
  healthCheckup: (payload: unknown) =>
    postJson<{ id: string }>("/api/health-checkup", payload),
  leadMagnet: (payload: unknown) =>
    postJson<{ id: string; downloadUrl: string | null }>("/api/lead-magnet", payload),
  applications: (payload: unknown) =>
    postJson<{ id: string }>("/api/applications", payload),
};
