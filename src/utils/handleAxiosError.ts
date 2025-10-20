/**
 * Handles Axios and non-Axios errors gracefully
 * and returns a clean Error object with a readable message.
 */

import { AxiosError } from "axios";

interface BackendError {
  statusCode?: number;
  message?: string;
  success?: boolean;
  data?: unknown | null;
  error?: {
    message?: string;
    error?: string;
    statusCode?: number;
  } | null;
}

const handleAxiosError = (error: unknown): Error => {
  if (error instanceof AxiosError) {
    if (!error.response) {
      return new Error(
        "Server currently unavailable, please check your internet connection. ",
      );
    }

    const status = error.response.status;
    const data = error.response.data as BackendError;

    const errMessage =
      data?.error?.message ||
      data?.message ||
      data?.error?.error ||
      (status >= 500
        ? "Server error please try again later."
        : "Request failed. Please check your input.");

    return new Error(errMessage);
  }

  return new Error("An unknown error has occurred.");
};

export default handleAxiosError;
