/**
 * @description Defines the types for projects. response and request
 */

export interface ProjectTeamMember {
  user: {
    _id: string;
    name: string;
    username: string;
    avatar: string;
  };
  role?: string;
}

// Full project data
export interface Project {
  _id: string;
  title: string;
  techStack: string[];
  description: string;
  experience?: string;
  requiredRoles: string[];
  startDate: string;
  endDate: string;
  link?: string;
  creator: string;
  status: "available" | "pending" | "completed" | "cancelled";
  teamMembers: ProjectTeamMember[];
  joinRequests: string[];
  createdAt: string;
  updatedAt: string;
}

// Create a project request
export interface createProjectRequest {
  title: string;
  techStack: string[];
  description: string;
  experience: string;
  requiredRoles: string[];
  startDate: string;
  endDate: string;
  link?: string;
}

// Create a project response
export interface createProjectResponse {
  success: boolean;
  message: string;
}

// Fetch all project response
export interface getAllProjectsResponse {
  success: boolean;
  message: string;
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
  count: number;
  projects: Project[];
}

// Join project request response
export interface joinProjectResponse {
  success: boolean;
  message: string;
}
// ================== INCOMING PROJECT REQUESTS ======================

// Project request data
export interface projectRequest {
  _id: string;
  title: string;
  joinRequests: {
    _id: string;
    name: string;
    username: string;
    avatar: string;
    role?: string;
  }[];
}

// View incoming requests response
export interface requestResponse {
  success: boolean;
  message: string;
  count: number;
  projects: projectRequest[];
}
