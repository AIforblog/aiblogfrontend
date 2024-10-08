export interface User {
  id?: string;
  username: string;
  email: string;
  avatar_url?: string;
}

export interface SignUpParams {
  username: string;
  email: string;
  password: string;
}

export interface SignUpResponse {
  data?: {
    user?: User;
    access_token?: string;
    refresh_toke?: string;
  };
  error?: string;
  status_code?: number;
}

export interface ForgotPasswordParams {
  email: string;
}

export interface ForgotPasswordResponse {
  message?: string;
  error?: string;
  status_code?: number;
}
