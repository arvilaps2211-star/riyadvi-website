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
  consultation: (payload: unknown) =>
    postJson<{ id: string }>("/api/consultation", payload),
  healthCheckup: (payload: unknown) =>
    postJson<{ id: string }>("/api/health-checkup", payload),
  leadMagnet: (payload: unknown) =>
    postJson<{ id: string; downloadUrl: string | null }>("/api/lead-magnet", payload),
  applications: (payload: unknown) =>
    postJson<{ id: string }>("/api/applications", payload),
};

// ---------------------------------------------------------------------------
// Admin API client (Phase 9)
//
// Every admin call sends credentials: "include" so the browser attaches the
// HttpOnly session cookie set by the backend (a different origin from the
// frontend in most deployments — the cookie lives on the backend's domain,
// never in frontend JS or localStorage). Nothing here ever reads or stores
// the session token itself; the browser/cookie jar owns that entirely.
// ---------------------------------------------------------------------------

export type AdminUser = {
  id: string;
  email: string;
  name: string | null;
  lastLoginAt: string | null;
};

export type LeadStatus = "new" | "contacted" | "in_progress" | "completed" | "archived";

export type LeadType = "contact" | "consultation" | "health_checkup" | "lead_magnet";

export type NormalizedLead = {
  id: string;
  type: LeadType;
  name: string;
  company: string | null;
  email: string;
  phone: string;
  source: string;
  status: LeadStatus;
  createdAt: string;
  updatedAt: string;
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type ApplicationRecord = {
  id: string;
  name: string;
  email: string;
  phone: string;
  job_slug: string;
  job_title: string;
  resume_reference: string | null;
  cover_message: string | null;
  status: LeadStatus;
  created_at: string;
  updated_at: string;
};

export type DashboardStats = {
  totalLeads: number;
  contactLeads: number;
  consultations: number;
  healthCheckups: number;
  leadMagnets: number;
  applications: number;
  newLeads: number;
  contacted: number;
  inProgress: number;
  completed: number;
  archived: number;
};

/**
 * Like postJson, but always includes credentials and supports every HTTP
 * method the admin API needs (GET/PATCH), not just POST. Also surfaces the
 * HTTP status code to callers, since admin screens need to distinguish 401
 * (redirect to login) from other failures.
 */
export type AdminApiResult<T> =
  | { success: true; message: string; data: T }
  | { success: false; message: string; errors?: Record<string, string>; status: number };

export type AdminApiListResult<T> =
  | { success: true; message: string; data: T[]; pagination: Pagination }
  | { success: false; message: string; errors?: Record<string, string>; status: number };

async function adminFetchRaw(
  path: string,
  options: { method?: string; body?: unknown } = {},
): Promise<
  | { ok: true; body: Record<string, unknown>; status: number }
  | { ok: false; message: string; errors?: Record<string, string>; status: number }
> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method: options.method || "GET",
      headers: options.body ? { "Content-Type": "application/json" } : undefined,
      credentials: "include",
      body: options.body ? JSON.stringify(options.body) : undefined,
    });
  } catch {
    return {
      ok: false,
      message: "We couldn't reach the server. Check your connection and try again.",
      status: 0,
    };
  }

  let body: Record<string, unknown>;
  try {
    body = (await response.json()) as Record<string, unknown>;
  } catch {
    return {
      ok: false,
      message: "We could not process your request right now. Please try again later.",
      status: response.status,
    };
  }

  if (!response.ok || body.success === false) {
    // A 401 on any admin call other than login/me means a previously valid
    // session just expired (or was revoked) mid-use — not that this
    // particular request had bad credentials. Login's own 401 ("wrong
    // password") must NOT trigger this, or the login page would redirect
    // to itself in a loop; /me's 401 is already handled by AdminAuthGuard's
    // own redirect. Every other admin page relies on this to escape the
    // "Unable to load… Retry" loop a stale cookie would otherwise cause,
    // since Retry alone can never succeed once the session is gone.
    const isAuthEndpoint = path.startsWith("/api/admin/auth/");
    if (
      response.status === 401 &&
      !isAuthEndpoint &&
      typeof window !== "undefined" &&
      !window.location.pathname.startsWith("/admin/login")
    ) {
      // A hard reload (not client-side routing) is deliberate here: this
      // fires from a plain module, not a component, so no router instance
      // is available — and a full reload also guarantees no stale admin
      // state lingers in memory after a session is known to be invalid.
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination
      window.location.href = "/admin/login";
    }

    return {
      ok: false,
      message: (body.message as string) || "Something went wrong. Please try again.",
      errors: body.errors as Record<string, string> | undefined,
      status: response.status,
    };
  }

  return { ok: true, body, status: response.status };
}

async function adminFetch<T>(
  path: string,
  options: { method?: string; body?: unknown } = {},
): Promise<AdminApiResult<T>> {
  const result = await adminFetchRaw(path, options);
  if (!result.ok) {
    return { success: false, message: result.message, errors: result.errors, status: result.status };
  }
  return { success: true, message: result.body.message as string, data: result.body.data as T };
}

async function adminFetchList<T>(
  path: string,
  options: { method?: string; body?: unknown } = {},
): Promise<AdminApiListResult<T>> {
  const result = await adminFetchRaw(path, options);
  if (!result.ok) {
    return { success: false, message: result.message, errors: result.errors, status: result.status };
  }
  return {
    success: true,
    message: result.body.message as string,
    data: result.body.data as T[],
    pagination: result.body.pagination as Pagination,
  };
}

export const adminApi = {
  login: (email: string, password: string) =>
    adminFetch<{ admin: AdminUser }>("/api/admin/auth/login", {
      method: "POST",
      body: { email, password },
    }),
  logout: () => adminFetch<undefined>("/api/admin/auth/logout", { method: "POST" }),
  me: () => adminFetch<{ admin: AdminUser }>("/api/admin/auth/me"),
  getDashboardStats: () => adminFetch<DashboardStats>("/api/admin/dashboard/stats"),
  getLeads: (params: {
    page?: number;
    limit?: number;
    search?: string;
    status?: LeadStatus | "";
    type?: LeadType | "";
  }) => {
    const query = new URLSearchParams();
    if (params.page) query.set("page", String(params.page));
    if (params.limit) query.set("limit", String(params.limit));
    if (params.search) query.set("search", params.search);
    if (params.status) query.set("status", params.status);
    if (params.type) query.set("type", params.type);
    return adminFetchList<NormalizedLead>(`/api/admin/leads?${query.toString()}`);
  },
  getLead: (id: string) =>
    adminFetch<Record<string, unknown>>(`/api/admin/leads/${id}`),
  updateLeadStatus: (id: string, status: LeadStatus) =>
    adminFetch<Record<string, unknown>>(`/api/admin/leads/${id}/status`, {
      method: "PATCH",
      body: { status },
    }),
  getApplications: (params: {
    page?: number;
    limit?: number;
    search?: string;
    status?: LeadStatus | "";
  }) => {
    const query = new URLSearchParams();
    if (params.page) query.set("page", String(params.page));
    if (params.limit) query.set("limit", String(params.limit));
    if (params.search) query.set("search", params.search);
    if (params.status) query.set("status", params.status);
    return adminFetchList<ApplicationRecord>(`/api/admin/applications?${query.toString()}`);
  },
  getApplication: (id: string) =>
    adminFetch<ApplicationRecord>(`/api/admin/applications/${id}`),
  updateApplicationStatus: (id: string, status: LeadStatus) =>
    adminFetch<ApplicationRecord>(`/api/admin/applications/${id}/status`, {
      method: "PATCH",
      body: { status },
    }),
};
