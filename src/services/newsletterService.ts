/**
 * @description newsletter services
 */

import type { AxiosResponse } from "axios";
import type {
  ApiResponse,
  SendNewsletterPayload,
} from "../types/newsletter.type";
import axiosInstance from "../utils/axiosInstance";

/**
 * Subscribe user to newsletter
 */
export const subscribeToNewsletterService = async (
  email: string,
): Promise<ApiResponse> => {
  const response = await axiosInstance.post<ApiResponse>(
    "/newsletter/subscribe",
    { email },
  );
  return response.data;
};

/**
 * Confirm subscription
 */
export const confirmNewsletterSubscriptionService = async (
  token: string,
): Promise<ApiResponse> => {
  const response = await axiosInstance.get<ApiResponse>(
    `/newsletter/confirm?token=${token}`,
  );
  return response.data;
};

/**
 * Unsubscribe
 */
export const unsubscribeFromNewsletterService = async (
  token: string,
): Promise<ApiResponse> => {
  const response = await axiosInstance.get<ApiResponse>(
    `/newsletter/unsubscribe?token=${token}`,
  );
  return response.data;
};

/**
 * Send newsletter (admin only)
 */
export const sendNewsletter = async (
  data: SendNewsletterPayload,
  token: string, // JWT token for admin auth
): Promise<ApiResponse> => {
  const response: AxiosResponse<ApiResponse> = await axiosInstance.post(
    "/newsletter/send",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};
