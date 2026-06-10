import { FetchError } from "./fetch.error";

export const fetchClient = async <T>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<T> => {
  const res = await fetch(input, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    ...init,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);

    throw new FetchError(
      res.status,
      body?.code,
      body?.message ?? res.statusText,
      body,
    );
  }

  if (res.status === 204) return undefined as T;

  return res.json() as Promise<T>;
};
