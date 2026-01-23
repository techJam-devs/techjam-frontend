/**
 * @description This handles the api for bookmarked project
 */

import axiosInstance from "../utils/axiosInstance";
import axios from "axios";

// Fetch saved Bookmarks
export const getSavedBookmarkService = async () => {
  try {
    const response = await axiosInstance.get("/bookmark");
    return response.data.projects; // array of projects
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch saved projects",
      );
    }
    throw new Error("Unexpected error occurred while fetching saved projects");
  }
};

// Save Bookmark
export const saveBookmarkService = async (projectId: string) => {
  try {
    const response = await axiosInstance.post(`/bookmark/${projectId}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to save project",
      );
    }
    throw new Error("Unexpected error occurred");
  }
};

// Delete Bookmark
export const unsaveBookmarkService = async (projectId: string) => {
  try {
    const response = await axiosInstance.delete(`/bookmark/${projectId}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to remove saved project",
      );
    }
    throw new Error("Unexpected error occurred");
  }
};
