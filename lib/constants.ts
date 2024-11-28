export const DEV = false;
export const BLOG_API_BASE_URL = DEV
	? "http://localhost:3000/api/v1"
	: `${process.env.NEXT_PUBLIC_BLOG_API_BASE_URL}/api/v1` || "";
export const AUTH_API_BASE_URL = DEV
	? "http://localhost:3000/api/v1"
	: `${process.env.NEXT_PUBLIC_USER_AUTH_URL}` || "";
export const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;
export const PROJECT_NAME = "dRello";
