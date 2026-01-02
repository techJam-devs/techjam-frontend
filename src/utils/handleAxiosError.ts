import axios from "axios";

interface BackendError {
  success?: boolean;
  message?: string;
  errors?: { msg: string }[]; // For validation errors
  error?: { message?: string } | null;
}

const handleAxiosError = (error: unknown): Error => {
  if (axios.isAxiosError(error)) {
    // Network-level error
    if (!error.response) {
      return new Error(
        "Server currently unavailable. Please check your internet connection."
      );
    }

    const status = error.response.status;
    const data = error.response.data as BackendError;

    const message =
      data?.error?.message ||
      data?.message || 
      (data?.errors?.length
        ? data.errors.map((e) => e.msg).join(", ")
        : null) ||
      (status >= 500
        ? "Server error. Please try again later."
        : "Request failed. Please check your input.");

    const err = new Error(message) as Error & { status?: number };
    err.status = status;

    return err;
  }

  // Regular JS error
  if (error instanceof Error) return error;

  return new Error("An unexpected error occurred.");
};

export default handleAxiosError;
