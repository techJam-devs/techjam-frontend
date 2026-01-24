/**
 * @description This handles all api fetch for projects
 *              importing their types from project types.
 */

import axios from "axios";
import type {
  createProjectRequest,
  createProjectResponse,
  getAllProjectsResponse,
  joinProjectResponse,
  Project,
  requestResponse,
} from "../types/projects.types";
import axiosInstance from "../utils/axiosInstance";

// Create project
export const createProjectService = async (
  payload: createProjectRequest,
): Promise<createProjectResponse> => {
  try {
    const response = await axiosInstance.post("/projects", payload);
    return response.data;
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
    throw new Error("An unexpected error occurred. Please try again.");
  }
};

// Fetch all projects
export const getAllProjectsService =
  async (): Promise<getAllProjectsResponse> => {
    try {
      const response = await axiosInstance.get("/projects");
      return response.data;
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

// Fetch all projects am a member of
export const getJoinedProjectsService = async (): Promise<Project[]> => {
  try {
    const response = await axiosInstance.get("/projects/joined");
    return response.data.projects;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        throw new Error(
          "Unable to connect. Please check your internet connect",
        );
      }
      throw new Error(
        error.response?.data?.message ?? "Internal server error.",
      );
    }
    throw new Error("Unexpected error occurred. Please try again later.");
  }
};

// Join project
export const joinProjectRequestService = async (
  projectId: string,
): Promise<joinProjectResponse> => {
  try {
    const response = await axiosInstance.post(`/projects/${projectId}/join`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        throw new Error(
          "Unable to connect. Please check your internet connect",
        );
      }
      throw new Error(
        error.response?.data?.message ?? "Internal server error.",
      );
    }
    throw new Error("Unexpected error occurred. Please try again later.");
  }
};

// View all incoming requests
export const viewAllRequestService = async (): Promise<requestResponse> => {
  try {
    const res = await axiosInstance.get(`/projects/requests`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        throw new Error(
          "Unable to connect. Please check your internet connect",
        );
      }
      throw new Error(
        error.response?.data?.message ?? "Internal server error.",
      );
    }
    throw new Error("Unexpected error occurred. Please try again later.");
  }
};

// Accept Request
export const acceptRequestService = async (
  projectId: string,
  userId: string,
) => {
  try {
    const res = await axiosInstance.post(
      `/projects/${projectId}/requests/${userId}/accept`,
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        throw new Error(
          "Unable to connect. Please check your internet connect",
        );
      }
      throw new Error(
        error.response?.data?.message ?? "Internal server error.",
      );
    }
    throw new Error("Unexpected error occurred. Please try again later.");
  }
};

// Decline request
export const declineRequestService = async (
  projectId: string,
  userId: string,
) => {
  try {
    const res = await axiosInstance.post(
      `/projects/${projectId}/requests/${userId}/decline`,
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        throw new Error(
          "Unable to connect. Please check your internet connect",
        );
      }
      throw new Error(
        error.response?.data?.message ?? "Internal server error.",
      );
    }
    throw new Error("Unexpected error occurred. Please try again later.");
  }
};

// Team member leaves project
export const leaveProjectService = async (projectId: string) => {
  try {
    const res = await axiosInstance.post(`/projects/${projectId}/leave`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        throw new Error(
          "Unable to connect. Please check your internet connect",
        );
      }
      throw new Error(
        error.response?.data?.message ?? "Internal server error.",
      );
    }
    throw new Error("Unexpected error occurred. Please try again later.");
  }
};
