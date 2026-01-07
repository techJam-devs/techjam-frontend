/**
 * @description This service file handles all verification verbs,
 *              - verify account, resend otp
 */

import authAxios from "../utils/authAxios.ts";
import axios from "axios";
import type {
  ResendOtpResponse,
  VerifyOtpResponse,
} from "../types/auth.types.ts";

// Verify OTP
export const VerifyOtpService = async (
  email: string,
  otp: string,
): Promise<VerifyOtpResponse> => {
  try {
    const response = await authAxios.post("/verify", { email, otp });
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
        "Account Verification failed.";
      throw new Error(message);
    }
    // Non-Axios / unexpected error
    throw new Error("An unexpected error occurred. Please try again.");
  }
};

// resend OTP
export const ResendOtpService = async (
  email: string,
): Promise<ResendOtpResponse> => {
  try {
    const response = await authAxios.post("/resend-otp", { email });
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
        "Failed to resend OTP.";
      throw new Error(message);
    }
    // Non-Axios / unexpected error
    throw new Error("An unexpected error occurred. Please try again.");
  }
};
