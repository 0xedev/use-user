export type ApiErrorBody = {
  code?: string;
  message?: string;
  correlationId?: string;
  details?: unknown;
};

export class ApiError extends Error {
  readonly status: number;
  readonly code?: string;
  readonly correlationId?: string;
  readonly details?: unknown;

  constructor(status: number, body: ApiErrorBody, fallback: string) {
    super(body.message || fallback);
    this.name = 'ApiError';
    this.status = status;
    this.code = body.code;
    this.correlationId = body.correlationId;
    this.details = body.details;
  }
}

type TokenProvider = () => Promise<string | null> | string | null;
type GuestTokenProvider = () => Promise<string | null> | string | null;

let accessTokenProvider: TokenProvider = () => null;
let guestTokenProvider: GuestTokenProvider = () => null;

export function configureApiAuth(options: {
  getAccessToken?: TokenProvider;
  getGuestCartToken?: GuestTokenProvider;
}) {
  if (options.getAccessToken) accessTokenProvider = options.getAccessToken;
  if (options.getGuestCartToken) guestTokenProvider = options.getGuestCartToken;
}

export const API_ORIGIN = (process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000').replace(/\/$/, '');

function correlationId() {
  return `mobile-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export type RequestOptions = {
  body?: unknown;
  headers?: Record<string, string>;
  auth?: 'bearer' | 'guest' | 'bearer-or-guest' | 'bearer-and-guest' | 'public';
  idempotencyKey?: string;
  signal?: AbortSignal;
};

export async function apiRequest<T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Correlation-Id': correlationId(),
    ...options.headers,
  };

  const accessToken = await accessTokenProvider();
  const guestToken = await guestTokenProvider();
  const auth = options.auth ?? 'bearer';

  if ((auth === 'bearer' || auth === 'bearer-or-guest' || auth === 'bearer-and-guest') && accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }
  if ((auth === 'guest' || auth === 'bearer-or-guest' || auth === 'bearer-and-guest') && guestToken) {
    headers['X-Guest-Cart-Token'] = guestToken;
  }
  if (options.idempotencyKey) headers['Idempotency-Key'] = options.idempotencyKey;

  const response = await fetch(`${API_ORIGIN}${path}`, {
    method,
    headers,
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
    signal: options.signal,
  });

  if (response.status === 204) return undefined as T;

  const text = await response.text();
  const payload = text ? JSON.parse(text) : undefined;

  if (!response.ok) {
    throw new ApiError(response.status, payload || {}, `${method} ${path} failed`);
  }

  return payload as T;
}

export function withQuery(path: string, query: Record<string, unknown>) {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') params.set(key, String(value));
  });
  const suffix = params.toString();
  return suffix ? `${path}?${suffix}` : path;
}

export function createIdempotencyKey(scope: string) {
  return `${scope}-${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
}
