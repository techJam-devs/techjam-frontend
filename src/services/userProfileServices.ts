/**
 * @description We build a service for user profile update and profile user pic update
 * @access Authorized user only
 */

import axios from "axios";
import axiosInstance from "../utils/axiosInstance";
import type { AuthUser } from "../types/auth.types";

interface avatarResponse {
  success: boolean;
  message: string;
  user: AuthUser;
}

interface updateProfileResponse {
  success: boolean;
  message: string;
  user: AuthUser;
}

interface updateProfileRequest {
  bio?: string;
  location?: string;
  username?: string;
  role?: string;
}

// Auto upload avatar
export const avatarUploadService = async (
  imgFile: File,
): Promise<avatarResponse> => {
  try {
    const formData = new FormData();
    formData.append("file", imgFile);
    const response = await axiosInstance.post(
      "/user/profile-picture",
      formData,
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        throw new Error(
          "Unable to connect. Please check your internet connect",
        );
      }
      const message =
        error?.response?.data?.message || "Internal server error.";
      throw new Error(message);
    }
    throw new Error("An unexpected error occurred. Please try again.");
  }
};

// Update user profile
export const updateProfileService = async (
  payload: updateProfileRequest,
): Promise<updateProfileResponse> => {
  try {
    const response = await axiosInstance.patch("/user/update", payload);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        throw new Error(
          "Unable to connect. Please check your internet connect",
        );
      }
      const message =
        error?.response?.data?.message || "Internal server error.";
      throw new Error(message);
    }
    throw new Error("An unexpected error occurred. Please try again.");
  }
};
