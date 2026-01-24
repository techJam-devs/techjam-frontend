/**
 * @description Service for the creator page
 */

import axiosInstance from "../utils/axiosInstance";
import type { Project } from "../types/projects.types";
import axios from "axios";

// Fetch all user project
export const getCreatedProjectsService = async (): Promise<Project[]> => {
  try {
    const res = await axiosInstance.get("/projects/created");
    return res.data.projects;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        throw new Error(
          "Unable to connect. Please check your internet connect",
        );
      }
      throw new Error(
        error?.response?.data?.message ?? "Internal server error.",
      );
    }
    throw new Error("Unexpected error occurred. Please try again later.");
  }
};

// Delete project
export const deleteProjectService = async (projectId: string) => {
  return axiosInstance.delete(`/projects/${projectId}`);
};

// Update project service
export const updateProjectService = async (
  projectId: string,
  updatedData: Partial<Project>,
): Promise<Project> => {
  try {
    const response = await axiosInstance.patch(
      `/projects/${projectId}`,
      updatedData,
    );
    console.log(response.data.project);
    return response.data.project;
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message);
    throw new Error("Failed to update project");
  }
};
