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
  statusCode: number;
  success: boolean;
  message: string;
  data?: unknown | null;
  error?: {
    statusCode: number;
    error: string;
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
  statusCode: number;
  success: boolean;
  message: string;
  data?: {
    message?: string;
    email?: string;
    otpExpiryMinutes?: number;
  } | null;
  error?: {
    message?: string;
    error?: string;
    statusCode?: number;
  } | null;
}
