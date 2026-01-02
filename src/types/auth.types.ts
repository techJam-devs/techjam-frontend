/**
 * @description This is the types for all auth operations
 */

// login request
export interface LoginRequest {
  email: string;
  password: string;
}

// login response
export interface LoginResponse {
  success: boolean;
  message: string;
  data?: unknown | null;
  error?: {
    message: string;
  };
}

// register request
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

// register response
export interface RegisterResponse {
  success: boolean;
  message: string;
  data?: unknown | null;
  error?: {
    message?: string;
  } | null;
}

// resend OTP request
export interface ResendOtpRequest {
  email: string;
}

// resend OTP response
export interface ResendOtpResponse {
  success: boolean;
  message: string;
  data?: unknown | null;
  error?: {
    success: boolean;
    message: string;
  } | null;
}
