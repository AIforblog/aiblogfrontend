import { API_BASE_URL } from "./constants";

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en", { notation: "compact" }).format(num);
}

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
interface NextJsOptions {
  revalidate?: number | false;
  tags?: string[];
}

interface FetchOptions extends Omit<RequestInit, "method" | "body"> {
  method?: HttpMethod;
  body?: Record<string, unknown>;
  next?: NextJsOptions;
}

export default function makeFetch<T>(
  service: "blog" | "auth" | "general",
  path: string,
  accessToken: string | null,
  options: FetchOptions = {},
): () => Promise<T> {
  return async () => {
    const { method = "GET", body, next, ...restOptions } = options;

    const shouldAddContentType =
      ["POST", "PUT", "PATCH"].includes(method) && body;

    const headers = new Headers(restOptions.headers);

    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }

    if (shouldAddContentType) {
      headers.set("Content-Type", "application/json");
    }

    const fetchOptions: RequestInit & { next?: NextJsOptions } = {
      ...restOptions,
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    };

    if (next) {
      fetchOptions.next = next;
    }

    const res = await fetch(`${API_BASE_URL}${path}`, fetchOptions);

    const contentType = res.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      return (await res.json()) as T;
    }
    return (await res.text()) as unknown as T;
  };
}
/**
 * Formats a given date string or Date object to "Month, Year".
 * @param date - The date to format (as a Date object or an ISO date string).
 * @returns The formatted date as "Month, Year".
 */
export function formatJoinDate(date: string | number | undefined): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
  };
  if (!date) return "";
  return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
}
