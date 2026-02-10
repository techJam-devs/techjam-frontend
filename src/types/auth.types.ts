/**
 * @description This is the types for all auth operations
 */

// Auth User
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  authRole: "admin" | "user";
  avatar?: string;
  bio?: string;
  location?: string;
  username?: string;
  isEmailVerified: boolean;
  lastLogin?: string;
}

// login request
export interface LoginRequest {
  email: string;
  password: string;
}
// Login response
export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: AuthUser;
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
}

// otp verification response
export interface VerifyOtpResponse {
  success: boolean;
  message: string;
}

// resend OTP request
export interface ResendOtpRequest {
  email: string;
}

// resend OTP response
export interface ResendOtpResponse {
  success: boolean;
  message: string;
  error?: string;
}

// Log out response
export interface LogoutResponse {
  success: boolean;
  message: string;
}

// Get me response
export interface MeResponse {
  success: boolean;
  data: {
    user: AuthUser;
  };
}
