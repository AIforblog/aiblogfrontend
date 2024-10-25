export type SuccessResponse<T> = {
	statusCode: number;
	message: string;
	data: T;
};

// May differ
export type ErrorResponse = {
	status: number;
	error: string;
	detail: string;
};
