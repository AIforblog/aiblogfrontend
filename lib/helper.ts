import { AUTH_API_BASE_URL, BLOG_API_BASE_URL } from "./constants";
import { PublicError } from "./safe-action";

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
	service: "blog" | "auth",
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

		const res = await fetch(
			`${service === "blog" ? BLOG_API_BASE_URL : AUTH_API_BASE_URL}${path}`,
			fetchOptions,
		);

		if (!res.ok) {
			throw new PublicError("Req failed");
		}

		const contentType = res.headers.get("content-type");
		if (contentType?.includes("application/json")) {
			return (await res.json()) as T;
		}
		return (await res.text()) as unknown as T;
	};
}
