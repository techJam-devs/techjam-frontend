/**
 * @description defines the type for newsletter
 */

// src/types/newsletter.type.ts

export type ApiResponse = {
  success: boolean;
  message: string;
};

/**admin */
export interface SendNewsletterPayload {
  subject: string;
  content: string;
}
