export interface User {
	id?: string;
	username: string;
	email: string;
	avatar_url?: string;
	profileId: string;
	createdAt: string;
}

export interface SignUpParams {
	username: string;
	email: string;
	password: string;
}

export interface ErrorResponse {
	message: string;
	status_code?: number;
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

export interface SignInParams {
	email: string;
	password: string;
}

export interface SignInResponse {
	data?: {
		user?: User;
		accessToken?: string;
		refreshToken?: string;
	};
	error?: string;
	status_code?: number;
	message?: string;
}

export interface GoogleSignInResponse {
  authUrl: string | null;
  error: string | null;
}

export interface ForgotPasswordParams {
	email: string;
}

export interface ForgotPasswordResponse {
	message?: string;
	error?: string;
	status_code?: number;
}

export interface UpdatePasswordParams {
	newPassword: string;
	confirmPassword: string;
	resetToken: string;
}

export interface UpdatePasswordResponse {
	message?: string;
	error?: string;
	status_code: number;
}
