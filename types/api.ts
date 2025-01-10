export type SuccessResponse<T> = {
  isFollowing?: boolean | PromiseLike<boolean>;
  statusCode: number;
  message: string;
  data: T;
};

// May differ
export type ErrorResponse = {
  statusCode: number;
  error: string;
  message: string;
};
