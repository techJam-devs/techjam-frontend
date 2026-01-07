/**
 * @description A designated service for the public contact page
 */

import axiosInstance from "../utils/axiosInstance";
import axios from "axios";

interface PayloadRequest {
  name: string;
  phone: string;
  email: string;
  message: string;
}

interface ContactResponse {
  success: boolean;
  message: string;
}

export const ContactUsService = async (
  payload: PayloadRequest,
): Promise<ContactResponse> => {
  try {
    const response = await axiosInstance.post("/contact", payload);
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
        "failed to send message.";
      throw new Error(message);
    }
    // Non-Axios / unexpected error
    throw new Error("An unexpected error occurred. Please try again.");
  }
};
