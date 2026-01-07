/**
 * @Description This is the Services for all auth operations
 *              - login, verification, registration, forget password and reset password
 *              - Imports the type of response and request ts
 */

import authAxios from "../utils/authAxios.ts";
import axios from "axios";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  LogoutResponse,
  MeResponse,
} from "../types/auth.types.ts";

// register
export const RegisterService = async (
  formData: RegisterRequest,
): Promise<RegisterResponse> => {
  try {
    const response = await authAxios.post("/register", formData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        throw new Error(
          "Unable to connect to server. Please check your connection.",
        );
      }
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Registration failed.";
      throw new Error(message);
    }
    // Non-Axios / unexpected error
    throw new Error("An unexpected error occurred. Please try again.");
  }
};

// login
export const LoginService = async (
  formData: LoginRequest,
): Promise<LoginResponse> => {
  try {
    const response = await authAxios.post<LoginResponse>("/login", formData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        throw new Error(
          "Unable to connect to server. Please check your connection.",
        );
      }
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Login failed.";
      throw new Error(message);
    }
    // Non-Axios / unexpected error
    throw new Error("An unexpected error occurred. Please try again.");
  }
};

// Log out
export const LogoutService = async (): Promise<LogoutResponse> => {
  try {
    const response = await authAxios.post("/logout");
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Logout failed.";
      throw new Error(message);
    }
    // Non-Axios / unexpected error
    throw new Error("An unexpected error occurred. Please try again.");
  }
};

// Get me service
export const GetMeService = async (): Promise<MeResponse> => {
  try {
    const response = await authAxios.get("/me");
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const message =
        err.response?.data?.message || "Failed to Authenticate user";
      throw new Error(message);
    }
    throw new Error("Unexpected error. Please try again.");
  }
};

// Forget password
export const ForgetPasswordService = async (email: string) => {
  try {
    const response = await authAxios.post("/forgot-password", { email });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        throw new Error(
          "Unable to connect to server. Please check your connection.",
        );
      }
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to send password reset email";
      throw new Error(message);
    }
    // Non-Axios / unexpected error
    throw new Error("An unexpected error occurred. Please try again.");
  }
};

// Reset password
export const ResetPasswordService = async (data: {
  email: string;
  token: string;
  newPassword: string;
}) => {
  try {
    const response = await authAxios.post("/reset-password", data);
    return response.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const message = err.response?.data?.message || "Failed to reset password";
      throw new Error(message);
    }
    throw new Error("Unexpected error. Please try again.");
  }
};
