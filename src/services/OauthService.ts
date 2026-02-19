/**
 * @description Service for our open auth api end points
 */

import axios from "axios";
import axiosInstance from "../utils/axiosInstance";

export const GoogleOauthService = async (token: string) => {
  try {
    const res = await axiosInstance.post("/oauth/google", { token });
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Authentication failed.";
      throw new Error(message);
    }
    // Non-Axios / unexpected error
    throw new Error("An unexpected error occurred. Please try again.");
  }
};
